'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ToggleDownIcon from '@/assets/icons/ic-toggle-down.svg';
import ToggleUpIcon from '@/assets/icons/ic-toggle-up.svg';

/**
 * 카테고리 드롭다운 컴포넌트
 * @param {string[]} options - 드롭다운 옵션 목록
 * @param {string} value - 현재 선택된 값
 * @param {function} onChange - 값 변경 시 호출되는 콜백
 * @param {string} placeholder - 초기 표시 텍스트
 * @param {string} className - 추가 스타일 클래스
 */
export default function CategoryDropdown({
  options = [],
  value = '',
  onChange,
  placeholder = '카테고리',
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
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
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  return (
    <div className={cn('relative w-full max-w-[800px]', className)} ref={containerRef}>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-md border bg-white px-4',
          'font-16-regular text-[var(--gray-900)] placeholder:text-[var(--gray-400)]',
          isOpen ? 'border-[var(--gray-900)]' : 'border-[var(--gray-200)]',
          'transition-all'
        )}
      >
        <span className={cn(!value && 'text-[var(--gray-400)]')}>{displayValue}</span>
        {isOpen ? (
          <ToggleUpIcon className="size-5 text-[var(--gray-900)]" />
        ) : (
          <ToggleDownIcon className="size-5 text-[var(--gray-900)]" />
        )}
      </button>

      {/* 메뉴 리스트 */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-md border border-[var(--gray-200)] bg-white shadow-lg">
          <ul className="m-0 list-none p-0">
            {options.map((option, index) => (
              <li key={option} className={cn(index !== options.length - 1 && 'border-b border-[var(--gray-100)]')}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'flex h-12 w-full items-center justify-center bg-white px-4',
                    'font-16-regular text-[var(--gray-700)] hover:bg-[var(--gray-50)]',
                    'transition-colors',
                    value === option && 'font-16-semibold text-[var(--gray-900)]'
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
