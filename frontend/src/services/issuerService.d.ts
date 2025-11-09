import type { SignatureRecord, VerifiableClaim } from "../types";
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
export declare const listClaims: () => Promise<VerifiableClaim[]>;
export declare const signClaim: (payload: SignClaimPayload) => Promise<SignClaimResponse>;
export declare const verifySignature: (signatureId: string) => Promise<{
    valid: boolean;
    issuer_id: string;
    issuer_name: string;
    signed_at: string;
    claim_payload: Record<string, unknown>;
}>;
