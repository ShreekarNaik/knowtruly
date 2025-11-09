import { useProfile } from "../../hooks/useProfile";

export const ProfileSkillsPage = () => {
  const { data: profile } = useProfile();

  const verifiedSkills = profile?.skills.filter((skill) => skill.verified) ?? [];
  const unverifiedSkills = profile?.skills.filter((skill) => !skill.verified) ?? [];

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Skills & Verification</h1>
        <p className="mt-2 text-sm text-slate-400">
          Verified skills link to claims and boost match confidence. Use the signature service to verify new evidence.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6">
          <h2 className="text-lg font-semibold text-emerald-200">Verified skills</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {verifiedSkills.map((skill) => (
              <span key={skill.id} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                {skill.name} · {skill.proficiency}
              </span>
            ))}
            {!verifiedSkills.length && <p className="text-sm text-emerald-100/70">No verified skills yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Skills to verify</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
            {unverifiedSkills.map((skill) => (
              <span key={skill.id} className="rounded-full bg-slate-800 px-3 py-1">
                {skill.name} · {skill.proficiency}
              </span>
            ))}
            {!unverifiedSkills.length && <p className="text-sm text-slate-500">All tracked skills are currently verified.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
