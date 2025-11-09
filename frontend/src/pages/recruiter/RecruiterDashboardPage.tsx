import { useRecruiterSearch } from "../../hooks/useRecruiter";

export const RecruiterDashboardPage = () => {
  const { data: candidates } = useRecruiterSearch({
    query: "Senior software engineer",
    top_k: 3
  });

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Recruiter Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          Review saved searches, candidate matches, and access requests. Demo mode provides seed results instantly.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <h2 className="text-lg font-semibold text-slate-100">Recommended matches</h2>
        <div className="mt-4 space-y-3">
          {candidates?.map((candidate) => (
            <article key={candidate.candidateId} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-100">{candidate.name ?? "Redacted profile"}</p>
                  <p className="text-xs text-slate-500">{candidate.headline}</p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
                  Match {(candidate.matchScore * 100).toFixed(0)}%
                </span>
              </div>
            </article>
          ))}
          {!candidates?.length && <p className="text-sm text-slate-500">Run a search to populate matches.</p>}
        </div>
      </section>
    </section>
  );
};
