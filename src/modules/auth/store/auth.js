import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: {
    role: "company", //TODO this test
    fullName: "test user", //TODO this test
  },
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setAuth: (authStatus) => set({ isAuthenticated: authStatus }),
}));
