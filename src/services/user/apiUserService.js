export async function getCurrentUser() {
  const response = await fetch('/api/me');
  const data = await response.json();
  return {
    isLoggedIn: data.isLoggedIn,
    role: data.role,
    hasNotification: data.hasNotification,
  };
}