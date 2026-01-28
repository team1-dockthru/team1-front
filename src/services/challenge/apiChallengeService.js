// API Challenge Service
// 실제 백엔드 API 호출

// 백엔드 API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://team1-back-1.onrender.com";

const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token") || null;
  }
  return null;
};

async function request(path, { method = "GET", body } = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.ok) {
    return response.json();
  }

  let errorMessage = "챌린지 요청 실패";
  try {
    const errorData = await response.json();
    if (errorData?.message) {
      errorMessage = errorData.message;
    }
  } catch {
    // ignore JSON parse errors
  }
  throw new Error(errorMessage);
}

function buildQuery(params = {}) {
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );
  if (entries.length === 0) {
    return "";
  }
  const searchParams = new URLSearchParams(entries);
  return `?${searchParams.toString()}`;
}

export async function getChallenges({ userId, challengeStatus, field, docType } = {}) {
  const query = buildQuery({ userId, challengeStatus, field, docType });
  const data = await request(`/challenges${query}`);
  return data?.data || [];
}

export async function getChallengeRequests({ userId, requestStatus } = {}) {
  const query = buildQuery({ userId, requestStatus });
  const data = await request(`/challenges/requests${query}`);
  return data?.data || [];
}

export async function createChallengeRequest(payload) {
  return request("/challenges/requests", {
    method: "POST",
    body: payload,
  });
}

/**
 * 챌린지 상세 조회
 */
export async function getChallengeDetail(challengeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('챌린지 조회 실패');
    }

    const data = await response.json();
    
    // API 응답 → 공통 인터페이스로 변환
    return adaptChallengeToCommon(data);
  } catch (error) {
    console.error('getChallengeDetail 에러:', error);
    throw error;
  }
}

/**
 * 챌린지 참여하기
 */
export async function joinChallenge(challengeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('챌린지 참여 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('joinChallenge 에러:', error);
    throw error;
  }
}

/**
 * 챌린지 수정
 */
export async function updateChallenge(challengeId, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('챌린지 수정 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('updateChallenge 에러:', error);
    throw error;
  }
}

/**
 * 챌린지 삭제
 */
export async function deleteChallenge(challengeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('챌린지 삭제 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('deleteChallenge 에러:', error);
    throw error;
  }
}

/**
 * API 응답을 공통 인터페이스로 변환
 */
function adaptChallengeToCommon(apiData) {
  return {
    challengeId: String(apiData.challenge_id || apiData.id),
    title: apiData.title,
    type: apiData.doc_type === 0 ? '공식문서' : '블로그',
    category: apiData.category,
    description: apiData.description,
    author: {
      userId: String(apiData.author?.user_id || apiData.author?.id),
      nickname: apiData.author?.nickname,
    },
    status: apiData.status, // 'live' | 'working' | 'closed' | 'recruitClosed'
    deadline: formatDate(apiData.deadline),
    participantCount: apiData.participant_count,
    originalWorkId: String(apiData.original_work_id),
    isMine: apiData.is_mine,
    isParticipating: apiData.is_participating,
    topTranslations: (apiData.top_translations || []).map(adaptTranslation),
    participants: (apiData.participants || []).map(adaptParticipant),
  };
}

/**
 * 추천작 변환
 */
function adaptTranslation(apiTranslation) {
  return {
    workId: String(apiTranslation.work_id),
    author: {
      userId: String(apiTranslation.author?.user_id),
      nickname: apiTranslation.author?.nickname,
    },
    likeCount: apiTranslation.like_count,
    content: apiTranslation.content,
    createdAt: formatDateTime(apiTranslation.created_at),
  };
}

/**
 * 참여자 변환
 */
function adaptParticipant(apiParticipant) {
  return {
    userId: String(apiParticipant.user_id),
    nickname: apiParticipant.nickname,
    rank: apiParticipant.rank,
    likeCount: apiParticipant.like_count,
    role: apiParticipant.role || (apiParticipant.rank === 1 ? '전문가' : '일반'), // 추가
  };
}

/**
 * 날짜 포맷 변환: ISO 8601 → "2024년 2월 28일 마감"
 */
function formatDate(isoString) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}년 ${month}월 ${day}일 마감`;
}

/**
 * 날짜시간 포맷 변환: ISO 8601 → "2024/01/14 12:02"
 */
function formatDateTime(isoString) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
