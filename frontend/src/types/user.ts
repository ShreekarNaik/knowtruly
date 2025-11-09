export type UserRole = "student" | "recruiter" | "issuer" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileId?: string;
}
