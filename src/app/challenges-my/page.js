"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import Tab from "@/components/common/Tab/Tab";
import Search from "@/components/common/Search/Search";
import Sort from "@/components/common/Sort/Sort";
import ChallengeCard from "@/components/challenge/ChallengeCard";
import Pagination from "@/components/common/PageButton/Pagination/Pagination";
import PlusIcon from "@/assets/icons/ic-plus-s.svg";
import notificationsData from "@/data/notifications.json";
import { notificationsSchema } from "@/schemas/challengeSchemas";
import { getCurrentUser } from "@/services/user/apiUserService";
import { getChallenges, getChallengeRequests } from "@/services/challenge/apiChallengeService";

const TAB_ITEMS = [
  { key: "participating", label: "참여중인 챌린지" },
  { key: "completed", label: "완료한 챌린지" },
  { key: "applied", label: "신청한 챌린지" },
];

const STATUS_CLASS_NAME = {
  "승인 대기": "bg-[#fffde7] text-[#f0b400]",
  "신청 거절": "bg-[#fff0f0] text-[var(--error)]",
  "신청 승인": "bg-[#dff0ff] text-[#2f80ed]",
  "챌린지 삭제": "bg-[#f3f4f6] text-[var(--gray-600)]",
  "신청 취소": "bg-[#f3f4f6] text-[var(--gray-600)]",
};

const DOC_TYPE_LABEL_MAP = {
  OFFICIAL_DOCUMENT: "공식문서",
  BLOG: "블로그",
};

const DOC_TYPE_VARIANT_MAP = {
  OFFICIAL_DOCUMENT: "category-doc",
  BLOG: "category-blog",
};

const FIELD_VARIANT_MAP = {
  프론트엔드: "type-web",
  백엔드: "type-api",
  커리어: "type-career",
  "Next.js": "type-nextjs",
  API: "type-api",
  Career: "type-career",
  "Modern.js": "type-modernjs",
  Web: "type-web",
};

const REQUEST_STATUS_LABEL_MAP = {
  PENDING: "승인 대기",
  REJECTED: "신청 거절",
  CANCELLED: "신청 취소",
  APPROVED: "신청 승인",
};

const STATUS_ROUTE_MAP = {
  "승인 대기": "pending",
  "신청 거절": "rejected",
  "신청 승인": "approved",
  "챌린지 삭제": "deleted",
};

const APPLIED_SORT_OPTIONS = ["승인 대기", "신청 승인", "신청 거절", "신청 취소"];

const formatDeadline = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일 마감`;
};

const formatShortDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const getDocTypeLabel = (docType) => DOC_TYPE_LABEL_MAP[docType] || docType || "";
const getDocTypeVariant = (docType) => DOC_TYPE_VARIANT_MAP[docType] || "category-doc";
const getFieldVariant = (field) => FIELD_VARIANT_MAP[field] || "type-web";

export default function MyChallengesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("participating");
  const [searchQuery, setSearchQuery] = useState("");
  const [applyStatus, setApplyStatus] = useState("");
  const [appliedPage, setAppliedPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [appliedChallenges, setAppliedChallenges] = useState([]);

  const validatedNotifications = useMemo(() => {
    try {
      return notificationsSchema.parse(notificationsData);
    } catch {
      return notificationsData;
    }
  }, []);

  useEffect(() => {
    let isActive = true;
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (!response?.user?.id) {
          throw new Error("로그인이 필요합니다.");
        }
        if (isActive) {
          setUserId(response.user.id);
        }
      } catch (error) {
        if (isActive) {
          setLoadError(error.message || "사용자 정보를 불러오지 못했습니다.");
          setIsLoading(false);
        }
      }
    };
    fetchUser();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    let isActive = true;

    const mapChallengeToCard = (challenge, tab) => {
      const participantCount = challenge?._count?.participants || 0;
      const maxParticipants = challenge?.maxParticipants || 0;
      const isFull = maxParticipants > 0 && participantCount >= maxParticipants;
      const statusText = tab === "completed"
        ? "챌린지가 마감되었어요"
        : isFull
          ? "모집이 완료된 상태에요"
          : "";
      return {
        id: challenge.id,
        tab,
        title: challenge.title,
        tags: [
          {
            text: challenge.field,
            variant: getFieldVariant(challenge.field),
          },
          {
            text: getDocTypeLabel(challenge.docType),
            variant: getDocTypeVariant(challenge.docType),
          },
        ],
        deadline: formatDeadline(challenge.deadlineAt),
        participants: `${participantCount}/${maxParticipants} ${isFull ? "참여 완료" : "참여중"}`,
        statusText: statusText || undefined,
        isClosed: tab === "completed",
      };
    };

    const mapRequestToRow = (request) => ({
      id: request.id,
      field: request.field,
      docType: getDocTypeLabel(request.docType),
      title: request.title,
      capacity: request.maxParticipants,
      appliedAt: formatShortDate(request.createdAt),
      deadline: formatShortDate(request.deadlineAt),
      status: REQUEST_STATUS_LABEL_MAP[request.requestStatus] || request.requestStatus,
    });

    const fetchData = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const [inProgress, closed, requests] = await Promise.all([
          getChallenges({ userId, challengeStatus: "IN_PROGRESS" }),
          getChallenges({ userId, challengeStatus: "CLOSED" }),
          getChallengeRequests({ userId }),
        ]);

        if (!isActive) return;

        setParticipatingChallenges(
          (inProgress || []).map((challenge) => mapChallengeToCard(challenge, "participating"))
        );
        setCompletedChallenges(
          (closed || []).map((challenge) => mapChallengeToCard(challenge, "completed"))
        );
        setAppliedChallenges((requests || []).map(mapRequestToRow));
      } catch (error) {
        if (isActive) {
          setLoadError(error.message || "데이터를 불러오지 못했습니다.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [userId]);

  const filteredChallenges = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const targetList =
      activeTab === "participating" ? participatingChallenges : completedChallenges;
    return targetList.filter((challenge) => {
      const matchesSearch = normalizedQuery
        ? challenge.title.toLowerCase().includes(normalizedQuery)
        : true;
      return matchesSearch;
    });
  }, [activeTab, searchQuery, participatingChallenges, completedChallenges]);

  const appliedRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return appliedChallenges.filter((item) => {
      const matchesSearch = normalizedQuery
        ? item.title.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesStatus = applyStatus ? item.status === applyStatus : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, applyStatus, appliedChallenges]);

  const appliedPageSize = 10;
  const appliedTotalPages = Math.max(1, Math.ceil(appliedRows.length / appliedPageSize));
  const appliedVisibleRows = useMemo(() => {
    const start = (appliedPage - 1) * appliedPageSize;
    return appliedRows.slice(start, start + appliedPageSize);
  }, [appliedPage, appliedRows]);

  useEffect(() => {
    setAppliedPage(1);
  }, [applyStatus, searchQuery]);

  const handleAppliedRowClick = (status, id) => {
    const mappedStatus = STATUS_ROUTE_MAP[status];
    if (mappedStatus && id) {
      router.push(`/challenges-status/${mappedStatus}/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb
        notifications={validatedNotifications}
        user={{ name: "체다치즈", role: "일반" }}
        onMyChallenge={() => router.push("/challenges-my")}
      />
      <Container className="py-10 md:py-[60px]">
        <div className="mb-6 flex flex-col gap-6 md:mb-8">
          <div className="flex items-center justify-between">
            <h1 className="font-24-bold text-[var(--gray-900)]">나의 챌린지</h1>
            <button
              type="button"
              onClick={() => router.push("/challenges-new")}
              className="inline-flex h-10 items-center gap-1 rounded-full bg-[var(--gray-900)] px-4 py-2 font-14-semibold text-white hover:bg-[var(--gray-800)]"
            >
              <span className="leading-none">신규 챌린지 신청</span>
              <PlusIcon className="size-4 shrink-0" />
            </button>
          </div>

          <div className="flex flex-col gap-4 border-b border-[var(--gray-200)] pb-4">
            <Tab items={TAB_ITEMS} activeKey={activeTab} onChange={setActiveTab} />
          </div>

          {activeTab !== "applied" ? (
            <Search
              placeholder="챌린지 이름을 검색해보세요"
              className="w-full md:max-w-[800px]"
              onSearch={setSearchQuery}
            />
          ) : null}
        </div>

        {loadError ? (
          <div className="flex min-h-[420px] items-center justify-center text-center">
            <p className="font-16-regular text-[var(--error)]">{loadError}</p>
          </div>
        ) : isLoading ? (
          <div className="flex min-h-[420px] items-center justify-center text-center">
            <p className="font-16-regular text-[var(--gray-500)]">
              데이터를 불러오는 중이에요.
            </p>
          </div>
        ) : activeTab === "applied" ? (
          <div className="flex flex-col gap-5 md:gap-2">
            <div className="flex w-full flex-row items-center gap-3">
              <Search
                placeholder="챌린지 이름을 검색해보세요"
                className="w-full flex-1 min-w-0 md:max-w-none"
                onSearch={setSearchQuery}
              />
              <Sort
                options={APPLIED_SORT_OPTIONS}
                value={applyStatus}
                onChange={setApplyStatus}
                placeholder="승인 대기"
                className="shrink-0 md:ml-auto md:min-w-0"
                buttonClassName="px-3"
              />
            </div>

            {appliedRows.length > 0 ? (
              <>
                <div className="grid grid-cols-[72px_96px_88px_minmax(280px,1fr)_96px_96px_96px_96px] items-center gap-0 rounded-[12px] bg-[var(--gray-900)] px-4 pt-[9px] pb-[11px] text-white">
                  {["No.", "분야", "카테고리", "챌린지 제목", "모집 인원", "신청일", "마감 기한", "상태"].map(
                    (label) => (
                      <span key={label} className="font-14-medium text-center">
                        {label}
                      </span>
                    )
                  )}
                </div>
                <div className="overflow-hidden rounded-2xl border border-[var(--gray-200)] bg-white">
                  <div className="divide-y divide-[var(--gray-100)]">
                  {appliedVisibleRows.map((item) => (
                  <div
                    key={item.id}
                    className={`grid grid-cols-[72px_96px_88px_minmax(280px,1fr)_96px_96px_96px_96px] items-center gap-0 px-4 py-3 ${
                      STATUS_ROUTE_MAP[item.status]
                        ? "cursor-pointer hover:bg-[var(--gray-50)]"
                        : ""
                    }`}
                    onClick={() => handleAppliedRowClick(item.status, item.id)}
                  >
                      <span className="font-14-regular text-center text-[var(--gray-600)]">
                        {item.id}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.field}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.docType}
                      </span>
                      <span className="font-14-regular truncate text-[var(--gray-900)]">
                        {item.title}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.capacity}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.appliedAt}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.deadline}
                      </span>
                      <span
                        className={`ml-auto flex w-fit items-center justify-center rounded-full px-3 py-1 text-[12px] font-12-medium ${STATUS_CLASS_NAME[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-center">
                <p className="font-16-regular text-[var(--gray-500)]">
                  아직 챌린지가 없어요.
                </p>
              </div>
            )}
          </div>
        ) : filteredChallenges.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center text-center">
            <p className="font-16-regular text-[var(--gray-500)]">
              아직 챌린지가 없어요.
            </p>
          </div>
        )}

        {activeTab === "applied" && appliedRows.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={appliedPage}
              totalPages={appliedTotalPages}
              onPageChange={setAppliedPage}
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
