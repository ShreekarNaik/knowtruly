import type { UserRole } from "../../types";
interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}
export declare const ProtectedRoute: ({ allowedRoles }: ProtectedRouteProps) => import("react/jsx-runtime").JSX.Element;
export {};
