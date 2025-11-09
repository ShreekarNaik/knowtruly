import { useMutation, useQuery } from "@tanstack/react-query";
import { demoIssuerApi } from "../demoData/service";
import { listClaims, signClaim, verifySignature, type SignClaimPayload } from "../services/issuerService";
import { useConfigStore } from "../stores/configStore";
import type { VerifiableClaim } from "../types";

export const useClaims = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["claims", useDemoData],
    queryFn: async (): Promise<VerifiableClaim[]> => {
      if (useDemoData) {
        return demoIssuerApi.listClaims();
      }
      return listClaims();
    }
  });
};

export const useSignClaimMutation = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useMutation({
    mutationFn: async (payload: SignClaimPayload) => {
      if (useDemoData) {
        return demoIssuerApi.signClaim();
      }
      return signClaim(payload);
    }
  });
};

export const useVerifySignatureMutation = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useMutation({
    mutationFn: async (signatureId: string) => {
      if (useDemoData) {
        return demoIssuerApi.verifySignature(signatureId);
      }
      return verifySignature(signatureId);
    }
  });
};
