// 입력창, 등록 버튼

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import FeedbackButton from '@/components/common/FeedbackButton/FeedbackButton'; // ← 실제 경로로 수정
import { ArrowDown } from 'lucide-react';

export default function FeedbackInput({ value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    // Enter 키 누르면 전송
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  const handleButtonClick = () => {
    if (value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="pb-4 pt-6">
      <div className="flex items-start gap-6">
        {/* 입력창 */}
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="피드백을 남겨주세요"
            className="h-[89px] w-full resize-none rounded-[10px] border border-[#D4D4D4] bg-white px-4 py-3 text-base font-medium leading-relaxed text-[#262626] placeholder:text-[#A3A3A3] focus:border-[#D4D4D4] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* 등록 버튼 */}
        <FeedbackButton
          variant={value.trim() ? 'dark' : 'gray'}
          ariaLabel="피드백 전송"
          onClick={handleButtonClick}
          className="h-10 w-10 shrink-0"
        >
          <ArrowDown 
            className={`h-6 w-6 ${value.trim() ? 'text-[#FFC700]' : 'text-white'}`}
          />
        </FeedbackButton>
      </div>
    </div>
  );
}