import { useProfile } from "../../hooks/useProfile";

export const ProfileProjectsPage = () => {
  const { data: profile } = useProfile();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Projects</h1>
        <p className="mt-2 text-sm text-slate-400">
          Projects connect to resume sections, recruiter previews, and signature requests. Include metrics for stronger
          evidence.
        </p>
      </header>

      <div className="space-y-4">
        {profile?.projects.map((project) => (
          <article key={project.id} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-100">{project.title}</h2>
                <p className="text-sm text-slate-400">{project.roleDescription}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {project.startDate} – {project.endDate ?? "Present"}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {project.technologies?.map((tech) => (
                <span key={tech} className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
            {project.metrics && (
              <div className="mt-4 grid gap-2 text-xs text-slate-400">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2">
                    <span className="uppercase tracking-[0.3em] text-slate-500">{key}</span>
                    <span className="text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {project.artifacts && (
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-sky-300">
                {project.artifacts.map((artifact) => (
                  <a key={artifact} href={artifact} className="underline" target="_blank" rel="noreferrer">
                    {artifact}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
        {!profile?.projects.length && (
          <p className="rounded-2xl border border-dashed border-slate-800 bg-[#0d1219] p-6 text-center text-sm text-slate-500">
            No projects recorded yet. Add them via the API to showcase evidence-driven impact.
          </p>
        )}
      </div>
    </section>
  );
};
