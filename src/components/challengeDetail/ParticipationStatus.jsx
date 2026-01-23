// 참여 현황

'use client';

import { useState } from 'react';
import List from '@/components/common/List/List';
import ListItem from '@/components/common/List/ListItem';
import CrownIcon from '@/assets/icons/ic-crown-yellow.svg';
import ProfileIcon from '@/assets/icons/ic-profile-member.svg';
import HeartIcon from '@/assets/icons/ic-heart-active-s.svg';
import ArrowRightIcon from '@/assets/icons/ic-arrow-direction-active-right.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ParticipationStatus({ participants }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 빈 상태
  if (!participants || participants.length === 0) {
    return (
      <div className="rounded-xl border-2 border-[#262626] bg-white p-4 shadow-sm">
        <h3 className="font-18-bold mb-4 px-2">참여 현황</h3>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-base font-medium text-[#a3a3a3]">
            아직 참여자가 없습니다
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(participants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayParticipants = participants.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 5명 이하일 때는 페이지네이션 숨김
  const showPagination = participants.length > 5;

  // 최다 좋아요 수 계산 (공동 1위 처리)
  const maxLikes = participants.length > 0 
    ? Math.max(...participants.map(p => p.likeCount))
    : 0;

  return (
    <div className="rounded-xl border-2 border-[#262626] bg-white p-4 shadow-sm">
      {/* 제목 + 페이지네이션 */}
      <div className="mb-4 flex items-center justify-between px-2">
        <h3 className="font-18-bold">참여 현황</h3>
        {showPagination && (
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full bg-[#fafafa] py-1 pl-[18px] pr-4 text-sm font-medium">
              <span className="text-[var(--brand-yellow)]">{currentPage}</span>
              <span className="text-[#737373]">/{totalPages}</span>
            </div>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* 참여자 목록 */}
      <List>
        {displayParticipants.map((participant) => (
          <ListItem
            key={participant.userId}
            left={
              <div className="flex items-center gap-4">
                {/* 순위 뱃지 - 타원형 */}
                <div className="flex min-w-[60px] items-center justify-center gap-1 rounded-full bg-[var(--brand-black)] px-3 py-1 text-[var(--brand-yellow)]">
                  {/* 최다 좋아요 = 1위 (공동 1위 포함) */}
                  {participant.likeCount === maxLikes && <CrownIcon />}
                  <span className="font-14-bold">
                    {participant.rank < 10 ? `0${participant.rank}` : participant.rank}
                  </span>
                </div>
                {/* 프로필 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)]">
                  <ProfileIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            }
            title={participant.nickname}
            subtitle={participant.role || (participant.rank === 1 ? '전문가' : '일반')}
            meta={
              <>
                <HeartIcon />
                <span>{participant.likeCount.toLocaleString()}</span>
              </>
            }
            action={
              <div className="flex cursor-pointer items-center gap-1">
                <span>작업물 보기</span>
                <ArrowRightIcon className="h-5 w-5" />
              </div>
            }
            onClick={() => {
              console.log('작업물 보기:', participant.userId);
            }}
          />
        ))}
      </List>
    </div>
  );
}