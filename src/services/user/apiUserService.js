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

export async function signup({ email, password, nickname, profileImage = "USER" }) {
  return request("/auth/signup", {
    method: "POST",
    body: { email, password, nickname, profileImage },
  });
}

export async function login({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function googleLogin({ idToken }) {
  return request("/auth/google", {
    method: "POST",
    body: { idToken },
  });
}

export async function logout({ token } = {}) {
  return request("/auth/logout", {
    method: "POST",
    token: token || getStoredToken(),
  });
}

export async function getCurrentUser({ token } = {}) {
  const response = await request("/auth/me", {
    method: "GET",
    token: token || getStoredToken(),
  });

  const user =
    response?.data?.user ||
    response?.user ||
    response?.data;
  if (!user) {
    return {
      isLoggedIn: false,
      role: "guest",
      hasNotification: false,
    };
  }

  const roleValue = String(user.role || "USER").toLowerCase();
  const role = roleValue === "admin" ? "admin" : "member";

  return {
    isLoggedIn: true,
    role,
    hasNotification: false,
    user,
  };
}
