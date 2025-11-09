import { useProfilesList } from "../../hooks/useProfile";

export const AdminUsersPage = () => {
  const { data: profiles, isLoading } = useProfilesList();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">User Management</h1>
        <p className="mt-2 text-sm text-slate-400">
          View synced profiles. In production this table would include pagination and role assignments.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-[#0f1623] text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Version</th>
              <th className="px-4 py-3 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 bg-[#0d1219] text-slate-300">
            {profiles?.map((profile) => (
              <tr key={profile.id} className="hover:bg-slate-900/40">
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-100">{profile.canonicalName}</p>
                  <p className="text-xs text-slate-500">{profile.id}</p>
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">{profile.version}</td>
                <td className="px-4 py-4 text-xs text-slate-400">
                  {new Date(profile.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                  Loading profiles...
                </td>
              </tr>
            )}
            {!isLoading && !profiles?.length && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                  No profiles available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
