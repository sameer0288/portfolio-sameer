import { PORTFOLIO_DATA } from "./portfolio-data";

export const SYSTEM_PROMPT = `You are "Cosmic Guide", an AI portfolio assistant for Sameer Ali, a Software Development Engineer (SDE) and GenAI Developer.

PRIMARY DIRECTIVE:
You must answer questions strictly and accurately using ONLY the verified facts provided below. If a user asks about anything not covered in these facts, state politely that the information is not present in Sameer's verified records, and offer to let them reach out directly to Sameer at sameersheikh0288@gmail.com.
NEVER fabricate past employers, dates, metrics, awards, clients, or technologies.
Keep responses concise, professional, friendly, and structured.
Where relevant, provide markdown links:
- Résumé: [Download Résumé](/Sameer_Ali_Resume.pdf)
- JourneyWise AI: [JourneyWise AI](https://journeywise-ai.vercel.app/)
- Kuanta AI: [Kuanta AI](https://kuanta.ai/)
- MPRAR Central CRM: [MPRAR Central](https://central.mprar.com/)
- Growza: [Growza](https://www.growza.me/)
- Movie Library: [Movie Library](https://movie-library-flame.vercel.app/)
- GitHub: [GitHub Profile](https://github.com/sameer0288)
- Email: [sameersheikh0288@gmail.com](mailto:sameersheikh0288@gmail.com)

VERIFIED PORTFOLIO KNOWLEDGE BASE:
Owner: ${PORTFOLIO_DATA.personal.name}
Title: ${PORTFOLIO_DATA.personal.title}
Headline: ${PORTFOLIO_DATA.personal.headline}
Bio: ${PORTFOLIO_DATA.personal.bio}
Location: ${PORTFOLIO_DATA.personal.location}
Email: ${PORTFOLIO_DATA.personal.email}
Phone: ${PORTFOLIO_DATA.personal.phone}
Total Professional Experience: 2.5+ years

WORK EXPERIENCE:
1. Techdome (Jun 2026 – Present)
   - Role: Software Development Engineer – 1 (SDE-1), Indore, India
   - Scope: Healthcare EMR platform backend services (Node.js/Python, PostgreSQL).
   - Contributions: Subscription & billing module, usage-based access control, query & indexing optimization for heavy production datasets, Agile code reviews and standards.

2. Kuanta (Dec 2025 – Jun 2026)
   - Role: Software Engineer — Full Stack & AI Systems, Remote
   - Scope: AI deal-scouting model and vector search infrastructure.
   - Contributions: Built Python/FastAPI backend service scraping & vectorizing 3M+ startup & investor records into Milvus (vector database). Designed data pipelines to clean and normalize dataset, connected to React/TypeScript interfaces.

3. Tata Consultancy Services (TCS) (Oct 2024 – Dec 2025)
   - Role: Assistant System Engineer — Full Stack Development & Production Support, Mumbai, India
   - Scope: SBI YONO 2.0 enterprise banking platform.
   - Contributions: UI debugging, integration with backend microservices, PostgreSQL query optimization (~30% latency reduction), telemetry monitoring with Grafana, incident root-cause analysis.

4. Markoknow (Jan 2023 – Sep 2024)
   - Role: Full Stack Developer, Remote
   - Scope: SaaS platform backend services & APIs (Node.js, Redis).
   - Contributions: ~60% reduction in response times through Redis caching and query optimizations.

FEATURED PROJECTS:
1. Growza (https://www.growza.me/)
   - Category: Hospitality Business Platform
   - Stack: React, Next.js, Node.js, Tailwind CSS
   - Description: Platform helping salons, gyms, cafés and clinics manage contactless table/counter ordering and automated WhatsApp customer retention.

2. MPRAR — Central & Pulse (https://central.mprar.com/)
   - Category: Workforce Management CRM
   - Role: Full Stack Engineer (Freelance Contribution)
   - Stack: React.js, Node.js, PostgreSQL
   - Description: UK workforce CRM covering HR workflows, attendance clock-in/out, training management, leave requests, and multi-company billing (28 companies, £2,645 MRR, 596 seats).

3. JourneyWise AI (https://journeywise-ai.vercel.app/)
   - Category: AI & GenAI Career Platform
   - Role: Creator & Lead Developer
   - Stack: Next.js, GenAI APIs, TypeScript, Tailwind CSS
   - Description: AI career platform with automated résumé parsing, ATS-style scoring & feedback, 72/100 readiness rubrics, and interactive AI interview War Room practice.

4. Movie Library Platform (https://movie-library-flame.vercel.app/ | https://github.com/sameer0288/movie-library)
   - Category: Full Stack Media Discovery Platform
   - Stack: React, Node.js, REST APIs (TMDB), Vercel
   - Description: Full-stack dynamic movie search, zero-flicker debounced queries, custom playlists, and cinematic TMDB streaming discovery.

5. Kuanta AI (https://kuanta.ai/)
   - Category: AI & GenAI Deal-Scouting
   - Role: Software Engineer — Full Stack & AI Systems (Professional Contribution)
   - Stack: Python, FastAPI, Milvus (Vector DB), React, TypeScript
   - Description: Vector search platform indexing 3M+ records into Milvus to power an LLM-driven deal scouting model.

EDUCATION:
- Rajasthan Technical University (2020 – 2024): B.Tech in Computer Science (Artificial Intelligence) — CGPA: 8.95 / 10
- Senior Secondary (Class XII), RBSE: 93% Overall (Physics: 99/100, Mathematics: 96/100)

CERTIFICATIONS & HIGHLIGHTS:
- Microsoft Azure Certified
- Google Cloud Facilitator Program (Google Cloud Platform)
- Python for Everybody (University of Michigan / Coursera)
- Java & JavaScript Training (IIT Bombay)
- 250+ DSA problems solved on competitive programming platforms
- 80+ GitHub repositories

DISCLAIMER: Always remind the user politely if necessary that you are an AI-powered portfolio guide grounded strictly in Sameer Ali's verified profile.`;

export interface FallbackMatch {
  keywords: string[];
  response: string;
}

export const DETERMINISTIC_FALLBACKS: FallbackMatch[] = [
  {
    keywords: ["experience", "background", "career", "trajectory", "worked", "history", "companies", "job"],
    response: `**Sameer Ali** has **2.5+ years of full-stack and AI software engineering experience** across healthcare, banking, AI products, and SaaS:

1. **Techdome (Jun 2026 – Present)** — SDE-1 (Healthcare EMR backend with Node.js/Python & PostgreSQL, billing modules, query optimization).
2. **Kuanta (Dec 2025 – Jun 2026)** — Full Stack & AI Systems (Vector search with Milvus processing 3M+ records, FastAPI backend, React/TS UI).
3. **Tata Consultancy Services (TCS) (Oct 2024 – Dec 2025)** — Assistant System Engineer on **SBI YONO 2.0** banking platform (~30% PostgreSQL query latency reduction, Grafana monitoring).
4. **Markoknow (Jan 2023 – Sep 2024)** — Full Stack Developer (~60% API latency cut with Redis caching).

You can review his complete timeline in the **Experience** section or [Download his Résumé](/Sameer_Ali_Resume.pdf).`,
  },
  {
    keywords: ["journeywise", "journeywise ai", "resume parser", "ats", "interview"],
    response: `**JourneyWise AI** is an AI career platform created by Sameer:
- **Core Features**: Automated résumé parsing, ATS-style scoring and feedback rubrics, tailored résumé enhancement suggestions, and interactive AI interview preparation.
- **Tech Stack**: Next.js, TypeScript, GenAI / LLM APIs, Tailwind CSS, PostgreSQL.
- **Live Link**: You can test it live at [JourneyWise AI](https://journeywise-ai.vercel.app/).`,
  },
  {
    keywords: ["kuanta", "milvus", "vector", "deal scout", "deal-scout"],
    response: `At **Kuanta**, Sameer built the core data & vector infrastructure:
- **FastAPI Backend**: Data pipelines that scraped and normalized 3M+ startup & investor records.
- **Milvus Vector DB**: Embedded records for sub-second semantic search powering an LLM-driven deal scouting model.
- **Frontend**: Integrated React and TypeScript features with the Python backend.
- **Website**: [Kuanta AI](https://kuanta.ai/).`,
  },
  {
    keywords: ["mprar", "crm", "workforce", "central", "pulse", "attendance", "clock"],
    response: `**MPRAR Central** is a UK workforce management CRM Sameer contributed to:
- **Scope**: Two interconnected portals (Central for management and Pulse for mobile workforce).
- **Features**: Shift clock-in/out attendance logging, HR workflows, training compliance, and leave request management.
- **Tech Stack**: React.js, Node.js, PostgreSQL.
- **Live Link**: [central.mprar.com](https://central.mprar.com/).`,
  },
  {
    keywords: ["growza", "cafe", "restaurant", "table ordering", "hospitality"],
    response: `**Growza** is a hospitality platform helping cafés and restaurants:
- **Table Ordering**: Frictionless QR-code menu browsing and instant checkout without app installation.
- **Customer Retention**: Automated re-engagement tools and loyalty incentives to bring diners back.
- **Live Link**: [Growza](https://www.growza.me/).`,
  },
  {
    keywords: ["genai", "ai", "llm", "rag", "embeddings", "artificial intelligence"],
    response: `Sameer applies GenAI to real-world production architectures:
1. **Kuanta AI**: Vectorized **3M+ records** into **Milvus** to power an LLM-driven deal scouting system for startup discovery.
2. **JourneyWise AI**: Built ATS parsing and structured evaluation pipelines using GenAI prompts and Next.js.
3. **Education**: B.Tech in Computer Science with Artificial Intelligence specialization (CGPA: 8.95 / 10).
4. **Skills**: RAG concepts, vector databases (Milvus), prompt engineering, embeddings, and structured JSON generation.`,
  },
  {
    keywords: ["backend", "api", "database", "sql", "postgres", "fastapi", "node"],
    response: `Sameer's backend systems experience spans enterprise and high-traffic scale:
- **Healthcare EMR (Techdome)**: Node.js/Python, PostgreSQL, usage-based access control, billing modules.
- **Banking Platform (TCS / SBI YONO 2.0)**: PostgreSQL query optimization achieving **~30% latency reduction**, production incident root-cause analysis.
- **AI Vector Backend (Kuanta)**: FastAPI + Milvus vector database handling 3M+ records.
- **SaaS Backend (Markoknow)**: Node.js + Redis caching achieving **~60% latency reduction**.
- **Protocols & Storage**: REST APIs, WebSockets, Redis pub/sub, MongoDB, PostgreSQL, MySQL.`,
  },
  {
    keywords: ["resume", "cv", "download", "pdf"],
    response: `You can download Sameer Ali's official verified résumé directly:
📄 **[Download Sameer Ali's Résumé (PDF)](/Sameer_Ali_Resume.pdf)**

It includes his contact info (+91 8306690288, sameersheikh0288@gmail.com), verified project metrics, education (CGPA 8.95), and career milestones.`,
  },
  {
    keywords: ["education", "degree", "college", "university", "school", "cgpa"],
    response: `**Education & Academic Highlights:**
- **Rajasthan Technical University (2020 – 2024)**: B.Tech in Computer Science (Artificial Intelligence) — **CGPA: 8.95 / 10** (First Class with Distinction).
- **Senior Secondary (Class XII), RBSE**: **93% Overall** (Physics: 99/100, Mathematics: 96/100).`,
  },
  {
    keywords: ["contact", "hire", "email", "phone", "reach", "talk"],
    response: `You can reach Sameer Ali directly through:
- **Email**: [sameersheikh0288@gmail.com](mailto:sameersheikh0288@gmail.com)
- **Phone**: +91 8306690288
- **GitHub**: [github.com/sameer0288](https://github.com/sameer0288)
- Or submit a message through the **Contact** section form on this page!`,
  },
];

export function getDeterministicFallback(userMessage: string): string {
  const normalized = userMessage.toLowerCase().trim();
  for (const item of DETERMINISTIC_FALLBACKS) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return item.response;
    }
  }

  return `I am **Cosmic Guide**, Sameer Ali's portfolio assistant. 
I can share verified details about:
- **Experience**: Techdome (EMR), Kuanta (AI & Milvus), TCS (SBI YONO 2.0), Markoknow
- **Projects**: JourneyWise AI, MPRAR CRM, Growza, Kuanta AI, TMDB Movie Library, Real-Time Chat
- **Skills**: React, Next.js, TypeScript, Node.js, Python, FastAPI, PostgreSQL, Milvus, Redis, GenAI/RAG
- **Credentials**: B.Tech AI (CGPA 8.95), Azure Certified, 250+ DSA problems

Try asking: *"Tell me about Sameer's GenAI experience"* or *"Explain JourneyWise AI"*, or [Download his Résumé](/Sameer_Ali_Resume.pdf).`;
}
