import { useAuthStore } from "../../stores/authStore";
import { useConfigStore } from "../../stores/configStore";

export const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const setUseDemoData = useConfigStore((state) => state.setUseDemoData);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">
          Account Settings
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage environment flags and see current session details.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Session info</h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-300">
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">
                User
              </dt>
              <dd>{user?.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Email
              </dt>
              <dd>{user?.email ?? "demo session"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Role
              </dt>
              <dd>{user?.role}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
          <h2 className="text-lg font-semibold text-slate-100">Demo mode</h2>
          <p className="mt-2 text-sm text-slate-300">
            Demo data mirrors backend responses so you can navigate the UI
            without an active FastAPI server. Disable to call real endpoints.
          </p>
          <label className="mt-4 flex items-center gap-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={useDemoData}
              onChange={(event) => setUseDemoData(event.target.checked)}
              className="h-4 w-4 rounded border border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500"
            />
            Enable demo responses
          </label>
        </section>
      </div>
    </section>
  );
};
