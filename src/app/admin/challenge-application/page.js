'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Container from '@/components/common/Container/Container';
import Search from '@/components/common/Search/Search';
import Sort from '@/components/common/Sort/Sort';
import Pagination from '@/components/common/PageButton/Pagination/Pagination';
import { cn } from '@/lib/utils';
import adminChallengeData from '@/data/admin-challenge-application.json';
import { adminChallengesSchema } from '@/schemas/challengeSchemas';

const validatedData = adminChallengesSchema.parse(adminChallengeData);
const SORT_OPTIONS = validatedData.sortOptions;
const MOCK_DATA = validatedData.challenges;
  
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('승인 대기');
  const [currentPage, setCurrentPage] = useState(1);
  const [challenges] = useState(MOCK_DATA);

  const filteredChallenges = challenges.filter((challenge) => {
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

  const handleLogout = () => {
    console.log('로그아웃');
  };

  const handleApprovalPending = () => {
    setSortValue('승인 대기');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader
        isLoggedIn={true}
        user={{ name: '체다치즈', role: '어드민' }}
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
                {paginatedChallenges.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center font-14-regular text-[var(--gray-500)]">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  paginatedChallenges.map((challenge) => {
                    const statusStyles = getStatusStyles(challenge.status);
                    return (
                      <tr
                        key={challenge.id}
                        className="border-b border-[var(--gray-200)] bg-white hover:bg-[var(--gray-50)] transition-colors"
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

