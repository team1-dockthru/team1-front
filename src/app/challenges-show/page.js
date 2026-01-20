'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container/Container';
import Gnb from '@/components/common/GNB/Gnb';
import PlusIcon from '@/assets/icons/ic-plus-s.svg';
import FilterActiveIcon from '@/assets/icons/ic-filter-active.svg';
import FilterInactiveIcon from '@/assets/icons/ic-filter-inactive.svg';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import Pagination from '@/components/common/PageButton/Pagination/Pagination';
import Sort from '@/components/common/Sort/Sort';
import Search from '@/components/common/Search/Search';
import FilterModal from '@/components/common/FilterModal/FilterModal';

const MOCK_CHALLENGES = [
  {
    id: 1,
    title: '개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)',
    tags: [
      { text: 'Career', variant: 'type-career' },
      { text: '블로그', variant: 'category-blog' },
    ],
    deadline: '2024년 2월 28일 마감',
    participants: '2/5 참여중',
  },
  {
    id: 2,
    title: 'TanStack Query - Optimistic Updates',
    tags: [
      { text: 'Modern JS', variant: 'type-modernjs' },
      { text: '공식문서', variant: 'category-doc' },
    ],
    deadline: '2024년 2월 28일 마감',
    participants: '2/5 참여중',
  },
  {
    id: 3,
    title: 'Web 개발자의 필수 요건',
    tags: [
      { text: 'Web', variant: 'type-web' },
      { text: '공식문서', variant: 'category-doc' },
    ],
    deadline: '2024년 2월 28일 마감',
    participants: '2/5 참여중',
  },
  {
    id: 4,
    statusText: '모집이 완료된 상태에요',
    title: 'Next.js - App Router: Routing Fundamentals',
    tags: [
      { text: 'Next.js', variant: 'type-nextjs' },
      { text: '공식문서', variant: 'category-doc' },
    ],
    deadline: '2024년 3월 3일 마감',
    participants: '5/5 참여 완료',
  },
  {
    id: 5,
    statusText: '챌린지가 마감되었어요',
    isClosed: true,
    title: 'Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)',
    tags: [
      { text: 'API', variant: 'type-api' },
      { text: '공식문서', variant: 'category-doc' },
    ],
    deadline: '2024년 2월 28일 마감',
    participants: '5/5 참여 완료',
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    content: "'신청한 챌린지 이름'/'챌린지 이름'에 도전한 작업물에/'챌린지 이름'의 작업물에 작성한 피드백이 수정/삭제되었어요",
    date: '2024.04.01',
  },
  {
    id: 2,
    content: "'신청한 챌린지 이름'이 승인/거절되었어요",
    date: '2024.04.01',
  },
];

export default function ChallengeListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    fields: [],
    docType: '',
    status: '',
  });

  const filterCount =
    appliedFilters.fields.length +
    (appliedFilters.docType ? 1 : 0) +
    (appliedFilters.status ? 1 : 0);

  const handleFilterApply = (filters) => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={MOCK_NOTIFICATIONS} />
      <Container className="py-10 md:py-[60px]">
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-6 md:mb-8">
          <div className="flex items-center justify-between">
            <h1 className="font-24-bold text-[var(--gray-900)]">챌린지 목록</h1>
            <Link
              href="/challenges-show"
              className="inline-flex h-10 items-center gap-1 rounded-full bg-[var(--gray-900)] px-4 py-2 font-14-semibold text-white hover:bg-[var(--gray-800)]"
            >
              <span className="leading-none">신규 챌린지 신청</span>
              <PlusIcon className="size-4 shrink-0" />
            </Link>
          </div>

          <div className="flex flex-row items-center gap-2 md:gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`inline-flex h-10 w-[84px] md:w-[112px] shrink-0 items-center justify-center gap-1 md:gap-2 rounded-[32px] border transition-colors ${
                  filterCount > 0 
                    ? 'bg-[var(--gray-900)] border-[var(--gray-900)] text-white' 
                    : 'bg-white border-[var(--gray-300)] text-[var(--gray-900)]'
                } font-14-medium`}
              >
                <span className="leading-none">필터{filterCount > 0 ? `(${filterCount})` : ''}</span>
                {filterCount > 0 ? (
                  <FilterActiveIcon className="size-4 md:size-5 shrink-0 text-white" />
                ) : (
                  <FilterInactiveIcon className="size-4 md:size-5 shrink-0 text-[var(--gray-500)]" />
                )}
              </button>

              <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={handleFilterApply}
                initialFilters={appliedFilters}
              />
            </div>

            <Search
              placeholder="챌린지 이름을 검색해보세요"
              className="w-[237px] md:w-full md:max-w-[800px]"
              onSearch={(query) => console.log('Search:', query)}
            />
          </div>
        </div>

        {/* Challenge List - Vertical Stack */}
        <div className="flex flex-col gap-6">
          {MOCK_CHALLENGES.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>

        {/* Pagination Section */}
        <div className="mt-10 md:mt-[60px] flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>
    </div>
  );
}
