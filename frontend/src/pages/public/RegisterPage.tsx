import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../hooks/useAuth";
import type { UserRole } from "../../types";

const roles: UserRole[] = ["student", "recruiter", "issuer", "admin"];

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const { mutateAsync, isPending } = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({ email, password, role });
    navigate("/dashboard");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-xl flex-col justify-center px-6 py-12">
      <div className="rounded-3xl border border-slate-800 bg-[#0d1219] p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-100">Create your account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Accounts created in demo mode persist only in memory. Choose a role to preview the respective portal flows.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Email
            <input
              type="email"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Password
            <input
              type="password"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            >
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50"
          >
            <span className="material-icons-sharp text-base">person_add</span>
            {isPending ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          Already registered?{" "}
          <Link to="/login" className="text-sky-300 underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};
