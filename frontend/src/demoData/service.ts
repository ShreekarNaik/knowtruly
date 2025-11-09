import type {
  AuthUser,
  CandidatePreview,
  MatchQuery,
  MatchResult,
  Profile,
  ResumeDetail,
  ResumeGenerationOptions,
  ResumeSummary,
  TemplateDetail,
  VerifiableClaim
} from "../types";
import {
  demoAuditLog,
  demoClaims,
  demoMatchResults,
  demoProfile,
  demoRecruiterCandidates,
  demoResumeDetails,
  demoResumes,
  demoTemplates
} from "./data";

let currentUser: AuthUser = {
  id: "demo-user",
  email: "sophia@knowtruly.me",
  name: "Sophia Carter",
  role: "student",
  profileId: "demo-profile"
};

export const demoAuth = {
  async login(email: string, _password: string) {
    const normalized = email.toLowerCase();
    if (normalized.includes("recruiter")) {
      currentUser = {
        id: "demo-recruiter",
        email,
        name: "Alex Rivera",
        role: "recruiter"
      };
    } else if (normalized.includes("issuer")) {
      currentUser = {
        id: "demo-issuer",
        email,
        name: "Credential Office",
        role: "issuer"
      };
    } else if (normalized.includes("admin")) {
      currentUser = {
        id: "demo-admin",
        email,
        name: "System Admin",
        role: "admin"
      };
    } else {
      currentUser = {
        id: "demo-user",
        email,
        name: "Sophia Carter",
        role: "student",
        profileId: "demo-profile"
      };
    }

    return {
      access_token: "demo-token",
      token_type: "bearer",
      user: currentUser
    };
  },
  async register(email: string, role: AuthUser["role"]) {
    currentUser = {
      id: `demo-${role}`,
      email,
      name: "Demo User",
      role
    };
    return {
      user_id: currentUser.id,
      email,
      access_token: "demo-token"
    };
  },
  async getCurrentUser() {
    return currentUser;
  }
};

export const demoProfiles = {
  async getProfile(_profileId: string): Promise<Profile> {
    return demoProfile;
  },
  async listProfiles(): Promise<Profile[]> {
    return [demoProfile];
  }
};

export const demoResumesApi = {
  async listResumes(): Promise<ResumeSummary[]> {
    return demoResumes;
  },
  async getResumeDetail(resumeId: string): Promise<ResumeDetail> {
    return demoResumeDetails[resumeId] ?? demoResumeDetails["resume-1"];
  },
  async generateResume(options: ResumeGenerationOptions) {
    const timestamp = new Date().toISOString();
    return {
      resume_id: "demo-generated",
      snapshot_id: "snapshot-generated",
      download_url: "/demo/resumes/generated.pdf",
      generation_metadata: {
        rephrasedSections: options.ai_rephrase ? ["summary"] : [],
        templateUsed: "tmpl-modern",
        generatedAt: timestamp
      }
    };
  }
};

export const demoTemplatesApi = {
  async listTemplates(): Promise<TemplateDetail[]> {
    return demoTemplates;
  },
  async getTemplateDetail(templateId: string): Promise<TemplateDetail | undefined> {
    return demoTemplates.find((template) => template.templateId === templateId);
  }
};

export const demoMatchmaker = {
  async runMatch(_payload: MatchQuery): Promise<{ matches: MatchResult[]; query_embedding_id: string; matched_at: string }> {
    return {
      matches: demoMatchResults,
      query_embedding_id: "demo-query-embedding",
      matched_at: demoMatchResults[0]?.matchedAt ?? new Date().toISOString()
    };
  }
};

export const demoRecruiterApi = {
  async searchCandidates(): Promise<CandidatePreview[]> {
    return demoRecruiterCandidates;
  },
  async requestAccess(candidateId: string, roleId: string, message: string) {
    return {
      request_id: "request-demo",
      status: "pending" as const,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      candidate_id: candidateId,
      role_id: roleId,
      message
    };
  }
};

export const demoIssuerApi = {
  async listClaims(): Promise<VerifiableClaim[]> {
    return demoClaims;
  },
  async signClaim() {
    const signedAt = new Date().toISOString();
    return {
      signature_id: "signature-demo",
      signature: "demo-signature",
      algorithm: "RSA-SHA256",
      signed_at: signedAt,
      signatureId: "signature-demo",
      signedAt
    };
  },
  async verifySignature(_signatureId: string) {
    return {
      valid: true,
      issuer_id: "issuer-knowtruly",
      issuer_name: "KnowTruly Credentialing",
      signed_at: new Date().toISOString(),
      claim_payload: demoClaims[0]?.claimPayload ?? {}
    };
  }
};

export const demoAuditApi = {
  async getAuditLogs() {
    return demoAuditLog;
  }
};
