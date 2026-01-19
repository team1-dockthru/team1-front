// 제목, 태그, 작성자, 좋아요, 수정,삭제

import { useState } from 'react';
import HeartInactive from '@/assets/icons/ic-heart-inactive-s.svg';
import HeartActive from '@/assets/icons/ic-heart-active-s.svg'
import ProfileMember from '@/assets/icons/ic-profile-member.svg';
import WorkActions from './WorkActions';
import Chip from '@/components/common/Chip/Chip';

export default function WorkHeader({
  title,
  type,
  category,
  author,
  likes,
  createdAt,
  isMine,
  onLikeToggle,
  onEdit,
  onDelete,
}) {
  const [isLiking, setIsLiking] = useState(false);

  // type을 variant로 매핑
  const getTypeVariant = (type) => {
    const typeMap = {
      'Next.js': 'type-nextjs',
      'API': 'type-api',
      'Career': 'type-career',
      'ModernJS': 'type-modernjs',
      'Web': 'type-web',
    };
    return typeMap[type] || 'type-nextjs';
  };

  // category를 variant로 매핑
  const getCategoryVariant = (category) => {
    const categoryMap = {
      '공식문서': 'category-doc',
      '블로그': 'category-blog',
    };
    return categoryMap[category] || 'category-doc';
  };

  // 좋아요 토글 핸들러 (중복 클릭 방지)
  const handleLikeToggle = async () => {
    if (isLiking) return;
    setIsLiking(true);
    await onLikeToggle();
    setIsLiking(false);
  };

  return (
    <header className="pt-10">
      {/* 제목 */}
      <h1 className="mb-4 text-2xl font-semibold leading-[29px] text-[#262626]">
        {title}
      </h1>

      {/* 태그 */}
      <div className="mb-4 flex items-center gap-2">
        <Chip variant={getTypeVariant(type)}>{type}</Chip>
        <Chip variant={getCategoryVariant(category)}>{category}</Chip>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-[#e5e5e5]" />

      {/* 작성자 정보 */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3 flex-nowrap">
          {/* 프로필 이미지 */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <ProfileMember />
          </div>

          {/* 유저명 */}
          <span className="shrink-0 text-xs font-medium text-[#262626]">
            {author.nickname}
          </span>

          {/* 좋아요 버튼 */}
          <div className="inline-flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={handleLikeToggle}
              disabled={isLiking}
              className="flex hover:opacity-80 disabled:opacity-50 transition-opacity"
            >
              {likes.isLiked ? <HeartActive /> : <HeartInactive />}
            </button>
            <span className="text-sm font-medium text-[#262626]">
              {likes.count.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 작성일자 + 수정/삭제 메뉴 */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#262626]">
            {createdAt}
          </span>

          {/* 내 작업물인 경우만 수정/삭제 메뉴 표시 */}
          {isMine && <WorkActions onEdit={onEdit} onDelete={onDelete} />}
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-[#e5e5e5]" />
    </header>
  );
}