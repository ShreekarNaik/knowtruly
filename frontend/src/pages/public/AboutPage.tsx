const pillars = [
  {
    title: "Evidence-first profiles",
    description: "Digital twins link projects, metrics, and verifiable claims directly to each resume or match result.",
    icon: "fact_check"
  },
  {
    title: "Explainable matchmaking",
    description: "Hybrid scoring combines vector similarity with rule filters to highlight top skills and evidence.",
    icon: "insights"
  },
  {
    title: "Composable resume workflows",
    description: "Typst templates, Gemini rephrasing, and profile snapshots create trustable, role-specific resumes.",
    icon: "integration_instructions"
  }
];

export const AboutPage = () => (
  <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col gap-12 px-6 py-12 md:px-10">
    <section className="space-y-4">
      <h1 className="text-4xl font-semibold text-slate-100">Why KnowTruly.me Exists</h1>
      <p className="text-lg text-slate-300">
        Candidates deserve tools that surface proof, not just bullet points. Recruiters need context they can trust.
        KnowTruly.me weaves embeddings, Typst resume pipelines, and cryptographic signatures into a POC you can extend for
        your own teams.
      </p>
    </section>

    <section className="grid gap-6 md:grid-cols-3">
      {pillars.map((pillar) => (
        <article key={pillar.title} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-300">
            <span className="material-icons-sharp text-xl">{pillar.icon}</span>
          </div>
          <h2 className="mt-6 text-lg font-semibold text-slate-100">{pillar.title}</h2>
          <p className="mt-3 text-sm text-slate-400">{pillar.description}</p>
        </article>
      ))}
    </section>

    <section className="rounded-3xl border border-slate-800 bg-[#0d1219] p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Architecture snapshot</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-100">FastAPI + Qdrant + Gemini + Typst + React</h2>
      <p className="mt-4 text-sm text-slate-400">
        The backend ships a FastAPI service with PostgreSQL/pgvector and Qdrant for embeddings. Gemini powers text
        generation and rephrasing. Typst compiles resumes into PDFs. The React frontend you&apos;re browsing provides demo
        data toggles so you can explore flows even while the API is offline.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Implementation Priorities</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>1. Embeddings & semantic match results</li>
            <li>2. Resume generation loops via Typst</li>
            <li>3. Signature service with audit trails</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Developer Workflow</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Document progress in <code>PROGRESS.md</code></li>
            <li>Capture implementation notes in <code>documentation.md</code></li>
            <li>Flip demo mode to test flows without the API</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
);
