import type { SignatureRecord, VerifiableClaim } from "../types";
import { apiClient } from "./api";

export interface SignClaimPayload {
  issuer_token: string;
  snapshot_id?: string;
  claim: {
    type: "degree" | "skill" | "employment" | "project";
    payload: Record<string, unknown>;
  };
}

export interface SignClaimResponse extends SignatureRecord {
  signature_id: string;
  signed_at?: string;
}

export const listClaims = async () => {
  const { data } = await apiClient.get<{ claims: VerifiableClaim[] }>("/issuer/claims");
  return data.claims;
};

export const signClaim = async (payload: SignClaimPayload) => {
  const { data } = await apiClient.post<SignClaimResponse>("/signatures/sign", payload);
  return data;
};

export const verifySignature = async (signatureId: string) => {
  const { data } = await apiClient.get<{
    valid: boolean;
    issuer_id: string;
    issuer_name: string;
    signed_at: string;
    claim_payload: Record<string, unknown>;
  }>(`/signatures/verify/${signatureId}`);
  return data;
};
