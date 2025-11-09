import { useClaims } from "../../hooks/useClaims";

export const VerificationPage = () => {
  const { data: claims, isLoading } = useClaims();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Verification & Claims</h1>
        <p className="mt-2 text-sm text-slate-400">
          Signed claims provide cryptographic assurance for recruiters. Issue and verify signatures from the issuer portal.
        </p>
      </header>

      {isLoading && <p className="text-sm text-slate-400">Loading claims...</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {claims?.map((claim) => (
          <article key={claim.claimId} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">{claim.issuerName}</h2>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
                {claim.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              {claim.claimType.toUpperCase()} · Signed {new Date(claim.issuedAt).toLocaleDateString()}
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-300">
              <pre className="whitespace-pre-wrap">{JSON.stringify(claim.claimPayload, null, 2)}</pre>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Signature: <code className="text-slate-300">{claim.signatureAlgorithm}</code>
            </p>
          </article>
        ))}
        {!claims?.length && !isLoading && (
          <p className="rounded-2xl border border-dashed border-slate-800 bg-[#0d1219] p-6 text-center text-sm text-slate-500">
            No claims yet. Switch to the issuer portal to sign new credentials.
          </p>
        )}
      </div>
    </section>
  );
};
