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

export async function getChallenges({ userId, challengeStatus, field, docType, page, limit } = {}) {
  const query = buildQuery({ userId, challengeStatus, field, docType, page, limit });
  const data = await request(`/challenges${query}`);
  return {
    challenges: data?.data || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || page || 1,
  };
}

export async function getMyChallenges({ challengeStatus, field, docType, page, limit } = {}) {
  const query = buildQuery({ challengeStatus, field, docType, page, limit });
  const data = await request(`/challenges/my${query}`);
  // page.js의 normalizeList가 value.data를 찾으므로 data 키로 반환
  return {
    data: data?.data || [],
    totalCount: data?.pagination?.totalCount || 0,
    totalPages: data?.pagination?.totalPages || 1,
    currentPage: data?.pagination?.currentPage || page || 1,
  };
}

export async function getChallengeRequests({ userId, requestStatus } = {}) {
  const query = buildQuery({ userId, requestStatus });
  const data = await request(`/challenges/requests${query}`);
  return data?.data || [];
}

export async function getChallengeRequestDetail(requestId) {
  const data = await request(`/challenges/requests/${requestId}`);
  return data?.data || data;
}

export async function processChallengeRequest(requestId, payload) {
  const data = await request(`/challenges/requests/${requestId}/process`, {
    method: "PATCH",
    body: payload,
  });
  return data?.data || data;
}

export async function getChallengeDetailRaw(challengeId) {
  const data = await request(`/challenges/${challengeId}`);
  return data?.data || data;
}

export async function createChallengeRequest(payload) {
  return request("/challenges/requests", {
    method: "POST",
    body: payload,
  });
}

export async function deleteChallengeAsAdmin(challengeId, reason) {
  const trimmedReason = typeof reason === "string" ? reason.trim() : "";
  const payload =
    trimmedReason
      ? { adminReason: trimmedReason, reason: trimmedReason }
      : undefined;
  return request(`/challenges/${challengeId}/admin/delete`, {
    method: "DELETE",
    body: payload,
  });
}

/**
 * 챌린지 상세 조회
 */
export async function getChallengeDetail(challengeId) {
  try {
    const data = await request(`/challenges/${challengeId}`);
    const payload = data?.data || data;
    // API 응답 → 공통 인터페이스로 변환
    return adaptChallengeToCommon(payload);
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
    const token = getStoredToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/participants`, {
      method: 'POST',
      headers,
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
 * Work 생성
 */
export async function createWork(challengeId, title, content, originalUrl) {
  try {
    const token = getStoredToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // challengeId를 숫자로 변환 (백엔드가 Int 타입을 기대함)
    const numChallengeId = typeof challengeId === 'string' ? parseInt(challengeId, 10) : challengeId;

    const response = await fetch(`${API_BASE_URL}/works`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        challengeId: numChallengeId,
        title: title || '작업물',
        content: content || '', // 백엔드가 content를 필수로 요구하므로 빈 문자열이라도 전달
        originalUrl: originalUrl || null,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('작업물 생성 실패 응답:', response.status, errorText);
      throw new Error('작업물 생성 실패');
    }

    const result = await response.json();
    return result?.data || result;
  } catch (error) {
    console.error('createWork 에러:', error);
    throw error;
  }
}

/**
 * 현재 사용자의 Work 조회 (챌린지별)
 */
export async function getMyWork(challengeId, userId) {
  try {
    const token = getStoredToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // challengeId와 userId를 숫자로 변환 (백엔드가 Int 타입을 기대함)
    const numChallengeId = typeof challengeId === 'string' ? parseInt(challengeId, 10) : challengeId;
    const numUserId = userId ? (typeof userId === 'string' ? parseInt(userId, 10) : userId) : null;

    // userId가 있으면 필터링, 없으면 모든 Work 조회
    const url = numUserId 
      ? `${API_BASE_URL}/works?challengeId=${numChallengeId}&userId=${numUserId}`
      : `${API_BASE_URL}/works?challengeId=${numChallengeId}`;
    
    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('작업물 조회 실패 응답:', response.status, errorText);
      throw new Error('작업물 조회 실패');
    }

    const result = await response.json();
    const works = result?.data || result?.items || [];
    // 현재 사용자의 Work 중 첫 번째 것 반환 (보통 1개)
    return works.length > 0 ? works[0] : null;
  } catch (error) {
    console.error('getMyWork 에러:', error);
    throw error;
  }
}

/**
 * 챌린지 수정
 */
export async function updateChallenge(challengeId, data) {
  try {
    return await request(`/challenges/${challengeId}`, {
      method: 'PATCH',
      body: data,
    });
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
    return await request(`/challenges/${challengeId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('deleteChallenge 에러:', error);
    throw error;
  }
}

/**
 * API 응답을 공통 인터페이스로 변환
 */
function adaptChallengeToCommon(apiData) {
  // docType을 한글로 변환
  const docTypeToKorean = (docType) => {
    if (docType === 'OFFICIAL_DOCUMENT') return '공식문서';
    if (docType === 'BLOG') return '블로그';
    return '공식문서'; // 기본값
  };

  // challengeStatus를 프론트엔드 status로 변환
  const mapChallengeStatus = (status) => {
    if (status === 'CLOSED') return 'closed';
    if (status === 'IN_PROGRESS') return 'live';
    return 'live'; // 기본값
  };

  // 참여자 수 계산 (작성자 포함)
  // 백엔드의 _count.participants는 ChallengeParticipant 테이블의 개수만 카운트하므로
  // 작성자(userId)를 포함하기 위해 +1을 해야 합니다.
  const participantCount = (apiData._count?.participants || 0) + 1; // 작성자 포함
  const maxParticipants = apiData.maxParticipants || 15;
  const isRecruitFull = participantCount >= maxParticipants;
  
  // status 결정: 마감되었거나 모집이 완료된 경우
  let status = mapChallengeStatus(apiData.challengeStatus);
  if (status === 'live' && isRecruitFull) {
    status = 'recruitClosed';
  }

  return {
    challengeId: String(apiData.id),
    title: apiData.title || '',
    type: apiData.field || '', // field 값을 type으로 사용 (예: "프론트엔드", "Next.js" 등)
    category: docTypeToKorean(apiData.docType), // "공식문서" 또는 "블로그"
    description: apiData.content || '', // content를 description으로 사용
    author: {
      userId: String(apiData.user?.id || ''),
      nickname: apiData.user?.nickname || '',
    },
    status: status, // 'live' | 'closed' | 'recruitClosed'
    deadline: formatDate(apiData.deadlineAt), // deadlineAt을 deadline으로 변환
    participantCount: participantCount,
    maxParticipants: maxParticipants,
    sourceUrl: apiData.sourceUrl || '', // 챌린지 생성 시 입력한 원문 URL
    originalWorkId: String(apiData.originalWorkId || ''), // 백엔드에 없을 수 있음
    isMine: apiData.isMine || false, // 백엔드에 없을 수 있음
    isParticipating: apiData.isParticipating || false, // 백엔드에 없을 수 있음
    topTranslations: (apiData.topTranslations || []).map(adaptTranslation), // 백엔드에 없을 수 있음
    participants: (apiData.participants || []).map(adaptParticipant), // 백엔드에 없을 수 있음
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
  // 백엔드 응답: { id, userId, user: { id, nickname, profileImage } }
  const userData = apiParticipant.user || apiParticipant;
  return {
    participantId: apiParticipant.id,
    userId: String(userData.user_id || userData.id || apiParticipant.userId),
    nickname: userData.nickname || apiParticipant.nickname || '',
    profileImage: userData.profileImage || 'USER',
    rank: apiParticipant.rank,
    likeCount: apiParticipant.like_count || 0,
    role: apiParticipant.role || '일반',
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
