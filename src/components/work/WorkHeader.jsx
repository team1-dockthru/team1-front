'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LogoIcon from '@/assets/icons/logo.svg';
import ListIcon from '@/assets/icons/ic-list.svg';

export default function WorkHeader({ 
  title, 
  onTitleChange, 
  onGiveUp, 
  onSaveDraft, 
  onSubmit,
  isSidebarOpen,
  onToggleSidebar 
}) {
  return (
    <>
      <div className="bg-white">
        <div className={`px-4 md:px-6 py-2 md:py-2 transition-all duration-300`}>
          <div className="flex items-center justify-between gap-2 md:gap-4 border-b border-gray-200 pb-2">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="inline-flex items-center gap-1.5 md:gap-2">
                <LogoIcon className="w-[14px] h-[16px] md:w-[17.55px] md:h-[20.25px]" />
                <span className="text-gray-900 font-bold text-xs md:text-sm">Docthru</span>
              </Link>
            </div>
            <div className="flex gap-1 md:gap-2 flex-shrink-0">
              <Button
                onClick={onGiveUp}
                className="bg-pink-100 text-red-600 hover:bg-pink-200 hover:text-red-700 rounded-lg px-2 md:px-3 py-0.5 md:py-1 h-auto text-xs md:text-sm"
              >
                포기
              </Button>
              <Button 
                onClick={onSaveDraft}
                variant="outline" 
                className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50 rounded-lg px-2 md:px-3 py-1 md:py-1.5 h-auto text-xs md:text-sm"
              >
                임시저장
              </Button>
              <Button 
                onClick={onSubmit}
                variant="outline"
                className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-2 md:px-3 py-1 md:py-1.5 h-auto text-xs md:text-sm"
              >
                제출하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white relative">
        <div className="px-4 md:px-6 py-1 md:py-1.5">
          <div className="border-b border-gray-200 pb-1.5 md:pb-2">
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-lg md:text-xl font-semibold border-none shadow-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent truncate w-full"
              placeholder="제목을 입력하세요"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleSidebar}
          className={`md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5 p-2 bg-white border-l border-t border-b border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50 transition-all duration-300 ${
            isSidebarOpen ? 'bg-gray-50' : ''
          }`}
        >
          <ListIcon className="w-4 h-4 text-gray-600" />
          <span className="text-[10px] text-gray-600 writing-vertical-rl">원문</span>
        </button>
      </div>
    </>
  );
}

