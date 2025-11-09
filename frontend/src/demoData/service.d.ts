import type { AuthUser, CandidatePreview, MatchQuery, MatchResult, Profile, ResumeDetail, ResumeGenerationOptions, ResumeSummary, TemplateDetail, VerifiableClaim } from "../types";
export declare const demoAuth: {
    login(email: string, _password: string): Promise<{
        access_token: string;
        token_type: string;
        user: AuthUser;
    }>;
    register(email: string, role: AuthUser["role"]): Promise<{
        user_id: string;
        email: string;
        access_token: string;
    }>;
    getCurrentUser(): Promise<AuthUser>;
};
export declare const demoProfiles: {
    getProfile(_profileId: string): Promise<Profile>;
    listProfiles(): Promise<Profile[]>;
};
export declare const demoResumesApi: {
    listResumes(): Promise<ResumeSummary[]>;
    getResumeDetail(resumeId: string): Promise<ResumeDetail>;
    generateResume(options: ResumeGenerationOptions): Promise<{
        resume_id: string;
        snapshot_id: string;
        download_url: string;
        generation_metadata: {
            rephrasedSections: string[];
            templateUsed: string;
            generatedAt: string;
        };
    }>;
};
export declare const demoTemplatesApi: {
    listTemplates(): Promise<TemplateDetail[]>;
    getTemplateDetail(templateId: string): Promise<TemplateDetail | undefined>;
};
export declare const demoMatchmaker: {
    runMatch(_payload: MatchQuery): Promise<{
        matches: MatchResult[];
        query_embedding_id: string;
        matched_at: string;
    }>;
};
export declare const demoRecruiterApi: {
    searchCandidates(): Promise<CandidatePreview[]>;
    requestAccess(candidateId: string, roleId: string, message: string): Promise<{
        request_id: string;
        status: "pending";
        expires_at: string;
        candidate_id: string;
        role_id: string;
        message: string;
    }>;
};
export declare const demoIssuerApi: {
    listClaims(): Promise<VerifiableClaim[]>;
    signClaim(): Promise<{
        signature_id: string;
        signature: string;
        algorithm: string;
        signed_at: string;
        signatureId: string;
        signedAt: string;
    }>;
    verifySignature(_signatureId: string): Promise<{
        valid: boolean;
        issuer_id: string;
        issuer_name: string;
        signed_at: string;
        claim_payload: Record<string, unknown>;
    }>;
};
export declare const demoAuditApi: {
    getAuditLogs(): Promise<import("../types").AuditLogResponse>;
};
