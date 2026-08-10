import { apiClient } from "./apiClient";

const STORAGE_KEY = "user";

export const login = (credentials) => apiClient.post("/api/auth/login", credentials);

export const saveUser = (user) => localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

export const getUser = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? null : JSON.parse(saved);
};

export const logout = () => localStorage.removeItem(STORAGE_KEY);