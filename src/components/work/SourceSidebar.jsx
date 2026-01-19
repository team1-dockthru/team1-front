'use client';

import { Button } from '@/components/ui/button';

export default function SourceSidebar({ 
  isOpen, 
  onClose, 
  sourceContent = 'https://ui.shadcn.com/docs/components',
  isMobile = false 
}) {
  if (!isOpen) return null;

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-base md:text-lg font-bold text-gray-900 truncate">NEXT.JS</h2>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">
              App Router {'>'} Building Your Application {'>'} Routing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2 h-auto bg-white border-gray-300 hover:bg-gray-50"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            링크 열기
          </Button>
          <button
            className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            aria-label="메뉴"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`flex-1 overflow-hidden ${isMobile ? 'h-[400px]' : ''}`}>
        {sourceContent ? (
          <iframe
            src={sourceContent}
            className="w-full h-full border-0"
            title="원문 콘텐츠"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          />
        ) : (
          <div className="text-sm text-gray-500 text-center py-8 p-6">
            원문이 표시됩니다
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-lg flex flex-col order-1">
        {sidebarContent}
      </div>
    );
  }

  return (
    <div className="hidden md:flex fixed right-0 top-0 h-full w-[50%] lg:w-[500px] bg-white border-l border-gray-200 shadow-lg z-40 flex-col">
      {sidebarContent}
    </div>
  );
}

