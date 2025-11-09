import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoResumesApi } from "../demoData/service";
import { generateResume, getResumeDetail, listResumes, type GenerateResumePayload } from "../services/resumeService";
import { useAuthStore } from "../stores/authStore";
import { useConfigStore } from "../stores/configStore";
import type { ResumeDetail, ResumeSummary } from "../types";

export const useResumeList = (profileId?: string) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const fallbackProfileId = useAuthStore((state) => state.user?.profileId);
  const idToLoad = profileId ?? fallbackProfileId ?? (useDemoData ? "demo-profile" : undefined);

  return useQuery({
    queryKey: ["resumes", idToLoad, useDemoData],
    queryFn: async (): Promise<ResumeSummary[]> => {
      if (useDemoData) {
        return demoResumesApi.listResumes();
      }
      if (!idToLoad) {
        throw new Error("Profile ID not available");
      }
      return listResumes(idToLoad);
    },
    enabled: Boolean(idToLoad) || useDemoData
  });
};

export const useResumeDetail = (resumeId?: string) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["resume", resumeId, useDemoData],
    queryFn: async (): Promise<ResumeDetail> => {
      if (useDemoData) {
        return demoResumesApi.getResumeDetail(resumeId ?? "resume-1");
      }
      if (!resumeId) {
        throw new Error("Resume ID is required");
      }
      return getResumeDetail(resumeId);
    },
    enabled: Boolean(resumeId) || useDemoData
  });
};

export const useGenerateResumeMutation = (profileId?: string) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const fallbackProfileId = useAuthStore((state) => state.user?.profileId);
  const idToUse = profileId ?? fallbackProfileId ?? "demo-profile";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: GenerateResumePayload) => {
      if (useDemoData) {
        const response = await demoResumesApi.generateResume({
          ai_rephrase: payload.options.ai_rephrase,
          format: payload.options.format,
          max_pages: payload.options.max_pages
        });
        await queryClient.invalidateQueries({ queryKey: ["resumes", idToUse, useDemoData] });
        return response;
      }
      const response = await generateResume(payload);
      await queryClient.invalidateQueries({ queryKey: ["resumes", idToUse, useDemoData] });
      return response;
    }
  });
};
