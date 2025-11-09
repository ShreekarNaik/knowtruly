import { type GenerateResumePayload } from "../services/resumeService";
import type { ResumeDetail, ResumeSummary } from "../types";
export declare const useResumeList: (profileId?: string) => import("@tanstack/react-query").UseQueryResult<ResumeSummary[], Error>;
export declare const useResumeDetail: (resumeId?: string) => import("@tanstack/react-query").UseQueryResult<ResumeDetail, Error>;
export declare const useGenerateResumeMutation: (profileId?: string) => import("@tanstack/react-query").UseMutationResult<{
    resume_id: string;
    snapshot_id: string;
    download_url: string;
    generation_metadata: {
        rephrasedSections: string[];
        templateUsed: string;
        generatedAt: string;
    };
}, Error, GenerateResumePayload, unknown>;
