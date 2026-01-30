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
import RejectModal from "@/components/common/RejectModal/RejectModal";
import PlusIcon from "@/assets/icons/ic-plus-s.svg";
import { getCurrentUser } from "@/services/user/apiUserService";
import { getChallenges, getMyChallenges, getChallengeRequests, getChallengeRequestDetail, deleteChallenge, deleteChallengeAsAdmin } from "@/services/challenge";
import { toast } from "@/hooks/use-toast";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isParticipatingLoading, setIsParticipatingLoading] = useState(true);
  const [isCompletedLoading, setIsCompletedLoading] = useState(true);
  const [isAppliedLoading, setIsAppliedLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [appliedLoadError, setAppliedLoadError] = useState("");
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [createdChallengesDebug, setCreatedChallengesDebug] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [appliedChallenges, setAppliedChallenges] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const getRequestStatus = (request) => {
    const raw =
      request?.requestStatus ??
      request?.status ??
      request?.request_status ??
      "";
    return String(raw).trim().toUpperCase();
  };

  const normalizeList = (value) => {
    if (Array.isArray(value)) return value;
    if (value && Array.isArray(value.data)) return value.data;
    return [];
  };

  const mergeUniqueById = (items = []) =>
    Array.from(new Map(items.map((item) => [item.id, item])).values());

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
      originalWorkId: challenge?.originalWorkId || challenge?.original_work_id || null,
      workId:
        challenge?.workId ||
        challenge?.work_id ||
        challenge?.myWorkId ||
        challenge?.my_work_id ||
        challenge?.originalWorkId ||
        challenge?.original_work_id ||
        null,
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

  const mapRequestToRow = (request) => {
    const statusKey = getRequestStatus(request);
    return {
      id: request.id,
      field: request.field,
      docType: getDocTypeLabel(request.docType),
      title: request.title,
      capacity: request.maxParticipants,
      appliedAt: formatShortDate(request.createdAt),
      deadline: formatShortDate(request.deadlineAt),
      status: REQUEST_STATUS_LABEL_MAP[statusKey] || request.requestStatus || request.status,
    };
  };

  const mapRequestToChallengeCard = (request) => {
    const linkedChallengeId =
      request?.challengeId ||
      request?.challenge_id ||
      request?.challenge?.id ||
      request?.challenges?.[0]?.id ||
      null;
    const maxParticipants = request?.maxParticipants || 0;
    return {
      id: linkedChallengeId ? linkedChallengeId : `request-${request.id}`,
      linkedChallengeId,
      requestId: request?.id || null,
      tab: "participating",
      title: request.title,
      tags: [
        {
          text: request.field,
          variant: getFieldVariant(request.field),
        },
        {
          text: getDocTypeLabel(request.docType),
          variant: getDocTypeVariant(request.docType),
        },
      ],
      deadline: formatDeadline(request.deadlineAt),
      participants: `0/${maxParticipants} 참여중`,
      statusText: undefined,
      isClosed: false,
    };
  };

  useEffect(() => {
    let isActive = true;
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (!response?.user?.id) {
          throw new Error("로그인이 필요합니다.");
        }
        if (isActive) {
          setCurrentUser(response.user);
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
    let isActive = true;
    let didTimeout = false;
    const timeoutId = setTimeout(() => {
      if (!isActive) return;
      didTimeout = true;
      setLoadError("데이터를 불러오는 데 시간이 오래 걸립니다. 잠시 후 다시 시도해주세요.");
      setIsParticipatingLoading(false);
      setIsCompletedLoading(false);
    }, 8000);

    const fetchCoreChallenges = async () => {
      setIsParticipatingLoading(true);
      setIsCompletedLoading(true);
      setLoadError("");

      const [inProgressResult, closedResult, completedResult] = await Promise.allSettled([
        getMyChallenges({ challengeStatus: "IN_PROGRESS" }),
        getMyChallenges({ challengeStatus: "CLOSED" }),
        getMyChallenges({ challengeStatus: "COMPLETED" }),
      ]);

      if (!isActive) return;

      let participatingCards = [];

      if (inProgressResult.status === "fulfilled") {
        const inProgressList = normalizeList(inProgressResult.value);
        participatingCards = inProgressList.map((challenge) =>
          mapChallengeToCard(challenge, "participating")
        );
        setParticipatingChallenges((prev) =>
          mergeUniqueById([...participatingCards, ...prev])
        );
        setIsParticipatingLoading(false);
      } else {
        setLoadError(inProgressResult.reason?.message || "데이터를 불러오지 못했습니다.");
        setIsParticipatingLoading(false);
      }

      // CLOSED와 COMPLETED 모두 "완료한 챌린지"로 표시
      const closedListRaw = closedResult.status === "fulfilled" ? normalizeList(closedResult.value) : [];
      const completedListRaw = completedResult.status === "fulfilled" ? normalizeList(completedResult.value) : [];
      const allCompletedList = [...closedListRaw, ...completedListRaw];
      // 중복 제거
      const uniqueCompletedList = Array.from(new Map(allCompletedList.map((item) => [item.id, item])).values());

      if (closedResult.status === "fulfilled" || completedResult.status === "fulfilled") {
        setCompletedChallenges(
          uniqueCompletedList.map((challenge) => mapChallengeToCard(challenge, "completed"))
        );
        setIsCompletedLoading(false);
      } else if (!loadError) {
        setLoadError(closedResult.reason?.message || "데이터를 불러오지 못했습니다.");
        setIsCompletedLoading(false);
      }

      if (didTimeout) {
        setLoadError("");
      }
      clearTimeout(timeoutId);

    };

    fetchCoreChallenges();
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    if (!userId) {
      setIsAppliedLoading(false);
      return () => {
        isActive = false;
      };
    }

    const fetchUserLinkedChallenges = async () => {
      setIsAppliedLoading(true);
      setAppliedLoadError("");

      const [requestsResult, createdInProgressResult] = await Promise.allSettled([
        getChallengeRequests({ userId }),
        getChallenges({ userId }),
      ]);

      if (!isActive) return;

      const createdInProgressListRaw =
        createdInProgressResult.status === "fulfilled"
          ? normalizeList(createdInProgressResult.value)
          : [];
      const createdInProgressList = createdInProgressListRaw.filter((challenge) => {
        const statusValue = String(challenge?.challengeStatus || "").trim().toUpperCase();
        return !statusValue || statusValue === "IN_PROGRESS";
      });
      const createdSource =
        createdInProgressListRaw.length > 0
          ? createdInProgressListRaw
          : createdInProgressList;
      const createdCards = createdSource.map((challenge) =>
        mapChallengeToCard(challenge, "participating")
      );
      setCreatedChallenges(createdCards);
      setCreatedChallengesDebug(createdSource);
      if (createdCards.length > 0) {
        setParticipatingChallenges((prev) =>
          mergeUniqueById([...prev, ...createdCards])
        );
      }

      if (requestsResult.status === "fulfilled") {
        const requests = normalizeList(requestsResult.value);
        setAppliedChallenges(requests.map(mapRequestToRow));
        const approvedRequests = requests.filter(
          (request) => getRequestStatus(request) === "APPROVED"
        );
        const approvedCards = approvedRequests.map(mapRequestToChallengeCard);
        if (approvedCards.length > 0) {
          setParticipatingChallenges((prev) =>
            mergeUniqueById([...prev, ...approvedCards])
          );
        }
        setIsAppliedLoading(false);
      } else {
        setAppliedChallenges([]);
        setAppliedLoadError(
          requestsResult.reason?.message || "신청 목록을 불러오지 못했습니다."
        );
        setIsAppliedLoading(false);
      }
    };

    fetchUserLinkedChallenges();
    return () => {
      isActive = false;
    };
  }, [userId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__myChallengesDebug = {
        userId,
        createdChallenges,
        createdChallengesRaw: createdChallengesDebug,
        participatingChallenges,
      };
    }
  }, [userId, createdChallenges, createdChallengesDebug, participatingChallenges]);

  const filteredChallenges = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const targetList =
      activeTab === "participating"
        ? (participatingChallenges.length > 0 ? participatingChallenges : createdChallenges)
        : completedChallenges;
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

  const isAdmin =
    String(currentUser?.role || "").toLowerCase() === "admin" ||
    currentUser?.role === "ADMIN";

  const handleEditChallenge = (challengeId) => {
    if (!challengeId) return;
    router.push(`/challenges-new?mode=edit&id=${challengeId}`);
  };

  const handleDeleteChallenge = async (challengeId) => {
    if (!challengeId) return;
    if (isAdmin) {
      setDeleteTargetId(challengeId);
      setIsDeleteModalOpen(true);
      return;
    }
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteChallenge(challengeId);
      setParticipatingChallenges((prev) => prev.filter((item) => item.id !== challengeId));
      setCompletedChallenges((prev) => prev.filter((item) => item.id !== challengeId));
      toast({
        title: "삭제 완료",
        description: "챌린지가 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "삭제 실패",
        description: error.message || "삭제에 실패했습니다.",
      });
    }
  };

  const handleAdminDeleteSubmit = async (reason) => {
    const targetId = deleteTargetId;
    if (!targetId) return;
    const trimmedReason = typeof reason === "string" ? reason.trim() : "";
    if (!trimmedReason) {
      toast({
        title: "삭제 실패",
        description: "삭제 사유를 입력해주세요.",
      });
      return;
    }
    try {
      await deleteChallengeAsAdmin(targetId, reason);
      setParticipatingChallenges((prev) => prev.filter((item) => item.id !== targetId));
      setCompletedChallenges((prev) => prev.filter((item) => item.id !== targetId));
      toast({
        title: "삭제 완료",
        description: "챌린지가 삭제되었습니다.",
      });
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      toast({
        title: "삭제 실패",
        description: error.message || "삭제에 실패했습니다.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb
        isLoggedIn={Boolean(currentUser)}
        role={isAdmin ? "admin" : "member"}
        user={
          currentUser
            ? {
                name: currentUser.nickname || currentUser.name || "사용자",
                role: isAdmin ? "관리자" : "일반",
              }
            : { name: "사용자", role: "일반" }
        }
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

            {appliedLoadError ? (
              <div className="flex min-h-[420px] items-center justify-center text-center">
                <p className="font-16-regular text-[var(--error)]">{appliedLoadError}</p>
              </div>
            ) : isAppliedLoading ? (
              <div className="overflow-hidden rounded-2xl border border-[var(--gray-200)] bg-white">
                <div className="divide-y divide-[var(--gray-100)]">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[72px_96px_88px_minmax(280px,1fr)_96px_96px_96px_96px] items-center gap-0 px-4 py-3"
                    >
                      <div className="h-4 w-8 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="h-4 w-12 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="h-4 w-12 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="h-4 w-40 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="h-4 w-12 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="h-4 w-12 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="h-4 w-12 animate-pulse rounded bg-[var(--gray-100)]" />
                      <div className="ml-auto h-6 w-16 animate-pulse rounded-full bg-[var(--gray-100)]" />
                    </div>
                  ))}
                </div>
              </div>
            ) : appliedRows.length > 0 ? (
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
        ) : (activeTab === "participating" && isParticipatingLoading) ||
          (activeTab === "completed" && isCompletedLoading) ? (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex w-full flex-col rounded-xl border-2 border-[#262626] bg-white p-6"
              >
                <div className="mb-4 h-5 w-3/5 animate-pulse rounded bg-[var(--gray-100)]" />
                <div className="mb-6 flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-[var(--gray-100)]" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-[var(--gray-100)]" />
                </div>
                <div className="mb-4 border-t border-[var(--gray-100)]" />
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                  <div className="h-4 w-40 animate-pulse rounded bg-[var(--gray-100)]" />
                  <div className="h-4 w-32 animate-pulse rounded bg-[var(--gray-100)]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredChallenges.length > 0 ? (
          <div className="flex flex-col gap-6">
        {filteredChallenges.map((challenge) => {
          const isCompletedTab = activeTab === "completed";
          const canShowWorkButton = Boolean(challenge.workId);

          return (
            <ChallengeCard
              key={challenge.id}
              {...challenge}
              isAdmin={isAdmin}
              showAction={!isAdmin && (activeTab === "participating" || isCompletedTab)}
              actionLabel={isCompletedTab ? "내 작업물 보기" : "도전 계속하기"}
              actionVariant={isCompletedTab ? "work" : "primary"}
              onAction={async () => {
                if (isCompletedTab) {
                  if (!canShowWorkButton) {
                    toast({
                      title: "작업물을 찾을 수 없습니다.",
                      description: "연결된 작업물이 아직 없습니다.",
                    });
                    return;
                  }
                  router.push(`/workDetail/${challenge.workId}`);
                  return;
                }

                const linkedId = challenge.linkedChallengeId || challenge.id;
                if (String(linkedId).startsWith("request-")) {
                  const requestId =
                    challenge.requestId ||
                    String(linkedId).replace("request-", "");
                  try {
                    const detail = await getChallengeRequestDetail(requestId);
                    const resolvedId =
                      detail?.challengeId ||
                      detail?.challenge_id ||
                      detail?.challenge?.id ||
                      detail?.challenges?.[0]?.id ||
                      null;
                    if (resolvedId) {
                      router.push(`/challengeDetail/${resolvedId}`);
                      return;
                    }
                    toast({
                      title: "이동할 챌린지가 없습니다.",
                      description: "승인된 챌린지가 아직 생성되지 않았습니다.",
                    });
                  } catch (error) {
                    toast({
                      title: "이동 실패",
                      description: error.message || "챌린지를 불러오지 못했습니다.",
                    });
                  }
                  return;
                }
                router.push(`/challengeDetail/${linkedId}`);
              }}
              onEdit={() => handleEditChallenge(challenge.id)}
              onDelete={() => handleDeleteChallenge(challenge.id)}
            />
          );
        })}
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

      {isAdmin ? (
        <RejectModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSubmit={handleAdminDeleteSubmit}
          title="삭제 사유"
          placeholder="삭제 사유를 입력해주세요"
          submitLabel="전송"
        />
      ) : null}
    </div>
  );
}
