'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * 확인 메시지를 표시하는 반응형 팝업 컴포넌트
 * @param {boolean} isOpen - 팝업 열림 여부
 * @param {string|ReactNode} message - 표시할 메시지
 * @param {string} buttonText - 확인 버튼 텍스트
 * @param {function} onConfirm - 확인 버튼 클릭 시 콜백
 * @param {function} onClose - 팝업 닫기 콜백
 */
export default function Popup({
  isOpen,
  message = '가입이 완료되었습니다!',
  buttonText = '확인',
  onConfirm,
  onClose,
  forceMobile = false,
  icon: Icon,
  cancelText,
  onCancel,
  // 버튼 스타일 커스터마이징을 위한 props 추가
  confirmButtonClassName,
  cancelButtonClassName,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // forceMobile이 true면 무조건 isDesktop은 false 처리하여 모바일 레이아웃 고정
  const isDesktop = !forceMobile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className={cn(
        "relative flex flex-col items-center justify-between bg-white rounded-2xl shadow-xl transition-all",
        "w-[327px] h-[220px] p-6",
        // isDesktop일 때만 크기 확장, forceMobile이면 무시됨
        isDesktop && "sm:w-[540px] sm:h-[250px] sm:p-10"
      )}>
        
        {/* 아이콘: 상단 고정 */}
        {Icon && (
          <Icon className={cn(
            "h-6 w-6 text-[var(--gray-800)]",
            isDesktop && "sm:h-8 sm:w-8"
          )} />
        )}

        {/* 메시지 영역: 남은 공간의 중앙에 정렬 (flex-1) */}
        <div className="flex flex-1 items-center justify-center text-center w-full">
          <p className={cn(
            "font-16-medium text-[var(--gray-800)] whitespace-pre-wrap",
            isDesktop && "sm:font-18-medium"
          )}>
            {message}
          </p>
        </div>

        <div className={cn(
          "flex w-full items-center gap-2", 
          // 버튼 정렬: forceMobile일때는 항상 justify-center
          cancelText ? "justify-center" : (isDesktop ? "sm:justify-end justify-center" : "justify-center")
        )}>
          {cancelText && (
            <button
              type="button"
              onClick={() => {
                onCancel?.();
                onClose?.();
              }}
              className={cn(
                'inline-flex h-10 items-center justify-center rounded-xl border border-[var(--gray-400)] bg-white', // h-10 (40px)
                'px-[26px] py-[10.5px]', // 요청된 패딩 적용 (flex layout이라 height우선일 수 있음)
                'font-16-bold text-[var(--gray-900)] transition-colors hover:bg-gray-50',
                cancelButtonClassName // 커스텀 스타일 병합
              )}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
            className={cn(
              'inline-flex h-10 items-center justify-center rounded-xl bg-[#111111]', // h-10 (40px)
              'px-[26px] py-[10.5px]', // 요청된 패딩
              'font-16-bold text-white transition-colors hover:bg-black/90',
              confirmButtonClassName // 커스텀 스타일 병합
            )}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
