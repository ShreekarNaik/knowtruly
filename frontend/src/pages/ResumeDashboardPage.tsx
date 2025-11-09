const resumeRows = [
  {
    name: "Senior Software Engineer Resume",
    role: "Software Engineer",
    updated: "2024-08-02",
    progress: 85
  },
  {
    name: "Data Analyst Resume",
    role: "Data Analyst",
    updated: "2024-07-20",
    progress: 50
  },
  {
    name: "Product Manager Resume",
    role: "Product Manager",
    updated: "2024-07-15",
    progress: 25
  },
  {
    name: "Design Lead Resume",
    role: "Design Lead",
    updated: "2024-06-30",
    progress: 65
  }
];

export const ResumeDashboardPage = () => (
  <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#111418] to-[#181d23] text-neutral-100">
    <header className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1f25] px-6 py-4 shadow-lg lg:px-10">
      <div className="flex items-center gap-4">
        <div className="h-7 w-7 text-[#0c7ff2]">
          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44H42.4379Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white">KnowTruly.me</h1>
      </div>
      <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
        <a className="relative transition hover:text-[#0c7ff2]" href="#">Dashboard</a>
        <a className="relative transition hover:text-[#0c7ff2]" href="#">Resume Builder</a>
        <a className="relative transition hover:text-[#0c7ff2]" href="#">Portfolio</a>
        <a className="relative transition hover:text-[#0c7ff2]" href="#">Career Guidance</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 transition hover:bg-neutral-700 hover:text-[#0c7ff2]">
          <span className="material-icons-sharp text-xl">notifications</span>
        </button>
        <div
          className="h-10 w-10 rounded-full border-2 border-[#0c7ff2] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHMF8na7mbdaQ90JKKSdsCbiarIgXzWWyr1oZ_N1BkW0GHWmvIvQNjfyvO20ldw-oMFYLZmRoJXTXCR2n39RV4Uvc1XBQCSI0SjtQqr_k27bADP2bJcVKUJEg2IIat9PsVbGeVdnBB-X9k6h_uIFW58NeCeg-TmxOftUmEYBdm0N-unSPUgZurqg9n2XRmPmJlWxKwpjq3hQTcJkXXOUlVo_9YvVBomgsuY6fS1G51EsycPwCfXpLGw2rIpCkBcCsXZSXTYcsEWQ")'
          }}
        />
      </div>
    </header>

    <main className="flex flex-1 justify-center px-4 py-10 sm:px-8 lg:px-32">
      <div className="flex w-full max-w-5xl flex-col">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#181e25] p-6 shadow-2xl">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-400">Resume Library</p>
            <h2 className="mt-2 text-3xl font-bold text-white">My Resumes</h2>
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0c7ff2] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0a6cce]">
            <span className="material-icons-sharp text-lg">add_circle_outline</span>
            New Resume
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-700/60 bg-[#171c22] shadow-xl">
          <table className="min-w-full divide-y divide-neutral-700/80">
            <thead className="bg-[#1f242c]">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-neutral-400">
                <th className="px-6 py-4">Resume Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {resumeRows.map((row) => (
                <tr key={row.name} className="transition bg-transparent hover:bg-[#1f2937]">
                  <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-neutral-100">
                    {row.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm text-neutral-400">{row.role}</td>
                  <td className="whitespace-nowrap px-6 py-5 text-sm text-neutral-400">{row.updated}</td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-3">
                      <progress
                        max={100}
                        value={row.progress}
                        className="h-2 w-28 overflow-hidden rounded-full bg-[#3b4754] [&::-moz-progress-bar]:bg-[#0c7ff2] [&::-webkit-progress-value]:bg-[#0c7ff2] [&::-webkit-progress-bar]:bg-[#3b4754]"
                      />
                      <span className="text-sm font-medium text-neutral-100">{row.progress}%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <button className="table-action-button rounded-md p-2 transition hover:bg-neutral-700 hover:text-[#0c7ff2]">
                        <span className="material-icons-sharp text-lg">edit</span>
                      </button>
                      <button className="table-action-button rounded-md p-2 transition hover:bg-neutral-700 hover:text-[#0c7ff2]">
                        <span className="material-icons-sharp text-lg">visibility</span>
                      </button>
                      <button className="rounded-md p-2 text-red-500 transition hover:bg-red-900/50 hover:text-red-400">
                        <span className="material-icons-sharp text-lg">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-[#0c7ff2]/50 bg-[#1f242c] text-[#0c7ff2]">
              <span className="material-icons-sharp flex h-full w-full items-center justify-center text-lg">
                feed
              </span>
            </div>
            <p>
              Share resumes securely with recruiters using <span className="font-semibold text-sky-400">KnowTruly Links</span>.
            </p>
          </div>
          <button className="rounded-full border border-[#0c7ff2] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#0c7ff2] transition hover:bg-[#0c7ff2] hover:text-white">
            Upgrade Plan
          </button>
        </div>
      </div>
    </main>

    <footer className="border-t border-neutral-800 bg-[#1a1f25]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-neutral-400 sm:flex-row sm:justify-between sm:text-sm">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a className="hover:text-[#0c7ff2]" href="#">Terms of Service</a>
          <a className="hover:text-[#0c7ff2]" href="#">Privacy Policy</a>
          <a className="hover:text-[#0c7ff2]" href="#">Contact Us</a>
        </div>
        <p className="text-neutral-500">© 2024 KnowTruly.me. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
