// 참여 현황
// 5명 이하: 전체 표시
// 5명 초과: 더보기 버튼
// 0명: 빈 상태

'use client';

import { useState } from 'react';
import ProfileMember from '@/assets/icons/ic-profile-member.svg';
import HeartActive from '@/assets/icons/ic-heart-active-s.svg';

export default function ParticipationStatus({ participants }) {
  const [showAll, setShowAll] = useState(false);

  // 빈 상태
  if (!participants || participants.length === 0) {
    return (
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-8">
        <h2 className="mb-6 text-xl font-semibold text-[#262626]">참여 현황</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-base font-medium text-[#a3a3a3]">
            아직 참여자가 없습니다
          </p>
        </div>
      </div>
    );
  }

  const displayParticipants = showAll ? participants : participants.slice(0, 5);
  const hasMore = participants.length > 5;

  return (
    <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
      {/* 제목 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#262626]">참여 현황</h2>
        <span className="text-sm font-medium text-[#737373]">
          {participants.length}명
        </span>
      </div>

      {/* 참여자 목록 */}
      <div className="space-y-3">
        {displayParticipants.map((participant, index) => (
          <div
            key={participant.userId}
            className="flex items-center justify-between rounded-lg bg-[#fafafa] p-4"
          >
            {/* 왼쪽: 순위 + 프로필 + 닉네임 */}
            <div className="flex items-center gap-3">
              {/* 순위 */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#262626]">
                <span className="text-sm font-bold text-white">
                  {participant.rank}
                </span>
              </div>

              {/* 프로필 */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <ProfileMember className="h-full w-full object-contain" />
              </div>

              {/* 닉네임 */}
              <span className="text-sm font-medium text-[#262626]">
                {participant.nickname}
              </span>
            </div>

            {/* 오른쪽: 좋아요 수 */}
            <div className="flex items-center gap-1">
              <HeartActive className="h-5 w-5" />
              <span className="text-sm font-medium text-[#262626]">
                {participant.likeCount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기/접기 버튼 (5명 초과일 경우만) */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full rounded-lg border border-[#e5e5e5] py-3 text-sm font-semibold text-[#737373] hover:bg-[#f5f5f5]"
        >
          {showAll ? '접기 ↑' : `더보기 (${participants.length - 5}명) ↓`}
        </button>
      )}
    </div>
  );
}