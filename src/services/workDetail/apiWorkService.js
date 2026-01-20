// API 호출

/**
 * 작업물 상세 조회
 */
export async function getWorkDetail(workId) {
  const response = await fetch(`/api/works/${workId}`);
  
  if (!response.ok) {
    throw new Error('작업물 조회 실패');
  }
  
  const data = await response.json();
  return adaptWorkToCommon(data);
}

/**
 * 좋아요 토글
 */
export async function toggleLike(workId, isLiked) {
  const method = isLiked ? 'DELETE' : 'POST';
  const response = await fetch(`/api/works/${workId}/likes`, { method });
  
  if (!response.ok) {
    throw new Error('좋아요 처리 실패');
  }
  
  return true;
}

/**
 * 피드백 작성
 */
export async function createFeedback(workId, content) {
  const response = await fetch(`/api/works/${workId}/feedbacks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  
  if (!response.ok) {
    throw new Error('피드백 작성 실패');
  }
  
  return true;
}

/**
 * 피드백 더보기
 */
export async function loadMoreFeedbacks(workId, page, size = 3) {
  const response = await fetch(
    `/api/works/${workId}/feedbacks?page=${page}&size=${size}`
  );
  
  if (!response.ok) {
    throw new Error('피드백 조회 실패');
  }
  
  const data = await response.json();
  return data.feedbacks.map(adaptFeedbackToCommon);
}

/**
 * 작업물 수정
 */
export async function updateWork(workId, data) {
  const response = await fetch(`/api/works/${workId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('작업물 수정 실패');
  }
  
  return true;
}

/**
 * 작업물 삭제
 */
export async function deleteWork(workId) {
  const response = await fetch(`/api/works/${workId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('작업물 삭제 실패');
  }
  
  return true;
}

/**
 * API 작업물 응답 → 통일된 인터페이스
 */
function adaptWorkToCommon(apiData) {
  return {
    workId: String(apiData.work_id),
    title: apiData.title,
    type: apiData.doc_type === 0 ? '공식문서' : '블로그',
    category: apiData.field,
    author: {
      userId: String(apiData.author.user_id),
      nickname: apiData.author.nickname,
      profileImage: apiData.author.profile_img,
    },
    likes: {
      count: apiData.like_count,
      isLiked: apiData.is_liked,
    },
    createdAt: formatDate(apiData.created_at),
    content: apiData.content,
    feedbacks: apiData.feedbacks.map(adaptFeedbackToCommon),
    totalFeedbackCount: apiData.total_feedback_count,
    isMine: apiData.is_mine,
  };
}

/**
 * API 피드백 → 통일된 인터페이스
 */
function adaptFeedbackToCommon(apiFeedback) {
  return {
    feedbackId: String(apiFeedback.feedback_id),
    author: {
      userId: String(apiFeedback.author.user_id),
      nickname: apiFeedback.author.nickname,
      profileImage: apiFeedback.author.profile_img,
    },
    content: apiFeedback.content,
    createdAt: formatDateTime(apiFeedback.created_at),
  };
}

/**
 * ISO 8601 → '24/02/28'
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * ISO 8601 → '24/01/14 12:02'
 */
function formatDateTime(isoDate) {
  const date = new Date(isoDate);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hour}:${minute}`;
}