import { type AccessRequestResponse } from "../services/recruiterService";
import type { CandidatePreview } from "../types";
interface CandidateSearchPayload {
    query: string;
    filters?: Record<string, unknown>;
    top_k?: number;
}
export declare const useRecruiterSearch: (payload?: CandidateSearchPayload) => import("@tanstack/react-query").UseQueryResult<CandidatePreview[], Error>;
export declare const useAccessRequestMutation: () => import("@tanstack/react-query").UseMutationResult<AccessRequestResponse, unknown, {
    candidate_id: string;
    role_id: string;
    message: string;
}, unknown>;
export {};
