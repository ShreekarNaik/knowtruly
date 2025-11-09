import { FormEvent, useState } from "react";
import { useAccessRequestMutation } from "../../hooks/useRecruiter";

export const RecruiterRequestsPage = () => {
  const [candidateId, setCandidateId] = useState("demo-profile");
  const [roleId, setRoleId] = useState("role-frontend-lead");
  const [message, setMessage] = useState("We would love to schedule a 30 minute intro call.");
  const requestMutation = useAccessRequestMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await requestMutation.mutateAsync({ candidate_id: candidateId, role_id: roleId, message });
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Access Requests</h1>
        <p className="mt-2 text-sm text-slate-400">
          Request full profile access. In demo mode the request returns immediately with a pending status.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Candidate ID
          <input
            value={candidateId}
            onChange={(event) => setCandidateId(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Role ID
          <input
            value={roleId}
            onChange={(event) => setRoleId(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={requestMutation.isPending}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50"
        >
          <span className="material-icons-sharp text-base">send</span>
          {requestMutation.isPending ? "Submitting..." : "Submit Request"}
        </button>
        {requestMutation.isSuccess && requestMutation.data && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Request {requestMutation.data.request_id} is{" "}
            <span className="font-semibold uppercase tracking-widest">{requestMutation.data.status}</span> until{" "}
            {new Date(requestMutation.data.expires_at).toLocaleDateString()}.
          </div>
        )}
      </form>
    </section>
  );
};
