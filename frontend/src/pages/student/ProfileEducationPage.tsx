import { useProfile } from "../../hooks/useProfile";

export const ProfileEducationPage = () => {
  const { data: profile } = useProfile();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Education</h1>
        <p className="mt-2 text-sm text-slate-400">
          Education entries feed both resume generation and recruiter match explanations.
        </p>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-[#0f1623] text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Institution</th>
              <th className="px-4 py-3 text-left">Degree</th>
              <th className="px-4 py-3 text-left">Field</th>
              <th className="px-4 py-3 text-left">Timeline</th>
              <th className="px-4 py-3 text-left">Achievements</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 bg-[#0d1219] text-slate-300">
            {profile?.education.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-900/40">
                <td className="px-4 py-4 text-slate-100">
                  <p className="font-semibold">{entry.institution}</p>
                </td>
                <td className="px-4 py-4">{entry.degree}</td>
                <td className="px-4 py-4">{entry.fieldOfStudy}</td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {entry.startDate} – {entry.endDate ?? "Present"}
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {entry.achievements?.join(", ") ?? "—"}
                </td>
              </tr>
            ))}
            {!profile?.education.length && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No education data yet. Add entries via the API to see them reflected here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
