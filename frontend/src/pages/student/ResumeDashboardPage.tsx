import { Link } from "react-router-dom";
import { useResumeList } from "../../hooks/useResumes";

export const ResumeDashboardPage = () => {
  const { data: resumes, isLoading } = useResumeList();

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Resume Library</h1>
          <p className="mt-2 text-sm text-slate-400">
            Generated resumes are stored with profile snapshots so you can regenerate or download anytime.
          </p>
        </div>
        <Link
          to="/resumes/generate"
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          <span className="material-icons-sharp text-base">magic_button</span>
          Generate Resume
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-[#0f1623] text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Resume</th>
              <th className="px-4 py-3 text-left">Target Role</th>
              <th className="px-4 py-3 text-left">Updated</th>
              <th className="px-4 py-3 text-left">Progress</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 bg-[#0d1219] text-slate-300">
            {resumes?.map((resume) => (
              <tr key={resume.id} className="hover:bg-slate-900/40">
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-100">{resume.name}</p>
                  <p className="text-xs text-slate-500">Template {resume.templateId}</p>
                </td>
                <td className="px-4 py-4">{resume.targetRole}</td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <progress
                      max={100}
                      value={resume.progress}
                      className="h-2 w-24 overflow-hidden rounded-full bg-slate-800 [&::-webkit-progress-value]:bg-sky-500 [&::-webkit-progress-bar]:bg-slate-800"
                    />
                    <span>{resume.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Link
                      to={`/resumes/${resume.id}`}
                      className="rounded-md border border-slate-700 px-3 py-1 transition hover:border-sky-500 hover:text-sky-300"
                    >
                      View
                    </Link>
                    <a
                      href={`/api/resumes/${resume.id}/download`}
                      className="rounded-md border border-slate-700 px-3 py-1 transition hover:border-sky-500 hover:text-sky-300"
                    >
                      Download
                    </a>
                  </div>
                </td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  Loading resumes...
                </td>
              </tr>
            )}
            {!isLoading && !resumes?.length && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No resumes yet. Generate your first one to kick off the Typst pipeline.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
