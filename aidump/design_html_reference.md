Screen 1 - Design Syntax:

<html><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Inter%3Awght%40400%3B500%3B700%3B900&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
<title>Stitch Design</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
      .parallax {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .section-card {
        @apply bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl transition-all duration-300 hover:shadow-blue-500/50;
      }
      .project-card {
        @apply bg-slate-700/60 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl;
      }
      .skill-badge {
        @apply bg-slate-700 text-sky-300 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-sky-500 hover:text-white;
      }
    </style>
</head>
<body class="bg-[#111418] text-white" style='font-family: Inter, "Noto Sans", sans-serif;'>
<div class="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
<header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap bg-[#111418]/80 backdrop-blur-md border-b border-solid border-b-[#283039] px-6 md:px-10 py-4 shadow-lg">
<div class="flex items-center gap-4">
<div class="text-[#0c7ff2] size-7">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
</div>
<h1 class="text-white text-xl font-bold tracking-tighter">KnowTruly.me</h1>
</div>
<nav class="hidden md:flex items-center gap-6">
<a class="text-gray-300 hover:text-[#0c7ff2] text-sm font-medium transition-colors" href="#about">About</a>
<a class="text-gray-300 hover:text-[#0c7ff2] text-sm font-medium transition-colors" href="#projects">Projects</a>
<a class="text-gray-300 hover:text-[#0c7ff2] text-sm font-medium transition-colors" href="#skills">Skills</a>
<a class="text-gray-300 hover:text-[#0c7ff2] text-sm font-medium transition-colors" href="#experience">Experience</a>
<a class="text-gray-300 hover:text-[#0c7ff2] text-sm font-medium transition-colors" href="#contact">Contact</a>
</nav>
<button class="flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#0c7ff2] text-white text-sm font-semibold tracking-wide hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
<span class="truncate">Get Started</span>
</button>
<button class="md:hidden text-white">
<span class="material-icons">menu</span>
</button>
</header>
<main class="flex-1">
<section class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 py-16 parallax" id="hero" style='background-image: url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2020&amp;q=80");'>
<div class="bg-black/50 backdrop-blur-sm p-10 rounded-xl">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-40 w-40 mx-auto mb-6 border-4 border-[#0c7ff2] shadow-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGmZH1iPkqsb3jROQILNvBKiWUuomaAx-d6E3Ue756Na6m3pSaQuYg-BIgtddJKVTA1LoJCgK4S1k2lkIP6NbmHB4CAmhKk0CafhB6wQu3iQ-QeqUQCerlMqIB8rIxIDERvH0vTSsrIYsytrqlmwQtrRuuvTNJyiPe2AGQttSS4u1Zk8uE6hal8yCcLkOWN25TjgIVM637UrKjnxQ8jOWS9jN_GgtLfQA88GR9MQkr42MFdQfNGAqwhqHqsClbYdQt1VnVgOHJ4Q");'></div>
<h1 class="text-5xl font-bold tracking-tight text-white mb-3">Sophia Carter</h1>
<p class="text-xl text-sky-300 mb-1">Aspiring Software Engineer</p>
<p class="text-lg text-gray-400 mb-8">San Francisco, CA</p>
<a class="inline-block bg-[#0c7ff2] text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg" href="#about">Discover My Journey</a>
</div>
</section>
<div class="container mx-auto px-4 md:px-10 py-12 space-y-16">
<section class="section-card p-8 md:p-12" id="about">
<h2 class="text-3xl font-bold text-sky-300 mb-6 flex items-center gap-3">
<span class="material-icons text-4xl">person</span> About Me
            </h2>
<p class="text-gray-300 text-lg leading-relaxed">
              I'm a passionate software engineering student at Stanford University, specializing in full-stack development and machine learning. I thrive on creating innovative
              solutions and am eager to contribute to impactful projects. My journey in tech is driven by a curiosity to understand how things work and a desire to build tools that make a
              difference.
            </p>
</section>
<section class="section-card p-8 md:p-12" id="projects">
<h2 class="text-3xl font-bold text-sky-300 mb-8 flex items-center gap-3">
<span class="material-icons text-4xl">code</span> Projects
            </h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<div class="project-card">
<div class="w-full bg-center bg-no-repeat aspect-video bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDF0xREflPNZ8h8yxI0IbkMsqty2sqzfSNgMhbTwaG0UPsDTpVp50h-jDz-4NOAoHOHDkWYP_PZoDHmuDQS5UMIF_cVg2J6zxO0RPk2KtguOFcCFhzCFpJRKVJTJhwRkP_nwlbHYIFvv9w35kOGiRqj3FI1qyHEIQYLiTjeqzqhA4vESksX6FVN8FW19PyN8xehSZF8VdH_fcyGzwzu3j6gZi2bExo21tlm3D4yHLHkbXtq3lu1eEbwRt3CLiW8-nYH9gXbT4EYnQ");'></div>
<div class="p-6">
<h3 class="text-xl font-semibold text-white mb-2">Personal Portfolio Website</h3>
<p class="text-gray-400 text-sm">A sleek, responsive website showcasing my projects and skills.</p>
</div>
</div>
<div class="project-card">
<div class="w-full bg-center bg-no-repeat aspect-video bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYbv_rE61nq7H_XZr0dWmgO-muofHwCMVs6GXilvaDnFzWfgF28LDi9PRoK7ZqBNLRO4ApcWxEu4ACGi_lRQ9DQIjgEcBjd6qZetutPWZxKpo4EtkRu0MmD6HUdQAaKWq3Ncwz8G-AytE4ogH4qwCo9z2Q5TLfghO-QCLmQan0hiqr30Jl_BTnZ-tjXgTK1wnwiGqMDHisjNPf2inW8IlWNBEhaNdLIx3oxZWuBs7HC1QbYPgVcLIwxI-3G4aTOEcbbVRV2KBV1A");'></div>
<div class="p-6">
<h3 class="text-xl font-semibold text-white mb-2">Mobile Fitness Tracker App</h3>
<p class="text-gray-400 text-sm">A fitness app with personalized workout plans and progress tracking.</p>
</div>
</div>
<div class="project-card">
<div class="w-full bg-center bg-no-repeat aspect-video bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwzkSccHKF848dsnVGVbi5x3iHIrazkRLgP1DXEXn0a4RiWf14DOaMIhiNs_iw-B-q0zoiNX22zFTO7Mja5htssGDzE10NXQZGG-CEw9pkgMMEuGZxvOzBgdCYPEX19CVWf5ysd3GPpqeONeMTDOyeb7S2XBYC24LSeRjrtvFHa6_5_kz6EWOBYNd5oZSLIxjQy-pjF4CHA0EMJYUfQtg4Guxk0I4UWw2SZt_uAoWIslwtMmFquvQuHKFY18-wPQNco59Ps6ksNw");'></div>
<div class="p-6">
<h3 class="text-xl font-semibold text-white mb-2">Interactive Data Dashboard</h3>
<p class="text-gray-400 text-sm">A dashboard visualizing user data with interactive charts and graphs.</p>
</div>
</div>
</div>
</section>
<section class="section-card p-8 md:p-12" id="skills">
<h2 class="text-3xl font-bold text-sky-300 mb-8 flex items-center gap-3">
<span class="material-icons text-4xl">construction</span> Skills
            </h2>
<div class="flex flex-wrap gap-3">
<span class="skill-badge">Python</span>
<span class="skill-badge">JavaScript</span>
<span class="skill-badge">React</span>
<span class="skill-badge">Node.js</span>
<span class="skill-badge">SQL</span>
<span class="skill-badge">Machine Learning</span>
<span class="skill-badge">Data Analysis</span>
<span class="skill-badge">UI/UX Design</span>
<span class="skill-badge">Agile Development</span>
<span class="skill-badge">Problem Solving</span>
</div>
</section>
<section class="section-card p-8 md:p-12" id="experience">
<h2 class="text-3xl font-bold text-sky-300 mb-8 flex items-center gap-3">
<span class="material-icons text-4xl">work_history</span> Experience
            </h2>
<div class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-600">
<div class="relative flex items-start gap-6">
<div class="bg-[#0c7ff2] text-white rounded-full h-10 w-10 flex items-center justify-center ring-4 ring-slate-700/80 shadow-lg z-10">
<span class="material-icons">business_center</span>
</div>
<div>
<h3 class="text-xl font-semibold text-white">Software Engineering Intern</h3>
<p class="text-sky-400 text-sm">Tech Innovators Inc. | Summer 2023</p>
<p class="text-gray-400 mt-2 text-sm">
                    Contributed to developing new features for a flagship product, participated in agile sprints, and collaborated with a cross-functional team.
                  </p>
</div>
</div>
<div class="relative flex items-start gap-6">
<div class="bg-[#0c7ff2] text-white rounded-full h-10 w-10 flex items-center justify-center ring-4 ring-slate-700/80 shadow-lg z-10">
<span class="material-icons">science</span>
</div>
<div>
<h3 class="text-xl font-semibold text-white">Research Assistant</h3>
<p class="text-sky-400 text-sm">Stanford AI Lab | 2022-2023</p>
<p class="text-gray-400 mt-2 text-sm">
                    Assisted senior researchers in machine learning projects, focusing on natural language processing and computer vision tasks.
                  </p>
</div>
</div>
<div class="relative flex items-start gap-6">
<div class="bg-[#0c7ff2] text-white rounded-full h-10 w-10 flex items-center justify-center ring-4 ring-slate-700/80 shadow-lg z-10">
<span class="material-icons">terminal</span>
</div>
<div>
<h3 class="text-xl font-semibold text-white">Freelance Web Developer</h3>
<p class="text-sky-400 text-sm">Self-Employed | 2021-Present</p>
<p class="text-gray-400 mt-2 text-sm">
                    Designed and developed custom websites for small businesses, focusing on responsive design and user experience.
                  </p>
</div>
</div>
</div>
</section>
<section class="section-card p-8 md:p-12" id="contact">
<h2 class="text-3xl font-bold text-sky-300 mb-8 flex items-center gap-3">
<span class="material-icons text-4xl">email</span> Get In Touch
            </h2>
<form class="space-y-6">
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label class="block text-sm font-medium text-gray-300 mb-1" for="name">Full Name</label>
<input class="form-input block w-full rounded-lg border-slate-600 bg-slate-700 text-white placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500 shadow-sm transition-colors" id="name" name="name" placeholder="Your Name" type="text"/>
</div>
<div>
<label class="block text-sm font-medium text-gray-300 mb-1" for="email">Email Address</label>
<input class="form-input block w-full rounded-lg border-slate-600 bg-slate-700 text-white placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500 shadow-sm transition-colors" id="email" name="email" placeholder="Your Email" type="email"/>
</div>
</div>
<div>
<label class="block text-sm font-medium text-gray-300 mb-1" for="message">Message</label>
<textarea class="form-textarea block w-full rounded-lg border-slate-600 bg-slate-700 text-white placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500 shadow-sm transition-colors" id="message" name="message" placeholder="Your Message" rows="4"></textarea>
</div>
<div>
<button class="flex items-center justify-center gap-2 min-w-[120px] cursor-pointer overflow-hidden rounded-lg h-12 px-6 bg-[#0c7ff2] text-white text-base font-semibold tracking-wide hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg" type="submit">
<span class="material-icons">send</span>
<span class="truncate">Send Message</span>
</button>
</div>
</form>
</section>
</div>
</main>
<footer class="bg-[#181c22] border-t border-solid border-b-[#283039] text-center p-6">
<p class="text-gray-400 text-sm">© 2024 Sophia Carter. All rights reserved.</p>
<p class="text-gray-500 text-xs mt-1">Powered by KnowTruly.me</p>
</footer>
</div>

</body></html>
Screen 2 - Design Syntax:
<html><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Inter%3Awght%40400%3B500%3B600%3B700%3B900&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
<title>Stitch Design</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
    .progress-bar::-webkit-progress-bar {
      background-color: #3b4754;}
    .progress-bar::-webkit-progress-value {
      background-color: #0c7ff2;transition: width 0.5s ease-in-out;
    }
    .progress-bar::-moz-progress-bar {
      background-color: #0c7ff2;transition: width 0.5s ease-in-out;
    }
    .table-action-button {
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }
    .table-action-button:hover {
      background-color: #0c7ff2;
      color: white;
    }
    .nav-link {
        position: relative;
        transition: color 0.3s ease;
    }
    .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 50%;
        background-color: #0c7ff2;
        transition: width 0.3s ease, left 0.3s ease;
    }
    .nav-link:hover::after {
        width: 100%;
        left: 0;
    }
    .nav-link:hover {
        color: #0c7ff2;
    }
    .new-resume-button {
      transition: background-color 0.3s ease, transform 0.2s ease;
    }
    .new-resume-button:hover {
      background-color: #0a6cce;transform: translateY(-2px);
    }
    .resume-row:hover {
      background-color: #1f2937;}
  </style>
</head>
<body style='font-family: Inter, "Noto Sans", sans-serif;'>
<div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden text-neutral-200">
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-neutral-700 px-10 py-4 shadow-lg bg-[#1a1f25]">
<div class="flex items-center gap-4">
<div class="size-7 text-[#0c7ff2]">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
</div>
<h2 class="text-xl font-bold leading-tight tracking-[-0.015em] text-white">KnowTruly.me</h2>
</div>
<nav class="flex items-center gap-8">
<a class="nav-link text-sm font-medium leading-normal text-neutral-300 hover:text-[#0c7ff2]" href="#">Dashboard</a>
<a class="nav-link text-sm font-medium leading-normal text-neutral-300 hover:text-[#0c7ff2]" href="#">Resume Builder</a>
<a class="nav-link text-sm font-medium leading-normal text-neutral-300 hover:text-[#0c7ff2]" href="#">Portfolio</a>
<a class="nav-link text-sm font-medium leading-normal text-neutral-300 hover:text-[#0c7ff2]" href="#">Career Guidance</a>
</nav>
<div class="flex items-center gap-4">
<button class="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-[#0c7ff2] transition-colors duration-200">
<span class="material-icons text-xl">notifications</span>
</button>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#0c7ff2]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHMF8na7mbdaQ90JKKSdsCbiarIgXzWWyr1oZ_N1BkW0GHWmvIvQNjfyvO20ldw-oMFYLZmRoJXTXCR2n39RV4Uvc1XBQCSI0SjtQqr_k27bADP2bJcVKUJEg2IIat9PsVbGeVdnBB-X9k6h_uIFW58NeCeg-TmxOftUmEYBdm0N-unSPUgZurqg9n2XRmPmJlWxKwpjq3hQTcJkXXOUlVo_9YvVBomgsuY6fS1G51EsycPwCfXpLGw2rIpCkBcCsXZSXTYcsEWQ");'></div>
</div>
</header>
<main class="px-10 sm:px-20 lg:px-40 flex flex-1 justify-center py-10 bg-gradient-to-b from-[#111418] to-[#181d23]">
<div class="layout-content-container flex flex-col w-full max-w-5xl flex-1">
<div class="flex flex-wrap justify-between items-center gap-4 p-4 mb-8">
<h1 class="text-white tracking-tight text-4xl font-bold leading-tight">My Resumes</h1>
<button class="new-resume-button flex items-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#0c7ff2] text-white text-sm font-semibold leading-normal shadow-md hover:shadow-lg">
<span class="material-icons text-lg">add_circle_outline</span>
<span class="truncate">New Resume</span>
</button>
</div>
<div class="bg-[#181e25] rounded-xl shadow-2xl overflow-hidden @container">
<div class="px-6 py-4 border-b border-neutral-700">
<h3 class="text-neutral-100 text-xl font-semibold leading-tight tracking-[-0.015em]">Active Resumes</h3>
</div>
<div class="overflow-x-auto">
<table class="w-full min-w-[800px]">
<thead class="bg-[#1f2937]">
<tr>
<th class="px-6 py-4 text-left text-neutral-300 text-xs font-medium uppercase tracking-wider">Resume Title</th>
<th class="px-6 py-4 text-left text-neutral-300 text-xs font-medium uppercase tracking-wider">Target Role</th>
<th class="px-6 py-4 text-left text-neutral-300 text-xs font-medium uppercase tracking-wider">Last Updated</th>
<th class="px-6 py-4 text-left text-neutral-300 text-xs font-medium uppercase tracking-wider">Completeness</th>
<th class="px-6 py-4 text-left text-neutral-300 text-xs font-medium uppercase tracking-wider w-48">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-neutral-700">
<tr class="resume-row transition-colors duration-150">
<td class="px-6 py-4 whitespace-nowrap text-neutral-100 text-sm font-medium">Software Engineer Resume</td>
<td class="px-6 py-4 whitespace-nowrap text-neutral-400 text-sm">Software Engineer</td>
<td class="px-6 py-4 whitespace-nowrap text-neutral-400 text-sm">2024-07-26</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<progress class="progress-bar w-24 h-2 rounded-full appearance-none" max="100" value="75"></progress>
<p class="text-neutral-100 text-sm font-medium">75%</p>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
<div class="flex items-center gap-2">
<button class="table-action-button p-2 rounded-md text-neutral-400 hover:text-[#0c7ff2] hover:bg-neutral-700" title="Edit">
<span class="material-icons text-lg">edit</span>
</button>
<button class="table-action-button p-2 rounded-md text-neutral-400 hover:text-[#0c7ff2] hover:bg-neutral-700" title="Preview">
<span class="material-icons text-lg">visibility</span>
</button>
<button class="table-action-button p-2 rounded-md text-red-500 hover:text-red-400 hover:bg-red-900/50" title="Delete">
<span class="material-icons text-lg">delete_outline</span>
</button>
</div>
</td>
</tr>
<tr class="resume-row transition-colors duration-150">
<td class="px-6 py-4 whitespace-nowrap text-neutral-100 text-sm font-medium">Data Analyst Resume</td>
<td class="px-6 py-4 whitespace-nowrap text-neutral-400 text-sm">Data Analyst</td>
<td class="px-6 py-4 whitespace-nowrap text-neutral-400 text-sm">2024-07-20</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<progress class="progress-bar w-24 h-2 rounded-full appearance-none" max="100" value="50"></progress>
<p class="text-neutral-100 text-sm font-medium">50%</p>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
<div class="flex items-center gap-2">
<button class="table-action-button p-2 rounded-md text-neutral-400 hover:text-[#0c7ff2] hover:bg-neutral-700" title="Edit">
<span class="material-icons text-lg">edit</span>
</button>
<button class="table-action-button p-2 rounded-md text-neutral-400 hover:text-[#0c7ff2] hover:bg-neutral-700" title="Preview">
<span class="material-icons text-lg">visibility</span>
</button>
<button class="table-action-button p-2 rounded-md text-red-500 hover:text-red-400 hover:bg-red-900/50" title="Delete">
<span class="material-icons text-lg">delete_outline</span>
</button>
</div>
</td>
</tr>
<tr class="resume-row transition-colors duration-150">
<td class="px-6 py-4 whitespace-nowrap text-neutral-100 text-sm font-medium">Product Manager Resume</td>
<td class="px-6 py-4 whitespace-nowrap text-neutral-400 text-sm">Product Manager</td>
<td class="px-6 py-4 whitespace-nowrap text-neutral-400 text-sm">2024-07-15</td>
<td class="px-6 py-4 whitespace-nowrap">
<div class="flex items-center gap-2">
<progress class="progress-bar w-24 h-2 rounded-full appearance-none" max="100" value="25"></progress>
<p class="text-neutral-100 text-sm font-medium">25%</p>
</div>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
<div class="flex items-center gap-2">
<button class="table-action-button p-2 rounded-md text-neutral-400 hover:text-[#0c7ff2] hover:bg-neutral-700" title="Edit">
<span class="material-icons text-lg">edit</span>
</button>
<button class="table-action-button p-2 rounded-md text-neutral-400 hover:text-[#0c7ff2] hover:bg-neutral-700" title="Preview">
<span class="material-icons text-lg">visibility</span>
</button>
<button class="table-action-button p-2 rounded-md text-red-500 hover:text-red-400 hover:bg-red-900/50" title="Delete">
<span class="material-icons text-lg">delete_outline</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
<footer class="border-t border-neutral-700 bg-[#1a1f25]">
<div class="max-w-5xl mx-auto px-5 py-8">
<div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around mb-4">
<a class="text-neutral-400 hover:text-[#0c7ff2] text-sm font-normal leading-normal min-w-40 transition-colors duration-200" href="#">Terms of Service</a>
<a class="text-neutral-400 hover:text-[#0c7ff2] text-sm font-normal leading-normal min-w-40 transition-colors duration-200" href="#">Privacy Policy</a>
<a class="text-neutral-400 hover:text-[#0c7ff2] text-sm font-normal leading-normal min-w-40 transition-colors duration-200" href="#">Contact Us</a>
</div>
<p class="text-neutral-500 text-sm font-normal leading-normal text-center">© 2024 KnowTruly.me. All rights reserved.</p>
</div>
</footer>
</div>
</div>

</body></html>
Screen 3 - Design Syntax:
<html><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Inter%3Awght%40400%3B500%3B600%3B700%3B900&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
<title>Stitch Design</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
</head>
<body class="bg-[#111418]">
<div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style="--select-button-svg: url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(156,171,186)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e'); font-family: Inter, &quot;Noto Sans&quot;, sans-serif;">
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2A323B] px-10 py-4 shadow-sm">
<div class="flex items-center gap-3 text-white">
<div class="size-5 text-[#0c7ff2]">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
</div>
<h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">KnowTruly.me</h2>
</div>
<div class="flex flex-1 justify-end gap-6">
<nav class="flex items-center gap-6">
<a class="text-sm font-medium leading-normal text-slate-300 hover:text-white transition-colors" href="#">Dashboard</a>
<a class="text-sm font-medium leading-normal text-white hover:text-slate-300 transition-colors" href="#">Resume</a>
<a class="text-sm font-medium leading-normal text-slate-300 hover:text-white transition-colors" href="#">Portfolio</a>
<a class="text-sm font-medium leading-normal text-slate-300 hover:text-white transition-colors" href="#">Jobs</a>
</nav>
<button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-[#2A323B] text-slate-300 hover:text-white transition-colors">
<div class="text-inherit" data-icon="Bell" data-size="20px" data-weight="regular">
<svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
<path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
</svg>
</div>
</button>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#0c7ff2]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1-JFW-ZISvGoL79NYiWUPgZYk5CFjzcUQEMrsrBYgs0PY8Q-22pyL4v4IwOyZXT3siYTGo78h8iHydrrbf44RQYaGtvjFJdZw16JDug-seG_FRhqhWhbiiSSfhxMHER8yz4Q8fFPeEVpUB44HHH2Xg49fq7-eozW8O6E6B-_mBQUIW4Oym-pUfEmqwPL6yz0AEYRpGXWH575sn5bsZ1kLOKpfq-xa1-EgZvRUXVK01PCIOVjSmHFh77aJ7RFBTdfilO3w3XNFMg");'></div>
</div>
</header>
<main class="flex-1 grid grid-cols-[360px_1fr] gap-0">
<aside class="flex flex-col border-r border-[#2A323B] bg-[#181C20]">
<div class="p-6">
<h3 class="text-white text-2xl font-bold leading-tight tracking-tight">Resume Editor</h3>
</div>
<div class="border-b border-[#2A323B]">
<div class="flex px-6 gap-6">
<a class="flex flex-col items-center justify-center border-b-2 border-b-[#0c7ff2] text-white pb-3 pt-2" href="#">
<p class="text-sm font-semibold leading-normal">Chat</p>
</a>
<a class="flex flex-col items-center justify-center border-b-2 border-b-transparent text-slate-400 hover:text-white transition-colors pb-3 pt-2" href="#">
<p class="text-sm font-semibold leading-normal">Manual</p>
</a>
</div>
</div>
<div class="flex-1 overflow-y-auto p-6 space-y-6">
<div class="flex items-end gap-3">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrusnpyF8Pt1jWL8dBcArXnHddNb4vJHuMF54dp5YpHUzbyBvCsL_J0YmGA72e9FEhbCO4TSkEvFySpXY3RCPlBi5wwQRDW3XvAhTzT2uGhsSmmQv8-7Lg_SfdPjhONFjT0NJDjnCrFhhrcSsW_mWaYF8H0yHRhEsBBJyhjT6Dkz41doH0by532ofyBRzJkxYo7JQBlc8wfOUFffo5x3cnilF5C-Hoy_Kq6LsJrzo6ZkPgpnIKQniaQntbMRbdVfUSWbaWlz5DSg");'></div>
<div class="flex flex-1 flex-col gap-1.5 items-start">
<p class="text-slate-400 text-xs font-medium leading-normal">AI Assistant</p>
<p class="text-sm font-normal leading-relaxed rounded-lg px-3.5 py-2.5 bg-[#2A323B] text-slate-100">
                    Hi Sarah, let's refine your resume. What's your current role?
                  </p>
</div>
</div>
<div class="sticky bottom-0 bg-[#181C20] py-3 -mx-6 px-6 border-t border-[#2A323B]">
<div class="flex items-center gap-2 @container">
<label class="flex flex-col h-11 flex-1">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border-none bg-[#2A323B] focus:border-none h-full placeholder:text-slate-400 px-3.5 text-sm font-normal leading-normal" placeholder="Type your message..." value=""/>
</div>
</label>
<button class="flex items-center justify-center p-2.5 rounded-lg text-slate-400 hover:bg-[#2A323B] hover:text-white transition-colors">
<div data-icon="Microphone" data-size="20px" data-weight="regular">
<svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
<path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path>
</svg>
</div>
</button>
<button class="min-w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-[#0c7ff2] text-white text-sm font-semibold leading-normal hover:bg-blue-600 transition-colors shadow-sm">
<span class="truncate">Send</span>
</button>
</div>
</div>
<div class="space-y-5 pt-2">
<label class="flex flex-col">
<p class="text-slate-200 text-sm font-medium leading-normal pb-2">Job Title</p>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-[#323B45] bg-[#1F242A] focus:border-[#0c7ff2] h-11 placeholder:text-slate-400 p-3 text-sm font-normal leading-normal shadow-sm" value=""/>
</label>
<label class="flex flex-col">
<p class="text-slate-200 text-sm font-medium leading-normal pb-2">Company</p>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-[#323B45] bg-[#1F242A] focus:border-[#0c7ff2] h-11 placeholder:text-slate-400 p-3 text-sm font-normal leading-normal shadow-sm" value=""/>
</label>
<label class="flex flex-col">
<p class="text-slate-200 text-sm font-medium leading-normal pb-2">Description</p>
<textarea class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-[#323B45] bg-[#1F242A] focus:border-[#0c7ff2] min-h-32 placeholder:text-slate-400 p-3 text-sm font-normal leading-normal shadow-sm"></textarea>
</label>
</div>
<div>
<h3 class="text-white text-lg font-semibold leading-tight tracking-tight pt-4 pb-3">Customize</h3>
<div class="space-y-4">
<label class="flex flex-col">
<p class="text-slate-200 text-sm font-medium leading-normal pb-2">Template</p>
<select class="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-[#323B45] bg-[#1F242A] focus:border-[#0c7ff2] h-11 bg-[image:--select-button-svg] bg-right_1rem_center bg-no-repeat bg-[length:1.25em] placeholder:text-slate-400 p-3 text-sm font-normal leading-normal shadow-sm">
<option class="text-slate-400" value="">Select a template</option>
<option class="text-slate-100" value="modern">Modern</option>
<option class="text-slate-100" value="classic">Classic</option>
<option class="text-slate-100" value="creative">Creative</option>
</select>
</label>
<label class="flex flex-col">
<p class="text-slate-200 text-sm font-medium leading-normal pb-2">Style</p>
<select class="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-100 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-[#323B45] bg-[#1F242A] focus:border-[#0c7ff2] h-11 bg-[image:--select-button-svg] bg-right_1rem_center bg-no-repeat bg-[length:1.25em] placeholder:text-slate-400 p-3 text-sm font-normal leading-normal shadow-sm">
<option class="text-slate-400" value="">Choose a style</option>
<option class="text-slate-100" value="minimalist">Minimalist</option>
<option class="text-slate-100" value="bold">Bold</option>
<option class="text-slate-100" value="elegant">Elegant</option>
</select>
</label>
</div>
</div>
<div class="flex pt-4 justify-end">
<button class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] text-white text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors shadow-md">
<span class="truncate">Save Changes</span>
</button>
</div>
</div>
</aside>
<section class="flex flex-col bg-[#111418] p-6 @container">
<div class="flex-1 flex items-center justify-center">
<div class="w-full max-w-3xl aspect-[1/1.414] bg-white rounded-lg shadow-2xl overflow-hidden">
<div class="bg-center bg-no-repeat bg-cover w-full h-full" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkEsRnlWAON0A2yfWd9fa1caXZpQW8lcxhLopy0nccxiBXYp4r1e7QKqciKaviisxTMR9ofrNGV5TgNUvMeVJvVbuB9WHPRJNT_uIcvtPWgQLXhEh7PkUqBbAHWFq4HF9h2N2UZnCsFcJr3Jqm78JIYvCqbnpZ6f9SxX0rzpgpKlYlKPqMsLywAyLbSR2HGMcQEWAgZ-WiwP6EFjTmoWWXbVtoxbSCCLQ0URq2oFpvzilo5rpfLIJ94prkeN5sVq_f0UwXFpmWag");'>
</div>
</div>
</div>
<div class="flex justify-center items-center gap-4 pt-6">
<button class="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-[#2A323B] hover:text-white transition-colors text-sm font-medium">
<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                    Download PDF
                </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-[#2A323B] hover:text-white transition-colors text-sm font-medium">
<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                    Edit Sections
                </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-[#2A323B] hover:text-white transition-colors text-sm font-medium">
<svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" width="18" x="3" y="3"></rect><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
                    Add Section
                </button>
</div>
</section>
</main>
</div>
</div>

</body></html>
Screen 4 - Design Syntax:
<html><head>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Inter%3Awght%40400%3B500%3B700%3B900&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
<meta charset="utf-8"/>
<title>KnowTruly.me - Find Candidates</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet"/>
<style>
      .material-icons-sharp {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
      }
    </style>
</head>
<body class="bg-[#111418] text-white" style='font-family: Inter, "Noto Sans", sans-serif;'>
<div class="relative flex size-full min-h-screen flex-col overflow-x-hidden">
<header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] bg-[#111418]/80 px-6 py-3 backdrop-blur-md sm:px-10">
<div class="flex items-center gap-6">
<div class="flex items-center gap-3 text-white">
<svg class="size-6 text-[#0c7ff2]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
<h1 class="text-xl font-bold leading-tight tracking-[-0.015em]">KnowTruly.me</h1>
</div>
<nav class="hidden items-center gap-6 md:flex">
<a class="hover:text-[#0c7ff2] text-sm font-medium leading-normal transition-colors" href="#">Home</a>
<a class="text-[#0c7ff2] text-sm font-bold leading-normal" href="#">Candidates</a>
<a class="hover:text-[#0c7ff2] text-sm font-medium leading-normal transition-colors" href="#">Jobs</a>
<a class="hover:text-[#0c7ff2] text-sm font-medium leading-normal transition-colors" href="#">Company</a>
</nav>
</div>
<div class="flex items-center gap-4">
<label class="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full">
<div class="text-[#9cabba] flex border-none bg-[#283039] items-center justify-center pl-3 rounded-l-lg border-r-0">
<span class="material-icons-sharp text-xl">search</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#283039] focus:border-none h-full placeholder:text-[#9cabba] px-3 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search..." value=""/>
</div>
</label>
<button aria-label="Notifications" class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#283039] text-white transition-colors hover:bg-[#3b4754]">
<span class="material-icons-sharp text-xl">notifications</span>
</button>
<button aria-label="User Profile">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#0c7ff2]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEBYM3_QKxHJuhMt5Dlnp-84-k6uj76TwEU7RUP_HOh7YKOH_9q6MWKJFowHYMxuFNKdZrTLj4UClckjiEa0Grbs4jImlw6DvRUBh8FDNz1KGe707apQquBoqTmJHLG_UATrFgaaRvugQZaf-JmZpBvoyJxatsRgFW8aFDrJcHRUJ4gor-T0dpk0N5rjekOvlvvugjYvOiPUp7XCmpi-0FsxW5bPkV_CZ5-xguJ2PIogBLANFlQbh2xDQGha7yABME9wh3eievhQ");'></div>
</button>
</div>
</header>
<main class="flex flex-1 justify-center px-4 py-8 sm:px-6 lg:px-8">
<div class="w-full max-w-4xl">
<div class="mb-8 text-center">
<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Discover Top Talent</h2>
<p class="text-[#9cabba] mt-2 text-base leading-normal sm:text-lg">
              Use our AI-powered search to find candidates matching your specific criteria.
            </p>
</div>
<div class="mb-6 rounded-xl bg-[#1a1f25] p-4 shadow-xl sm:p-6">
<div class="relative">
<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
<span class="material-icons-sharp text-[#9cabba]">search</span>
</div>
<input class="form-input w-full rounded-lg border-0 bg-[#283039] py-3.5 pl-12 pr-12 text-base text-white placeholder:text-[#9cabba] focus:ring-2 focus:ring-[#0c7ff2]" placeholder="Type your query (e.g., 'frontend developer with React and 3 years experience')" type="text" value="Software Engineer with 5+ years of experience in web development"/>
<button aria-label="Clear search" class="absolute inset-y-0 right-0 flex items-center pr-4 text-[#9cabba] transition-colors hover:text-white">
<span class="material-icons-sharp">close</span>
</button>
</div>
<div class="mt-4 flex flex-wrap items-center gap-2">
<span class="text-sm text-[#9cabba]">Applied Filters:</span>
<div class="flex h-8 items-center gap-x-1.5 rounded-full bg-[#0c7ff2]/20 px-3 py-1 text-xs font-medium text-[#0c7ff2]">
<span class="material-icons-sharp text-sm">code</span>
<span>Skills: Web Development</span>
</div>
<div class="flex h-8 items-center gap-x-1.5 rounded-full bg-[#0c7ff2]/20 px-3 py-1 text-xs font-medium text-[#0c7ff2]">
<span class="material-icons-sharp text-sm">work_history</span>
<span>Experience: 5+ years</span>
</div>
<div class="flex h-8 items-center gap-x-1.5 rounded-full bg-[#0c7ff2]/20 px-3 py-1 text-xs font-medium text-[#0c7ff2]">
<span class="material-icons-sharp text-sm">business_center</span>
<span>Industry: Technology</span>
</div>
<div class="flex h-8 items-center gap-x-1.5 rounded-full bg-[#0c7ff2]/20 px-3 py-1 text-xs font-medium text-[#0c7ff2]">
<span class="material-icons-sharp text-sm">public</span>
<span>Location: Remote</span>
</div>
<button class="ml-auto text-xs text-[#9cabba] underline hover:text-white">Clear All</button>
</div>
</div>
<div class="mb-6 flex items-center justify-between">
<h3 class="text-xl font-semibold leading-tight tracking-[-0.015em]">Search Results</h3>
<div class="flex items-center gap-2">
<button class="flex h-9 items-center justify-center gap-2 rounded-md bg-[#283039] px-3 text-sm font-medium text-white transition-colors hover:bg-[#3b4754]">
<span class="material-icons-sharp text-lg">sort</span>
                Sort
              </button>
<button class="flex h-9 items-center justify-center gap-2 rounded-md bg-[#283039] px-3 text-sm font-medium text-white transition-colors hover:bg-[#3b4754]">
<span class="material-icons-sharp text-lg">filter_list</span>
                Filter
              </button>
<button class="flex h-9 items-center justify-center gap-2 rounded-md bg-[#0c7ff2] px-3 text-sm font-bold text-white transition-colors hover:bg-[#0a69c3]">
<span class="material-icons-sharp text-lg">bookmark_border</span>
                Save Search
              </button>
</div>
</div>
<div class="border-b border-[#3b4754]">
<nav aria-label="Tabs" class="-mb-px flex space-x-6">
<a aria-current="page" class="whitespace-nowrap border-b-2 border-[#0c7ff2] px-1 py-3 text-sm font-semibold text-[#0c7ff2]" href="#">
                All Candidates (250)
              </a>
<a class="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-[#9cabba] hover:border-gray-300 hover:text-gray-200" href="#">
                Recommended (50)
              </a>
<a class="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-[#9cabba] hover:border-gray-300 hover:text-gray-200" href="#">
                Saved (10)
              </a>
</nav>
</div>
<div class="mt-6 grid gap-6">
<div class="flex flex-col gap-4 rounded-xl bg-[#1a1f25] p-5 shadow-lg transition-all hover:shadow-2xl sm:flex-row sm:items-start">
<div class="h-24 w-24 flex-shrink-0 rounded-full bg-cover bg-center sm:h-28 sm:w-28" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgSqEQ4VXjOuRF8KoeJHuetelX66OygGEyzWurpLu57K3kiIWU0BzCysv0RCdsOpY0Oc-AFzGVpgCv5NcadjCtXxC2774rUOXCfjeScJ8AmHJwYPM4z3XwsXwQSm3kgFLKepKHJ8QvJ8QCxTdsGgPTnnDOyJOUsOgMUonlTKkRb5HEtJ6NAmgD-yjV3ocLsmJtlBJWEVfH9Rq7wXxh-oqiQUYDVkrctBcXH4cm_XNlcVw0lT-HPw7C9iuxu4Jb--qmPuC2D-2ANA");'></div>
<div class="flex-grow">
<h4 class="text-lg font-semibold text-white">Sophia Carter</h4>
<p class="text-sm text-[#9cabba]">Software Engineer at Tech Innovators Inc.</p>
<p class="mt-1 text-xs text-gray-400">5+ years experience</p>
<div class="mt-3 flex flex-wrap gap-2">
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">React</span>
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">Node.js</span>
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">JavaScript</span>
</div>
</div>
<button class="mt-4 w-full shrink-0 rounded-lg bg-[#0c7ff2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a69c3] sm:ml-auto sm:mt-0 sm:w-auto">
                View Profile
              </button>
</div>
<div class="flex flex-col gap-4 rounded-xl bg-[#1a1f25] p-5 shadow-lg transition-all hover:shadow-2xl sm:flex-row sm:items-start">
<div class="h-24 w-24 flex-shrink-0 rounded-full bg-cover bg-center sm:h-28 sm:w-28" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvqy0R5TBL3TeUNSRpGpsNqDYqXl2BY5bm3X38j2MrALabbVeXKyk-1_QTtj3yMc4kFdcQyg84f9L9VHK-RmiEVRxSRpGqe3SYM0CBD0yoamSgZi-PrARTjS3eNihuW8vPFlGQqe1MpxYFVSxKeC_iVDr0ij5SEsZ8CnGjeRGy6ze934lRnMtpjRnDmO_3VvuK4Jg5m6mVXefG6u2nDCWn7uhM7GH8uG2FUu8h2Jk4E3tBfFQuhfEEwQYG7ItdXpucFNkR6Iubtw");'></div>
<div class="flex-grow">
<h4 class="text-lg font-semibold text-white">Ethan Bennett</h4>
<p class="text-sm text-[#9cabba]">Senior Web Developer at Digital Solutions Co.</p>
<p class="mt-1 text-xs text-gray-400">7+ years experience</p>
<div class="mt-3 flex flex-wrap gap-2">
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">Angular</span>
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">TypeScript</span>
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">GraphQL</span>
</div>
</div>
<button class="mt-4 w-full shrink-0 rounded-lg bg-[#0c7ff2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a69c3] sm:ml-auto sm:mt-0 sm:w-auto">
                View Profile
              </button>
</div>
<div class="flex flex-col gap-4 rounded-xl bg-[#1a1f25] p-5 shadow-lg transition-all hover:shadow-2xl sm:flex-row sm:items-start">
<div class="h-24 w-24 flex-shrink-0 rounded-full bg-cover bg-center sm:h-28 sm:w-28" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBopuxGZA7fpZyspyYhMw6K66mQQXtBS4M-OVNhIgGfnQVxbYW1vVMHjDeOMX8Pt25XGFLMEhvbd_OtntMPqKiBApJAGH23Eiu0uk4-l1vkCOLgc8RcBL1Y-o8A10orV5nabDVSFQ2FC6pSI77ePv7cKyXv_Eqka7R_vAnGpAYXVu6vf6eIalyMV2qG6eBlR5PXU4GKJtpMV41RqVM-DfFQ_G4fVo1qynzi3VBncsRSM1mswX2uLpP_d0MNrdcIe2HuL_dyqIzAYQ");'></div>
<div class="flex-grow">
<h4 class="text-lg font-semibold text-white">Olivia Hayes</h4>
<p class="text-sm text-[#9cabba]">Full-Stack Developer at Creative Tech Group</p>
<p class="mt-1 text-xs text-gray-400">4+ years experience</p>
<div class="mt-3 flex flex-wrap gap-2">
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">Vue.js</span>
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">Python</span>
<span class="rounded-full bg-[#283039] px-2.5 py-0.5 text-xs text-gray-300">Django</span>
</div>
</div>
<button class="mt-4 w-full shrink-0 rounded-lg bg-[#0c7ff2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a69c3] sm:ml-auto sm:mt-0 sm:w-auto">
                View Profile
              </button>
</div>
</div>
<nav aria-label="Pagination" class="mt-8 flex items-center justify-center">
<a class="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#3b4754] bg-[#283039] text-sm font-medium text-gray-400 hover:bg-[#3b4754] hover:text-white" href="#">
<span class="sr-only">Previous</span>
<span class="material-icons-sharp text-lg">chevron_left</span>
</a>
<a aria-current="page" class="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#0c7ff2] bg-[#0c7ff2] text-sm font-medium text-white" href="#">
              1
            </a>
<a class="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#3b4754] bg-[#283039] text-sm font-medium text-gray-400 hover:bg-[#3b4754] hover:text-white" href="#">
              2
            </a>
<a class="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#3b4754] bg-[#283039] text-sm font-medium text-gray-400 hover:bg-[#3b4754] hover:text-white" href="#">
              3
            </a>
<span class="mr-2 inline-flex h-10 w-10 items-center justify-center text-sm font-medium text-gray-400">...</span>
<a class="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#3b4754] bg-[#283039] text-sm font-medium text-gray-400 hover:bg-[#3b4754] hover:text-white" href="#">
              10
            </a>
<a class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#3b4754] bg-[#283039] text-sm font-medium text-gray-400 hover:bg-[#3b4754] hover:text-white" href="#">
<span class="sr-only">Next</span>
<span class="material-icons-sharp text-lg">chevron_right</span>
</a>
</nav>
</div>
</main>
<footer class="border-t border-[#283039] bg-[#111418] py-8 text-center">
<p class="text-sm text-[#9cabba]">© 2023 KnowTruly.me. All rights reserved.</p>
</footer>
</div>

</body></html>
Screen 5 - Design Syntax:
<html><head>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Inter%3Awght%40400%3B500%3B700%3B900&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900" onload="this.rel='stylesheet'" rel="stylesheet"/>
<meta charset="utf-8"/>
<title>Stitch Design</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
</head>
<body>
<div class="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style='font-family: Inter, "Noto Sans", sans-serif;'>
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-10 py-4 shadow-md">
<div class="flex items-center gap-8">
<div class="flex items-center gap-3 text-white">
<div class="size-6 text-[#0c7ff2]">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
</div>
<h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">KnowTruly.me</h2>
</div>
<nav class="flex items-center gap-6">
<a class="text-slate-300 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Home</a>
<a class="text-white text-sm font-semibold leading-normal border-b-2 border-[#0c7ff2] pb-1" href="#">Candidates</a>
<a class="text-slate-300 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Jobs</a>
<a class="text-slate-300 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Company</a>
</nav>
</div>
<div class="flex flex-1 justify-end gap-4 items-center">
<label class="flex flex-col min-w-48 !h-10 max-w-xs">
<div class="flex w-full flex-1 items-stretch rounded-md h-full">
<div class="text-slate-400 flex border border-r-0 border-slate-700 bg-[#1f242c] items-center justify-center pl-3 rounded-l-md" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
<svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
</svg>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-300 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-l-0 border-slate-700 bg-[#1f242c] focus:border-slate-700 h-full placeholder:text-slate-500 px-3 rounded-l-none text-sm font-normal leading-normal" placeholder="Search" value=""/>
</div>
</label>
<button class="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 bg-transparent text-slate-300 hover:text-white hover:bg-[#1f242c] transition-colors gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3">
<div class="text-current" data-icon="Bell" data-size="24px" data-weight="regular">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
<path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
</svg>
</div>
<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#111418]"></span>
</button>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-700 hover:border-[#0c7ff2] transition-colors cursor-pointer" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCd2rMo-c6PL77qAvNS7bLlwuacmQ6wcl3JlarxhyrjWy0Vb3WJKmE0h9_u_e7FWhVOMx96hEZEtcAGx_cVZYwIbgj52fM0ekeNKRpUupF2HpkpL71qFsnlH0NFSUMZ7QXzy3gUJ_EgO0vyMMla6Gtv7LpirXt-ON3zZ8WcRtgVIYrR-HDIOpnpYHQIF3HtB-9-FV9so2Wp5mSvn41d9j1ZCtwiV0GzJ1K6OFA3idgBpjsz4ITU8t5lyDZW2BMSirCJjJM4jAZ-Tw");'></div>
</div>
</header>
<main class="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8">
<div class="layout-content-container flex flex-col max-w-5xl flex-1">
<div class="flex flex-wrap justify-between items-center gap-4 p-4 mb-4">
<h1 class="text-white tracking-tight text-3xl font-bold leading-tight">Candidate Summaries</h1>
<div class="flex items-center gap-2">
<span class="text-slate-400 text-sm">Sort by:</span>
<button class="flex h-8 items-center justify-center gap-x-1.5 rounded-md bg-[#1f242c] hover:bg-[#283039] border border-slate-700 px-3 text-sm font-medium text-white transition-colors">
                  Relevance
                  <i class="material-icons text-base">arrow_drop_down</i>
</button>
</div>
</div>
<div class="px-4 py-3 mb-6">
<label class="flex flex-col min-w-40 h-12 w-full">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
<div class="text-slate-400 flex border border-r-0 border-slate-700 bg-[#1f242c] items-center justify-center pl-4 rounded-l-lg">
<i class="material-icons text-xl">search</i>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-300 focus:outline-0 focus:ring-2 focus:ring-[#0c7ff2] border border-l-0 border-slate-700 bg-[#1f242c] focus:border-slate-700 h-full placeholder:text-slate-500 px-4 rounded-l-none text-base font-normal leading-normal" placeholder="Search candidates by name, skill, or keyword..." value=""/>
</div>
</label>
</div>
<div class="flex gap-3 p-3 flex-wrap pr-4 mb-6 border-b border-slate-800 pb-6">
<button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1f242c] hover:bg-[#283039] border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Skills
                 <i class="material-icons text-lg">expand_more</i>
</button>
<button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1f242c] hover:bg-[#283039] border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Experience
                 <i class="material-icons text-lg">expand_more</i>
</button>
<button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1f242c] hover:bg-[#283039] border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Location
                 <i class="material-icons text-lg">expand_more</i>
</button>
<button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#1f242c] hover:bg-[#283039] border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Availability
                 <i class="material-icons text-lg">expand_more</i>
</button>
<button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-transparent text-[#0c7ff2] hover:bg-[#0c7ff2]/10 border border-transparent hover:border-[#0c7ff2]/30 px-4 text-sm font-medium transition-colors">
<i class="material-icons text-lg">tune</i>
                All Filters
              </button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
<div class="group flex flex-col gap-4 rounded-xl bg-[#181d23] border border-slate-800 p-5 shadow-lg hover:shadow-xl hover:border-[#0c7ff2]/50 transition-all duration-300 ease-in-out">
<div class="flex items-start justify-between">
<div class="flex items-center gap-4">
<div class="w-16 h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-slate-700 group-hover:border-[#0c7ff2] transition-colors" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuByq6T5CEuLKQzB2-C88dZfrb9UTtr_50p5179Q55ellXE9p5fLo2zXIiNcJ-ytRKFcWyPudw43EOZchmYzBKFSg1pR7gxwi8dT8AM2bXSrz1QNwNoyWtZjOSzkuhFNf1BoVKixKegtzgzAoFrgWlE7aTzuvag2QNSBqZyb9t8hbJQX87aHo0jMM-U-lJEqZUPAxiAi-yhSvQ5a06eC7coGwi2VI5B84VXPjZw0G2DkfeutdHTQ89_8xy6WcqnlOs84uvy2DFXxAA");'></div>
<div>
<p class="text-white text-lg font-semibold leading-tight">Ethan Carter</p>
<p class="text-slate-400 text-sm font-normal leading-normal">Software Engineer | AI Enthusiast</p>
</div>
</div>
<div class="text-center">
<p class="text-xs text-slate-400 mb-0.5">Match</p>
<p class="text-2xl font-bold text-[#0c7ff2]">92%</p>
</div>
</div>
<div class="flex flex-wrap gap-2">
<span class="text-xs font-medium bg-[#0c7ff2]/20 text-[#0c7ff2] px-2.5 py-1 rounded-full">Python</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Machine Learning</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">AI</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">JavaScript</span>
</div>
<div>
<h4 class="text-sm font-semibold text-slate-300 mb-1">Highlights:</h4>
<ul class="list-disc list-inside text-slate-400 text-sm space-y-1 pl-1">
<li>Developed a novel recommendation algorithm.</li>
<li>Contributed to open-source AI projects.</li>
</ul>
</div>
<div class="flex gap-3 mt-2">
<button class="flex-1 flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] hover:bg-[#0a69c4] text-white text-sm font-medium leading-normal transition-colors">
<i class="material-icons text-lg">person</i>
<span class="truncate">View Profile</span>
</button>
<button class="flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors" title="Shortlist Candidate">
<i class="material-icons text-lg">bookmark_border</i>
</button>
</div>
</div>
<div class="group flex flex-col gap-4 rounded-xl bg-[#181d23] border border-slate-800 p-5 shadow-lg hover:shadow-xl hover:border-[#0c7ff2]/50 transition-all duration-300 ease-in-out">
<div class="flex items-start justify-between">
<div class="flex items-center gap-4">
<div class="w-16 h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-slate-700 group-hover:border-[#0c7ff2] transition-colors" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHptIDWPybuWlwynazKB_fE5GHcFJtp2csE_QdqifTH0NOGE6K372oNw6cllxdIktag9RI2LT8ON3k43XQ41R3FGupOSD3p26un8nYgkkySV1wdFYmP81IsnRS10CkQdT_k1TdYua60TQkq01BsWvg1MKhkksTmQGFffEd8KfWogMyIKS5BJWs9qSGxujcX1YphVQKpET4WW2RLb14I9r-q0hFKPnNiPTe1X0JQrzrUcERct-5UnqZoaV33LHhngnBdXjxx45_SA");'></div>
<div>
<p class="text-white text-lg font-semibold leading-tight">Olivia Bennett</p>
<p class="text-slate-400 text-sm font-normal leading-normal">Data Scientist | ML Expert</p>
</div>
</div>
<div class="text-center">
<p class="text-xs text-slate-400 mb-0.5">Match</p>
<p class="text-2xl font-bold text-[#0c7ff2]">88%</p>
</div>
</div>
<div class="flex flex-wrap gap-2">
<span class="text-xs font-medium bg-[#0c7ff2]/20 text-[#0c7ff2] px-2.5 py-1 rounded-full">SQL</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Data Analysis</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">R</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Statistics</span>
</div>
<div>
<h4 class="text-sm font-semibold text-slate-300 mb-1">Highlights:</h4>
<ul class="list-disc list-inside text-slate-400 text-sm space-y-1 pl-1">
<li>Led a team to improve model accuracy by 15%.</li>
<li>Published research in a top-tier journal.</li>
</ul>
</div>
<div class="flex gap-3 mt-2">
<button class="flex-1 flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] hover:bg-[#0a69c4] text-white text-sm font-medium leading-normal transition-colors">
<i class="material-icons text-lg">person</i>
<span class="truncate">View Profile</span>
</button>
<button class="flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors" title="Shortlist Candidate">
<i class="material-icons text-lg">bookmark_border</i>
</button>
</div>
</div>
<div class="group flex flex-col gap-4 rounded-xl bg-[#181d23] border border-slate-800 p-5 shadow-lg hover:shadow-xl hover:border-[#0c7ff2]/50 transition-all duration-300 ease-in-out">
<div class="flex items-start justify-between">
<div class="flex items-center gap-4">
<div class="w-16 h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-slate-700 group-hover:border-[#0c7ff2] transition-colors" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCawQnLBhG_rQdYvIF6f_wVZgCf2DfZL_9MtoXs2T7-13L3KEcuj7uXmvnDklI_R7_0DrtRU0ruDsmoiMctrcnPGSgiatTn_DkWM2OmP8fk4K97ZF6XQyQboBbeXRl7R8O-PbTov_46Qir94HtR3wgNKdM-BlQeydT88Z6Gr0MkHCYBMmUiBs2L1D0xpsBT117a9mg0Sy9Xw-657zJ4fsbrudxwRSX59B8B7bT3lakKGQHF9faKWByvkWBvvlw5zC63JciT-eIBzQ");'></div>
<div>
<p class="text-white text-lg font-semibold leading-tight">Noah Thompson</p>
<p class="text-slate-400 text-sm font-normal leading-normal">Product Manager | Tech Innovator</p>
</div>
</div>
<div class="text-center">
<p class="text-xs text-slate-400 mb-0.5">Match</p>
<p class="text-2xl font-bold text-orange-400">75%</p>
</div>
</div>
<div class="flex flex-wrap gap-2">
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Agile</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Roadmap</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Scrum</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">User Stories</span>
</div>
<div>
<h4 class="text-sm font-semibold text-slate-300 mb-1">Highlights:</h4>
<ul class="list-disc list-inside text-slate-400 text-sm space-y-1 pl-1">
<li>Launched 3 successful products in 2 years.</li>
<li>Increased user engagement by 25%.</li>
</ul>
</div>
<div class="flex gap-3 mt-2">
<button class="flex-1 flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] hover:bg-[#0a69c4] text-white text-sm font-medium leading-normal transition-colors">
<i class="material-icons text-lg">person</i>
<span class="truncate">View Profile</span>
</button>
<button class="flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors" title="Shortlist Candidate">
<i class="material-icons text-lg">bookmark_border</i>
</button>
</div>
</div>
<div class="group flex flex-col gap-4 rounded-xl bg-[#181d23] border border-slate-800 p-5 shadow-lg hover:shadow-xl hover:border-[#0c7ff2]/50 transition-all duration-300 ease-in-out">
<div class="flex items-start justify-between">
<div class="flex items-center gap-4">
<div class="w-16 h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full border-2 border-slate-700 group-hover:border-[#0c7ff2] transition-colors" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDo6JQ_OJUl_-EhMu2pVf2N3tp4nlr1V5UH-sYTRze-zk2hp4vW-5di_bwA4PSdsdk974SO1uAtSl_rrws7be0p7O4H_XHaEN-W6U_J6lm-tcVGhT8T0ygCoaByp2ibNq6PGycVE5qGdNC-pSPkLzkWbRwBgSPINMXw1tior737CSB2-cewa8a6t7lAjGqw7bAGW9dQw_ZWCXFUyg4j0XWKO4EQ_5n1FUUr-cK9pgWqfvRrlaQN6eNscDadc29gX4j3iv_sizTQGg");'></div>
<div>
<p class="text-white text-lg font-semibold leading-tight">Ava Harper</p>
<p class="text-slate-400 text-sm font-normal leading-normal">UX/UI Designer | User-Centric</p>
</div>
</div>
<div class="text-center">
<p class="text-xs text-slate-400 mb-0.5">Match</p>
<p class="text-2xl font-bold text-yellow-500">65%</p>
</div>
</div>
<div class="flex flex-wrap gap-2">
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Figma</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">User Research</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Prototyping</span>
<span class="text-xs font-medium bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full">Wireframing</span>
</div>
<div>
<h4 class="text-sm font-semibold text-slate-300 mb-1">Highlights:</h4>
<ul class="list-disc list-inside text-slate-400 text-sm space-y-1 pl-1">
<li>Redesigned an app, boosting user satisfaction.</li>
<li>Experienced in responsive web design.</li>
</ul>
</div>
<div class="flex gap-3 mt-2">
<button class="flex-1 flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] hover:bg-[#0a69c4] text-white text-sm font-medium leading-normal transition-colors">
<i class="material-icons text-lg">person</i>
<span class="truncate">View Profile</span>
</button>
<button class="flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors" title="Shortlist Candidate">
<i class="material-icons text-lg">bookmark_border</i>
</button>
</div>
</div>
</div>
<div class="flex items-center justify-center p-4 mt-8">
<a class="flex size-10 items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-[#1f242c] transition-colors" href="#">
<i class="material-icons text-xl">chevron_left</i>
</a>
<a class="text-sm font-bold leading-normal flex size-10 items-center justify-center text-white rounded-md bg-[#0c7ff2]" href="#">1</a>
<a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-300 hover:text-white hover:bg-[#1f242c] rounded-md transition-colors" href="#">2</a>
<a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-300 hover:text-white hover:bg-[#1f242c] rounded-md transition-colors" href="#">3</a>
<span class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-500">...</span>
<a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-300 hover:text-white hover:bg-[#1f242c] rounded-md transition-colors" href="#">8</a>
<a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-300 hover:text-white hover:bg-[#1f242c] rounded-md transition-colors" href="#">9</a>
<a class="flex size-10 items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-[#1f242c] transition-colors" href="#">
<i class="material-icons text-xl">chevron_right</i>
</a>
</div>
</div>
</main>
<footer class="px-10 py-6 border-t border-solid border-slate-800 text-center">
<p class="text-sm text-slate-500">© 2024 KnowTruly.me. All rights reserved.</p>
</footer>
</div>
</div>

</body></html>
Screen 6 - Design Syntax:
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>KnowTruly.me - Resume Templates</title>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Inter:wght@400;500;600;700;800;900&amp;family=Noto+Sans:wght@400;500;700;900" onload="this.rel='stylesheet'" rel="stylesheet"/>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"/>
<style>
    .card-hover-effect {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover-effect:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(12, 127, 242, 0.5);}
    .btn-primary {
        background-color: #0c7ff2;
        color: white;
    }
    .btn-primary:hover {
        background-color: #0a68c4;
    }
    .nav-link-active {
        color: #0c7ff2;
        border-bottom: 2px solid #0c7ff2;
        padding-bottom: 4px;
    }
    .filter-btn-active {
        background-color: #0c7ff2;
        color: white;
    }
  </style>
</head>
<body class="bg-[#111418]" style='font-family: Inter, "Noto Sans", sans-serif;'>
<div class="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden">
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-6 sm:px-10 py-4 sticky top-0 z-50 bg-[#111418]/80 backdrop-blur-md">
<div class="flex items-center gap-3 sm:gap-4 text-white">
<div class="size-6 text-[#0c7ff2]">
<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
</div>
<h2 class="text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">KnowTruly.me</h2>
</div>
<nav class="hidden md:flex items-center gap-6 lg:gap-8">
<a class="text-[#c7d2fe] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
<a class="text-white nav-link-active text-sm font-semibold leading-normal" href="#">Templates</a>
<a class="text-[#c7d2fe] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">AI Resume Builder</a>
<a class="text-[#c7d2fe] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Career Paths</a>
<a class="text-[#c7d2fe] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Resources</a>
</nav>
<div class="flex items-center gap-3 sm:gap-4">
<button class="btn-primary flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-semibold leading-normal tracking-[0.015em] transition-colors">
<span class="truncate">Upgrade</span>
</button>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#0c7ff2]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-lUgRqEfNlqD3KroTjsxtMGqsFOIY1SfkS5PqWMeQ6en9cT0iSo7FPu5Kfb3Sow_dRDa0Oc8_2HnnHRSKlfYDcoaX60muyzxR22YTSgofLdNlAu1Ok5shdEIRPC3kGM_Zgi5dKvNE6gLAJeLR6nswhE65r12Ida-dSDwZjePvX7aHVsBfG6LVJOFhqTeDPz787QACMVioigWh7_t4q7fCfV0yOSGfzsECKw2E7tT6-mv8LHKgQqZL_wmELY50n5ZVaK94qCZe2g");'></div>
<button class="md:hidden text-white">
<span class="material-icons-outlined">menu</span>
</button>
</div>
</header>
<main class="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-8 sm:py-12">
<div class="layout-content-container flex flex-col w-full max-w-7xl">
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 mb-8">
<div class="flex flex-col gap-2">
<h1 class="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight">Resume Templates</h1>
<p class="text-[#9cabba] text-sm sm:text-base font-normal leading-normal max-w-xl">
                Choose a template that best represents your skills and experience. Filter by style and theme to find the perfect match.
              </p>
</div>
</div>
<div class="mb-8 px-4">
<h3 class="text-white text-xl font-semibold leading-tight tracking-[-0.015em] mb-4">Filters</h3>
<div class="flex flex-wrap gap-3">
<button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-[#283039] hover:bg-[#3a4450] transition-colors pl-4 pr-3 text-white text-sm font-medium">
                Style
                <span class="material-icons-outlined text-lg">expand_more</span>
</button>
<button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-[#283039] hover:bg-[#3a4450] transition-colors pl-4 pr-3 text-white text-sm font-medium filter-btn-active">
                Theme: Tech
                <span class="material-icons-outlined text-lg">expand_more</span>
</button>
<button class="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-[#283039] hover:bg-[#3a4450] transition-colors pl-4 pr-3 text-white text-sm font-medium">
                Industry
                <span class="material-icons-outlined text-lg">expand_more</span>
</button>
<button class="flex h-10 items-center justify-center gap-x-1 rounded-lg text-[#9cabba] hover:text-white transition-colors px-3 text-sm font-medium">
                Clear All
                <span class="material-icons-outlined text-lg">close</span>
</button>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Modern Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY1sgVTnXGpXHbu8QgWdGE7sF6IpIgVoM3t6RWdRbbEtSmBnwqodKO0LRQ1yAI-QbFNHHYKOgoyaE7GaH2_-gOvF26Q1lUQ_IcooaMbqbCbtHsecDO4MMI7KRfuub-CiYi8CsXpGama4H4id8frIyzAkwmmBBmg1CNAZkyqhWmZjLUBlO7ohrcHqSQHo8KRt18JrBKGPkP4XcP0MkbykkNuEw8jWdhaOYRjeiMhYPy_3HvSXSHBPY4j_ib46N1B-a399tvKkDEPQ"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Modern Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">A sleek and contemporary design for a modern professional. Emphasizes clean lines and readability.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Minimalist Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-9UgbBsB_jLdwLhvuH_8ZjAMBeaZiW6759jMnOFozrHBLzMoohjkPHDdHkHjl-0FLNK5wj4sbhYMZav4rzBjzrOWLdPInUYjvhprm8eyoDwMJrp_HiZmUF1558A4wAoTc9tyjgo6X-GU0-AsfEuKb-lYi37z1tBSsQ5nJ3qT-VEpXDwkc2echWgc1UCtnF7BmULDuK-qpJ17Pma5PupyToOMLwX3-0sQKRVm8uN1vDN8UI07uO7X8iAUJUyCNa3xJnjxe5JDSiw"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Minimalist Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">A clean and simple layout emphasizing clarity and conciseness. Perfect for straightforward applications.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Creative Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2bXI65tH4PlANsEUvgdtffCyfoFcmGZHe4Nl_tYqKH3Dex97PvktMznzGmopfSW4naiKfdH8sKCgqnl8PmDVdH97BhkEH-91GCbVzfsGLa-0OALQVaGg5VPzF5-CPPNy9SYXzyz55x01zx7JVUyLcs4njU7T8HCdem1OH8L0b-GY7EEn_0SsnVkmyGN-EPNsEeP8UNICfN8w7fOcjUlSdkLrnVbC7XPjCEI82hOK3I-WiPNvTm6uelZo9cbZOd0r3QB8-cbMh2A"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Creative Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">An eye-catching design for creative roles and industries. Showcase your unique personality.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Tech-Focused Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEGU_vbNuE04KKpLyXLPg92oP-1181PPtyifS2HvcLJAe1iax-OmDEIVeJIjt4xBKPTEaOg2cx4H5RwahBFETtfF87yaKOSyu-z_NrVKySEQvoDaSSRDGXSkMlSNVG9HOI7fTSRwRad2WniFcBRUe-mD5EckmQFx-3KHVTK0kbxgdYZgYsXQ4gw_Bm9kL8c4umBtlQZlvDW7w2zUxtJdtsq8VCl7N1V3UFnSXdIwfrvJUZZXx2e1ABo3ymyKIfpstiPZDGs_fBEA"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Tech-Focused Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">Tailored for tech professionals, highlighting technical skills and projects. Includes dedicated sections for coding languages.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Business-Oriented Resume" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnYxJX1YfBICiT8Kj-Ww6FOEFT1iCanQc1zmQLbunzvQQEctnB60bE9mSXFgynGDS6OmzCuMIH8bMrj5qtTD7zZzs4Dqkxtzh5goXlx8gs_5nSPg4cSCbmStg0i1D8NkDtbMGIZOSDJtFmlVwsBGStwEFJeqQF0qbsIMODdXqtzbW2v6ovr_XC5fhVgCJrap5kb7As56Z5Qb2DlhTmrYOCl9LNq_I0aYTPxGR3B29s5vJHn1a_y7PGsNYUHvljEv2wBZrBU2Pq_w"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Business-Oriented Resume</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">Designed for business professionals, emphasizing leadership and achievements. Ideal for corporate roles.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Academic Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuGFv3-7CaRM1VJOJsiHef33UTSUvEv3bffIiusrhzzQY-zy6-83hGpbjlOU2gm6Ew7yrJjoUOReixRF-oo_ml5LRacyjP7kfGSf6Z_x3U7BH04NO0pxJbttU0F-QPuSiI8WyPyfjLZw1r2Yqk8_xlVPDeD16SZJzL51meQAUbu2SkaI9M3SLpr2auhtiEztL0jQL61qYOSPBcuX_MTpgIT8x4yIhaCA3JTIzcL1BBXRsQj3a8IH2NprjKr86l-X99ZaFCRWn-_w"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Academic Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">Suitable for academics, showcasing research, publications, and educational background. CV-style format.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Professional Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoUTJquoKyiNB_S7AkZ7qw-vywFtB5GP3qOkp3YdOi7c-czaFKp1J5HVDswLEFFjFZBM5_kILWbmI0APy-c7eWA_3NZeQUOdjerel-BzUNiTAU9_mpXb70XQuc-pV1temnTQi-1ZFrU8G10c-lqeCNK2pnJ81XrYb09d8Tf1-P0w5_xrivIa2P0UGjUjiX9iHyNokVUBLY_jfjMLz0ZDOZE1xTLN_bZ_p1IWy8CZBiyH11kImx155Q6P7pjnU_bdXHMy2UKmEAgg"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Professional Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">A versatile template for professionals across various industries. Highly adaptable and polished.</p>
</div>
</div>
<div class="card-hover-effect group flex flex-col bg-[#1a1e24] rounded-xl overflow-hidden shadow-lg border border-[#283039]">
<div class="relative w-full aspect-[3/4] bg-cover bg-center overflow-hidden">
<div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<button class="btn-primary text-sm font-semibold py-2 px-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">Select Template</button>
</div>
<img alt="Entry-Level Resume Template" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJeM3cJfPqQ8LRpbq_YlXaYwHUqbN8FJexJDkhmuinIPbWh8opTjWBCbWyOK_oqLCFgrJxXQoN0tkQNkmMV4NmrL_Juap3E16IZYNk_DRflkjNvqMmKDyDQ9vCVjyiggjpOeNJhA_uPtlG6PrQFNNMl4OZjl5fwSm3czOjf6fMZW_jGdOBVj7GPz5-VQJebCq_ixmNZ80Zaw-qPbDNvFiLqwtPGcoiwFyNV1Ak_u8t44OE81jbwI8LadaemFQZa4RSi6jp0V_fnA"/>
</div>
<div class="p-4">
<h4 class="text-white text-base font-semibold leading-normal mb-1 truncate">Entry-Level Resume Template</h4>
<p class="text-[#9cabba] text-xs font-normal leading-normal h-10 overflow-hidden">Ideal for recent graduates or those with limited work experience. Focuses on skills and education.</p>
</div>
</div>
</div>
</div>
</main>
<footer class="border-t border-solid border-t-[#283039] px-10 py-6 text-center">
<p class="text-[#9cabba] text-sm">© 2024 KnowTruly.me. All rights reserved.</p>
</footer>
</div>
</div>

</body></html>
