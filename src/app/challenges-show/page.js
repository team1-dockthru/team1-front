'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from '@/components/common/Container/Container';
import Gnb from '@/components/common/GNB/Gnb';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import Pagination from '@/components/common/PageButton/Pagination/Pagination';
import Search from '@/components/common/Search/Search';
import FilterModal from '@/components/common/FilterModal/FilterModal';
import notificationsData from '@/data/notifications.json';
import { notificationsSchema } from '@/schemas/challengeSchemas';
import PlusIcon from '@/assets/icons/ic-plus-s.svg';
import FilterActiveIcon from '@/assets/icons/ic-filter-active.svg';
import FilterInactiveIcon from '@/assets/icons/ic-filter-inactive.svg';
import { getCurrentUser } from '@/services/user';
import { deleteChallenge, deleteChallengeAsAdmin, getChallenges } from '@/services/challenge';
import { toast } from '@/hooks/use-toast';
import RejectModal from '@/components/common/RejectModal/RejectModal';

export default function ChallengeListPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    fields: [],
    docType: '',
    status: '',
  });

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
        const userData = await getCurrentUser();
        if (!isActive) return;
        setCurrentUser(userData?.user || null);
      } catch {
        if (!isActive) return;
        setCurrentUser(null);
      }
    };
    fetchUser();
    return () => {
      isActive = false;
    };
  }, []);

  const isAdmin =
    String(currentUser?.role || '').toLowerCase() === 'admin' ||
    currentUser?.role === 'ADMIN';

  const handleEditChallenge = (challengeId) => {
    if (!challengeId) return;
    router.push(`/challenges-new?mode=edit&id=${challengeId}`);
  };

  const handleDeleteChallenge = async (challengeId, reason) => {
    if (!challengeId) return;
    try {
      if (isAdmin) {
        const trimmedReason = typeof reason === 'string' ? reason.trim() : '';
        if (!trimmedReason) {
          toast({
            title: '삭제 실패',
            description: '삭제 사유를 입력해주세요.',
          });
          return;
        }
        await deleteChallengeAsAdmin(challengeId, reason);
      } else {
        const confirmed = window.confirm('해당 챌린지를 삭제할까요?');
        if (!confirmed) return;
        await deleteChallenge(challengeId);
      }
      setChallenges((prev) => prev.filter((challenge) => challenge.id !== challengeId));
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      toast({
        title: '삭제 완료',
        description: '챌린지가 삭제되었습니다.',
      });
    } catch (error) {
      toast({
        title: '삭제 실패',
        description: error.message || '삭제에 실패했습니다.',
      });
    }
  };

  const openDeleteModal = (challengeId) => {
    if (!challengeId) return;
    if (!isAdmin) {
      handleDeleteChallenge(challengeId);
      return;
    }
    setDeleteTargetId(challengeId);
    setIsDeleteModalOpen(true);
  };

  const mapFieldVariant = (field) => {
    const map = {
      프론트엔드: 'type-web',
      백엔드: 'type-api',
      커리어: 'type-career',
      'Next.js': 'type-nextjs',
      API: 'type-api',
      Career: 'type-career',
      'Modern.js': 'type-modernjs',
      'Modern JS': 'type-modernjs',
      Web: 'type-web',
    };
    return map[field] || 'type-web';
  };

  const mapDocTypeLabel = (docType) => {
    const map = {
      OFFICIAL_DOCUMENT: '공식문서',
      BLOG: '블로그',
    };
    return map[docType] || docType || '';
  };

  const mapDocTypeVariant = (docType) => {
    const map = {
      OFFICIAL_DOCUMENT: 'category-doc',
      BLOG: 'category-blog',
    };
    return map[docType] || 'category-doc';
  };

  const formatDeadline = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일 마감`;
  };

  const mapChallengeToCard = (challenge) => {
    const participantCount = challenge?._count?.participants || 0;
    const maxParticipants = challenge?.maxParticipants || 0;
    const isFull = maxParticipants > 0 && participantCount >= maxParticipants;
    const isClosed = String(challenge?.challengeStatus || '').toUpperCase() === 'CLOSED';
    const statusText = isClosed
      ? '챌린지가 마감되었어요'
      : isFull
        ? '모집이 완료된 상태에요'
        : '';

    return {
      id: challenge.id,
      title: challenge.title,
      tags: [
        {
          text: challenge.field,
          variant: mapFieldVariant(challenge.field),
        },
        {
          text: mapDocTypeLabel(challenge.docType),
          variant: mapDocTypeVariant(challenge.docType),
        },
      ],
      deadline: formatDeadline(challenge.deadlineAt),
      participants: `${participantCount}/${maxParticipants} ${isFull ? '참여 완료' : '참여중'}`,
      statusText: statusText || undefined,
      isClosed,
    };
  };

  useEffect(() => {
    let isActive = true;
    const fetchChallenges = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const data = await getChallenges();
        if (!isActive) return;
        const mapped = Array.isArray(data) ? data.map(mapChallengeToCard) : [];
        setChallenges(mapped);
      } catch (error) {
        if (!isActive) return;
        setLoadError(error.message || '챌린지 목록을 불러오지 못했습니다.');
        setChallenges([]);
        toast({
          title: '목록 불러오기 실패',
          description: error.message || '챌린지 목록을 불러오지 못했습니다.',
        });
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchChallenges();
    return () => {
      isActive = false;
    };
  }, []);

  const filterCount =
    appliedFilters.fields.length +
    (appliedFilters.docType ? 1 : 0) +
    (appliedFilters.status ? 1 : 0);

  const handleFilterApply = (filters) => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const filteredChallenges = useMemo(() => {
    const docTypeMap = {
      공식문서: 'category-doc',
      블로그: 'category-blog',
    };

    return challenges.filter((challenge) => {
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
  }, [appliedFilters, searchQuery, challenges]);

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Gnb
        notifications={validatedNotifications}
        isLoggedIn={Boolean(currentUser)}
        role={isAdmin ? 'admin' : 'member'}
        useUserDropdown
        user={
          currentUser
            ? {
                name: currentUser.nickname || currentUser.name || '사용자',
                role: isAdmin ? '관리자' : '일반',
              }
            : { name: '사용자', role: '일반' }
        }
      />
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
        {isLoading ? (
          <div className="flex min-h-[420px] items-center justify-center text-center">
            <p className="font-16-regular text-[var(--gray-500)]">데이터를 불러오는 중이에요.</p>
          </div>
        ) : loadError ? (
          <div className="flex min-h-[420px] items-center justify-center text-center">
            <div className="flex flex-col gap-2 text-[var(--gray-600)]">
              <p className="font-16-semibold text-[var(--gray-800)]">챌린지 목록을 불러오지 못했어요.</p>
              <p className="font-14-regular">{loadError}</p>
            </div>
          </div>
        ) : filteredChallenges.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                isAdmin={isAdmin}
                onEdit={() => handleEditChallenge(challenge.id)}
                onDelete={() => openDeleteModal(challenge.id)}
              />
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

      <RejectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={(reason) => handleDeleteChallenge(deleteTargetId, reason)}
        title="삭제 사유"
        placeholder="삭제 사유를 입력해주세요"
        submitLabel="전송"
      />
    </div>
  );
}
