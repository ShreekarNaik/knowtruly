import type { MatchQuery, MatchResult } from "../types";
interface UseMatchResultsArgs {
    query: MatchQuery;
    enabled?: boolean;
}
export declare const useMatchResults: ({ query, enabled }: UseMatchResultsArgs) => import("@tanstack/react-query").UseQueryResult<{
    matches: MatchResult[];
    queryEmbeddingId: string;
    matchedAt: string;
}, Error>;
export {};
