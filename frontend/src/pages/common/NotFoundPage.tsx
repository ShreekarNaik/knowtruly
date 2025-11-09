import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <section className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 text-center">
    <span className="rounded-full border border-slate-800 bg-slate-900/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
      404
    </span>
    <h1 className="text-3xl font-semibold text-slate-100">Page not found</h1>
    <p className="max-w-md text-sm text-slate-400">
      The route you are looking for is not defined. Head back to the dashboard or explore the landing page.
    </p>
    <div className="flex gap-3">
      <Link to="/" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500">
        Home
      </Link>
      <Link
        to="/dashboard"
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
      >
        Dashboard
      </Link>
    </div>
  </section>
);
