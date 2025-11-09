import { Link } from "react-router-dom";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" }
];

const projects = [
  {
    title: "AI Resume Analyzer",
    description:
      "Built an AI-powered resume analyzer that scores resumes based on job descriptions with actionable feedback.",
    tags: ["Next.js", "LangChain", "OpenAI"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Interactive Portfolio Generator",
    description:
      "Created a no-code tool that lets job seekers design and deploy personal portfolios in minutes.",
    tags: ["React", "Tailwind", "Supabase"],
    image:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Career Insights Dashboard",
    description:
      "Engineered a data visualization dashboard for tracking job applications, interviews, and recruiter feedback.",
    tags: ["Vite", "D3", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
  }
];

const skills = [
  "React",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "LangChain",
  "Supabase",
  "AWS",
  "PostgreSQL",
  "Figma",
  "Python"
];

const stats = [
  { label: "Projects Completed", value: "32+" },
  { label: "Happy Clients", value: "18" },
  { label: "Coffee Cups", value: "430" },
  { label: "Hackathon Wins", value: "5" }
];

const experiences = [
  {
    title: "Software Engineering Intern",
    subtitle: "Tech Innovators Inc. · Summer 2023",
    description:
      "Contributed to developing new features for a flagship product, participated in agile sprints, and collaborated with a cross-functional team.",
    icon: "business_center"
  },
  {
    title: "Research Assistant",
    subtitle: "Stanford AI Lab · 2022-2023",
    description:
      "Assisted senior researchers in machine learning projects, focusing on natural language processing and computer vision tasks.",
    icon: "science"
  },
  {
    title: "Freelance Web Developer",
    subtitle: "Self-employed · 2021-Present",
    description:
      "Designed and developed custom websites for small businesses, focusing on responsive design and user experience.",
    icon: "terminal"
  }
];

export const LandingPage = () => (
  <div className="relative flex min-h-screen flex-col overflow-x-hidden">
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-[#111418]/80 px-6 py-4 backdrop-blur-md md:px-10">
      <div className="flex items-center gap-4">
        <div className="text-[#0c7ff2]">
          <svg className="h-7 w-7" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44H42.4379Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">KnowTruly.me</h1>
      </div>
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-gray-300 transition-colors hover:text-[#0c7ff2]"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link
          to="/resumes"
          className="hidden h-10 items-center justify-center rounded-lg bg-slate-800 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 md:flex"
        >
          Dashboard
        </Link>
        <button className="flex h-10 min-w-[90px] items-center justify-center rounded-lg bg-[#0c7ff2] px-5 text-sm font-semibold text-white transition hover:bg-blue-600">
          Get Started
        </button>
        <button className="text-white md:hidden">
          <span className="material-icons-sharp">menu</span>
        </button>
      </div>
    </header>

    <main className="flex-1">
      <section
        id="hero"
        className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-16 text-center md:px-12"
      >
        <div className="absolute inset-0 bg-cover bg-fixed bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2020&q=80")' }} />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl rounded-xl bg-black/50 p-10 text-white shadow-xl backdrop-blur">
          <div
            className="mx-auto mb-6 h-40 w-40 rounded-full border-4 border-[#0c7ff2] bg-cover bg-center shadow-xl"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1-JFW-ZISvGoL79NYiWUPgZYk5CFjzcUQEMrsrBYgs0PY8Q-22pyL4v4IwOyZXT3siYTGo78h8iHydrrbf44RQYaGtvjFJdZw16JDug-seG_FRhqhWhbiiSSfhxMHER8yz4Q8fFPeEVpUB44HHH2Xg49fq7-eozW8O6E6B-_mBQUIW4Oym-pUfEmqwPL6yz0AEYRpGXWH575sn5bsZ1kLOKpfq-xa1-EgZvRUXVK01PCIOVjSmHFh77aJ7RFBTdfilO3w3XNFMg")'
            }}
          />
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">AI-Powered Career Growth</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Build A Career That Reflects Your True Potential
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            I help ambitious professionals craft standout resumes, portfolios, and personal brands that unlock new
            opportunities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/talent-search"
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0c7ff2] px-6 text-base font-semibold text-white transition hover:bg-blue-600"
            >
              <span className="material-icons-sharp text-lg">flash_on</span>
              Try AI Search
            </Link>
            <a
              href="#projects"
              className="flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-6 text-base font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              <span className="material-icons-sharp text-lg">visibility</span>
              View Work
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        <div className="rounded-2xl bg-slate-900/60 p-10 shadow-2xl backdrop-blur">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-sky-300">
            <span className="material-icons-sharp text-4xl">person</span>
            About Me
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            I am Sophia Carter, a product-minded software engineer focused on helping people present their best selves to
            the world. Through KnowTruly.me I blend human storytelling with AI-assisted tooling to create resumes,
            portfolios, and job strategies that resonate with hiring managers.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-6 text-center shadow-lg"
              >
                <p className="text-3xl font-bold text-[#0c7ff2]">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-[#0b1017]/70 py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-sky-300">
              <span className="material-icons-sharp text-4xl">workspaces</span>
              Featured Projects
            </h2>
            <Link
              to="/resumes"
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0c7ff2] px-4 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <span className="material-icons-sharp text-base">dashboard</span>
              Resume Dashboard
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-xl bg-slate-800/60 shadow-xl transition hover:-translate-y-1 hover:shadow-blue-500/40"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url("${project.image}")` }}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-sky-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        <div className="rounded-2xl bg-slate-900/60 p-10 shadow-2xl backdrop-blur">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-sky-300">
            <span className="material-icons-sharp text-4xl">psychology</span>
            Skill Arsenal
          </h2>
          <p className="mt-4 text-gray-300">
            I combine engineering expertise with growth-focused storytelling to craft end-to-end career experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-sky-300 transition hover:bg-sky-500 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-[#0b1017]/70 py-16">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="rounded-2xl bg-slate-900/60 p-10 shadow-2xl backdrop-blur">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-sky-300">
              <span className="material-icons-sharp text-4xl">work_history</span>
              Experience
            </h2>
            <div className="relative mt-10 space-y-8 before:absolute before:left-6 before:top-0 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-slate-700 md:before:left-8">
              {experiences.map((experience) => (
                <div key={experience.title} className="relative flex gap-6 md:gap-8">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0c7ff2] text-white shadow-lg ring-4 ring-slate-800">
                    <span className="material-icons-sharp text-xl">{experience.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
                    <p className="text-sm font-medium text-sky-400">{experience.subtitle}</p>
                    <p className="mt-2 text-sm text-gray-300">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 py-16 md:px-10">
        <div className="rounded-2xl bg-slate-900/60 p-10 shadow-2xl backdrop-blur">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-sky-300">
            <span className="material-icons-sharp text-4xl">email</span>
            Get In Touch
          </h2>
          <form className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                Full Name
                <input
                  type="text"
                  placeholder="Your Name"
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-[#0c7ff2] focus:outline-none focus:ring-2 focus:ring-[#0c7ff2]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
                Email Address
                <input
                  type="email"
                  placeholder="Your Email"
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-[#0c7ff2] focus:outline-none focus:ring-2 focus:ring-[#0c7ff2]"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-300">
              Message
              <textarea
                rows={4}
                placeholder="Tell me about your project or goals"
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-[#0c7ff2] focus:outline-none focus:ring-2 focus:ring-[#0c7ff2]"
              />
            </label>
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0c7ff2] px-6 text-base font-semibold text-white transition hover:bg-blue-600"
            >
              <span className="material-icons-sharp text-lg">send</span>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>

    <footer className="border-t border-slate-800 bg-[#181c22] py-6 text-center">
      <p className="text-sm text-gray-400">© 2024 Sophia Carter. All rights reserved.</p>
      <p className="mt-1 text-xs text-gray-500">Powered by KnowTruly.me</p>
    </footer>
  </div>
);
