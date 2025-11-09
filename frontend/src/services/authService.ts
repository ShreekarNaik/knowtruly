import type { AuthUser } from "../types";
import { apiClient } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
  user?: AuthUser;
}

export interface RegisterPayload extends LoginPayload {
  role: "student" | "recruiter" | "issuer" | "admin";
}

export interface RegisterResponse {
  user_id: string;
  email: string;
  access_token?: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<RegisterResponse>("/auth/register", payload);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await apiClient.get<AuthUser>("/auth/me");
  return data;
};
