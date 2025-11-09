import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../hooks/useAuth";

export const LoginPage = () => {
  const [email, setEmail] = useState("sophia@knowtruly.me");
  const [password, setPassword] = useState("demo-password");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/dashboard";
  const { mutateAsync, isPending, error } = useLoginMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-xl flex-col justify-center px-6 py-12">
      <div className="rounded-3xl border border-slate-800 bg-[#0d1219] p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-100">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">
          Use any email that includes <code>recruiter</code>, <code>issuer</code>, or <code>admin</code> to explore those roles
          in demo mode.
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
          {error && <p className="text-sm text-rose-400">Failed to sign in. Please try again.</p>}
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50"
          >
            <span className="material-icons-sharp text-base">login</span>
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          Need an account?{" "}
          <Link to="/register" className="text-sky-300 underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};
