import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useVerifySignatureMutation } from "../../hooks/useClaims";

export const VerifySignaturePage = () => {
  const params = useParams<{ signature_id: string }>();
  const [signatureId, setSignatureId] = useState(params.signature_id ?? "signature-demo");
  const verifyMutation = useVerifySignatureMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await verifyMutation.mutateAsync(signatureId);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Verify Signature</h1>
        <p className="mt-2 text-sm text-slate-400">
          Provide a signature ID to verify its authenticity. Demo mode returns a mocked verification response.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Signature ID
          <input
            value={signatureId}
            onChange={(event) => setSignatureId(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={verifyMutation.isPending}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50"
        >
          <span className="material-icons-sharp text-base">verified</span>
          {verifyMutation.isPending ? "Verifying..." : "Verify Signature"}
        </button>
      </form>

      {verifyMutation.isSuccess && (
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6 text-sm text-slate-300">
          <p className="text-emerald-300">
            {verifyMutation.data.valid ? "Signature valid" : "Signature invalid"}
          </p>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-slate-400">
            {JSON.stringify(verifyMutation.data.claim_payload, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
};
