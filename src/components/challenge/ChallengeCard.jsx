'use client';

import { cn } from '@/lib/utils';
import Chip from '@/components/common/Chip/Chip';
import PeopleIcon from '@/assets/icons/ic-person-default.svg';
import ClockIconS from '@/assets/icons/ic-deadline-s.svg';
import ClockIconM from '@/assets/icons/ic-deadline-m.svg';
import PersonYellowIcon from '@/assets/icons/ic-person-s-yellow.svg';
import MeatballsIcon from '@/assets/icons/ic-meatballs-menu.svg';
import ArrowRightIcon from '@/assets/icons/ic-arrow-right.svg';
import ListIcon from '@/assets/icons/ic-list.svg';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

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
  isAdmin = false,
  showAction = false,
  actionLabel = '도전 계속하기',
  actionVariant = 'primary',
  onAction,
  onClick,
  onEdit,
  onDelete,
  className,
}) {
  const isWorkAction = actionVariant === 'work';
  return (
    <div
      className={cn(
        'group flex w-full flex-col rounded-xl border-2 border-[#262626] bg-white transition-shadow hover:shadow-md',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      <div className="relative flex flex-col p-5 md:p-6">
        {/* Upper Section: Status Badge (Optional) + Admin Menu */}
        <div className={cn('flex items-center', statusText ? 'mb-3' : 'mb-0')}>
          {statusText ? (
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
          ) : null}
        </div>

        {isAdmin ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-full hover:bg-[var(--gray-50)] md:right-6 md:top-6"
              aria-label="챌린지 관리"
              onClick={(event) => event.stopPropagation()}
            >
              <MeatballsIcon className="size-5 text-[var(--gray-400)]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[120px] border-[#d4d4d4] bg-white p-0"
              onClick={(event) => event.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={onEdit}
                className="cursor-pointer justify-center py-3 text-center text-sm font-medium text-[#737373] focus:text-[#262626]"
              >
                수정하기
              </DropdownMenuItem>
              <DropdownMenuSeparator className="m-0 bg-[#d4d4d4]" />
              <DropdownMenuItem
                onClick={onDelete}
                className="cursor-pointer justify-center py-3 text-center text-sm font-medium text-[#737373] focus:text-[#ef4444]"
              >
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

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
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
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
          {showAction ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (onAction) onAction();
              }}
              className={cn(
                isWorkAction
                  ? 'ml-auto flex shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--gray-200)] bg-white px-4 py-2 font-14-bold text-[var(--gray-800)]'
                  : 'ml-auto flex shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--gray-800)] bg-white transition-colors hover:bg-[var(--gray-50)]',
                'self-end md:self-auto',
                !isWorkAction &&
                  'h-[33px] px-4 font-12-bold text-[var(--gray-800)] sm:h-auto sm:py-2 sm:pl-5 sm:pr-4 sm:font-16-bold'
              )}
            >
              <span className="whitespace-nowrap">{actionLabel}</span>
              {isWorkAction ? (
                <ListIcon className="size-6 shrink-0" />
              ) : (
                <ArrowRightIcon className="size-4 sm:size-5 shrink-0" />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
