import { useProfile } from "../../hooks/useProfile";

export const ProfilePage = () => {
  const { data: profile } = useProfile();

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Profile Overview</h1>
        <p className="mt-2 text-sm text-slate-400">
          Profiles sync with the embedding service. Update details here and re-run resume generation when ready.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Contact</h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-300">
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</dt>
              <dd>{profile?.contactHandles.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">Phone</dt>
              <dd>{profile?.contactHandles.phone}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">LinkedIn</dt>
              <dd>{profile?.contactHandles.linkedin}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">GitHub</dt>
              <dd>{profile?.contactHandles.github}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Summary</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{profile?.summary}</p>
          <div className="mt-4 grid gap-2 text-xs text-slate-500">
            <div>Profile version · {profile?.version}</div>
            <div>
              Updated <span className="text-slate-300">{profile && new Date(profile.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <h2 className="text-lg font-semibold text-slate-100">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {profile?.skills.map((skill) => (
            <span
              key={skill.id}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                skill.verified ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-300"
              }`}
            >
              {skill.name} · {skill.proficiency}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
};
