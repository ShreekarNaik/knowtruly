import { useClaims } from "../../hooks/useClaims";
import { useMatchResults } from "../../hooks/useMatchResults";
import { useProfilesList } from "../../hooks/useProfile";
import { useTemplates } from "../../hooks/useTemplates";

export const AdminDashboardPage = () => {
  const { data: profiles } = useProfilesList();
  const { data: templates } = useTemplates();
  const { data: claims } = useClaims();
  const { data: matchResults } = useMatchResults({
    query: {
      roleDescriptor: {
        title: "System Health Check",
        description: "Sample query used for administrative monitoring.",
        requiredSkills: ["FastAPI"]
      },
      topK: 1
    }
  });

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          Monitor data counts and ensure services respond even when the backend is offline by leveraging demo mode.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profiles</p>
          <p className="mt-2 text-3xl font-semibold text-slate-100">{profiles?.length ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Templates</p>
          <p className="mt-2 text-3xl font-semibold text-slate-100">{templates?.length ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Claims</p>
          <p className="mt-2 text-3xl font-semibold text-slate-100">{claims?.length ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Match latency</p>
          <p className="mt-2 text-3xl font-semibold text-slate-100">
            {matchResults?.matches[0] ? `${(matchResults.matches[0].score * 100).toFixed(0)}%` : "—"}
          </p>
        </div>
      </div>
    </section>
  );
};
