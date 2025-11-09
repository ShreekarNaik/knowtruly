import type { AuditLogResponse } from "../types";
import { apiClient } from "./api";

export const getAuditLogs = async (entityId: string) => {
  const { data } = await apiClient.get<AuditLogResponse>(`/audit/${entityId}`);
  return data;
};
