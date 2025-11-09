import { useMutation, useQuery } from "@tanstack/react-query";
import { demoRecruiterApi } from "../demoData/service";
import { requestCandidateAccess, searchCandidates, type AccessRequestResponse } from "../services/recruiterService";
import { useConfigStore } from "../stores/configStore";
import type { CandidatePreview } from "../types";

interface CandidateSearchPayload {
  query: string;
  filters?: Record<string, unknown>;
  top_k?: number;
}

export const useRecruiterSearch = (payload?: CandidateSearchPayload) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["recruiter-search", payload, useDemoData],
    queryFn: async (): Promise<CandidatePreview[]> => {
      if (useDemoData) {
        return demoRecruiterApi.searchCandidates();
      }
      if (!payload?.query) {
        return [];
      }
      return searchCandidates(payload);
    },
    enabled: useDemoData || Boolean(payload?.query)
  });
};

export const useAccessRequestMutation = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useMutation<AccessRequestResponse, unknown, { candidate_id: string; role_id: string; message: string }>({
    mutationFn: async (payload: { candidate_id: string; role_id: string; message: string }) => {
      if (useDemoData) {
        return demoRecruiterApi.requestAccess(payload.candidate_id, payload.role_id, payload.message);
      }
      return requestCandidateAccess(payload);
    }
  });
};
