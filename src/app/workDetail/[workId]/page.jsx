'use client';

import { useState, useEffect, use } from 'react';
import { getWorkDetail, toggleLike, createFeedback, updateWork, deleteWork } from '@/services/workDetail';
import { getCurrentUser } from '@/services/user';

import WorkHeader from '@/components/workDetail/WorkHeader';
import WorkContent from '@/components/workDetail/WorkContent';
import EmptyWorkContent from '@/components/workDetail/EmptyWorkContent';
import FeedbackSection from '@/components/workDetail/FeedbackSection';
import Gnb from '@/components/common/GNB/Gnb';

export default function WorkDetailPage({ params }) {
  const { workId } = use(params);
  const [workData, setWorkData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getWorkDetail(workId);
        setWorkData(data);
      } catch (err) {
        console.error('작업물 조회 실패:', err);
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [workId]);

  const handleLikeToggle = async () => {
    if (!workData) return;

    const previousLikes = workData.likes;
    
    // 낙관적 업데이트 (Optimistic Update)
    setWorkData(prev => ({
      ...prev,
      likes: {
        count: prev.likes.isLiked ? prev.likes.count - 1 : prev.likes.count + 1,
        isLiked: !prev.likes.isLiked
      }
    }));

    try {
      await toggleLike(workId);
    } catch (err) {
      console.error('좋아요 실패:', err);
      // 실패 시 원래 상태로 복구
      setWorkData(prev => ({
        ...prev,
        likes: previousLikes
      }));
    }
  };

  const handleFeedbackSubmit = async (content) => {
    try {
      await createFeedback(workId, content);
      // 피드백 작성 성공 - FeedbackSection에서 목록 재로드 처리
    } catch (err) {
      console.error('피드백 작성 실패:', err);
      alert('피드백 작성에 실패했습니다.');
      throw err; // FeedbackSection에서 에러 처리할 수 있도록 throw
    }
  };

  const handleEdit = () => {
    console.log('수정 페이지로 이동');
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteWork(workId);
      console.log('삭제 완료, 목록으로 이동');
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-sm text-blue-600 hover:underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!workData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">작업물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Gnb 
        isLoggedIn={user?.isLoggedIn || false} 
        role={user?.role || 'guest'} 
        hasNotification={user?.hasNotification || false}
        user={user?.user}
      />

      <main className="mx-auto w-full">
        <div className="mx-auto w-full px-4 md:w-[696px] md:px-6 lg:w-[890px] lg:px-0">
          
          <WorkHeader
            title={workData.title}
            type={workData.type}
            category={workData.category}
            author={workData.author}
            likes={workData.likes}
            createdAt={workData.createdAt}
            isMine={workData.isMine}
            onLikeToggle={handleLikeToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {workData.content === null ? (
            <EmptyWorkContent />
          ) : (
            <WorkContent content={workData.content} />
          )}

          <FeedbackSection
            feedbacks={workData.feedbacks}
            totalFeedbackCount={workData.totalFeedbackCount}
            onFeedbackSubmit={handleFeedbackSubmit}
            workId={workId}
          />
        </div>
      </main>
    </div>
  );
}
