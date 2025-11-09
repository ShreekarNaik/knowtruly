import { useClaims } from "../../hooks/useClaims";

export const IssuerDashboardPage = () => {
  const { data: claims } = useClaims();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Issuer Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          Issue and manage cryptographic claims for candidate achievements. Claims sync with the student verification page.
        </p>
      </header>

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
              {claim.claimType.toUpperCase()} claim for {claim.subjectProfileId}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Signed {new Date(claim.issuedAt).toLocaleDateString()} · Expires{" "}
              {claim.expiresAt ? new Date(claim.expiresAt).toLocaleDateString() : "N/A"}
            </p>
          </article>
        ))}
        {!claims?.length && <p className="text-sm text-slate-500">No claims yet. Create one from the Sign Claim tab.</p>}
      </div>
    </section>
  );
};
