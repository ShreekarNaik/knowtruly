import type { MatchQuery, MatchResult } from "../types";
import { apiClient } from "./api";

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

export const runMatch = async (payload: MatchQuery) => {
  const { data } = await apiClient.post<MatchResponse>("/match", payload);
  return data;
};

export const runBatchMatch = async (payload: BatchMatchPayload) => {
  const { data } = await apiClient.post<BatchMatchResponse>("/match/batch", payload);
  return data;
};
