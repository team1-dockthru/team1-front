'use client';

import { cn } from '@/lib/utils';
import Chip from '@/components/common/Chip/Chip';
import PeopleIcon from '@/assets/icons/ic-person-default.svg';
import ClockIconS from '@/assets/icons/ic-deadline-s.svg';
import ClockIconM from '@/assets/icons/ic-deadline-m.svg';
import PersonYellowIcon from '@/assets/icons/ic-person-s-yellow.svg';

/**
 * 챌린지 목록용 카드 컴포넌트 (목록형 디자인 반영)
 */
export default function ChallengeCard({
  title,
  tags = [],
  deadline,
  participants,
  statusText, // 상단 배지 텍스트 (e.g., '모집이 완료된 상태에요', '챌린지가 마감되었어요')
  isClosed,   // 마감 여부 (검은색 배지)
  className,
}) {
  return (
    <div
      className={cn(
        'group flex w-full flex-col rounded-xl border-2 border-[#262626] bg-white transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex flex-col p-5 md:p-6">
        {/* Upper Section: Status Badge (Optional) */}
        {statusText && (
          <div className="mb-3 flex items-center">
            <div className={cn(
              "flex h-8 w-fit items-center justify-center gap-1.5 rounded-full px-3 font-12-medium shrink-0",
              isClosed 
                ? "bg-[var(--gray-900)] text-white" 
                : "bg-[var(--gray-100)] text-[var(--gray-600)]"
            )}>
              {isClosed ? (
                <ClockIconS className="size-4 shrink-0 translate-y-[0.5px]" />
              ) : (
                <PeopleIcon className="size-5 shrink-0" />
              )}
              <span className="leading-none whitespace-nowrap">{statusText}</span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-4 font-18-bold leading-7 text-[var(--gray-900)] md:font-20-bold">
          {title}
        </h3>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Chip 
              key={idx} 
              variant={tag.variant || 'category-doc'}
              className="px-2.5 py-1"
            >
              <span className="leading-none">{tag.text}</span>
            </Chip>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-4 border-t border-[var(--gray-100)]" />

        {/* Lower Section: Info */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-1.5 text-[var(--gray-600)]">
            <ClockIconM className="size-5 shrink-0 translate-y-[1px]" />
            <span className="font-14-medium leading-none">{deadline}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--gray-600)]">
            <PersonYellowIcon className="size-5 shrink-0" />
            <span className="font-14-medium leading-none">{participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
