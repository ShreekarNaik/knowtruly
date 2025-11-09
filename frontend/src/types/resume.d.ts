export type ResumeFormat = "pdf" | "docx" | "html";
export interface ResumeSummary {
    id: string;
    name: string;
    targetRole: string;
    updatedAt: string;
    progress: number;
    templateId: string;
}
export interface ResumeGenerationOptions {
    ai_rephrase: boolean;
    max_pages?: number;
    format: ResumeFormat;
}
export interface ResumeGenerationMetadata {
    rephrasedSections: string[];
    templateUsed: string;
    generatedAt: string;
}
export interface ResumeDetail {
    resumeId: string;
    profileSnapshotId: string;
    downloadUrl: string;
    format: ResumeFormat;
    createdAt: string;
    generationMetadata: ResumeGenerationMetadata;
}
