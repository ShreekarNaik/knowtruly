import { FormEvent, useMemo, useState } from "react";
import { useRecruiterSearch } from "../../hooks/useRecruiter";

export const TalentSearchPage = () => {
  const [query, setQuery] = useState("Senior software engineer with AI experience");
  const [skills, setSkills] = useState("React, FastAPI, Gemini API");
  const [location, setLocation] = useState("Remote");
  const [submittedQuery, setSubmittedQuery] = useState(query);

  const searchPayload = useMemo(
    () => ({
      query: submittedQuery,
      filters: {
        skills: skills.split(",").map((skill) => skill.trim()),
        location
      },
      top_k: 10
    }),
    [submittedQuery, skills, location]
  );

  const { data: candidates, isLoading } = useRecruiterSearch(searchPayload);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedQuery(query);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Talent Search</h1>
        <p className="mt-2 text-sm text-slate-400">
          Enter a natural language query. The semantic engine combines embeddings with filters for precise matches.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Search query
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={3}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Key skills (comma separated)
            <input
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Location preference
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            />
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          <span className="material-icons-sharp text-base">search</span>
          Run Search
        </button>
      </form>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Results</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {isLoading ? "Loading..." : `${candidates?.length ?? 0} matches`}
          </span>
        </div>
        <div className="grid gap-4">
          {candidates?.map((candidate) => (
            <article key={candidate.candidateId} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-100">{candidate.name ?? "Redacted profile"}</p>
                  <p className="text-sm text-slate-400">{candidate.headline}</p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
                  Match {(candidate.matchScore * 100).toFixed(0)}%
                </span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                {candidate.previewOnly ? "Preview only" : "Full profile"}
              </p>
            </article>
          ))}
          {!candidates?.length && !isLoading && (
            <p className="text-sm text-slate-500">No results yet. Adjust filters and try again.</p>
          )}
        </div>
      </section>
    </section>
  );
};
