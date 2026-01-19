// Mock 전용

import { workDetailMockData } from '@/mocks/workDetailData';

const MOCK_DATA_TYPE = 'withDataOtherUser';

// 변경 가능한 값:
// 'emptyWorkMine'      - 빈 화면 + 내 작업물
// 'emptyWorkOther'     - 빈 화면 + 다른 유저
// 'withDataOtherUser'  - 내용 있음 + 다른 유저
// 'withDataMyWork'     - 내용 있음 + 내 작업물 (수정/삭제 버튼)

// Mock 상태 관리 (좋아요, 피드백 상태 유지용)
let mockState = {};

/**
 * 작업물 상세 조회
 */
export async function getWorkDetail(workId) {
  // Mock 데이터 로딩 시뮬레이션 (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const baseData = workDetailMockData[MOCK_DATA_TYPE];
  
  // Mock 상태가 있으면 적용
  if (mockState[workId]) {
    return {
      ...baseData,
      ...mockState[workId]
    };
  }
  
  return baseData;
}

/**
 * 좋아요 토글
 */
export async function toggleLike(workId) {
  console.log(`[Mock] 좋아요 토글: workId=${workId}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const currentData = mockState[workId] || workDetailMockData[MOCK_DATA_TYPE];
  
  // 좋아요 상태 토글
  mockState[workId] = {
    ...currentData,
    likes: {
      count: currentData.likes.isLiked 
        ? currentData.likes.count - 1 
        : currentData.likes.count + 1,
      isLiked: !currentData.likes.isLiked
    }
  };
  
  return true;
}

/**
 * 피드백 작성
 */
export async function createFeedback(workId, content) {
  console.log(`[Mock] 피드백 작성: workId=${workId}, content=${content}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const currentData = mockState[workId] || workDetailMockData[MOCK_DATA_TYPE];
  
  // 새 피드백 추가
  const newFeedback = {
    feedbackId: `feedback_${Date.now()}`,
    author: {
      userId: 'current_user',
      nickname: '내닉네임',
      profileImage: null,
    },
    content,
    createdAt: new Date().toLocaleString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\. /g, '/').replace('.', ''),
  };
  
  mockState[workId] = {
    ...currentData,
    feedbacks: [newFeedback, ...currentData.feedbacks],
    totalFeedbackCount: currentData.totalFeedbackCount + 1
  };
  
  return true;
}

/**
 * 피드백 더보기
 */
export async function loadMoreFeedbacks(workId, page, size = 3) {
  console.log(`[Mock] 피드백 더보기: workId=${workId}, page=${page}, size=${size}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Mock에서는 이미 모든 피드백이 포함되어 있으므로 빈 배열 반환
  return [];
}

/**
 * 작업물 수정
 */
export async function updateWork(workId, data) {
  console.log(`[Mock] 작업물 수정: workId=${workId}`, data);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return true;
}

/**
 * 작업물 삭제
 */
export async function deleteWork(workId) {
  console.log(`[Mock] 작업물 삭제: workId=${workId}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Mock 상태 초기화
  delete mockState[workId];
  
  return true;
}