'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import SearchIcon from '@/assets/icons/ic-search.svg';
import useDebounce from '@/hooks/useDebounce';

/**
 * 검색 컴포넌트
 * @param {function} onSearch - 디바운스된 검색어가 변경될 때 호출되는 콜백
 * @param {string} placeholder - placeholder 텍스트
 * @param {number} delay - 디바운스 지연 시간 (ms)
 * @param {string} className - 추가 스타일 클래스
 */
export default function Search({
  onSearch,
  placeholder = '검색어를 입력해주세요',
  delay = 300,
  className,
}) {
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, delay);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className={cn('relative w-full max-w-[800px]', className)}>
      <div className="absolute top-1/2 left-3 -translate-y-1/2 flex items-center">
        <SearchIcon className="size-5 text-[var(--gray-900)]" />
      </div>
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'h-10 w-full rounded-full border border-[var(--gray-200)] bg-white pl-10 pr-3 outline-none',
          'font-14-regular text-[var(--gray-900)] placeholder:text-[var(--gray-400)]',
          'transition-all focus:border-[var(--gray-400)]',
        )}
      />
    </div>
  );
}
