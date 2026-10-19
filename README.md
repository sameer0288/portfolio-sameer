# Sameer Ali — Software Engineer Portfolio

Personal site for Sameer Ali, software engineer (SDE-1). It is built to be scanned by a recruiter in under a minute: current role, proof of impact, selected work, and a direct way to get in touch.

The portfolio assistant answers from a local retrieval index over the same verified profile. It does not wait on a model for ordinary questions.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS design tokens for dark and light themes
- Nodemailer contact delivery with a `mailto` fallback
- Node test runner for retrieval, contact validation, and profile integrity

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works with no environment variables. Copy `.env.example` to `.env.local` only if you want live model rephrasing or SMTP delivery.

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=sameersheikh0288@gmail.com
SMTP_PASS=
```

```bash
npm test
npm run build
```

## Profile source of truth

All public copy comes from `src/data/portfolio-data.ts`, checked against the résumé PDF in `public/`.

- **Techdome** (Jun 2026 – Present): SDE-1, EMR platform, Node.js / Python, PostgreSQL
- **Kuanta** (Dec 2025 – Jun 2026): FastAPI service, 3M+ records in Milvus
- **Tata Consultancy Services** (Oct 2024 – Dec 2025): SBI YONO 2.0, about 30% PostgreSQL latency reduction
- **Markoknow** (Jan 2023 – Sep 2024): Node.js and Redis, about 60% latency reduction, Silver Belt certificate `110080`

Featured work: [JourneyWise AI](https://journeywise-ai.vercel.app/), [Kuanta AI](https://kuanta.ai/), [MPRAR Central](https://central.mprar.com/), [Growza](https://www.growza.me/), and [Movie Library](https://movie-library-flame.vercel.app/).

Résumé: `/Sameer_Ali_Resume.pdf`.

## Architecture

```text
Browser
  ├─ Theme boot script (localStorage → data-theme, before paint)
  ├─ Single-page sections (Hero, Work, Experience, Skills, Education, Contact)
  └─ Portfolio assistant UI
        │
        ▼
POST /api/chat                         POST /api/contact
  ├─ IP sliding-window rate limit        ├─ schema validation + honeypot
  ├─ message sanitize (600 chars)        ├─ rate limit
  └─ ChatProvider                        └─ SMTP, else mailto fallback
        │
        ├─ 1. Local RAG  (< 5 ms, always)
        │     tokenize → alias + token score → top passages
        │     high / low confidence returns immediately
        │
        └─ 2. Optional LLM (only medium confidence + API key)
              retrieved passages injected as the only allowed context
              4.5 s timeout, then the local answer is returned
```

### Why retrieval comes first

Portfolio questions are closed-domain. The index already contains the answer, so the common path never calls a network model. That keeps replies fast and stops the assistant from inventing employers, dates, or metrics.

An OpenRouter call is allowed only when retrieval is unsure and a key is configured. The model receives the system rules plus the retrieved passages, not the whole résumé on every turn. If the call is slow, rate-limited, or empty, the UI still gets the local answer.

### Retrieval design

`src/lib/rag.ts` scores each chunk in `src/data/knowledge-base.ts`:

1. Exact alias phrases (role, product, tool) score highest, so “Kuanta” does not lose to a career summary that merely mentions Kuanta.
2. Remaining query tokens add a smaller score against the title and the answer body.
3. Stop-words and the name “Sameer” are ignored so they do not tie every chunk.
4. A question with “and” / “compare” can return two strong passages.
5. A weak score returns a short menu of what the assistant can answer. It does not guess.

Chunks cover profile, each employer, each project, skills, education, résumé, and contact. The same function backs the API and `getDeterministicFallback()` used in tests.

### Request limits

| Route | Window | Limit |
| --- | --- | --- |
| `POST /api/chat` | 60 s | 10 requests / IP |
| `POST /api/contact` | 10 min | 5 submissions / IP |

Chat history sent to a model is capped at the last 4 turns. Keys stay on the server.

## Theme and layout

Dark and light themes share one set of CSS variables (`--bg`, `--text`, `--text-muted`, `--accent`, `--panel`). Components use those tokens instead of hardcoded slate surfaces, so body text, chips, navigation, cards, and the assistant stay readable in both modes.

`data-theme` is set from `localStorage` in a small inline script before React hydrates, which avoids a flash of the wrong theme. A code sample in the hero stays on a dark editor surface in both themes, the same way a code block does in documentation.

Layout is a single scrolling page:

- Desktop: sticky header, section spy, assistant docked at the bottom right
- Phone: header actions collapse, a bottom navigation bar clears the assistant, project cards drop the URL chip so the title row does not overflow, and the assistant panel uses the width between the screen edges

## Project layout

```text
src/
├─ app/
│  ├─ layout.tsx              # fonts, metadata, theme boot, shell
│  ├─ page.tsx                # section order
│  ├─ globals.css             # tokens, both themes, assistant + buttons
│  └─ api/
│     ├─ chat/route.ts
│     └─ contact/route.ts
├─ components/                # sections, résumé modal, assistant
├─ data/
│  ├─ portfolio-data.ts       # résumé-backed content
│  └─ knowledge-base.ts       # RAG chunks + system prompt
└─ lib/
   ├─ rag.ts                  # scorer and answer composer
   ├─ chat-provider.ts        # retrieval-first provider
   └─ rate-limiter.ts
tests/                        # retrieval, contact, profile integrity
public/Sameer_Ali_Resume.pdf
```

## Deployment

Import the repo in Vercel. Add `OPENROUTER_API_KEY` and SMTP variables only if you want those paths. Without them, the assistant and contact form still work: retrieval answers locally, and the contact form offers a mail link.
