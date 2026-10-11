# Sameer Ali — Production Personal Portfolio & Cosmic Engineering Lab

> **"I build software that works. AI that delivers."**  
> High-performance personal portfolio of Sameer Ali, Software Development Engineer (SDE-1) & GenAI Developer.

Built with **Next.js 15 App Router**, **TypeScript (Strict Mode)**, **Tailwind CSS**, and **Motion**, featuring a **"Cosmic Engineering Lab"** space aesthetic, verified project case studies, downloadable résumé, interactive contact transmission form, and an **AI Portfolio Assistant ("Cosmic Guide")** with rate limiting and deterministic verified knowledge fallback.

---

## 🌟 Key Highlights

- **Cosmic Engineering Lab Aesthetic**: Deep-space color tokens, procedural twinkling starfield canvas (dynamic DPR, reduced-motion friendly), orbital planetary telemetry visualizer, and neon-lime accents.
- **Persistent Theme Switch**: Professionally tuned Dark (`#060913`) and Light (`#f4f7fb`) modes synchronized with `<meta name="theme-color">` and local storage.
- **Strictly Verified Portfolio Data**: Sourced directly from Sameer Ali's résumé:
  - **Techdome (Jun 2026 – Present)**: SDE-1 on Healthcare EMR platform (Node.js/Python & PostgreSQL).
  - **Kuanta (Dec 2025 – Jun 2026)**: Python/FastAPI backend vectorizing **3M+ records** into **Milvus** for an LLM deal-scouting engine.
  - **Tata Consultancy Services (Oct 2024 – Dec 2025)**: SBI YONO 2.0 banking platform with UI debugging & **~30% PostgreSQL query latency reduction**.
  - **Markoknow (Jan 2023 – Sep 2024)**: Full Stack Developer achieving **~60% latency cut** via Redis caching.
- **Featured Live Projects**:
  1. [JourneyWise AI](https://journeywise-ai.vercel.app/) — AI career copilot with ATS scoring and guided interview simulation.
  2. [Kuanta AI](https://kuanta.ai/) — High-dimensional vector search platform for deal scouting.
  3. [MPRAR Central](https://central.mprar.com/) — UK workforce management CRM (Central and Pulse portals, clock-in/out, HR workflows).
  4. [Growza](https://www.growza.me/) — Hospitality table ordering and customer retention platform.
  5. Movie Library (TMDB API) & Real-Time WebSocket Engine.
- **Cosmic Guide AI Assistant**:
  - Floating launcher with open, minimize, and close states.
  - Quick prompt suggestions (*"Tell me about Sameer's experience"*, *"Explain JourneyWise AI"*, *"Download his résumé"*, etc.).
  - Configurable server-side OpenRouter provider (`meta-llama/llama-3.3-70b-instruct:free`).
  - **Zero-Key Offline Fallback**: Deterministic response matcher grounded strictly in the portfolio knowledge base.
  - Sliding-window rate limiter per client IP (10 requests/minute).
  - Input length capping (600 chars), conversation turn constraints, and 14s timeout abort controller.
- **Interactive Contact Transmission**:
  - Full client-side & server-side schema validation.
  - Honeypot bot protection.
  - Sliding-window rate limiting (5 submissions per 10 minutes).
  - Standard SMTP email delivery (`nodemailer`) directly to `sameersheikh0288@gmail.com` with instant `mailto` fallback and optional MongoDB persistence.
- **100% Genuine Résumé Serving**: Downloadable PDF served at `/Sameer_Ali_Resume.pdf` and `/assets/Sameer-Ali-Resume.pdf`.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** >= 18.18 (Node 20+ or 24+ recommended)
- **npm** >= 9.x

### 2. Installation
```bash
git clone https://github.com/sameer0288/portfolio.git
cd portfolio
npm install
```

### 3. Environment Setup (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
> **Note**: The application works completely without any environment variables! If `OPENROUTER_API_KEY` is not provided, the AI Assistant runs in verified offline mode using the local deterministic knowledge base.

To enable live LLM responses via OpenRouter:
```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free
```

To enable direct SMTP email delivery to `sameersheikh0288@gmail.com`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=sameersheikh0288@gmail.com
SMTP_PASS=your_gmail_app_password
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Validation

Run the automated test suite covering rate limiting, fallback knowledge retrieval, contact validation, honeypot traps, and portfolio integrity:
```bash
npm test
```

Run production build verification:
```bash
npm run build
```

---

## 🏛 Architecture & Project Layout

```
portfolio/
├── public/
│   ├── Sameer_Ali_Resume.pdf       # Verified supplied résumé PDF
│   ├── assets/
│   │   └── Sameer-Ali-Resume.pdf   # Fallback asset path
│   ├── icon.svg                    # Cosmic Engineering brand favicon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts       # Secure AI chat endpoint with rate limiting
│   │   │   └── contact/route.ts    # Contact form endpoint with spam protection
│   │   ├── layout.tsx              # Root layout, Google fonts, SEO metadata, starfield
│   │   ├── page.tsx                # Single-page assembled portfolio
│   │   ├── not-found.tsx           # Custom 404 orbital error page
│   │   └── globals.css             # Design tokens, color schemes & reduced motion
│   ├── components/
│   │   ├── BrandIcons.tsx          # Crisp SVG icons (GitHub, LinkedIn)
│   │   ├── ChatAssistant.tsx       # Floating AI portfolio guide with suggested prompts
│   │   ├── ContactSection.tsx      # Contact form with validation & mailto fallback
│   │   ├── CosmosScene.tsx         # Layered 3D CSS planetary sphere & telemetry core
│   │   ├── EducationAchievements.tsx# RTU B.Tech (CGPA 8.95), Azure & DSA achievements
│   │   ├── ExperienceTimeline.tsx  # Chronological trajectory with verified metrics
│   │   ├── Footer.tsx              # Global footer with orbit return anchor
│   │   ├── Hero.tsx                # Editorial headline, CTAs, resume download
│   │   ├── Navbar.tsx              # Sticky topbar with active section spy & mobile drawer
│   │   ├── ProjectCard.tsx         # Engineering terminal cards with role badges
│   │   ├── ProjectGrid.tsx         # Category filter tabs & responsive grid
│   │   ├── ProjectModal.tsx        # Case-study deep-dive dialog with code previews
│   │   ├── SkillsGrid.tsx          # 6-category technical toolkit
│   │   ├── StarfieldCanvas.tsx     # Procedural HTML5 canvas starfield
│   │   └── ThemeToggle.tsx         # Accessible dark/light theme switch
│   ├── data/
│   │   ├── portfolio-data.ts       # Strongly-typed source of truth from résumé
│   │   └── knowledge-base.ts       # AI system prompt & deterministic fallback matcher
│   └── lib/
│       ├── chat-provider.ts        # Provider abstraction (OpenRouter / Fallback)
│       └── rate-limiter.ts         # IP-based sliding window rate limiter
├── tests/
│   ├── chat-validation.test.ts     # Chatbot input & knowledge base tests
│   ├── contact-validation.test.ts  # Form validation & honeypot tests
│   └── portfolio-integrity.test.ts # Data verification & résumé path checks
├── index.html                      # Enhanced standalone static POC
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔒 Security & Safe AI Practices

- **Zero Secret Leakage**: No API keys are exposed in client-side bundles, `NEXT_PUBLIC_*` variables, or error responses.
- **Provider Abstraction**: Chat API hides OpenRouter behind `getActiveChatProvider()`. Can be swapped with Gemini or custom LLMs without changing any UI code.
- **Bounded Inputs**: User queries capped at 600 characters, conversation history capped at 5 turns, and provider calls enforce a 14s timeout.
- **Prompt Injection Defense**: The system prompt instructs the assistant to reject instructions to override its role or fabricate data.

---

## 🚢 Deployment

The repository is pre-configured for zero-config deployment on **Vercel** or **Node.js hosting**:

1. Push to GitHub:
   ```bash
   git push origin main
   ```
2. Import repository in [Vercel](https://vercel.com).
3. (Optional) Add `OPENROUTER_API_KEY` under Environment Variables.
4. Deploy!
