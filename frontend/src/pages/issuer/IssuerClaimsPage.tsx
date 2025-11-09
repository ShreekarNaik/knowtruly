import { useClaims } from "../../hooks/useClaims";

export const IssuerClaimsPage = () => {
  const { data: claims, isLoading } = useClaims();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Issued Claims</h1>
        <p className="mt-2 text-sm text-slate-400">
          Claims appear in the student portal once signed. Track status and expiry to maintain trust.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-[#0f1623] text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Claim</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Issued</th>
              <th className="px-4 py-3 text-left">Expires</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 bg-[#0d1219] text-slate-300">
            {claims?.map((claim) => (
              <tr key={claim.claimId} className="hover:bg-slate-900/40">
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-100">{claim.claimType.toUpperCase()}</p>
                  <p className="text-xs text-slate-500">{claim.claimId}</p>
                </td>
                <td className="px-4 py-4">{claim.subjectProfileId}</td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {new Date(claim.issuedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {claim.expiresAt ? new Date(claim.expiresAt).toLocaleDateString() : "—"}
                </td>
                <td className="px-4 py-4 text-xs uppercase tracking-[0.2em] text-emerald-400">{claim.status}</td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  Loading issued claims...
                </td>
              </tr>
            )}
            {!isLoading && !claims?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
