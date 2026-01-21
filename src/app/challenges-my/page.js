"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container/Container";
import Gnb from "@/components/common/GNB/Gnb";
import Tab from "@/components/common/Tab/Tab";
import Search from "@/components/common/Search/Search";
import Sort from "@/components/common/Sort/Sort";
import ChallengeCard from "@/components/challenge/ChallengeCard";
import Pagination from "@/components/common/PageButton/Pagination/Pagination";
import PlusIcon from "@/assets/icons/ic-plus-s.svg";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    content:
      "'신청한 챌린지 이름'/'챌린지 이름'에 도전한 작업물에/'챌린지 이름'의 작업물에 작성한 피드백이 수정/삭제되었어요",
    date: "2024.04.01",
  },
  {
    id: 2,
    content: "'신청한 챌린지 이름'이 승인/거절되었어요",
    date: "2024.04.01",
  },
];

const TAB_ITEMS = [
  { key: "participating", label: "참여중인 챌린지" },
  { key: "completed", label: "완료한 챌린지" },
  { key: "applied", label: "신청한 챌린지" },
];

const MOCK_MY_CHALLENGES = [
  {
    id: 1,
    tab: "participating",
    statusText: "모집이 완료된 상태에요",
    title: "Next.js - App Router: Routing Fundamentals",
    tags: [
      { text: "Next.js", variant: "type-nextjs" },
      { text: "공식문서", variant: "category-doc" },
    ],
    deadline: "2024년 3월 3일 마감",
    participants: "5/5 참여 완료",
  },
  {
    id: 2,
    tab: "participating",
    title: "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)",
    tags: [
      { text: "Career", variant: "type-career" },
      { text: "블로그", variant: "category-blog" },
    ],
    deadline: "2024년 2월 28일 마감",
    participants: "2/5 참여중",
  },
  {
    id: 3,
    tab: "completed",
    statusText: "챌린지가 마감되었어요",
    isClosed: true,
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    tags: [
      { text: "API", variant: "type-api" },
      { text: "공식문서", variant: "category-doc" },
    ],
    deadline: "2024년 2월 28일 마감",
    participants: "5/5 참여 완료",
  },
];

const MOCK_COMPLETED_LIST = [
  {
    id: 1023,
    docType: "공식문서",
    category: "Next.js",
    title: "Next.js - App Router: Routing Fundamentals",
    capacity: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/24",
    status: "승인 대기",
  },
  {
    id: 1022,
    docType: "블로그",
    category: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    capacity: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/23",
    status: "승인 대기",
  },
  {
    id: 1021,
    docType: "공식문서",
    category: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    capacity: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "승인 대기",
  },
  {
    id: 1020,
    docType: "블로그",
    category: "Career",
    title: "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)",
    capacity: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "신청 거절",
  },
  {
    id: 1019,
    docType: "공식문서",
    category: "Next.js",
    title: "Next.js - App Router: Routing Fundamentals",
    capacity: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "신청 승인",
  },
  {
    id: 1018,
    docType: "공식문서",
    category: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    capacity: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "신청 거절",
  },
  {
    id: 1017,
    docType: "공식문서",
    category: "API",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    capacity: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "신청 승인",
  },
  {
    id: 1016,
    docType: "블로그",
    category: "Career",
    title: "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)",
    capacity: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "신청 승인",
  },
];

const STATUS_CLASS_NAME = {
  "승인 대기": "bg-[#fffde7] text-[#f0b400]",
  "신청 거절": "bg-[#fff0f0] text-[var(--error)]",
  "신청 승인": "bg-[#dff0ff] text-[#2f80ed]",
};

export default function MyChallengesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("participating");
  const [searchQuery, setSearchQuery] = useState("");
  const [applyStatus, setApplyStatus] = useState("");
  const [appliedPage, setAppliedPage] = useState(1);

  const filteredChallenges = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return MOCK_MY_CHALLENGES.filter((challenge) => {
      const matchesTab = challenge.tab === activeTab;
      const matchesSearch = normalizedQuery
        ? challenge.title.toLowerCase().includes(normalizedQuery)
        : true;
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const appliedRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return MOCK_COMPLETED_LIST.filter((item) => {
      const matchesSearch = normalizedQuery
        ? item.title.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesStatus = applyStatus ? item.status === applyStatus : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, applyStatus]);

  const appliedPageSize = 10;
  const appliedTotalPages = Math.max(1, Math.ceil(appliedRows.length / appliedPageSize));
  const appliedVisibleRows = useMemo(() => {
    const start = (appliedPage - 1) * appliedPageSize;
    return appliedRows.slice(start, start + appliedPageSize);
  }, [appliedPage, appliedRows]);

  const handleAppliedRowClick = (status) => {
    if (status === "신청 거절") {
      router.push("/challenges-reject");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb
        notifications={MOCK_NOTIFICATIONS}
        useUserDropdown
        userDropdownProps={{
          user: { name: "체다치즈", role: "일반" },
          onMyChallenge: () => router.push("/challenges-my"),
          onLogout: () => console.log("logout"),
        }}
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
              className="w-[237px] md:w-full md:max-w-[800px]"
              onSearch={setSearchQuery}
            />
          ) : null}
        </div>

        {activeTab === "applied" ? (
          <div className="flex flex-col gap-5 md:gap-2">
            <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:gap-3">
              <Search
                placeholder="챌린지 이름을 검색해보세요"
                className="w-full md:flex-1 md:min-w-0"
                onSearch={setSearchQuery}
              />
              <Sort
                options={["승인 대기", "승인", "거절"]}
                value={applyStatus}
                onChange={setApplyStatus}
                placeholder="승인 대기"
                className="md:min-w-0"
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
                      item.status === "신청 거절" ? "cursor-pointer hover:bg-[var(--gray-50)]" : ""
                    }`}
                    onClick={() => handleAppliedRowClick(item.status)}
                  >
                      <span className="font-14-regular text-center text-[var(--gray-600)]">
                        {item.id}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.docType}
                      </span>
                      <span className="font-14-regular text-center text-[var(--gray-700)]">
                        {item.category}
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
