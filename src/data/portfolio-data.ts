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
    headline: "I build software that works. AI that delivers.",
    bio: "Software Development Engineer and GenAI builder with 2.5+ years of experience crafting reliable interfaces, high-throughput backend systems, and intelligent applications. Proven track record across healthcare EMR systems (Techdome), AI vector platforms with 3M+ records (Kuanta), mission-critical banking platforms (SBI YONO 2.0 at TCS), and commercial SaaS.",
    location: "Indore / Remote, India",
    email: "sameersheikh0288@gmail.com",
    phone: "+91 8306690288",
    github: "https://github.com/sameer0288",
    linkedin: "https://www.linkedin.com/in/sameer-ali/",
    resumeUrl: "/Sameer_Ali_Resume.pdf",
    stats: [
      { label: "Current Role", value: "SDE-1", sub: "Techdome Healthcare EMR" },
      { label: "DSA Problems", value: "250+", sub: "Competitive platforms" },
      { label: "Vector Search", value: "3M+", sub: "Records indexed in Milvus" },
      { label: "Repositories", value: "80+", sub: "GitHub open source & systems" },
    ],
  },

  projects: [
    {
      id: "journeywise-ai",
      title: "JourneyWise AI",
      tagline: "Intelligent career platform with ATS scoring and guided AI interview preparation",
      category: "AI & GenAI",
      description: "An AI-powered career platform providing automated résumé parsing, ATS-style feedback, tailored résumé enhancement, and realistic AI interview preparation.",
      longDescription: "JourneyWise AI solves the black-box résumé screening barrier for job seekers. Built with Next.js and GenAI APIs, it evaluates résumés against role descriptions with structured rubric scores, semantic keyword match analysis, and interactive interview question simulation based on candidate experience.",
      role: "Creator & Lead Developer",
      verifiedStatus: "Live Product",
      tags: ["Next.js", "GenAI / LLMs", "TypeScript", "Tailwind CSS", "ATS Analysis", "Prompt Engineering"],
      metrics: ["Multi-stage parsing rubric", "Real-time ATS score breakdown", "Interactive interview guidance"],
      liveUrl: "https://journeywise-ai.vercel.app/",
      featured: true,
      codeSnippet: {
        language: "typescript",
        caption: "Structured ATS Parsing & Rubric Evaluation Pipeline",
        code: `// JourneyWise AI - Schema-grounded rubric evaluation
export async function evaluateResumeAgainstATS(resumeText: string, jobDescription: string) {
  const prompt = \`Evaluate the candidate resume against the target role requirements.
Return JSON strictly adhering to schema:
{ score: number, strengths: string[], missingKeywords: string[], actionableGaps: string[] }\`;
  return await llmClient.generateStructuredOutput({ prompt, context: { resumeText, jobDescription } });
}`,
      },
    },
    {
      id: "kuanta-ai",
      title: "Kuanta AI",
      tagline: "AI-powered deal scouting platform vectorizing 3M+ startup & investor records",
      category: "AI & GenAI",
      description: "Built a Python/FastAPI backend service that scrapes and vectorizes 3M+ startup and investor records into Milvus, powering an LLM-driven deal-scouting model.",
      longDescription: "At Kuanta, Sameer engineered core AI infrastructure for startup and investor discovery. He designed resilient data pipelines to normalize unstructured web data, generated embeddings, and performed high-dimensional vector search using Milvus, connected to responsive React/TypeScript interfaces.",
      role: "Software Engineer — Full Stack & AI Systems",
      verifiedStatus: "Professional Contribution",
      tags: ["Python", "FastAPI", "Milvus (Vector DB)", "Embeddings", "React", "TypeScript", "Data Pipelines"],
      metrics: ["3M+ records vectorized", "High-throughput semantic similarity retrieval", "Sub-second vector query latency"],
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
    {
      id: "mprar-crm",
      title: "MPRAR — Central & Pulse",
      tagline: "UK workforce management CRM for HR workflows, attendance, and training operations",
      category: "Workforce & Enterprise",
      description: "Freelance contribution to a UK-based workforce management CRM with two portals (Central and Pulse) covering clock-in/out, HR workflows, training, and leave management.",
      longDescription: "Contributed full-stack modules across Central (management portal) and Pulse (employee mobile-friendly dashboard). Implemented clock-in/out verification, leave request approvals, document compliance records, and robust PostgreSQL database transactions.",
      role: "Full Stack Engineer (Freelance Contribution)",
      verifiedStatus: "Professional Contribution",
      tags: ["React.js", "Node.js", "PostgreSQL", "HR Workflows", "Role-Based Auth", "REST APIs"],
      metrics: ["Two interconnected portals (Central & Pulse)", "Audited clock-in/out lifecycle", "Production UK client deployment"],
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
      id: "growza",
      title: "Growza",
      tagline: "Hospitality business platform for table ordering and customer retention",
      category: "Product Engineering",
      description: "A business platform helping cafés and restaurants manage table ordering, streamline kitchen handoffs, and bring customers back through retention tools.",
      longDescription: "Growza enables hospitality operators to eliminate wait times and increase average order volume. Features dynamic QR-code menu browsing, instant cart checkout, kitchen display updates, and automated customer loyalty mechanisms.",
      role: "Product Engineering & Full Stack",
      verifiedStatus: "Live Product",
      tags: ["React", "Next.js", "Node.js", "Tailwind CSS", "Hospitality SaaS", "Customer Retention"],
      metrics: ["Instant QR table ordering", "Zero-app download patron experience", "Live orders status sync"],
      liveUrl: "https://www.growza.me/",
      featured: true,
    },
    {
      id: "movie-library",
      title: "Movie Library Platform",
      tagline: "Dynamic media discovery and search application consuming TMDB APIs",
      category: "Full Stack",
      description: "Built a full-stack movie discovery platform with a React frontend and Node.js backend, consuming the TMDB REST API to handle dynamic search queries over large catalogs.",
      longDescription: "Engineered responsive catalog exploration with debounced search, genre filtering, poster caching, rating breakdowns, and bookmarking. Demonstrates clean REST API consumption and state management.",
      role: "Lead Full Stack Developer",
      verifiedStatus: "Open Source / Showcase",
      tags: ["React", "Node.js", "Express", "REST APIs", "TMDB", "Debounced Search"],
      metrics: ["Dynamic query pagination", "Zero-flicker search debouncing", "Comprehensive media detail views"],
      githubUrl: "https://github.com/sameer0288",
      featured: false,
    },
    {
      id: "realtime-chat",
      title: "Real-Time WebSocket Engine",
      tagline: "High-concurrency chat and collaboration system with Redis pub/sub",
      category: "Full Stack",
      description: "Real-time communication engine supporting instantaneous room messaging, user presence tracking, and distributed message distribution via Redis.",
      longDescription: "Designed to handle high concurrent connection counts with low latency. Features bi-directional WebSocket communication, message persistence, offline queueing, and typing indicators.",
      role: "Backend Architect & Developer",
      verifiedStatus: "Open Source / Showcase",
      tags: ["Node.js", "WebSockets", "Socket.io", "Redis", "TypeScript", "Concurrent Systems"],
      metrics: ["Instant sub-50ms message broadcast", "Distributed Redis Pub/Sub channels", "Presence heartbeats"],
      githubUrl: "https://github.com/sameer0288",
      featured: false,
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
      summary: "Developing and maintaining critical backend services and high-traffic modules for an enterprise healthcare Electronic Medical Records (EMR) platform.",
      bullets: [
        "Develop and maintain backend features for a healthcare EMR platform using Node.js/Python and PostgreSQL, including subscription and billing modules and usage-based access control.",
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
