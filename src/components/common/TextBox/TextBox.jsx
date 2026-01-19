'use client';

import { cn } from '@/lib/utils';

/**
 * 멀티라인 텍스트 입력 컴포넌트
 * @param {string} value - 입력 값
 * @param {function} onChange - 값 변경 이벤트 핸들러
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @param {number} rows - 기본 줄 수 (기본값: 3)
 * @param {string} className - 추가 스타일 클래스
 * @param {boolean} disabled - 비활성화 여부
 */
export default function TextBox({
  value,
  onChange,
  placeholder = '내용을 입력해주세요',
  rows = 4,
  className,
  disabled = false,
  ...props
}) {
  return (
    <div className={cn('relative w-full', className)}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={cn(
          'w-full resize-none rounded-xl border border-[var(--gray-200)] bg-white p-4',
          'font-16-regular text-[var(--gray-900)] placeholder:text-[var(--gray-400)]',
          'focus:border-[var(--gray-400)] focus:outline-none transition-colors',
          'disabled:bg-[var(--gray-50)] disabled:cursor-not-allowed',
          'scrollbar-thin scrollbar-thumb-[var(--gray-200)] scrollbar-track-transparent',
          'min-h-[120px]' // 최소 높이 설정
        )}
        {...props}
      />
    </div>
  );
}
