import type { AuditLogResponse } from "../types";
export declare const useAuditLog: (entityId?: string) => import("@tanstack/react-query").UseQueryResult<AuditLogResponse, Error>;
