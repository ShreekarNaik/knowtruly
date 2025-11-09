export interface AuditLogEntry {
  action: "profile_updated" | "signature_verified" | "access_granted" | "resume_generated" | "role_matched";
  actorId: string;
  actorName?: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface AuditLogResponse {
  entityId: string;
  logs: AuditLogEntry[];
}
