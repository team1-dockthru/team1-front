'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import TextBox from '../TextBox/TextBox';
import PlusIcon from '@/assets/icons/ic-plus-l.svg';

/**
 * 거절 사유 입력 모달
 * @param {boolean} isOpen - 모달 열림 여부
 * @param {function} onClose - 닫기 이벤트 핸들러
 * @param {function} onSubmit - 전송 이벤트 핸들러 (입력된 사유 전달)
 */
export default function RejectModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title = '거절 사유',
  placeholder = '거절사유를 입력해주세요',
  submitLabel = '전송',
  forceMobile = false // 스토리북 테스트용 강제 모바일 모드
}) {
  const [reason, setReason] = useState('');

  // 모달 열릴 때 백그라운드 스크롤 방지 및 입력 초기화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setReason('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isDesktop = !forceMobile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 */}
      <div className={cn(
        "relative flex flex-col items-center bg-white rounded-2xl shadow-xl transition-all",
        "p-4", // 패딩: 모바일 16px
        isDesktop && "sm:p-6" // PC 24px
      )}>
        
        {/* 헤더: 타이틀 + 닫기 버튼 */}
        <div className={cn(
          "mb-4 flex w-full items-center justify-between",
          isDesktop && "sm:mb-6"
        )}>
          <h2 className={cn(
            "font-20-bold text-[var(--gray-900)]",
            isDesktop && "sm:font-24-bold"
          )}>
            {title}
          </h2>
          <button 
            type="button" 
            onClick={onClose}
            className="text-[var(--gray-500)] transition-colors hover:text-[var(--gray-900)]"
          >
            {/* Plus 아이콘을 45도 회전하여 X 아이콘으로 사용 */}
            <PlusIcon className="h-6 w-6 rotate-45" />
          </button>
        </div>

        {/* 바디: 내용 라벨 + 텍스트 영역 */}
        <div className="flex flex-col gap-2">
          <label className="font-16-medium text-[var(--gray-900)]">
            내용
          </label>
          <div className={cn(
            "w-[311px]",
            isDesktop && "sm:w-[448px]"
          )}>
            <TextBox
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={placeholder}
              className="reject-box"
              style={{ height: '219px' }}
            />
          </div>
        </div>

        {/* 푸터: 전송 버튼 */}
        <div className={cn(
          "mt-4 w-[311px]",
          isDesktop && "sm:mt-6 sm:w-[448px]"
        )}>
          <button
            type="button"
            onClick={() => onSubmit?.(reason)}
            className={cn(
               "flex h-12 w-full items-center justify-center rounded-xl bg-[var(--grat-900)]", // typo check: gray
               "bg-[#111111] font-16-bold text-white transition-colors hover:bg-black/80"
            )}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
