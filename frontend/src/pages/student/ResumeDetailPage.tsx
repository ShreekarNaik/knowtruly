import { useParams } from "react-router-dom";
import { useResumeDetail } from "../../hooks/useResumes";

export const ResumeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: resumeDetail, isLoading } = useResumeDetail(id);

  if (isLoading) {
    return <p className="text-sm text-slate-400">Loading resume details...</p>;
  }

  if (!resumeDetail) {
    return <p className="text-sm text-rose-400">Resume not found.</p>;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Resume Snapshot</h1>
        <p className="mt-1 text-sm text-slate-400">Snapshot ID: {resumeDetail.profileSnapshotId}</p>
      </header>

      <div className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6 text-sm text-slate-300">
        <p>
          <span className="font-semibold text-slate-100">Download:</span>{" "}
          <a href={resumeDetail.downloadUrl} className="text-sky-300 underline">
            {resumeDetail.downloadUrl}
          </a>
        </p>
        <p className="mt-3">
          <span className="font-semibold text-slate-100">Generated:</span>{" "}
          {new Date(resumeDetail.createdAt).toLocaleString()}
        </p>
        <p className="mt-3">
          <span className="font-semibold text-slate-100">Format:</span> {resumeDetail.format.toUpperCase()}
        </p>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Generation metadata</p>
          <pre className="mt-2 whitespace-pre-wrap text-slate-300">
            {JSON.stringify(resumeDetail.generationMetadata, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
};
