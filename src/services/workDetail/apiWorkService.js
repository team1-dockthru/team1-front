// API 호출

// 백엔드 API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://team1-back-1.onrender.com';

// 인증 토큰 가져오기
const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token") || null;
  }
  return null;
};

/**
 * 작업물 상세 조회
 */
export async function getWorkDetail(workId) {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/works/${workId}`, {
    headers
  });
  
  if (!response.ok) {
    throw new Error('작업물 조회 실패');
  }
  
  const result = await response.json();
  const data = result?.data || result;
  return adaptWorkToCommon(data);
}

/**
 * 좋아요 토글
 */
export async function toggleLike(workId, isLiked) {
  const token = getStoredToken();
  const method = isLiked ? 'DELETE' : 'POST';
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/works/${workId}/likes`, { 
    method,
    headers
  });
  
  if (!response.ok) {
    throw new Error('좋아요 처리 실패');
  }
  
  return true;
}

/**
 * 피드백 작성
 */
export async function createFeedback(workId, content) {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/works/${workId}/feedbacks`, {
    method: 'POST',
    headers,
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
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}/works/${workId}/feedbacks?page=${page}&size=${size}`,
    { headers }
  );
  
  if (!response.ok) {
    throw new Error('피드백 조회 실패');
  }
  
  const result = await response.json();
  const data = result?.data || result;
  return data.feedbacks.map(adaptFeedbackToCommon);
}

/**
 * 작업물 수정
 */
export async function updateWork(workId, data) {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/works/${workId}`, {
    method: 'PATCH',
    headers,
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
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/works/${workId}`, {
    method: 'DELETE',
    headers,
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
    workId: String(apiData.id || apiData.work_id),
    title: apiData.title,
    type: apiData.docType === 'OFFICIAL_DOCUMENT' || apiData.doc_type === 0 ? '공식문서' : '블로그',
    category: apiData.field,
    author: {
      userId: String(apiData.author?.userId || apiData.author?.user_id || apiData.author?.id),
      nickname: apiData.author?.nickname,
      profileImage: apiData.author?.profileImg || apiData.author?.profileImage || apiData.author?.profile_img,
    },
    likes: {
      count: apiData.likeCount || apiData.like_count || 0,
      isLiked: apiData.isLiked ?? apiData.is_liked ?? false,
    },
    createdAt: formatDate(apiData.createdAt || apiData.created_at),
    content: apiData.content,
    feedbacks: (apiData.feedbacks || []).map(adaptFeedbackToCommon),
    totalFeedbackCount: apiData.totalFeedbackCount || apiData.total_feedback_count || 0,
    isMine: apiData.isMine ?? apiData.is_mine ?? false,
  };
}

/**
 * API 피드백 → 통일된 인터페이스
 */
function adaptFeedbackToCommon(apiFeedback) {
  return {
    feedbackId: String(apiFeedback.id || apiFeedback.feedback_id),
    author: {
      userId: String(apiFeedback.author?.userId || apiFeedback.author?.user_id || apiFeedback.author?.id),
      nickname: apiFeedback.author?.nickname,
      profileImage: apiFeedback.author?.profileImg || apiFeedback.author?.profileImage || apiFeedback.author?.profile_img,
    },
    content: apiFeedback.content,
    createdAt: formatDateTime(apiFeedback.createdAt || apiFeedback.created_at),
  };
}

/**
 * ISO 8601 → '24/02/28'
 */
function formatDate(isoDate) {
  if (!isoDate) return '';
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
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hour}:${minute}`;
}