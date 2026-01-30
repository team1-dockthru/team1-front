// 입력, 목록, 더보기 버튼

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import FeedbackInput from './FeedbackInput';
import FeedbackList from './FeedbackList';
import { getFeedbacks } from '@/services/workDetail';

const PAGE_SIZE = 5;

export default function FeedbackSection({
  feedbacks: initialFeedbacks,
  totalFeedbackCount: initialTotalCount,
  onFeedbackSubmit,
  workId,
}) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks || []);
  const [totalCount, setTotalCount] = useState(initialTotalCount || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil((initialTotalCount || 0) / PAGE_SIZE));
  const [newFeedback, setNewFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 피드백 목록 로드
  const loadFeedbacks = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await getFeedbacks(workId, page, PAGE_SIZE);
      setFeedbacks(result.feedbacks);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages || Math.ceil(result.totalCount / PAGE_SIZE));
      setCurrentPage(page);
    } catch (error) {
      console.error('피드백 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [workId]);

  // 피드백 제출 핸들러
  const handleSubmit = async () => {
    if (!newFeedback.trim()) return;
    
    try {
      await onFeedbackSubmit(newFeedback);
      setNewFeedback('');
      // 제출 후 첫 페이지로 이동하여 새 피드백 표시
      await loadFeedbacks(1);
    } catch (error) {
      console.error('피드백 제출 실패:', error);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    loadFeedbacks(page);
  };

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
      {isLoading ? (
        <div className="py-8 text-center text-gray-500">로딩 중...</div>
      ) : (
        <FeedbackList feedbacks={feedbacks} />
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mx-auto mt-6 flex justify-center gap-2 pb-40">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
            className="h-10 w-10 border border-gray-200 text-sm font-medium text-[#737373] bg-white disabled:opacity-50"
          >
            &lt;
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
              disabled={isLoading}
              className={`h-10 w-10 text-sm font-medium ${
                page === currentPage 
                  ? 'bg-gray-900 text-white' 
                  : 'border border-gray-200 text-[#737373] bg-white'
              }`}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
            className="h-10 w-10 border border-gray-200 text-sm font-medium text-[#737373] bg-white disabled:opacity-50"
          >
            &gt;
          </Button>
        </div>
      )}

      {/* 피드백이 없을 때 */}
      {totalCount === 0 && !isLoading && (
        <div className="py-8 text-center text-gray-500 pb-40">
          아직 피드백이 없습니다.
        </div>
      )}
    </section>
  );
}