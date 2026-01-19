'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatAbsoluteDate } from '@/utils/dateFormatter';

export default function DraftListModal({ isOpen, onClose, drafts, onSelectDraft }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[343px] h-[447px] max-w-[343px] max-h-[447px] p-0 overflow-hidden flex flex-col [&>button]:hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">임시저장 글</DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="닫기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            총 {drafts.length}개
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {drafts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              저장된 임시저장이 없습니다.
            </div>
          ) : (
            <div className="space-y-0">
              {drafts.map((draft, index) => (
                <div
                  key={draft.draftId || `${draft.challengeId}_${draft.workId}_${draft.savedAt}_${index}`}
                  className="py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onSelectDraft(draft)}
                >
                  <h3 className="font-medium text-gray-900 mb-1">
                    {draft.title || '제목 없음'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatAbsoluteDate(draft.savedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

