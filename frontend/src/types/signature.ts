export type ClaimStatus = "active" | "revoked" | "expired";

export interface VerifiableClaim {
  claimId: string;
  issuerId: string;
  issuerName: string;
  subjectProfileId: string;
  claimType: "degree" | "skill" | "employment" | "project";
  claimPayload: Record<string, unknown>;
  signature: string;
  signatureAlgorithm: "RSA-SHA256" | "Ed25519";
  issuedAt: string;
  expiresAt?: string;
  status: ClaimStatus;
}

export interface SignatureRecord {
  signatureId: string;
  signature: string;
  algorithm: string;
  signedAt: string;
}
