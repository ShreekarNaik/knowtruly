import { type SignClaimPayload } from "../services/issuerService";
import type { VerifiableClaim } from "../types";
export declare const useClaims: () => import("@tanstack/react-query").UseQueryResult<VerifiableClaim[], Error>;
export declare const useSignClaimMutation: () => import("@tanstack/react-query").UseMutationResult<import("../services/issuerService").SignClaimResponse, Error, SignClaimPayload, unknown>;
export declare const useVerifySignatureMutation: () => import("@tanstack/react-query").UseMutationResult<{
    valid: boolean;
    issuer_id: string;
    issuer_name: string;
    signed_at: string;
    claim_payload: Record<string, unknown>;
}, Error, string, unknown>;
