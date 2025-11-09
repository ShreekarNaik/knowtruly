import { useQuery } from "@tanstack/react-query";
import { demoMatchmaker } from "../demoData/service";
import { runMatch } from "../services/matchService";
import { useConfigStore } from "../stores/configStore";
import type { MatchQuery, MatchResult } from "../types";

interface UseMatchResultsArgs {
  query: MatchQuery;
  enabled?: boolean;
}

export const useMatchResults = ({ query, enabled = true }: UseMatchResultsArgs) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["matchResults", query, useDemoData],
    queryFn: async (): Promise<{ matches: MatchResult[]; queryEmbeddingId: string; matchedAt: string }> => {
      if (useDemoData) {
        const response = await demoMatchmaker.runMatch(query);
        return {
          matches: response.matches,
          queryEmbeddingId: response.query_embedding_id,
          matchedAt: response.matched_at
        };
      }
      const response = await runMatch(query);
      return {
        matches: response.matches,
        queryEmbeddingId: response.query_embedding_id,
        matchedAt: response.matched_at
      };
    },
    enabled
  });
};
