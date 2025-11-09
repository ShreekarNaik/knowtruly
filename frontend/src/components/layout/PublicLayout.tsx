import { Link, Outlet } from "react-router-dom";
import { useConfigStore } from "../../stores/configStore";

export const PublicLayout = () => {
  const { useDemoData, toggleDemoData } = useConfigStore((state) => ({
    useDemoData: state.useDemoData,
    toggleDemoData: state.toggleDemoData
  }));

  return (
    <div className="min-h-screen bg-[#0a0d12] text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-900/80 bg-[#0c1118] px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-300">
            <svg className="h-5 w-5" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44H42.4379Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-sky-200">KnowTruly.me</p>
            <p className="text-xs text-slate-400">Trustworthy Talent Intelligence</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link to="/about" className="transition hover:text-white">
            About
          </Link>
          <Link to="/templates" className="transition hover:text-white">
            Templates
          </Link>
          <Link to="/login" className="transition hover:text-white">
            Login
          </Link>
          <Link to="/register" className="transition hover:text-white">
            Register
          </Link>
        </nav>
        <button
          onClick={toggleDemoData}
          className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
            useDemoData
              ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-300"
              : "border-slate-700 bg-slate-900 text-slate-300"
          }`}
        >
          {useDemoData ? "Demo Mode" : "Live Mode"}
        </button>
      </header>
      <Outlet />
    </div>
  );
};
