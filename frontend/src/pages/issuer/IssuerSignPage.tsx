import { FormEvent, useState } from "react";
import { useSignClaimMutation } from "../../hooks/useClaims";

export const IssuerSignPage = () => {
  const [issuerToken, setIssuerToken] = useState("demo-issuer-token");
  const [claimType, setClaimType] = useState<"degree" | "skill" | "employment" | "project">("employment");
  const [payload, setPayload] = useState('{"company": "KnowTruly.me", "title": "Founding Engineer"}');
  const signMutation = useSignClaimMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payloadJson = JSON.parse(payload);
    await signMutation.mutateAsync({
      issuer_token: issuerToken,
      claim: {
        type: claimType,
        payload: payloadJson
      }
    });
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Sign Claim</h1>
        <p className="mt-2 text-sm text-slate-400">Provide claim payload to sign with the configured RSA keys.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Issuer token
          <input
            value={issuerToken}
            onChange={(event) => setIssuerToken(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Claim type
          <select
            value={claimType}
            onChange={(event) => setClaimType(event.target.value as typeof claimType)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          >
            <option value="employment">Employment</option>
            <option value="degree">Degree</option>
            <option value="skill">Skill</option>
            <option value="project">Project</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Claim payload (JSON)
          <textarea
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            rows={4}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={signMutation.isPending}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50"
        >
          <span className="material-icons-sharp text-base">ink_pen</span>
          {signMutation.isPending ? "Signing..." : "Sign Claim"}
        </button>
        {signMutation.isSuccess && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Signature {signMutation.data.signature_id ?? signMutation.data.signatureId} created at{" "}
            {new Date(signMutation.data.signed_at ?? signMutation.data.signedAt ?? "").toLocaleString()}.
          </div>
        )}
      </form>
    </section>
  );
};
