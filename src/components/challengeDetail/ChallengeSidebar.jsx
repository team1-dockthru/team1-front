// 우측 고정 영역
// 마감일자, 참여인원, 원문보기, 작업도전하기/도전계속하기

import Link from 'next/link';

export default function ChallengeSidebar({
  deadline,
  participantCount,
  originalWorkId,
  isParticipating,
  status,
  onJoinChallenge,
}) {
  const isDisabled = status === 'recruitClosed';
  const buttonText = isParticipating ? '도전 계속하기' : '작업 도전하기';

  return (
    <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
      {/* 마감일자 */}
      <div className="mb-4">
        <p className="mb-1 text-xs font-medium text-[#a3a3a3]">마감일</p>
        <p className="text-sm font-semibold text-[#262626]">{deadline}</p>
      </div>

      {/* 참여인원 */}
      <div className="mb-6">
        <p className="mb-1 text-xs font-medium text-[#a3a3a3]">참여인원</p>
        <p className="text-sm font-semibold text-[#262626]">
          {participantCount}명
        </p>
      </div>

      {/* 원문보기 버튼 */}
      <Link
        href={`/works/${originalWorkId}`}
        className="mb-2 flex h-10 w-full items-center justify-center rounded-lg border border-[#262626] bg-white text-sm font-semibold text-[#262626] hover:bg-[#f5f5f5]"
      >
        원문 보기
      </Link>

      {/* 작업 도전하기 / 도전 계속하기 버튼 */}
      <button
        onClick={onJoinChallenge}
        disabled={isDisabled}
        className={`flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold ${
          isDisabled
            ? 'cursor-not-allowed bg-[#d4d4d4] text-[#a3a3a3]'
            : 'bg-[#262626] text-white hover:bg-[#404040]'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}