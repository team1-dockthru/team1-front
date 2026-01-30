'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import Container from '@/components/common/Container/Container';
import Search from '@/components/common/Search/Search';
import Sort from '@/components/common/Sort/Sort';
import Pagination from '@/components/common/PageButton/Pagination/Pagination';
import { cn } from '@/lib/utils';
import { getCurrentUser, logout } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
const SORT_OPTIONS = [
  '전체',
  '승인 대기',
  '신청 승인',
  '신청 거절',
  '신청 시간 빠른순',
  '신청 시간 느린순',
  '마감 기한 빠른순',
  '마감 기한 느린순',
];
import { getChallengeRequests } from '@/services/challenge';

function getStatusText(status) {
  switch (status) {
    case 'pending':
      return '승인 대기';
    case 'approved':
      return '신청 승인';
    case 'rejected':
      return '신청 거절';
    case 'deleted':
      return '챌린지 삭제';
    default:
      return '';
  }
}

function getStatusStyles(status) {
  switch (status) {
    case 'pending':
      return {
        bg: 'bg-[rgba(255,253,231,1)]',
        text: 'text-[rgba(242,188,0,1)]',
      };
    case 'approved':
      return {
        bg: 'bg-[rgba(223,240,255,1)]',
        text: 'text-[rgba(64,149,222,1)]',
      };
    case 'rejected':
      return {
        bg: 'bg-[rgba(255,240,240,1)]',
        text: 'text-[rgba(229,73,70,1)]',
      };
    case 'deleted':
      return {
        bg: 'bg-[rgba(229,229,229,1)]',
        text: 'text-[rgba(115,115,115,1)]',
      };
    default:
      return {
        bg: '',
        text: '',
      };
  }
}

export default function ChallengeApplicationPage() {
  const router = useRouter();
  const clearToken = useAuthStore((state) => state.clearToken);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    let isActive = true;
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (!isActive) return;
        setCurrentUser(response?.user || null);
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

  useEffect(() => {
    let isActive = true;
    const fetchRequests = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const data = await getChallengeRequests();
        if (!isActive) return;
        const mapped = (data || []).map((item) => ({
          id: item.id,
          field: item.field,
          category: item.docType,
          title: item.title,
          quota: item.maxParticipants,
          applicationDate: item.createdAt ? item.createdAt.slice(2, 10).replace(/-/g, '/') : '',
          deadline: item.deadlineAt ? item.deadlineAt.slice(2, 10).replace(/-/g, '/') : '',
          status:
            item.requestStatus === 'PENDING'
              ? 'pending'
              : item.requestStatus === 'REJECTED'
                ? 'rejected'
                : item.requestStatus === 'CANCELLED'
                  ? 'deleted'
                  : item.requestStatus === 'APPROVED'
                    ? 'approved'
                    : 'pending',
        }));
        setChallenges(mapped);
      } catch (error) {
        if (!isActive) return;
        setLoadError(error.message || '목록을 불러오지 못했습니다.');
        setChallenges([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };
    fetchRequests();
    return () => {
      isActive = false;
    };
  }, []);

  const filteredChallenges = challenges.filter((challenge) => {
    if (sortValue === '전체') {
      return true;
    }
    if (sortValue === '승인 대기') {
      return challenge.status === 'pending';
    }
    if (sortValue === '신청 승인') {
      return challenge.status === 'approved';
    }
    if (sortValue === '신청 거절') {
      return challenge.status === 'rejected';
    }
    return true;
  });

  const searchedChallenges = filteredChallenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(searchedChallenges.length / 11);
  const startIndex = (currentPage - 1) * 11;
  const paginatedChallenges = searchedChallenges.slice(startIndex, startIndex + 11);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      const message = error?.message || '';
      if (message && !message.includes('토큰이 만료')) {
        alert(message || '로그아웃에 실패했습니다.');
      }
    }
    clearToken();
    window.location.href = '/';
  };

  const handleApprovalPending = () => {
    setSortValue('승인 대기');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader
        isLoggedIn={true}
        user={{
          name: currentUser?.nickname || currentUser?.name || '관리자',
          role: '관리자',
        }}
        onLogout={handleLogout}
        onApprovalPending={handleApprovalPending}
      />
      
      <main className="py-8 md:py-12">
        <Container>
          <div className="mb-8">
            <h1 className="font-24-semibold text-[var(--gray-900)] mb-6">
              챌린지 신청 관리
            </h1>
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <Search
                  placeholder="챌린지 이름을 검색해보세요"
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end md:ml-4">
                <Sort
                  options={SORT_OPTIONS}
                  value={sortValue}
                  onChange={handleSortChange}
                  active={false}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[var(--gray-200)] bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-50)]">
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    No.
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    분야
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    카테고리
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)]">
                    챌린지 제목
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    모집 인원
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    신청일
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    마감 기한
                  </th>
                  <th className="px-4 py-3 text-left font-14-semibold !text-[var(--gray-900)] whitespace-nowrap">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center font-14-regular text-[var(--gray-500)]">
                      데이터를 불러오는 중입니다.
                    </td>
                  </tr>
                ) : loadError ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center font-14-regular text-[var(--error)]">
                      {loadError}
                    </td>
                  </tr>
                ) : paginatedChallenges.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center font-14-regular text-[var(--gray-500)]">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  paginatedChallenges.map((challenge) => {
                    const statusStyles = getStatusStyles(challenge.status);
                    const statusRouteMap = {
                      pending: 'pending',
                      approved: 'approved',
                      rejected: 'rejected',
                      deleted: 'deleted',
                    };
                    return (
                      <tr
                        key={challenge.id}
                        className="border-b border-[var(--gray-200)] bg-white hover:bg-[var(--gray-50)] transition-colors cursor-pointer"
                        onClick={() => {
                          const mappedStatus = statusRouteMap[challenge.status] || 'pending';
                          router.push(`/challenges-status/${mappedStatus}/${challenge.id}`);
                        }}
                      >
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-900)]">
                          {challenge.id}
                        </td>
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-700)]">
                          {challenge.field}
                        </td>
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-700)]">
                          {challenge.category}
                        </td>
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-900)]">
                          <div className="truncate max-w-[300px]" title={challenge.title}>
                            {challenge.title}
                          </div>
                        </td>
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-700)]">
                          {challenge.quota}
                        </td>
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-700)]">
                          {challenge.applicationDate}
                        </td>
                        <td className="px-4 py-4 font-14-regular text-[var(--gray-700)]">
                          {challenge.deadline}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={cn(
                              'inline-block px-3 py-1 rounded-full font-14-regular',
                              statusStyles.bg,
                              statusStyles.text
                            )}
                          >
                            {getStatusText(challenge.status)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {paginatedChallenges.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}

