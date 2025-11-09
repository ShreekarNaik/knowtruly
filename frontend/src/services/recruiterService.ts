import type { CandidatePreview } from "../types";
import { apiClient } from "./api";

interface RecruiterSearchPayload {
  query: string;
  filters?: Record<string, unknown>;
  top_k?: number;
}

interface RecruiterSearchResponse {
  candidates: CandidatePreview[];
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

export const searchCandidates = async (payload: RecruiterSearchPayload) => {
  const { data } = await apiClient.post<RecruiterSearchResponse>("/recruiter/search", payload);
  return data.candidates;
};

export const requestCandidateAccess = async (payload: AccessRequestPayload) => {
  const { data } = await apiClient.post<AccessRequestResponse>("/recruiter/request-access", payload);
  return data;
};
