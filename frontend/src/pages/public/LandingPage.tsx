import { Link } from "react-router-dom";

const heroStats = [
  { label: "Profiles embedded", value: "10+" },
  { label: "Resume templates", value: "3" },
  { label: "Avg. match accuracy", value: "0.82" }
];

const featureCards = [
  {
    title: "Semantic Matchmaker",
    description: "Hybrid embeddings + rule filters deliver recruiter-ready matches with transparent evidence.",
    icon: "hub"
  },
  {
    title: "Typst Resume Engine",
    description: "Generate targeted resumes in seconds with Gemini-assisted phrasing and Typst layouts.",
    icon: "description"
  },
  {
    title: "Verifiable Signatures",
    description: "Issue tamper-proof claims so hiring teams can trust every achievement shared.",
    icon: "verified"
  }
];

export const LandingPage = () => (
  <main className="flex flex-col gap-16 px-6 py-16 md:px-10 lg:px-16">
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
      <div className="flex flex-col gap-4">
        <span className="mx-auto rounded-full border border-sky-500/50 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
          Talent Truth Engine
        </span>
        <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-5xl">
          Match the right talent with evidence-backed resumes you can trust.
        </h1>
        <p className="max-w-3xl text-lg text-slate-300">
          KnowTruly.me blends embeddings, Typst resume generation, and verifiable signatures so every candidate story is
          transparent, contextual, and ready to share.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/register"
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          <span className="material-icons-sharp text-base">rocket_launch</span>
          Get Started
        </Link>
        <Link
          to="/templates"
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
        >
          <span className="material-icons-sharp text-base">view_quilt</span>
          Browse Templates
        </Link>
      </div>
      <div className="grid w-full gap-4 md:grid-cols-3">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-900/20 p-6"
          >
            <p className="text-3xl font-semibold text-sky-300">{stat.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-3">
      {featureCards.map((feature) => (
        <article key={feature.title} className="rounded-2xl border border-slate-800 bg-[#10151d] p-6 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-300">
            <span className="material-icons-sharp text-xl">{feature.icon}</span>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-100">{feature.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{feature.description}</p>
        </article>
      ))}
    </section>

    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-3xl border border-slate-800 bg-[#0d1219] p-8 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Built for Proof of Concept</p>
        <h2 className="text-2xl font-semibold text-slate-100">Embeddings → Matchmaking → Typst Resumes → Signatures</h2>
        <p className="text-sm text-slate-400">
          Follow the product roadmap with documented APIs, demo data toggles, and a simple FastAPI + React stack. Flip the
          demo switch anytime you need sample responses while the backend is offline.
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Phase Status</p>
        <div className="flex items-center gap-3">
          <span className="material-icons-sharp text-emerald-400">check_circle</span>
          <span className="text-sm text-slate-200">Embeddings + Matching (Priority 1)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-icons-sharp text-amber-400">pending</span>
          <span className="text-sm text-slate-200">Resume Generation (Priority 2)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-icons-sharp text-slate-500">lock_clock</span>
          <span className="text-sm text-slate-200">Trust & Verification (Priority 3)</span>
        </div>
      </div>
    </section>
  </main>
);
