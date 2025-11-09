export interface CandidatePreview {
  candidateId: string;
  name?: string;
  headline: string;
  matchScore: number;
  previewOnly: boolean;
}

export interface AccessRequest {
  requestId: string;
  candidateId: string;
  roleId: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  expiresAt?: string;
}
