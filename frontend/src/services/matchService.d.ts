import type { MatchQuery, MatchResult } from "../types";
interface MatchResponse {
    matches: MatchResult[];
    query_embedding_id: string;
    matched_at: string;
}
interface BatchMatchPayload {
    role_id: string;
    candidate_ids: string[];
    return_explanations?: boolean;
}
interface BatchMatchResponse {
    matches: MatchResult[];
    batch_id: string;
}
export declare const runMatch: (payload: MatchQuery) => Promise<MatchResponse>;
export declare const runBatchMatch: (payload: BatchMatchPayload) => Promise<BatchMatchResponse>;
export {};
