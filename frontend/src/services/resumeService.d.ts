import type { ResumeDetail, ResumeGenerationOptions, ResumeSummary } from "../types";
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
export declare const listResumes: (profileId: string) => Promise<ResumeSummary[]>;
export declare const generateResume: (payload: GenerateResumePayload) => Promise<GenerateResumeResponse>;
export declare const getResumeDetail: (resumeId: string) => Promise<ResumeDetail>;
export {};
