import { type LoginPayload, type RegisterPayload } from "../services/authService";
import type { AuthUser } from "../types";
export declare const useCurrentUser: () => import("@tanstack/react-query").UseQueryResult<AuthUser, Error>;
export declare const useLoginMutation: () => import("@tanstack/react-query").UseMutationResult<{
    token: string;
    user: AuthUser;
}, Error, LoginPayload, unknown>;
export declare const useRegisterMutation: () => import("@tanstack/react-query").UseMutationResult<import("../services/authService").RegisterResponse, Error, RegisterPayload, unknown>;
