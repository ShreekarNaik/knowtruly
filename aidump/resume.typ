#set page(
  paper: "a4",
  margin: (left: 14.11mm, right: 14.11mm, top: 14.11mm, bottom: 6.4mm),
)

#set text(font: "New Computer Modern", size: 10pt)

// Remove page numbers
#set page(numbering: none)

// ============================================================================
// RESUME CONFIGURATION - Control order and visibility of resume items
// ============================================================================
// Simply reorder items in the arrays to change their order in the resume
// Remove items from the arrays to exclude them from the resume

#let config = (
  // Projects - Order matters! Rearrange as needed
  projects: (
    "microchess_ai",
    "bayesian_optimization",
    "image_denoising",
    "diffusion_models",
    "pca_face_recognition",
    "smc_text_generation",
    "fuelsense",
    "facial_recognition",
    "multi_armed_bandit",
    "mdp_solvers",
    "gradease",
    "braman_ai",
    "scriptman",
  ),
  
  // Achievements - Order matters! Rearrange as needed
  achievements: (
    "ap_grade",
    "logithon",
    "energenius",
    "tyroctf23",
    // "tyroctf25",
    "imo_qualifier",
    "jee_mains",
    "worldquant",
    "iat_rank",
    "dip_performance",
    "perfect_scores",
  ),
  
  // Positions of Responsibility - Order matters! Rearrange as needed
  positions: (
    "icc_nominee",
    "mood_indigo_designer",
    "devcom_designer",
  ),
)

// Project definitions
#let project_data = (
  bayesian_optimization: (
    title: "Bayesian Optimization Framework for Neural Architecture Search",
    date: "(Nov '25)",
    subtitle: [_Built architecture-agnostic hyperparameter optimization pipeline from scratch achieving 99.54% test accuracy_],
    items: (
      [Engineered *model-agnostic BO framework* with Cholesky-based GP predictions and adaptive kernel hyperparameter optimization via log-marginal likelihood for numerical stability across diverse architectures],
      [Designed *hybrid candidate generation* with 5000 stratified samples achieving *6x speedup* over exhaustive search],
      [Implemented *3 kernel families* (RBF, Matern, Rational Quadratic) and dual acquisition functions (EI/PI) with adaptive exploration scheduling, demonstrating *transferability across MLP and CNN* architectures],
    )
  ),
  
  microchess_ai: (
    title: "Microchess RL Engine with Negamax Search",
    date: "(Oct '25)",
    subtitle: [_Built adaptive chess engine achieving 4.09ms/move average with iterative deepening and transposition tables_],
    items: (
      [Built *unified negamax engine* with alpha-beta pruning, with transposition tables, and *Zobrist hashing*],
      [Implemented *intelligent move ordering* with MVV-LVA captures, killer heuristic, and history for efficient pruning],
      [Designed *procedural evaluation* with material balance, king safety, pawn advancement, and passed pawn detection],
      [Achieved *100% pass rate* (0 losses) vs random opponent at depth-2 with *4.09ms/move* and *94% pass rate* \ (6% lose rate) vs rational opponent at depth-4 with *56.19ms/move*],
    )
  ),
  
  fuelsense: (
    title: "Fuelsense",
    date: "(Apr '24)",
    subtitle: [_Built AI-powered fleet fuel monitoring portal with predictive analytics and anomaly detection_],
    items: (
      [*Won First Place* at Energenius Hackathon building sustainability-focused fuel tracking for industrial equipment],
      [Developed *XGBoost* consumption predictor and *Isolation Forest* anomaly detector achieving 95% accuracy],
      [Built Flask RESTful API delivering real-time insights and alerts for fuel theft and inefficiency patterns],
    )
  ),
  
  facial_recognition: (
    title: "Facial Recognition using Siamese Network",
    date: "(Mar '24)",
    subtitle: [_Developed and implemented a Siamese network-based face verification system for real-time applications_],
    items: (
      [Engineered data preprocessing pipelines, trained convolutional neural networks on LFW and custom datasets],
      [Achieved high accuracy in face recognition tasks, integrating with OpenCV for real-time verification capabilities],
      [Integrated Deepface for comprehensive facial analysis, providing insights into estimated age, ethnicity, and gender],
    )
  ),
  
  braman_ai: (
    title: "Braman.ai",
    date: "(Aug '24)",
    subtitle: [_Ideated an AI B2B Marketplace Startup | ShARE | a student chapter of the DWDG Future Leaders Programme_],
    items: (
      [*Top 10 Finalist* among 300+ participants, recognized for unique design style and innovative use of AI.],
      [Conceptualized an AI-driven solution leveraging *Agentic RAG* to optimize the matching process between orders and manufacturers, aimed at enhancing efficiency in B2B transactions.],
    )
  ),
  
  gradease: (
    title: "Gradease",
    date: "(May '24)",
    subtitle: [_A personal library implementing gradient descent_],
    items: (
      [Understood the core concepts of Machine Learning, and Implemented Gradient Descent from scratch.],
      [Developed this library to ease experimentation with different Neural Network Architectures],
    )
  ),
  
  scriptman: (
    title: "Scriptman",
    date: "(Jan '25)",
    subtitle: [_A CLI-based Script Manager Software_],
    items: (
      [Designed a modular CLI with argument parsing, script initialization, execution, and metadata handling.],
      [Implemented a structured script registry with Python and EXE support, ensuring seamless integration and execution.],
      [Built with extensibility in mind, allowing easy integration of new script types and features.],
    )
  ),
  
  image_denoising: (
    title: "Image Denoising and Template Detection",
    date: "(Sep '25)",
    subtitle: [_Implemented edge-preserving filters, template matching, and segmentation algorithms_],
    items: (
      [Built *Perona-Malik diffusion* and *bilateral filtering* for noise reduction in medical/satellite imagery],
      [Achieved NCC score of 0.7571 using *adaptive template matching* with background invariance],
      [Implemented *Canny* and *Harris corner detection* with eigenvalue-based structure tensor analysis],
    )
  ),
  
  pca_face_recognition: (
    title: "PCA-Based Face Recognition System",
    date: "(Sep '25)",
    subtitle: [_Built eigenface-based recognition pipeline with 95% accuracy on AT&T dataset_],
    items: (
      [Built *eigenfaces pipeline* using economy SVD, reducing dimensionality from 10,304 to 10 components],
      [Achieved *95% accuracy* on AT&T database with dual-threshold recognition system],
      [Implemented Bayesian rejection mechanism with calibrated thresholds for face-space membership],
    )
  ),
  
  smc_text_generation: (
    title: "Sequential Monte Carlo for Text Generation",
    date: "(Oct '25)",
    subtitle: [_Designed variance-reduced sampling algorithms for reward-guided language generation_],
    items: (
      [Developed *Twisted SMC* with entropy-based control variates, reducing weight degeneracy by 82%],
      [Built adaptive mixture-proposal with model-entropy-driven k∈[5,50] for exploration-exploitation balance],
      [Improved expected reward from 6.41 to 15.64 using model-aware twist function combining trigram entropy],
    )
  ),
  
  diffusion_models: (
    title: "Diffusion Models: DDPM vs D3PM Analysis",
    date: "(July '25)",
    subtitle: [_Comparative study of continuous and discrete denoising diffusion probabilistic models_],
    items: (
      [Built *U-Net DDPM* with multi-resolution self-attention, achieving FID score of 38.291 on MNIST],
      [Implemented *D3PM absorbing-state diffusion* with 257-token vocabulary, validating cosine schedule optimality],
      [Analyzed noise schedules: linear improved continuous DDPM by 45%, cosine optimal for discrete D3PM],
    )
  ),
  
  multi_armed_bandit: (
    title: "Multi-Armed Bandit Algorithms",
    date: "(Oct '25)",
    subtitle: [_Implemented exploration-exploitation algorithms with provable regret bounds_],
    items: (
      [Built *KL-UCB with adaptive batching* achieving order-of-magnitude speedup while maintaining sub-linear regret],
      [Implemented *Thompson Sampling* with Beta-Bernoulli priors and *UCB* with confidence bounds],
      [Designed Bayesian door-breaking policy using Gamma-Poisson conjugacy with exploration bonus],
    )
  ),
  
  mdp_solvers: (
    title: "MDP Solvers: Policy Iteration & Linear Programming",
    date: "(Oct '25)",
    subtitle: [_Dual algorithm implementation for exact MDP solution with sparse state representation_],
    items: (
      [Implemented *Howard's Policy Iteration* with NumPy acceleration, converging in 5-15 iterations on large MDPs],
      [Developed *Linear Programming formulation* using PuLP with CBC solver, handling 1000+ constraint systems],
      [Built sparse transition model with nested dictionaries, reducing memory from 10¹⁰ to 350K entries],
    )
  ),
)

// Achievement definitions
#let achievement_data = (
  ap_grade: [Conferred an *AP* grade with the *highest score* in the batch in the Computer Programming course for *exceptional performance* awarded to *top 0.01%* percentile #h(1fr) _('23)_],
  
  imo_qualifier: [Awarded a certificate of merit *twice* in Indian Olympiad Qualifier in Mathematics #h(1fr) _('21,'22)_],
  
  jee_mains: [Achieved *98 percentile* in *JEE (Mains)* in a pool of more than *1 million* candidates #h(1fr) _('22)_],
  
  worldquant: [Achieved *Gold* Level in *WorldQuant Brain* with a Research Consultant status, *(Score: 11,074)* #h(1fr) _('23)_],
  
  iat_rank: [Ranked in the *top 0.01%* in *IAT (IISER Aptitude Test)* and secured a category rank of *12* #h(1fr) _('22)_],
  
  tyroctf23: [Placed *6th* out of *56 teams* in the institute-level *TyroCTF*, competing *solo* against teams of 2-3 members #h(1fr) _('23)_],

  tyroctf25: [Placed *4th* out of *27 teams* in the institute-level *TyroCTF*, competing *solo* against teams of 2-3 members #h(1fr) _('25)_],
  
  logithon: [Made it to *Top 25 nationally among 500+ teams* in LogiTHON (India's Largest Logistics Hackathon) #h(1fr) _('25)_],
  
  energenius: [*Won* the Energenius Hackathon building a portal to track anomalies in fuel usage focusing on Sustainability. #h(1fr) _('25)_],
  
  perfect_scores: [Achieved *Perfect Scores* in *all* the Programming Assessments & Hackathons in Artificial Intelligence and Data Science Course #h(1fr) _('24)_],
  
  dip_performance: [Consistently scored *above 95%* on all assignments in Digital Image Processing whose class medians were *\~50%* #h(1fr) _('25)_],
)

// Position definitions
#let position_data = (
  icc_nominee: (
    title: "Institute Cultural Publicity and Marketing Nominee | ICC",
    date: "(Jul '24 - May '25)",
    subtitle: [_Publicity and Marketing committee serves for all the events of ICC to ensure maximum participation and footfall_],
    items: (
      [Lead a 5-member team to organise *200+* cultural events, create *100+* designs, and execute publicity campaigns for ICC events.],
      [Successfully handled a viral marketing campaign for the ICC's annual cultural events, generating over *1 million+* impressions and attracted over *10,000* attendees.],
    )
  ),
  
  mood_indigo_designer: (
    title: "Design Coordinator | Mood Indigo, IIT Bombay",
    date: "(May '23 - May '24)",
    subtitle: [_Asia's largest college cultural festival / Net worth: INR 80 Million / 100+ Events_],
    items: (
      [Produced high-quality posters and graphics, reaching *100k+ viewers* and *105,000+ Instagram followers*.],
      [Created festival's *Theme Launch Video*, garnering *75K+ views* across social media platforms.],
      [Crafted art-centric website for *Indigo Art Project (IAP)*, merging form and function to showcase creative essence.],
    )
  ),
  
  devcom_designer: (
    title: "Designer | DevCom, IIT Bombay",
    date: "(Jan '23 - Mar '24)",
    subtitle: [_DevCom is a 33 member team tasked with maintaining critical digital infrastructure such as InstiApp, ResoBin, Mess-i_],
    items: (
      [Conducted user interviews, researched and designed the user interface for Maintenance Portal for IIT Bombay],
      [Worked towards making the user interface and user experience design process along with the public outreach of the community],
    )
  ),
)

// Centralized spacing variables (all in mm for consistency)
#let spacing = (
  paragraph-leading: 1.5mm,        // Space between lines within a paragraph
  list-item: 2.5mm,                  // Space between bullet points
  entry-top: 0mm,                  // Space before each entry
  entry-subtitle: 1.5mm,            // Space before subtitle (negative to counteract natural text height)
  entry-list: 2mm,                // Space before the bullet list (negative to counteract natural spacing)
  section: 0mm,                    // Space before section headings
  section-after: 0mm,              // Space after section headings
)

#set par(justify: true, leading: spacing.paragraph-leading)

// Custom section heading with blue line
#let section-heading(title) = {
  v(spacing.section)
  block[
    #text(size: 14pt, weight: "regular", fill: rgb("#0000FF"), smallcaps(title))
    #h(4pt)
    #box(width: 1fr, line(length: 100%, stroke: 0.5pt + rgb("#0000FF")))
  ]
  v(spacing.section-after)
}

// Custom project/position entry
#let entry(title, date, subtitle: none, items) = {
  // Wrap entire entry in a non-breakable block to prevent page splits
  block(breakable: false)[
    #v(spacing.entry-top)
    #grid(
      columns: (1fr, auto),
      text(size: 12pt, weight: "bold", title),
      text(size: 10pt, style: "italic", date)
    )
    #if subtitle != none {
      v(spacing.entry-subtitle)
      block(above: 0pt, below: 0pt, text(size: 10pt)[
        #subtitle
      ])
    }
    #v(spacing.entry-list)
    #list(
      tight: false,
      spacing: spacing.list-item,
      marker: text(size: 6pt, sym.bullet),
      ..items
    )
  ]
}

// Custom list for items with dates
#let dated-list(..items) = {
  for item in items.pos() {
    [- #item.body]
  }
}

// Start document
#v(-12pt)

// ============================================================================
// HEADER - Commented out image header, replaced with text version
// ============================================================================
// #figure(
//   image("image.png", width: 100%),
// )

// Text-based header with same content as image
#grid(
  columns: (auto, 1fr, auto),
  column-gutter: 20pt,
  align: (left, left, right),
  
  // Left: IIT Bombay Logo placeholder (you can add actual logo if needed)
  // image("logo.png", width: 60pt, height: 60pt),
  
  // Center: Name, Department, Institute, Specialization
  [
    #text(size: 12pt, weight: "bold")[Shreekar S Naik]
    

    #v(-5pt)
    #text(size: 10pt)[Mechanical Engineering]
    
    #v(-5pt)
    #text(size: 10pt)[Indian Institute of Technology Bombay]
    
    #v(-5pt)
    #text(size: 10pt)[Specialization: Computer Integrated Manufacturing]
  ],
  
  // Right: Roll number, Degree, Gender, DOB
  [
    #text(size: 12pt, weight: "bold")[22B4518]
    
    #v(-5pt)
    #text(size: 10pt)[Dual Degree (B.Tech. + M.Tech.)]
    
    #v(-5pt)
    #text(size: 10pt)[Gender: Male]
  ]
)

// Education table
#v(-4pt)

#table(
  columns: (1.2fr, 1.5fr, 2fr, 0.8fr, 0.8fr),
  stroke: (x, y) => (
    top: if y == 0 { 1pt } else { 0.5pt },
    bottom: 1pt,
    left: none,
    right: none,
  ),
  align: (left, left, left, center, center),
  inset: 4pt,
  
  [*Examination*], [*University*], [*Institute*], [*Year*], [*CPI / %*],
  [Graduation], [IIT Bombay], [IIT Bombay], [2027], [8.64],
)

#v(8pt)

// Achievements Section
#section-heading("Achievements")

#{
  let items = ()
  
  for achievement_key in config.achievements {
    if achievement_key in achievement_data {
      // Wrap each achievement in a non-breakable block
      items.push(block(breakable: false)[#achievement_data.at(achievement_key)])
    }
  }
  
  list(
    tight: false,
    spacing: spacing.list-item,
    marker: text(size: 6pt, sym.bullet),
    ..items
  )
}

// Key Projects Section
#section-heading("Key Projects")

#{
  for project_key in config.projects {
    if project_key in project_data {
      let proj = project_data.at(project_key)
      entry(
        proj.title,
        proj.date,
        subtitle: proj.subtitle,
        proj.items
      )
    }
  }
}

// Positions of Responsibility Section
#section-heading("Positions of Responsibility")

#{
  for position_key in config.positions {
    if position_key in position_data {
      let pos = position_data.at(position_key)
      entry(
        pos.title,
        pos.date,
        subtitle: pos.subtitle,
        pos.items
      )
    }
  }
}

// Technical Skills Section
#section-heading("Technical Skills")

#list(
  tight: false,
  spacing: spacing.list-item,
  marker: text(size: 6pt, sym.bullet),
  
  [*Programming:* JAVA, C, C++, Python (numpy, pytorch, plotly, OpenCV, beautifulsoup, MANIM), Lua, Javascript (p5.js, Puppeteer), HTML, CSS, Typst, Latex, LangChain, Docker, Github Actions, CI/CD Pipelines],
  
  [*Softwares:* Figma, AfterEffects, Illustrator, Wireshark, Fusion 360, Photoshop, DaVinci Resolve, Blender, Tableau],
)
