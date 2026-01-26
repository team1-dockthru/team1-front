'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container/Container';
import Gnb from '@/components/common/GNB/Gnb';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import Pagination from '@/components/common/PageButton/Pagination/Pagination';
import Sort from '@/components/common/Sort/Sort';
import Search from '@/components/common/Search/Search';
import FilterModal from '@/components/common/FilterModal/FilterModal';
import challengesShowData from '@/data/challenges-show.json';
import notificationsData from '@/data/notifications.json';
import { challengesShowSchema, notificationsSchema } from '@/schemas/challengeSchemas';

export default function ChallengeListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    fields: [],
    docType: '',
    status: '',
  });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const MOCK_CHALLENGES = useMemo(() => {
    try {
      return challengesShowSchema.parse(challengesShowData);
    } catch {
      return challengesShowData;
    }
  }, []);

  const validatedNotifications = useMemo(() => {
    try {
      return notificationsSchema.parse(notificationsData);
    } catch {
      return notificationsData;
    }
  }, []);

  const filterCount =
    appliedFilters.fields.length +
    (appliedFilters.docType ? 1 : 0) +
    (appliedFilters.status ? 1 : 0);

  const handleFilterApply = (filters) => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  if (!mounted) {
    return null;
  }

  const PlusIcon = require('@/assets/icons/ic-plus-s.svg').default;
  const FilterActiveIcon = require('@/assets/icons/ic-filter-active.svg').default;
  const FilterInactiveIcon = require('@/assets/icons/ic-filter-inactive.svg').default;

  const filteredChallenges = useMemo(() => {
    const docTypeMap = {
      공식문서: 'category-doc',
      블로그: 'category-blog',
    };

    return MOCK_CHALLENGES.filter((challenge) => {
      const hasFieldFilter = appliedFilters.fields.length > 0;
      const hasDocTypeFilter = Boolean(appliedFilters.docType);
      const hasStatusFilter = Boolean(appliedFilters.status);
      const normalizedQuery = searchQuery.trim().toLowerCase();

      const matchesField = hasFieldFilter
        ? challenge.tags.some((tag) => appliedFilters.fields.includes(tag.text))
        : true;

      const matchesDocType = hasDocTypeFilter
        ? challenge.tags.some((tag) => tag.variant === docTypeMap[appliedFilters.docType])
        : true;

      const matchesStatus = hasStatusFilter
        ? appliedFilters.status === '마감'
          ? Boolean(challenge.isClosed)
          : !challenge.isClosed
        : true;

      const matchesSearch = normalizedQuery
        ? challenge.title.toLowerCase().includes(normalizedQuery)
        : true;

      return matchesField && matchesDocType && matchesStatus && matchesSearch;
    });
  }, [appliedFilters, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb notifications={validatedNotifications} />
      <Container className="py-10 md:py-[60px]">
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-6 md:mb-8">
          <div className="flex items-center justify-between">
            <h1 className="font-24-bold text-[var(--gray-900)]">챌린지 목록</h1>
            <Link
              href="/challenges-new"
              className="inline-flex h-10 items-center gap-1 rounded-full bg-[var(--gray-900)] px-4 py-2 font-14-semibold text-white hover:bg-[var(--gray-800)]"
            >
              <span className="leading-none">신규 챌린지 신청</span>
              <PlusIcon className="size-4 shrink-0" />
            </Link>
          </div>

          {filteredChallenges.length > 0 ? (
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
                onSearch={setSearchQuery}
              />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2 md:gap-4">
              <Search
                placeholder="챌린지 이름을 검색해보세요"
                className="w-[237px] md:w-full md:max-w-[800px]"
                onSearch={setSearchQuery}
              />
              <Link
                href="/challenges-new"
                className="inline-flex h-10 items-center gap-1 rounded-full bg-[var(--gray-900)] px-4 py-2 font-14-semibold text-white hover:bg-[var(--gray-800)]"
              >
                <span className="leading-none">신규 챌린지 신청</span>
                <PlusIcon className="size-4 shrink-0" />
              </Link>
            </div>
          )}
        </div>

        {/* Challenge List - Vertical Stack */}
        {filteredChallenges.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center text-center">
            <div className="flex flex-col gap-2 text-[var(--gray-600)]">
              <p className="font-16-semibold text-[var(--gray-800)]">아직 챌린지가 없어요,</p>
              <p className="font-14-regular">지금 바로 챌린지를 신청해보세요!</p>
            </div>
          </div>
        )}

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
