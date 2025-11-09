import type { AuthUser } from "../types";
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
export declare const login: (payload: LoginPayload) => Promise<LoginResponse>;
export declare const register: (payload: RegisterPayload) => Promise<RegisterResponse>;
export declare const fetchCurrentUser: () => Promise<AuthUser>;
