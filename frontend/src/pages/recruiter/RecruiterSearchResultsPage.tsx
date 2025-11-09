import { useMemo } from "react";
import { useMatchResults } from "../../hooks/useMatchResults";

export const RecruiterSearchResultsPage = () => {
  const matchQuery = useMemo(
    () => ({
      roleDescriptor: {
        title: "Frontend Lead",
        description: "Build recruiter portal UX for KnowTruly.",
        requiredSkills: ["React", "TypeScript", "Design Systems"]
      },
      topK: 5
    }),
    []
  );
  const { data: matchResults, isLoading } = useMatchResults({ query: matchQuery });

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Search Results Overview</h1>
        <p className="mt-2 text-sm text-slate-400">
          Hybrid scores combine embedding similarity and rules (weights 0.7 / 0.3). Scores above 0.8 usually indicate
          excellent fit.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-300">
            Query embedding: <span className="font-mono text-xs text-slate-500">{matchResults?.queryEmbeddingId}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Matched at {matchResults && new Date(matchResults.matchedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && <p className="text-sm text-slate-400">Loading match results...</p>}
        {matchResults?.matches.map((match) => (
          <article key={match.candidateId} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-100">{match.candidateId}</p>
                <p className="text-xs text-slate-500">
                  Score {(match.score * 100).toFixed(0)}% · Matched {new Date(match.matchedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {match.explanation.topMatchingSkills.map((skill) => (
                  <span
                    key={skill.skill}
                    className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300"
                  >
                    {skill.skill} {(skill.confidence * 100).toFixed(0)}%
                  </span>
                ))}
              </div>
            </div>
            {match.explanation.gaps.length > 0 && (
              <p className="mt-4 text-xs text-amber-300">
                Gaps: {match.explanation.gaps.join(", ")}
              </p>
            )}
            <div className="mt-4 text-xs text-slate-400">
              <p className="uppercase tracking-[0.3em] text-slate-500">Evidence</p>
              <ul className="mt-2 space-y-1">
                {match.explanation.topEvidence.map((evidence) => (
                  <li key={`${match.candidateId}-${evidence.id}`}>
                    {evidence.type} · {evidence.id} · {(evidence.relevance * 100).toFixed(0)}% relevance
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
