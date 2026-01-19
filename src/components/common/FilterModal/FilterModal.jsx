'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Checkbox from '../Checkbox/Checkbox';
import Radio from '../Radio/Radio';
import OutIcon from '@/assets/icons/ic-out.svg';

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters = {
    fields: [],
    docType: '',
    status: '',
  },
}) {
  const [filters, setFilters] = useState(initialFilters);

  // 모달 열릴 때 초기값 동기화 및 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      setFilters(initialFilters);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialFilters]);

  // 분야(Checkbox) 변경 핸들러
  const handleFieldChange = (field, isChecked) => {
    setFilters((prev) => {
      const newFields = isChecked
        ? [...prev.fields, field]
        : prev.fields.filter((f) => f !== field);
      return { ...prev, fields: newFields };
    });
  };

  // 문서 타입(Radio) 변경 핸들러
  const handleDocTypeChange = (value) => {
    setFilters((prev) => ({ ...prev, docType: value }));
  };

  // 상태(Radio) 변경 핸들러
  const handleStatusChange = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  // 초기화 핸들러
  const handleReset = () => {
    setFilters({
      fields: [],
      docType: '',
      status: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 백드롭 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 (343x541 Fixed) */}
      <div className={cn(
        "relative flex flex-col bg-white overflow-hidden transition-all",
        "w-[343px] h-[541px]",
        "border-2 border-[var(--gray-200)] rounded-lg" // border: #E5E5E5, radius: 8px
      )}>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 pt-6 pb-4">
          <h2 className="font-20-bold text-[var(--gray-900)]">필터</h2>
          <button 
            type="button" 
            onClick={onClose}
            className="text-[var(--gray-500)] transition-colors hover:text-[var(--gray-900)]"
          >
            <OutIcon className="h-6 w-6" />
          </button>
        </div>

        {/* 바디 (스크롤 가능 영역) */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-hide">
          {/* 섹션 1: 분야 */}
          <div className="mb-6">
            <h3 className="mb-3 font-16-bold text-[var(--gray-900)]">분야</h3>
            <div className="flex flex-col gap-1">
              {['Next.js', 'Modern JS', 'API', 'Web', 'Career'].map((label) => (
                <Checkbox
                  key={label}
                  label={label}
                  checked={filters.fields.includes(label)}
                  onChange={(checked) => handleFieldChange(label, checked)}
                />
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-[var(--gray-200)] mb-6" />

          {/* 섹션 2: 문서 타입 */}
          <div className="mb-6">
            <h3 className="mb-3 font-16-bold text-[var(--gray-900)]">문서 타입</h3>
            <div className="flex flex-col gap-1">
              {['공식문서', '블로그'].map((label) => (
                <Radio
                  key={label}
                  name="docType"
                  value={label}
                  label={label}
                  checked={filters.docType === label}
                  onChange={handleDocTypeChange}
                />
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-[var(--gray-200)] mb-6" />

          {/* 섹션 3: 상태 */}
          <div className="mb-6">
            <h3 className="mb-3 font-16-bold text-[var(--gray-900)]">상태</h3>
            <div className="flex flex-col gap-1">
              {['진행중', '마감'].map((label) => (
                <Radio
                  key={label}
                  name="status"
                  value={label}
                  label={label}
                  checked={filters.status === label}
                  onChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between px-4 pb-4 pt-3 border-t border-[var(--gray-100)] mt-auto">
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              "flex items-center justify-center rounded-xl transition-colors",
              "border border-[var(--gray-400)] bg-white text-[var(--gray-900)] hover:bg-gray-50",
              "font-16-bold",
              "w-[134px] h-[40px]" // 134x40
            )}
          >
            초기화
          </button>
          <button
            type="button"
            onClick={() => onApply?.(filters)}
            className={cn(
              "flex items-center justify-center rounded-xl transition-colors",
              "bg-[#111111] text-white hover:bg-black/80", // var(--gray-900) 대신 #111111 사용
              "font-16-bold",
              "w-[169px] h-[40px]" // 169x40
            )}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
