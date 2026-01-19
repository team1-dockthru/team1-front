// 입력, 목록, 더보기 버튼

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FeedbackInput from './FeedbackInput';
import FeedbackList from './FeedbackList';

export default function FeedbackSection({
  feedbacks,
  totalFeedbackCount,
  onFeedbackSubmit,
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [newFeedback, setNewFeedback] = useState('');

  const handleSubmit = () => {
    if (newFeedback.trim()) {
      onFeedbackSubmit(newFeedback);
      setNewFeedback('');
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleFeedbacks = feedbacks.slice(0, visibleCount);
  const hasMore = visibleCount < totalFeedbackCount;

  return (
    <section>
      {/* 구분선 */}
      <div className="h-px bg-[#e5e5e5]" />

      {/* 피드백 입력 */}
      <FeedbackInput
        value={newFeedback}
        onChange={setNewFeedback}
        onSubmit={handleSubmit}
      />

      {/* 피드백 목록 */}
      <FeedbackList feedbacks={visibleFeedbacks} />

      {/* 더보기 버튼 */}
      {totalFeedbackCount > 0 && (
        <div className="mx-auto mt-6 flex justify-center pb-40">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={!hasMore}
            className="h-12 w-[180px] border-none text-sm font-medium text-[#737373] bg-[#f5f5f5] disabled:opacity-50"
          >
            더 보기
          </Button>
        </div>
      )}
    </section>
  );
}