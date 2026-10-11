export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "AI & GenAI" | "Product Engineering" | "Workforce & Enterprise" | "Full Stack";
  description: string;
  longDescription: string;
  role: string;
  verifiedStatus: "Professional Contribution" | "Live Product" | "Creator & Lead" | "Open Source / Showcase";
  tags: string[];
  metrics?: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  accentColor?: string;
  featured: boolean;
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  bullets: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; highlight?: boolean }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  honors?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Sameer Ali",
    title: "Software Development Engineer & GenAI Developer",
    headline: "Full-Stack Engineer building reliable systems & applied AI.",
    bio: "Software Development Engineer and GenAI builder with 2.5+ years of production experience crafting scalable enterprise web apps, high-throughput backend APIs, and vector search systems. Proven track record across EMR platform modules at Techdome, 3M+ Milvus vector embeddings at Kuanta, high-traffic banking systems (SBI YONO 2.0 at TCS), and commercial SaaS products.",
    location: "Indore / Remote, India",
    email: "sameersheikh0288@gmail.com",
    phone: "+91 8306690288",
    github: "https://github.com/sameer0288",
    linkedin: "https://www.linkedin.com/in/sameer0288/",
    resumeUrl: "/Sameer_Ali_Resume.pdf",
    avatarUrl: "/images/sameer.jpg",
    stats: [
      { label: "Current Role", value: "SDE-1", sub: "Techdome (EMR Platform)" },
      { label: "DSA Problems", value: "250+", sub: "Competitive platforms" },
      { label: "Vector Search", value: "3M+", sub: "Records indexed in Milvus" },
      { label: "Repositories", value: "80+", sub: "GitHub open source & systems" },
    ],
  },

  projects: [
    {
      id: "growza",
      title: "Growza",
      tagline: "Every bill you write is a customer you can bring back",
      category: "Product Engineering",
      description: "A business platform helping salons, gyms, cafés & clinics in India manage contactless table/counter ordering and bring customers back through automated WhatsApp retention.",
      longDescription: "Growza turns daily transactions into a real customer list, then brings people back with intelligent WhatsApp re-engagement—without business owners having to remember who or when. Features frictionless QR menus, live order updates, and customer retention workflows.",
      role: "Product Engineering & Full Stack",
      verifiedStatus: "Live Product",
      imageUrl: "/images/projects/growza.png",
      accentColor: "#10b981",
      tags: ["React", "Next.js", "Node.js", "Tailwind CSS", "WhatsApp Workflows", "Customer Retention"],
      metrics: [
        "Contactless QR-code ordering with zero app download",
        "Automated WhatsApp customer re-engagement",
        "Real-time order sync for salons, gyms, cafés & clinics",
        "Self-serve merchant onboarding in ~2 minutes",
      ],
      liveUrl: "https://www.growza.me/",
      featured: true,
    },
    {
      id: "mprar-crm",
      title: "MPRAR — Central & Pulse",
      tagline: "Enterprise workforce CRM with super-admin dashboard & mobile attendance",
      category: "Workforce & Enterprise",
      description: "Workforce management CRM with two core portals: Central (super-admin management dashboard) and Pulse (employee mobile workforce dashboard) covering clock-in/out, HR workflows, training, and leave management.",
      longDescription: "Contributed full-stack modules across Central (super-admin management portal) and Pulse (employee mobile-friendly dashboard). Implemented shift clock-in/out verification, leave request approvals, document compliance records, multi-company subscription billing, and robust PostgreSQL database transactions.",
      role: "Full Stack Engineer (Freelance Contribution)",
      verifiedStatus: "Professional Contribution",
      imageUrl: "/images/projects/mprar.png",
      accentColor: "#a855f7",
      tags: ["React.js", "Node.js", "PostgreSQL", "HR Workflows", "Role-Based Auth", "REST APIs"],
      metrics: [
        "28 Total companies onboarded on Central",
        "17 Active paying client organizations",
        "£2,645 Monthly recurring revenue (MRR) tracked",
        "Pulse module: 596 active seats across 19 companies (68% adoption)",
      ],
      liveUrl: "https://central.mprar.com/",
      featured: true,
      codeSnippet: {
        language: "sql",
        caption: "Audited Attendance & Clock-In/Out Transaction",
        code: `-- PostgreSQL attendance verification query with conflict resolution
INSERT INTO employee_timesheets (employee_id, shift_id, clock_in_timestamp, location_point)
VALUES ($1, $2, CURRENT_TIMESTAMP, ST_Point($3, $4))
ON CONFLICT (employee_id, shift_id) 
DO UPDATE SET clock_out_timestamp = CURRENT_TIMESTAMP
WHERE employee_timesheets.clock_out_timestamp IS NULL
RETURNING id, shift_id, duration_minutes;`,
      },
    },
    {
      id: "journeywise-ai",
      title: "JourneyWise AI",
      tagline: "AI Career Platform with Interview War Room & ATS scoring rubrics",
      category: "AI & GenAI",
      description: "AI-powered career platform providing automated résumé parsing, ATS-style scoring rubrics, tailored enhancement recommendations, and AI interview War Room practice.",
      longDescription: "JourneyWise AI solves the black-box résumé screening barrier for job seekers. Built with Next.js and GenAI APIs, it evaluates résumés against role descriptions with structured rubric scores, semantic keyword match analysis, company intelligence research, and interactive interview War Room simulations based on candidate experience.",
      role: "Creator & Lead Developer",
      verifiedStatus: "Live Product",
      imageUrl: "/images/projects/journeywise.png",
      accentColor: "#38bdf8",
      tags: ["Next.js", "GenAI / LLMs", "TypeScript", "Tailwind CSS", "ATS Analysis", "Prompt Engineering"],
      metrics: [
        "72/100 Readiness scoring rubric",
        "Interactive AI Interview War Room",
        "Resume vs JD Gap Analysis",
        "Mock interview practice with instant AI feedback",
      ],
      liveUrl: "https://journeywise-ai.vercel.app/",
      featured: true,
      codeSnippet: {
        language: "typescript",
        caption: "Structured ATS Parsing & Rubric Evaluation Pipeline",
        code: `// JourneyWise AI - Schema-grounded rubric evaluation
export async function evaluateResumeAgainstATS(resumeText: string, jobDescription: string) {
  const prompt = \`Evaluate candidate resume against target role requirements.
Return JSON strictly adhering to schema:
{ readinessScore: number, strengths: string[], missingKeywords: string[], gaps: string[] }\`;
  return await llmClient.generateStructuredOutput({ prompt, context: { resumeText, jobDescription } });
}`,
      },
    },
    {
      id: "movie-library",
      title: "Movie Library Platform",
      tagline: "Full-stack cinematic discovery platform consuming TMDB REST APIs",
      category: "Full Stack",
      description: "A full-stack movie discovery platform with dynamic search, genre filtering, watch playlists, and TMDB REST API integration over large catalogs.",
      longDescription: "Movie Library provides an immersive cinematic interface featuring dynamic TMDB REST API integration, debounced search queries, poster caching, playlist management, trailers, and score breakdowns (e.g. Spider-Man: Brand New Day 2026). Engineered with a React frontend and Node.js backend.",
      role: "Lead Full Stack Developer",
      verifiedStatus: "Live Product",
      imageUrl: "/images/projects/movie-library.png",
      accentColor: "#ef4444",
      tags: ["React", "Node.js", "Express", "REST APIs", "TMDB", "Debounced Search", "Vercel"],
      metrics: [
        "Dynamic TMDB catalog queries with rating breakdowns (e.g. 8.4 score)",
        "Zero-flicker debounced search across titles & cast",
        "Custom user playlists & watchlist persistence",
        "Responsive cinematic UI with dark/light viewing modes",
      ],
      liveUrl: "https://movie-library-flame.vercel.app/",
      githubUrl: "https://github.com/sameer0288/movie-library",
      featured: true,
      codeSnippet: {
        language: "javascript",
        caption: "TMDB Dynamic Query Service & Debounced Ingestion",
        code: `// Movie Library - TMDB Dynamic Search & Pagination
export async function searchMovies(query, page = 1) {
  const url = \`https://api.themoviedb.org/3/search/movie?api_key=\${TMDB_KEY}&query=\${encodeURIComponent(query)}&page=\${page}\`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  const data = await res.json();
  return {
    results: data.results.map(formatMovieCard),
    totalPages: data.total_pages,
    totalResults: data.total_results
  };
}`,
      },
    },
    {
      id: "kuanta-ai",
      title: "Kuanta AI",
      tagline: "Every startup has a signal — deal scouting indexing 3M+ records into Milvus",
      category: "AI & GenAI",
      description: "Built a Python/FastAPI backend service that scrapes and vectorizes 3M+ startup and investor records into Milvus, powering an LLM-driven deal-scouting model.",
      longDescription: "At Kuanta, Sameer engineered core AI infrastructure for startup and investor discovery. He designed resilient data pipelines to normalize unstructured web data, generated embeddings, and performed high-dimensional vector search using Milvus, connected to responsive React/TypeScript interfaces.",
      role: "Software Engineer — Full Stack & AI Systems",
      verifiedStatus: "Professional Contribution",
      imageUrl: "/images/projects/kuanta.png",
      accentColor: "#f97316",
      tags: ["Python", "FastAPI", "Milvus (Vector DB)", "Vector Embeddings", "React", "TypeScript", "Data Pipelines"],
      metrics: [
        "3M+ startup & investor records vectorized into Milvus",
        "High-throughput semantic similarity retrieval via Milvus",
        "Automated normalization pipelines for high-dimensional data",
        "Sub-second vector query latency in production",
      ],
      liveUrl: "https://kuanta.ai/",
      featured: true,
      codeSnippet: {
        language: "python",
        caption: "FastAPI & Milvus High-Dimensional Vector Search",
        code: `# Kuanta AI - Vector ingestion & similarity search
@app.post("/api/v1/deal-scout/search")
async def semantic_search(query: QuerySchema):
    embedding = await embedding_service.embed(query.text)
    search_params = {"metric_type": "COSINE", "params": {"nprobe": 16}}
    results = milvus_collection.search(
        data=[embedding], anns_field="vector", param=search_params, limit=query.top_k
    )
    return format_ranked_startups(results)`,
      },
    },
  ] as Project[],

  experience: [
    {
      id: "techdome",
      company: "Techdome",
      role: "Software Development Engineer – 1 (SDE-1)",
      period: "JUN 2026 — PRESENT",
      location: "Indore, India",
      type: "Full-Time",
      summary: "Developing and maintaining critical backend services and high-traffic modules for an enterprise Electronic Medical Records (EMR) platform at Techdome.",
      bullets: [
        "Develop and maintain backend features for an enterprise EMR platform using Node.js/Python and PostgreSQL, including subscription and billing modules and usage-based access control.",
        "Optimize data access on large production datasets by re-working queries and indexing strategy, reducing page load and API response times for high-traffic EMR modules.",
        "Collaborate within an Agile cross-functional team – product, QA, and DevOps – participating in code reviews to enforce coding standards and catch issues early.",
      ],
      technologies: ["Node.js", "Python", "PostgreSQL", "EMR Systems", "Query Optimization", "Agile/Scrum"],
    },
    {
      id: "kuanta",
      company: "Kuanta",
      role: "Software Engineer — Full Stack & AI Systems",
      period: "DEC 2025 — JUN 2026",
      location: "Remote",
      type: "Full-Time",
      summary: "Built data ingestion pipelines and vector search architecture for an LLM-driven startup discovery and deal-scouting system.",
      bullets: [
        "Built a Python/FastAPI backend service that scrapes and vectorizes 3M+ startup and investor records into Milvus, powering an LLM-driven deal-scouting model for startup discovery.",
        "Designed REST APIs and data pipelines to structure, clean, and normalize the scraped dataset, handling data consistency and performance bottlenecks at scale.",
        "Connected AI search services to React and TypeScript customer-facing web interfaces.",
      ],
      technologies: ["Python", "FastAPI", "Milvus", "Vector Embeddings", "LLMs", "React", "TypeScript"],
    },
    {
      id: "tcs",
      company: "Tata Consultancy Services (TCS)",
      role: "Assistant System Engineer — Full Stack Development & Production Support",
      period: "OCT 2024 — DEC 2025",
      location: "Mumbai, India",
      type: "Full-Time",
      summary: "Contributed to India's largest enterprise banking platform, SBI YONO 2.0, with a focus on UI reliability, backend integration, and database performance.",
      bullets: [
        "Worked on the SBI YONO 2.0 banking platform, including UI-side debugging and integration with backend microservices.",
        "Executed PostgreSQL query optimizations resulting in ~30% latency reduction across critical banking transaction paths.",
        "Conducted production incident diagnosis, telemetry monitoring with Grafana, and root-cause analysis in high-compliance environments.",
      ],
      technologies: ["React", "Microservices", "PostgreSQL", "Query Tuning (~30% latency cut)", "Grafana", "Production Incident RCA"],
    },
    {
      id: "markoknow",
      company: "Markoknow",
      role: "Full Stack Developer",
      period: "JAN 2023 — SEP 2024",
      location: "Remote",
      type: "Full-Time",
      summary: "Engineered scalable backend services and caching layers for a commercial SaaS product.",
      bullets: [
        "Built backend services and REST APIs for a SaaS platform using Node.js and Redis.",
        "Achieved a ~60% reduction in response times through multi-tiered Redis caching and route optimization.",
      ],
      technologies: ["Node.js", "Express", "Redis", "REST APIs", "Performance Optimization (~60% speedup)"],
    },
  ] as ExperienceItem[],

  skills: [
    {
      title: "Core Languages",
      iconName: "Code2",
      description: "Strong algorithmic foundations, type safety, and multi-paradigm programming.",
      skills: [
        { name: "TypeScript", highlight: true },
        { name: "JavaScript", highlight: true },
        { name: "Python", highlight: true },
        { name: "Java" },
        { name: "SQL", highlight: true },
        { name: "C++" },
      ],
    },
    {
      title: "Frontend Engineering",
      iconName: "Layout",
      description: "Modern component architectures, design systems, and responsive performance.",
      skills: [
        { name: "React.js", highlight: true },
        { name: "Next.js (App Router)", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "Redux / Zustand" },
        { name: "HTML5 / Modern CSS" },
        { name: "Micro-frontends" },
      ],
    },
    {
      title: "Backend & Distributed Systems",
      iconName: "Server",
      description: "Resilient REST APIs, microservices, asynchronous jobs, and real-time streams.",
      skills: [
        { name: "Node.js", highlight: true },
        { name: "Express.js", highlight: true },
        { name: "FastAPI", highlight: true },
        { name: "REST APIs" },
        { name: "Microservices", highlight: true },
        { name: "WebSockets" },
      ],
    },
    {
      title: "Databases & Storage",
      iconName: "Database",
      description: "Relational modeling, document stores, in-memory caching, and vector indexing.",
      skills: [
        { name: "PostgreSQL", highlight: true },
        { name: "MongoDB", highlight: true },
        { name: "Redis (Caching)", highlight: true },
        { name: "Milvus (Vector DB)", highlight: true },
        { name: "MySQL" },
        { name: "Query Optimization" },
      ],
    },
    {
      title: "Generative AI & LLM Systems",
      iconName: "Sparkles",
      description: "Practical applied AI, vector search, embeddings, and structured outputs.",
      skills: [
        { name: "LLM Integration", highlight: true },
        { name: "RAG Pipelines", highlight: true },
        { name: "Vector Embeddings", highlight: true },
        { name: "Milvus Vector DB", highlight: true },
        { name: "Semantic Retrieval" },
        { name: "Prompt Engineering" },
      ],
    },
    {
      title: "Cloud, DevOps & Observability",
      iconName: "Cloud",
      description: "Containerization, telemetry, automated pipelines, and cloud services.",
      skills: [
        { name: "AWS", highlight: true },
        { name: "Docker", highlight: true },
        { name: "CI/CD (GitHub Actions)", highlight: true },
        { name: "Git / GitHub" },
        { name: "Grafana Monitoring" },
        { name: "Linux / Shell" },
      ],
    },
  ] as SkillCategory[],

  education: [
    {
      institution: "Rajasthan Technical University",
      degree: "B.Tech — Computer Science (Artificial Intelligence)",
      period: "2020 — 2024",
      grade: "CGPA: 8.95 / 10",
      honors: "First Class with Distinction",
    },
    {
      institution: "Senior Secondary (Class XII), RBSE",
      degree: "Higher Secondary — Science & Mathematics",
      period: "Completed",
      grade: "93% Overall",
      honors: "Physics: 99/100, Mathematics: 96/100",
    },
  ] as EducationItem[],

  certifications: [
    { title: "Microsoft Azure Certified", issuer: "Microsoft" },
    { title: "Google Cloud Facilitator Program", issuer: "Google Cloud Platform" },
    { title: "Python for Everybody", issuer: "University of Michigan (Coursera)" },
    { title: "Java & JavaScript Training", issuer: "IIT Bombay" },
  ] as CertificationItem[],

  achievements: [
    "250+ DSA problems solved across LeetCode, HackerRank, and GeeksforGeeks.",
    "80+ public GitHub repositories demonstrating full-stack, AI, and systems engineering.",
    "Engineered vector retrieval pipeline processing 3M+ records in Milvus at Kuanta.",
    "Achieved ~30% latency reduction in critical PostgreSQL queries on SBI YONO 2.0 at TCS.",
    "Engineered ~60% API latency cut at Markoknow via Redis caching architectures.",
  ],
};
