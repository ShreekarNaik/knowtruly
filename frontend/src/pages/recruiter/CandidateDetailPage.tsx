import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useRecruiterSearch } from "../../hooks/useRecruiter";

export const RecruiterCandidateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: profile } = useProfile(id);
  const { data: relatedCandidates } = useRecruiterSearch({
    query: "Related candidates",
    top_k: 3
  });

  if (!profile) {
    return <p className="text-sm text-slate-400">Loading candidate data...</p>;
  }

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0f1624] to-[#101c31] p-8">
        <h1 className="text-3xl font-semibold text-slate-100">{profile.canonicalName}</h1>
        <p className="mt-2 text-sm text-slate-300">{profile.summary}</p>
        <p className="mt-3 text-xs text-slate-500">Version {profile.version} · Updated {new Date(profile.updatedAt).toLocaleDateString()}</p>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <h2 className="text-lg font-semibold text-slate-100">Highlighted skills</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {profile.skills.map((skill) => (
            <span
              key={skill.id}
              className={`rounded-full px-3 py-1 ${
                skill.verified ? "bg-emerald-500/10 text-emerald-200" : "bg-slate-800 text-slate-300"
              }`}
            >
              {skill.name} · {skill.proficiency}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <h2 className="text-lg font-semibold text-slate-100">Experience snapshots</h2>
        <div className="mt-4 space-y-3">
          {profile.positions.map((position) => (
            <article key={position.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-100">{position.title}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {position.startDate} – {position.endDate ?? "Present"}
                </p>
              </div>
              <p className="mt-2 text-slate-300">{position.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <h2 className="text-lg font-semibold text-slate-100">Similar profiles</h2>
        <div className="mt-4 space-y-2 text-sm">
          {relatedCandidates?.map((candidate) => (
            <div key={candidate.candidateId} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2">
              <span className="text-slate-300">{candidate.headline}</span>
              <span className="text-xs text-sky-300">Match {(candidate.matchScore * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
