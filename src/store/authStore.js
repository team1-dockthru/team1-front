import { create } from 'zustand';

const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token') || null;
  }
  return null;
};

export const useAuthStore = create((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth-token', token);
      } else {
        localStorage.removeItem('auth-token');
      }
    }
    set({ token });
  },
  clearToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
    }
    set({ token: null });
  },
}));

