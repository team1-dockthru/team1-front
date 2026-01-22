// 챌린지 정보 (태그 + 소개글 + 작성자)

import Chip from '@/components/common/Chip/Chip';
import ProfileMember from '@/assets/icons/ic-profile-member.svg';

export default function ChallengeInfo({ type, category, description, author }) {
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

  return (
    <div className="mb-6">
      {/* 태그 */}
      <div className="mb-4 flex items-center gap-2">
        <Chip variant={getTypeVariant(type)}>{type}</Chip>
        <Chip variant={getCategoryVariant(category)}>{category}</Chip>
      </div>

      {/* 소개글 */}
      <p className="mb-4 whitespace-pre-wrap text-base font-normal leading-relaxed text-[#404040]">
        {description}
      </p>

      {/* 작성자 */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <ProfileMember className="h-full w-full object-contain" />
        </div>
        <span className="text-sm font-medium text-[#737373]">
          {author.nickname}
        </span>
      </div>
    </div>
  );
}