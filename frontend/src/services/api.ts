import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const baseURL = (typeof import.meta !== "undefined" && import.meta.env.VITE_API_BASE_URL) || "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
