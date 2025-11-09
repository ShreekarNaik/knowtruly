import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useConfigStore } from "../../stores/configStore";

interface TopNavProps {
  title?: string;
  actionSlot?: ReactNode;
}

export const TopNav = ({ title, actionSlot }: TopNavProps) => {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const toggleDemoData = useConfigStore((state) => state.toggleDemoData);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-[#11161c] px-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0c7ff2]/15 text-[#0c7ff2]">
            <svg
              className="h-5 w-5"
              viewBox="0 0 48 48"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44H42.4379Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-sky-200">KnowTruly.me</p>
            {title && <p className="text-xs text-slate-400">{title}</p>}
          </div>
        </Link>
        {actionSlot}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDemoData}
          className={`flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold transition ${
            useDemoData
              ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-300"
              : "border-slate-700 bg-slate-900 text-slate-300"
          }`}
        >
          <span className="material-icons-sharp text-base">
            {useDemoData ? "visibility" : "cloud_done"}
          </span>
          {useDemoData ? "Demo Data" : "Live API"}
        </button>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-200">
                {user.name}
              </p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                {user.role}
              </p>
            </div>
            <button
              onClick={clearAuth}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-300 transition hover:text-sky-300"
              aria-label="Sign out"
            >
              <span className="material-icons-sharp text-base">logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
