// 챌린지 제목 + 수정/삭제 메뉴

import WorkActions from '@/components/workDetail/WorkActions';

export default function ChallengeHeader({ title, isMine, onEdit, onDelete }) {
  return (
    <div className="mb-4 flex items-start justify-between">
      {/* 제목 */}
      <h1 className="flex-1 text-2xl font-semibold leading-[29px] text-[#262626]">
        {title}
      </h1>

      {/* 수정/삭제 메뉴 (내 챌린지인 경우만) */}
      {isMine && (
        <WorkActions onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
}