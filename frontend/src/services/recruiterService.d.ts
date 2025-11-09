import type { CandidatePreview } from "../types";
interface RecruiterSearchPayload {
    query: string;
    filters?: Record<string, unknown>;
    top_k?: number;
}
interface AccessRequestPayload {
    candidate_id: string;
    role_id: string;
    message: string;
}
export interface AccessRequestResponse {
    request_id: string;
    status: "pending" | "approved" | "rejected";
    expires_at: string;
}
export declare const searchCandidates: (payload: RecruiterSearchPayload) => Promise<CandidatePreview[]>;
export declare const requestCandidateAccess: (payload: AccessRequestPayload) => Promise<AccessRequestResponse>;
export {};
