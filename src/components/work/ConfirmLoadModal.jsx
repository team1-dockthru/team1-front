'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

export default function ConfirmLoadModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[327px] h-[187px] max-w-[327px] max-h-[187px] p-0 overflow-hidden flex flex-col items-center justify-center [&>button]:hidden">
        <div className="flex flex-col items-center justify-center px-6 py-5 w-full h-full">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-base font-medium text-gray-900 mb-5 text-center">
            이전 작업물을 불러오시겠어요?
          </p>
          <div className="flex gap-3 w-full">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-white border-gray-900 text-gray-900 hover:bg-gray-50 h-9 text-sm"
            >
              아니오
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-gray-700 text-white hover:bg-gray-800 h-9 text-sm"
            >
              네
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

