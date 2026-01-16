'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ToggleDownIcon from '@/assets/icons/ic-toggle-down.svg';
import FilterInactiveIcon from '@/assets/icons/ic-filter-inactive.svg';
import FilterActiveIcon from '@/assets/icons/ic-filter-active.svg';

/**
 * 정렬 및 필터 드롭다운 컴포넌트
 * @param {string} variant - 'default' (화살표), 'filter' (필터 아이콘)
 * @param {string[]} options - 드롭다운 옵션 목록
 * @param {string} value - 현재 선택된 값
 * @param {function} onChange - 값 변경 시 호출되는 콜백
 * @param {string} placeholder - 초기 표시 텍스트
 * @param {boolean} active - 강제 활성 상태 (검은 배경)
 * @param {string} className - 추가 스타일 클래스
 */
export default function Sort({
  variant = 'default',
  options = [],
  value = '',
  onChange,
  placeholder = '정렬',
  active = false,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (onChange) onChange(option);
    setIsOpen(false);
  };

  const isFilter = variant === 'filter';
  const isBlackTheme = active || (isFilter && value !== '');
  const displayValue = value || placeholder;

  // 아이콘 결정
  const renderIcon = () => {
    if (isFilter) {
      return isBlackTheme ? (
        <FilterActiveIcon className="size-5 text-white" />
      ) : (
        <FilterInactiveIcon className="size-5 text-[var(--gray-900)]" />
      );
    }
    return (
      <ToggleDownIcon 
        className={cn("size-5 transition-transform", 
          isOpen && "rotate-180",
          isBlackTheme ? "text-white" : "text-[var(--gray-900)]"
        )} 
      />
    );
  };

  return (
    <div className={cn('relative inline-block min-w-[120px]', className)} ref={containerRef}>
      {/* 트리거 */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-full border px-4',
          'font-14-medium transition-all',
          isBlackTheme
            ? 'border-[var(--brand-black)] bg-[var(--brand-black)] text-white shadow-md'
            : 'border-[var(--gray-200)] bg-white text-[var(--gray-500)] hover:border-[var(--gray-300)]'
        )}
      >
        <span className="truncate">{displayValue}</span>
        {renderIcon()}
      </button>

      {/* 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[140px] overflow-hidden rounded-xl border border-[var(--gray-100)] bg-white shadow-xl">
          <ul className="m-0 list-none p-0">
            {options.map((option, index) => (
              <li key={option} className={cn(index !== options.length - 1 && 'border-b border-[var(--gray-50)]')}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'flex h-11 w-full items-center justify-center bg-white px-5',
                    'font-14-regular text-[var(--gray-700)] hover:bg-[var(--gray-50)]',
                    'transition-colors whitespace-nowrap',
                    value === option && 'font-14-semibold text-[var(--gray-900)] bg-[var(--gray-50)]'
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
