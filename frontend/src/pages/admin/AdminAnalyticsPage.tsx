import { useMatchResults } from "../../hooks/useMatchResults";
import { useResumeList } from "../../hooks/useResumes";

export const AdminAnalyticsPage = () => {
  const { data: resumeList } = useResumeList();
  const { data: matchResults } = useMatchResults({
    query: {
      roleDescriptor: {
        title: "Analytics Probe",
        description: "Internal diagnostic query",
        requiredSkills: ["Monitoring"]
      },
      topK: 3
    }
  });

  const averageProgress =
    resumeList && resumeList.length > 0
      ? Math.round(resumeList.reduce((sum, resume) => sum + resume.progress, 0) / resumeList.length)
      : 0;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Analytics</h1>
        <p className="mt-2 text-sm text-slate-400">
          Quick health snapshot derived from demo data or live API responses. Extend with real monitoring in production.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Average resume readiness</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{averageProgress}%</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Matches evaluated</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{matchResults?.matches.length ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top score</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">
            {matchResults?.matches[0] ? `${(matchResults.matches[0].score * 100).toFixed(0)}%` : "—"}
          </p>
        </div>
      </div>
    </section>
  );
};
