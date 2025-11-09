import { useMemo } from "react";
import { useAuditLog } from "../../hooks/useAuditLog";
import { useMatchResults } from "../../hooks/useMatchResults";
import { useProfile } from "../../hooks/useProfile";
import { useResumeList } from "../../hooks/useResumes";

export const StudentDashboardPage = () => {
  const { data: profile } = useProfile();
  const { data: resumes } = useResumeList();
  const matchQuery = useMemo(
    () => ({
      roleDescriptor: {
        title: "Frontend Lead",
        description: "Lead end-to-end delivery of the KnowTruly recruiter portal experience.",
        requiredSkills: ["React", "TypeScript", "FastAPI"]
      },
      topK: 3
    }),
    []
  );
  const { data: matchData } = useMatchResults({ query: matchQuery });
  const { data: auditLog } = useAuditLog(profile?.id);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0f1624] to-[#101b2c] p-8 shadow-2xl md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Digital Twin</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-100">
            {profile?.canonicalName ?? "Loading profile..."}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">{profile?.summary}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-4 text-sky-200">
            <p className="text-2xl font-semibold">{profile?.skills.length ?? 0}</p>
            <p className="text-xs uppercase tracking-[0.25em]">Skills tracked</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-200">
            <p className="text-2xl font-semibold">{resumes?.length ?? 0}</p>
            <p className="text-xs uppercase tracking-[0.25em]">Resumes</p>
          </div>
          <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-4 text-violet-200">
            <p className="text-2xl font-semibold">{matchData?.matches.length ?? 0}</p>
            <p className="text-xs uppercase tracking-[0.25em]">Live matches</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Recent resume snapshots</h2>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Typst pipeline</span>
          </header>
          <div className="mt-4 space-y-3">
            {resumes?.map((resume) => (
              <article
                key={resume.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-200">{resume.name}</p>
                  <p className="text-xs text-slate-500">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()} · Template {resume.templateId}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <progress
                    max={100}
                    value={resume.progress}
                    className="h-2 w-20 overflow-hidden rounded-full bg-slate-800 [&::-webkit-progress-value]:bg-sky-500 [&::-webkit-progress-bar]:bg-slate-800"
                  />
                  <span>{resume.progress}%</span>
                </div>
              </article>
            ))}
            {!resumes?.length && <p className="text-sm text-slate-500">No resumes generated yet.</p>}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">Latest match explanations</h2>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Semantic engine</span>
          </header>
          <div className="mt-4 space-y-3">
            {matchData?.matches.map((match) => (
              <article key={match.candidateId} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-slate-200">Score {(match.score * 100).toFixed(0)}%</p>
                  <p className="text-xs text-slate-500">
                    Matched {new Date(match.matchedAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Top skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {match.explanation.topMatchingSkills.map((skill) => (
                    <span key={skill.skill} className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
                      {skill.skill} · {(skill.confidence * 100).toFixed(0)}%
                    </span>
                  ))}
                </div>
                {match.explanation.gaps.length > 0 && (
                  <p className="mt-2 text-xs text-amber-300">
                    Gap: {match.explanation.gaps[0]}
                  </p>
                )}
              </article>
            ))}
            {!matchData?.matches.length && <p className="text-sm text-slate-500">Run a role match to see results.</p>}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Audit activity</h2>
          <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Trust trail</span>
        </header>
        <div className="mt-4 space-y-3">
          {auditLog?.logs.map((log) => (
            <div key={log.timestamp} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm">
              <div>
                <p className="font-semibold text-slate-200">{log.action.replace("_", " ")}</p>
                <p className="text-xs text-slate-500">
                  {log.actorName ?? log.actorId} · {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                {Object.keys(log.metadata).join(", ")}
              </span>
            </div>
          ))}
          {!auditLog?.logs.length && <p className="text-sm text-slate-500">No audit entries yet.</p>}
        </div>
      </section>
    </section>
  );
};
