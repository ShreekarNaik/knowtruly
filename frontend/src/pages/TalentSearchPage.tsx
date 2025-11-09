const candidates = [
  {
    name: "Avery Johnson",
    role: "Senior Software Engineer",
    summary:
      "Led cross-functional teams to build scalable web applications, optimizing frontend performance and mentoring engineers.",
    highlights: ["React", "TypeScript", "GraphQL", "AWS"],
    match: 94
  },
  {
    name: "Jordan Smith",
    role: "Full Stack Developer",
    summary:
      "Experienced across the stack with a focus on developer productivity, CI/CD pipelines, and customer-driven features.",
    highlights: ["Node.js", "React", "Docker", "PostgreSQL"],
    match: 88
  },
  {
    name: "Priya Desai",
    role: "Frontend Architect",
    summary:
      "Shapes design systems and accessibility strategies that scale across enterprise-grade applications.",
    highlights: ["Design Systems", "Accessibility", "TailwindCSS", "Storybook"],
    match: 82
  }
];

export const TalentSearchPage = () => (
  <div className="flex min-h-screen flex-col bg-[#111418] text-slate-100">
    <header className="flex items-center justify-between border-b border-slate-800 bg-[#181c22] px-6 py-4 shadow-sm lg:px-10">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 text-[#0c7ff2]">
          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44H42.4379Z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-white">KnowTruly.me</h1>
      </div>
      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
        <a className="transition hover:text-white" href="#">Dashboard</a>
        <a className="transition hover:text-white" href="#">Resume</a>
        <a className="transition hover:text-white" href="#">Portfolio</a>
        <a className="transition hover:text-white" href="#">Jobs</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#283039] text-white transition hover:bg-[#3b4754]">
          <span className="material-icons-sharp text-xl">notifications</span>
        </button>
        <div
          className="h-10 w-10 rounded-full border-2 border-[#0c7ff2] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEBYM3_QKxHJuhMt5Dlnp-84-k6uj76TwEU7RUP_HOh7YKOH_9q6MWKJFowHYMxuFNKdZrTLj4UClckjiEa0Grbs4jImlw6DvRUBh8FDNz1KGe707apQquBoqTmJHLG_UATrFgaaRvugQZaf-JmZpBvoyJxatsRgFW8aFDrJcHRUJ4gor-T0dpk0N5rjekOvlvvugjYvOiPUp7XCmpi-0FsxW5bPkV_CZ5-xguJ2PIogBLANFlQbh2xDQGha7yABME9wh3eievhQ")'
          }}
        />
      </div>
    </header>

    <main className="flex flex-1 justify-center px-4 py-10 sm:px-8 lg:px-16">
      <div className="w-full max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Discover Top Talent</h2>
          <p className="mt-2 text-base text-[#9cabba] sm:text-lg">
            Use our AI-powered search to find candidates matching your specific criteria.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-[#1a1f25] p-6 shadow-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#9cabba]">
              <span className="material-icons-sharp">search</span>
            </div>
            <input
              type="text"
              defaultValue="Software Engineer with 5+ years of experience in web development"
              placeholder="Type your query"
              className="w-full rounded-xl border-0 bg-[#283039] py-3.5 pl-12 pr-12 text-base text-white placeholder:text-[#9cabba] focus:ring-2 focus:ring-[#0c7ff2]"
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#9cabba] transition hover:text-white">
              <span className="material-icons-sharp">close</span>
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#9cabba]">Applied Filters:</span>
            {["Skills: Web Development", "Experience: 5+ years", "Industry: Technology", "Location: Remote"].map(
              (filter) => (
                <span
                  key={filter}
                  className="flex h-8 items-center gap-1.5 rounded-full bg-[#0c7ff2]/20 px-3 text-xs font-medium text-[#0c7ff2]"
                >
                  <span className="material-icons-sharp text-sm">label</span>
                  {filter}
                </span>
              )
            )}
            <button className="ml-auto text-xs text-[#9cabba] underline transition hover:text-white">Clear All</button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">Search Results</h3>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex h-9 items-center justify-center gap-2 rounded-md bg-[#283039] px-3 text-sm font-medium text-white transition hover:bg-[#3b4754]">
              <span className="material-icons-sharp text-lg">sort</span>
              Sort
            </button>
            <button className="flex h-9 items-center justify-center gap-2 rounded-md bg-[#283039] px-3 text-sm font-medium text-white transition hover:bg-[#3b4754]">
              <span className="material-icons-sharp text-lg">filter_list</span>
              Filter
            </button>
            <button className="flex h-9 items-center justify-center gap-2 rounded-md bg-[#0c7ff2] px-3 text-sm font-bold text-white transition hover:bg-[#0a69c3]">
              <span className="material-icons-sharp text-lg">bookmark_border</span>
              Save Search
            </button>
          </div>
        </div>

        <div className="mt-6 border-b border-[#3b4754]">
          <nav className="-mb-px flex gap-6 text-sm font-semibold">
            <a href="#" className="border-b-2 border-[#0c7ff2] pb-3 text-[#0c7ff2]">
              All Candidates (250)
            </a>
            <a href="#" className="border-b-2 border-transparent pb-3 text-[#9cabba] transition hover:border-slate-500 hover:text-white">
              Recommended (50)
            </a>
            <a href="#" className="border-b-2 border-transparent pb-3 text-[#9cabba] transition hover:border-slate-500 hover:text-white">
              Saved (10)
            </a>
          </nav>
        </div>

        <div className="mt-6 grid gap-6">
          {candidates.map((candidate) => (
            <article
              key={candidate.name}
              className="rounded-2xl bg-[#1a1f25] p-6 shadow-xl transition hover:-translate-y-1 hover:bg-[#202733]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">{candidate.name}</h4>
                  <p className="text-sm text-sky-400">{candidate.role}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#0c7ff2]/10 px-4 py-1">
                  <span className="material-icons-sharp text-base text-[#0c7ff2]">stars</span>
                  <span className="text-sm font-semibold text-[#0c7ff2]">Match {candidate.match}%</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#c9d2dd]">{candidate.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {candidate.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-[#0c7ff2]/15 px-3 py-1 text-xs font-medium text-[#7ac4ff]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#9cabba]">
                <button className="flex items-center gap-2 rounded-md bg-[#283039] px-3 py-2 text-white transition hover:bg-[#3b4754]">
                  <span className="material-icons-sharp text-base">chat_bubble_outline</span>
                  AI Summary
                </button>
                <button className="flex items-center gap-2 rounded-md bg-[#283039] px-3 py-2 text-white transition hover:bg-[#3b4754]">
                  <span className="material-icons-sharp text-base">visibility</span>
                  View Profile
                </button>
                <button className="flex items-center gap-2 rounded-md bg-[#283039] px-3 py-2 text-white transition hover:bg-[#3b4754]">
                  <span className="material-icons-sharp text-base">bookmark_add</span>
                  Save
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>

    <footer className="border-t border-slate-800 bg-[#181c22] py-6 text-center text-sm text-slate-400">
      <p>© 2024 KnowTruly.me Talent Intelligence. Built for hiring teams.</p>
    </footer>
  </div>
);
