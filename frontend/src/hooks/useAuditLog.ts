import { useQuery } from "@tanstack/react-query";
import { demoAuditApi } from "../demoData/service";
import { getAuditLogs } from "../services/auditService";
import { useConfigStore } from "../stores/configStore";
import type { AuditLogResponse } from "../types";

export const useAuditLog = (entityId?: string) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["audit", entityId, useDemoData],
    queryFn: async (): Promise<AuditLogResponse> => {
      if (useDemoData) {
        return demoAuditApi.getAuditLogs();
      }
      if (!entityId) {
        throw new Error("Entity ID is required");
      }
      return getAuditLogs(entityId);
    },
    enabled: Boolean(entityId) || useDemoData
  });
};
