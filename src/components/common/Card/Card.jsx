'use client';

import { cn } from '@/lib/utils';
import Chip from '@/components/common/Chip/Chip';
import MeatballsIcon from '@/assets/icons/ic-meatballs-menu.svg';
import DeadlineIcon from '@/assets/icons/ic-deadline-m.svg';
import PersonIcon from '@/assets/icons/ic-person-s-yellow.svg';
import PersonWhiteIcon from '@/assets/icons/ic-person-s-white.svg';
import ArrowRightIcon from '@/assets/icons/ic-arrow-right.svg';

/**
 * 리스트 및 그리드용 반응형 카드 컴포넌트
 * @param {string} statusText - 상단 배지 텍스트
 * @param {string} title - 카드 제목
 * @param {object[]} tags - 태그 목록 (예: [{text: 'Next.js', variant: 'type-nextjs'}, {text: '공식문서', variant: 'category-doc'}])
 * @param {string} deadline - 마감 기한 텍스트
 * @param {string} participants - 참여 인원 정보 (예: '5/5 참여 완료')
 * @param {string} buttonText - 하단 버튼 텍스트
 * @param {function} onAction - 버튼 클릭 시 콜백
 * @param {function} onMenu - 우측 상단 더보기 클릭 시 콜백
 * @param {string} className - 추가 스타일 클래스
 */
export default function Card({
  statusText = '모집이 완료된 상태에요',
  title,
  tags = [],
  deadline,
  participants,
  buttonText = '도전 계속하기',
  onAction,
  onMenu,
  className,
}) {
  return (
    <div
      className={cn(
        'group flex flex-col rounded-2xl border border-[var(--gray-200)] bg-white p-6 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      {/* 상단: 배지 및 더보기 */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5 rounded-full bg-[var(--gray-100)] px-3 py-1 font-12-medium text-[var(--gray-600)]">
          <PersonWhiteIcon className="size-4" />
          <span className="whitespace-nowrap">{statusText}</span>
        </div>
        <button
          type="button"
          onClick={onMenu}
          className="inline-flex size-6 items-center justify-center rounded-full hover:bg-[var(--gray-50)]"
        >
          <MeatballsIcon className="size-5 text-[var(--gray-400)]" />
        </button>
      </div>

      {/* 중단: 제목 및 태그 */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-18-bold text-[var(--gray-900)] line-clamp-2 sm:font-20-bold">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Chip key={idx} variant={tag.variant}>
              {tag.text}
            </Chip>
          ))}
        </div>
      </div>

      {/* 하단 구분선 및 정보/버튼 */}
      <div className="mt-5 border-t border-[var(--gray-100)] pt-4">
        <div className="flex items-end justify-between">
          {/* 정보 영역: 항상 2줄 스택 */}
          <div className="flex flex-col gap-1.5 py-0.5">
            <div className="flex items-center gap-1.5 text-[var(--gray-500)]">
              <DeadlineIcon className="size-5 shrink-0" />
              <span className="font-14-medium whitespace-nowrap leading-none">{deadline}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--gray-500)]">
              <PersonIcon className="size-5 shrink-0" />
              <span className="font-14-medium whitespace-nowrap leading-none">{participants}</span>
            </div>
          </div>

          {/* 버튼 영역: 단독 배치 */}
          <button
            type="button"
            onClick={onAction}
            className={cn(
              'flex shrink-0 items-center justify-center gap-1 rounded-full border border-[var(--gray-800)] bg-white transition-colors hover:bg-[var(--gray-50)]',
              'w-[132px] h-[33px] font-12-bold sm:w-auto sm:h-auto sm:py-2 sm:pl-5 sm:pr-4 sm:font-16-bold text-[var(--gray-800)]'
            )}
          >
            <span className="whitespace-nowrap">{buttonText}</span>
            <ArrowRightIcon className="size-4 sm:size-5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
