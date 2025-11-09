import type { ResumeDetail, ResumeGenerationOptions, ResumeSummary } from "../types";
import { apiClient } from "./api";

export interface GenerateResumePayload {
  profile_id: string;
  template_id: string;
  role_descriptor: {
    title: string;
    description: string;
    required_skills: string[];
  };
  options: ResumeGenerationOptions;
}

interface GenerateResumeResponse {
  resume_id: string;
  snapshot_id: string;
  download_url: string;
  generation_metadata: ResumeDetail["generationMetadata"];
}

export const listResumes = async (profileId: string) => {
  const { data } = await apiClient.get<{ resumes: ResumeSummary[] }>(`/profiles/${profileId}/resumes`);
  return data.resumes;
};

export const generateResume = async (payload: GenerateResumePayload) => {
  const { data } = await apiClient.post<GenerateResumeResponse>("/resumes/generate", payload);
  return data;
};

export const getResumeDetail = async (resumeId: string) => {
  const { data } = await apiClient.get<ResumeDetail>(`/resumes/${resumeId}`);
  return data;
};
