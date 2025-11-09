import { useProfile } from "../../hooks/useProfile";

export const ProfileExperiencePage = () => {
  const { data: profile } = useProfile();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Experience</h1>
        <p className="mt-2 text-sm text-slate-400">
          Highlight quantified outcomes so the matchmaker can surface the right projects and claims.
        </p>
      </header>
      <div className="space-y-4">
        {profile?.positions.map((position) => (
          <article key={position.id} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-lg font-semibold text-slate-100">{position.title}</p>
                <p className="text-sm text-slate-400">{position.company}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                {position.startDate} – {position.endDate ?? "Present"}
              </p>
            </div>
            <p className="mt-3 text-sm text-slate-300">{position.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {position.skillsUsed?.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
        {!profile?.positions.length && (
          <p className="rounded-2xl border border-dashed border-slate-800 bg-[#0d1219] p-6 text-center text-sm text-slate-500">
            No positions yet. Use the API to seed demo data or connect the backend to populate this list.
          </p>
        )}
      </div>
    </section>
  );
};
