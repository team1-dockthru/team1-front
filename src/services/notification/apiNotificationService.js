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

export async function markNotificationRead(id, { token } = {}) {
  if (!id) {
    throw new Error("알림 ID가 필요합니다.");
  }
  return request(`/notifications/${id}/read`, {
    method: "POST",
    token: token || getStoredToken(),
  });
}
