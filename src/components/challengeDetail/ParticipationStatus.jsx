// 참여 현황

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyWork } from '@/services/challenge';
import List from '@/components/common/List/List';
import ListItem from '@/components/common/List/ListItem';
import CrownIcon from '@/assets/icons/ic-crown-yellow.svg';
import ProfileIcon from '@/assets/icons/ic-profile-member.svg';
import HeartIcon from '@/assets/icons/ic-heart-active-s.svg';
import ArrowRightIcon from '@/assets/icons/ic-arrow-direction-active-right.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ParticipationStatus({ participants, challengeId, authorUserId }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 모든 참여자 표시 (작성자 포함)
  const filteredParticipants = participants || [];

  // 빈 상태
  if (!filteredParticipants || filteredParticipants.length === 0) {
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

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 5명 이하일 때는 페이지네이션 숨김
  const showPagination = filteredParticipants.length > 5;

  // 최다 좋아요 수 계산 (공동 1위 처리)
  const maxLikes = filteredParticipants.length > 0 
    ? Math.max(...filteredParticipants.map(p => p.likeCount))
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
        {displayParticipants.map((participant, index) => {
          const rank = participant.rank || (startIndex + index + 1);
          const likeCount = participant.likeCount || 0;
          const isTopLiker = maxLikes > 0 && likeCount === maxLikes;
          
          return (
            <ListItem
              key={participant.userId || participant.participantId || index}
              left={
                <div className="flex items-center gap-4">
                  {/* 순위 뱃지 - 타원형 */}
                  <div className="flex min-w-[60px] items-center justify-center gap-1 rounded-full bg-[var(--brand-black)] px-3 py-1 text-[var(--brand-yellow)]">
                    {/* 최다 좋아요 = 1위 (공동 1위 포함) */}
                    {isTopLiker && <CrownIcon />}
                    <span className="font-14-bold">
                      {rank < 10 ? `0${rank}` : rank}
                    </span>
                  </div>
                  {/* 프로필 */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)]">
                    <ProfileIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              }
              title={participant.nickname || '참여자'}
              subtitle={participant.role || '일반'}
              meta={
                <>
                  <HeartIcon />
                  <span>{likeCount.toLocaleString()}</span>
                </>
              }
              action={
                <div className="flex cursor-pointer items-center gap-1">
                  <span>작업물 보기</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </div>
              }
              onClick={async () => {
                try {
                  // participant.userId가 문자열일 수 있으므로 숫자로 변환
                  const userId = typeof participant.userId === 'string' 
                    ? parseInt(participant.userId, 10) 
                    : participant.userId;
                  
                  // challengeId도 숫자로 변환
                  const numChallengeId = typeof challengeId === 'string' 
                    ? parseInt(challengeId, 10) 
                    : challengeId;
                  
                  // 해당 유저의 Work 조회
                  const work = await getMyWork(numChallengeId, userId);
                  if (work && work.id) {
                    // workDetail 페이지로 이동
                    router.push(`/workDetail/${work.id}`);
                  } else {
                    alert('작업물을 찾을 수 없습니다.');
                  }
                } catch (err) {
                  console.error('작업물 조회 실패:', err);
                  alert('작업물을 찾을 수 없습니다.');
                }
              }}
            />
          );
        })}
      </List>
    </div>
  );
}