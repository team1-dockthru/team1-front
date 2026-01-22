'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Container from '@/components/common/Container/Container';
import Search from '@/components/common/Search/Search';
import Sort from '@/components/common/Sort/Sort';
import Pagination from '@/components/common/PageButton/Pagination/Pagination';
import { cn } from '@/lib/utils';

const SORT_OPTIONS = [
  '승인 대기',
  '신청 승인',
  '신청 거절',
  '신청 시간 빠른순',
  '신청 시간 느린순',
  '마감 기한 빠른순',
  '마감 기한 느린순',
];

const MOCK_DATA = [
  {
    id: 1023,
    field: '공식문서',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    quota: 10,
    applicationDate: '24/01/16',
    deadline: '24/02/24',
    status: 'pending',
  },
  {
    id: 1022,
    field: '블로그',
    category: 'API',
    title: 'Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailyde...',
    quota: 5,
    applicationDate: '24/01/16',
    deadline: '24/02/23',
    status: 'pending',
  },
  {
    id: 1021,
    field: '공식문서',
    category: 'API',
    title: 'Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailyde...',
    quota: 10,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'pending',
  },
  {
    id: 1020,
    field: '블로그',
    category: 'Career',
    title: '개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)',
    quota: 5,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'pending',
  },
  {
    id: 1019,
    field: '공식문서',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    quota: 10,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'pending',
  },
  {
    id: 1018,
    field: '공식문서',
    category: 'API',
    title: 'Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailyde...',
    quota: 5,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'rejected',
  },
  {
    id: 1017,
    field: '공식문서',
    category: 'API',
    title: 'Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailyde...',
    quota: 10,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'approved',
  },
  {
    id: 1016,
    field: '블로그',
    category: 'Career',
    title: '개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)',
    quota: 5,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'approved',
  },
  {
    id: 1015,
    field: '블로그',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    quota: 10,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'approved',
  },
  {
    id: 1014,
    field: '블로그',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    quota: 10,
    applicationDate: '24/01/16',
    deadline: '24/02/22',
    status: 'deleted',
  },
  {
    id: 1013,
    field: '공식문서',
    category: 'React',
    title: 'React 19 새로운 기능들',
    quota: 8,
    applicationDate: '24/01/15',
    deadline: '24/02/21',
    status: 'pending',
  },
  {
    id: 1012,
    field: '블로그',
    category: 'TypeScript',
    title: 'TypeScript 5.0 업데이트 가이드',
    quota: 12,
    applicationDate: '24/01/15',
    deadline: '24/02/20',
    status: 'approved',
  },
  {
    id: 1011,
    field: '공식문서',
    category: 'Vue',
    title: 'Vue 3 Composition API 완벽 가이드',
    quota: 7,
    applicationDate: '24/01/14',
    deadline: '24/02/19',
    status: 'rejected',
  },
  {
    id: 1010,
    field: '블로그',
    category: 'Node.js',
    title: 'Node.js 성능 최적화 기법',
    quota: 15,
    applicationDate: '24/01/14',
    deadline: '24/02/18',
    status: 'pending',
  },
  {
    id: 1009,
    field: '공식문서',
    category: 'Python',
    title: 'Python 3.12 새로운 기능',
    quota: 9,
    applicationDate: '24/01/13',
    deadline: '24/02/17',
    status: 'approved',
  },
  {
    id: 1008,
    field: '블로그',
    category: 'Docker',
    title: 'Docker 컨테이너 관리 베스트 프랙티스',
    quota: 6,
    applicationDate: '24/01/13',
    deadline: '24/02/16',
    status: 'deleted',
  },
  {
    id: 1007,
    field: '공식문서',
    category: 'Kubernetes',
    title: 'Kubernetes 오케스트레이션 가이드',
    quota: 11,
    applicationDate: '24/01/12',
    deadline: '24/02/15',
    status: 'pending',
  },
  {
    id: 1006,
    field: '블로그',
    category: 'AWS',
    title: 'AWS 클라우드 아키텍처 설계',
    quota: 13,
    applicationDate: '24/01/12',
    deadline: '24/02/14',
    status: 'approved',
  },
  {
    id: 1005,
    field: '공식문서',
    category: 'GraphQL',
    title: 'GraphQL 쿼리 최적화',
    quota: 8,
    applicationDate: '24/01/11',
    deadline: '24/02/13',
    status: 'rejected',
  },
  {
    id: 1004,
    field: '블로그',
    category: 'MongoDB',
    title: 'MongoDB 데이터베이스 설계',
    quota: 10,
    applicationDate: '24/01/11',
    deadline: '24/02/12',
    status: 'pending',
  },
  {
    id: 1003,
    field: '공식문서',
    category: 'PostgreSQL',
    title: 'PostgreSQL 고급 쿼리 기법',
    quota: 7,
    applicationDate: '24/01/10',
    deadline: '24/02/11',
    status: 'approved',
  },
  {
    id: 1002,
    field: '블로그',
    category: 'Redis',
    title: 'Redis 캐싱 전략',
    quota: 9,
    applicationDate: '24/01/10',
    deadline: '24/02/10',
    status: 'deleted',
  },
  {
    id: 1001,
    field: '공식문서',
    category: 'Elasticsearch',
    title: 'Elasticsearch 검색 엔진 튜닝',
    quota: 12,
    applicationDate: '24/01/09',
    deadline: '24/02/09',
    status: 'pending',
  },
];

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

