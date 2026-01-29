const API_BASE_URL = "https://team1-back-1.onrender.com";

const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token") || null;
  }
  return null;
};

async function request(path, { method = "GET", body, token } = {}) {
  const headers = {
    accept: "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

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

  let errorMessage = "요청에 실패했습니다.";
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
  if (entries.length === 0) return "";
  const searchParams = new URLSearchParams(entries);
  return `?${searchParams.toString()}`;
}

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function getChallengeLabel(title) {
  return title ? `'${title}'` : "챌린지";
}

function buildNotificationContent(notification, challengeTitle) {
  const label = getChallengeLabel(challengeTitle);
  const type = String(notification?.type || "").toUpperCase();

  switch (type) {
    case "REQUEST_APPROVED":
    case "CHALLENGE_REQUEST_APPROVED":
      return `${label} 신청이 승인되었어요`;
    case "REQUEST_REJECTED":
    case "CHALLENGE_REQUEST_REJECTED":
      return `${label} 신청이 거절되었어요`;
    case "REQUEST_CANCELLED":
    case "CHALLENGE_REQUEST_CANCELLED":
      return `${label} 신청이 취소되었어요`;
    case "CHALLENGE_CLOSED":
    case "CHALLENGE_DEADLINE_PASSED":
      return `${label} 챌린지가 마감되었어요`;
    case "WORK_CREATED":
      return `${label}에 새로운 작업물이 등록되었어요`;
    case "FEEDBACK_CREATED":
      return `${label} 작업물에 피드백이 추가되었어요`;
    case "FEEDBACK_UPDATED":
      return `${label} 작업물의 피드백이 수정되었어요`;
    case "FEEDBACK_DELETED":
      return `${label} 작업물의 피드백이 삭제되었어요`;
    default:
      return notification?.message
        ? `${label} ${notification.message}`
        : `${label} 알림이 도착했어요`;
  }
}

export async function getNotifications(
  { cursor, limit = 10, includeRead = false } = {}
) {
  const query = buildQuery({ cursor, limit, includeRead });
  const data = await request(`/notifications${query}`, {
    method: "GET",
    token: getStoredToken(),
  });
  const items = data?.data || [];
  const { getChallengeDetailRaw } = await import("@/services/challenge");

  const challengeIds = [
    ...new Set(items.map((item) => item?.challengeId).filter(Boolean)),
  ];
  const challengeTitleMap = {};

  await Promise.all(
    challengeIds.map(async (challengeId) => {
      try {
        const detail = await getChallengeDetailRaw(challengeId);
        const title = detail?.title || detail?.data?.title;
        if (title) {
          challengeTitleMap[challengeId] = title;
        }
      } catch {
        // ignore challenge fetch failures
      }
    })
  );

  const notifications = items.map((notification) => {
    const challengeTitle =
      notification?.challengeId && challengeTitleMap[notification.challengeId]
        ? challengeTitleMap[notification.challengeId]
        : "";
    return {
      id: notification.id,
      content: buildNotificationContent(notification, challengeTitle),
      date: formatDate(notification.createdAt),
      readAt: notification.readAt || null,
      type: notification.type,
      challengeId: notification.challengeId,
      workId: notification.workId,
    };
  });

  return {
    notifications,
    nextCursor: data?.nextCursor || null,
    hasNext: Boolean(data?.hasNext),
  };
}

export async function markNotificationRead(id, { token } = {}) {
  if (!id) {
    throw new Error("알림 ID가 필요합니다.");
  }
  return request(`/notifications/${id}/read`, {
    method: "POST",
    token: token || getStoredToken(),
  });
}
