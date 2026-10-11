"use client";

import React, { useState } from "react";
import {
  Terminal,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Database,
  Film,
  Building2,
  CheckCircle2,
  Command,
  Store,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";

interface SystemTab {
  id: "growza" | "mprar" | "journeywise" | "movie" | "kuanta";
  name: string;
  badge: string;
  accent: string;
  domain: string;
  title: string;
  subtitle: string;
  stats: { label: string; value: string; detail: string }[];
  flow: string[];
  liveUrl: string;
  githubUrl?: string;
  icon: React.ElementType;
}

const SYSTEMS: SystemTab[] = [
  {
    id: "growza",
    name: "Growza",
    badge: "Live Retention",
    accent: "#10b981",
    domain: "www.growza.me",
    title: "Table Ordering & WhatsApp Retention",
    subtitle: "Every bill you write is a customer you can bring back without remembering who or when",
    stats: [
      { label: "Onboarding", value: "~2 Mins", detail: "Self-serve merchant" },
      { label: "Customer Flow", value: "WhatsApp", detail: "Automated retention" },
      { label: "Ordering", value: "QR Menu", detail: "Zero app download" },
      { label: "Industries", value: "4 Sectors", detail: "Salons, gyms, cafés, clinics" },
    ],
    flow: ["Contactless QR Scan", "Transaction Sync", "WhatsApp Re-Engagement"],
    liveUrl: "https://www.growza.me/",
    icon: Store,
  },
  {
    id: "mprar",
    name: "MPRAR Central",
    badge: "Enterprise CRM",
    accent: "#a855f7",
    domain: "central.mprar.com/dashboard",
    title: "UK Workforce Management CRM",
    subtitle: "Super-admin multi-company hub & Pulse mobile workforce platform",
    stats: [
      { label: "Total Companies", value: "28", detail: "Active tenant orgs" },
      { label: "Monthly MRR", value: "£2,645", detail: "Recurring revenue" },
      { label: "Pulse Module", value: "596 Seats", detail: "68% adoption rate" },
      { label: "Core Stack", value: "PostgreSQL", detail: "ST_Point timesheets" },
    ],
    flow: ["Super-Admin Central", "PostgreSQL Transaction", "Pulse Mobile PWA"],
    liveUrl: "https://central.mprar.com/",
    icon: Building2,
  },
  {
    id: "journeywise",
    name: "JourneyWise AI",
    badge: "AI War Room",
    accent: "#38bdf8",
    domain: "journeywise-ai.vercel.app",
    title: "AI Career Platform & Interview War Room",
    subtitle: "Automated résumé parsing, structured ATS rubrics & mock interview simulator",
    stats: [
      { label: "Readiness Score", value: "72 / 100", detail: "Schema rubric rating" },
      { label: "Simulation", value: "War Room", detail: "Interactive AI practice" },
      { label: "Analysis", value: "Resume vs JD", detail: "Gap & keyword matching" },
      { label: "Inference", value: "Next.js + LLM", detail: "Structured output JSON" },
    ],
    flow: ["Candidate Resume", "LLM Structured Parser", "Interactive War Room"],
    liveUrl: "https://journeywise-ai.vercel.app/",
    icon: Sparkles,
  },
  {
    id: "movie",
    name: "Movie Library",
    badge: "Cinematic TMDB",
    accent: "#ef4444",
    domain: "movie-library-flame.vercel.app",
    title: "Cinematic TMDB Discovery Engine",
    subtitle: "Real-time debounced catalog ingestion, playlists & score breakdown",
    stats: [
      { label: "TMDB Rating", value: "8.4 / 10", detail: "Spider-Man 2026 score" },
      { label: "Search Engine", value: "Debounced", detail: "Zero-flicker query cache" },
      { label: "Personalization", value: "Playlists", detail: "Watchlist persistence" },
      { label: "Architecture", value: "React + Node", detail: "Vercel production edge" },
    ],
    flow: ["TMDB REST API", "Debounce & Query Cache", "Cinematic React UI"],
    liveUrl: "https://movie-library-flame.vercel.app/",
    githubUrl: "https://github.com/sameer0288/movie-library",
    icon: Film,
  },
  {
    id: "kuanta",
    name: "Kuanta Milvus",
    badge: "3M+ Vectors",
    accent: "#f97316",
    domain: "kuanta.ai",
    title: "High-Scale Vector Deal Scouting",
    subtitle: "Python/FastAPI ingestion service indexing 3M+ startup records in Milvus",
    stats: [
      { label: "Indexed Records", value: "3,000,000+", detail: "Vector embeddings" },
      { label: "Retrieval Time", value: "< 50ms", detail: "Cosine distance ANN" },
      { label: "Engine", value: "Milvus Vector", detail: "Cluster indexing" },
      { label: "Backend API", value: "FastAPI", detail: "Asynchronous pipeline" },
    ],
    flow: ["Scraped Web Records", "Embedding Service", "Milvus Vector DB"],
    liveUrl: "https://kuanta.ai/",
    icon: Database,
  },
];

type ConsoleCmd = "verify" | "stack" | "contact";

export function CosmosScene() {
  const [activeTab, setActiveTab] = useState<SystemTab["id"]>("growza");
  const [consoleOutput, setConsoleOutput] = useState<string>(
    "System telemetry online. Click tabs above to inspect production architecture & live metrics."
  );
  const [lastCmd, setLastCmd] = useState<ConsoleCmd | null>(null);

  const current = SYSTEMS.find((s) => s.id === activeTab) || SYSTEMS[0];
  const Icon = current.icon;

  const handleCommand = (cmd: ConsoleCmd) => {
    setLastCmd(cmd);
    if (cmd === "verify") {
      setConsoleOutput(
        "✓ Growza: WhatsApp retention live · ✓ Central CRM: 28 co / £2.6k MRR · ✓ JourneyWise: 72/100 War Room · ✓ Movie Library: TMDB 8.4 rating · ✓ Kuanta: 3M+ Milvus vectors healthy."
      );
    } else if (cmd === "stack") {
      setConsoleOutput(
        "Stack: React 19 · Next.js · TypeScript · Node.js · Python · FastAPI · PostgreSQL · Milvus Vector DB · Redis · Docker · Tailwind CSS"
      );
    } else if (cmd === "contact") {
      setConsoleOutput(
        "Sameer Ali // SDE-1 @ Techdome · Email: sameersheikh0288@gmail.com · WhatsApp: +91 8306690288 · LinkedIn: linkedin.com/in/sameer0288"
      );
    }
  };

  return (
    <div className="w-full max-w-[560px] mx-auto select-none">
      {/* Workbench Glass Frame */}
      <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--panel-solid)_94%,transparent)] backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.35)]">
        {/* Top Window Titlebar */}
        <div className="px-4 py-3 bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] border-b border-[var(--border)] flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="hidden sm:inline-block text-[11px] text-[var(--text-muted)] ml-2">
              sameer-ali@techdome: ~/active-systems
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE 24ms</span>
            </span>
          </div>
        </div>

        {/* System Tab Selector */}
        <div className="px-3 pt-3 pb-2 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SYSTEMS.map((sys) => {
            const isSelected = activeTab === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveTab(sys.id)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--panel-solid)] text-[var(--text)] border shadow-sm font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] border border-transparent hover:bg-[var(--panel)]"
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: `color-mix(in srgb, ${sys.accent} 60%, transparent)`,
                        boxShadow: `0 0 16px color-mix(in srgb, ${sys.accent} 15%, transparent)`,
                      }
                    : {}
                }
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: sys.accent }}
                />
                <span>{sys.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected System Content Canvas */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* System Identity Banner */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="mono-label text-[10px] px-2 py-0.5 rounded font-semibold border"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${current.accent} 16%, transparent)`,
                    color: current.accent,
                    borderColor: `color-mix(in srgb, ${current.accent} 40%, transparent)`,
                  }}
                >
                  {current.badge}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  https://{current.domain}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] tracking-tight">
                {current.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-inner"
              style={{
                backgroundColor: `color-mix(in srgb, ${current.accent} 14%, transparent)`,
                borderColor: `color-mix(in srgb, ${current.accent} 35%, transparent)`,
                color: current.accent,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>

          {/* 4 Metrics Micro-Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {current.stats.map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)] flex flex-col justify-between"
              >
                <div className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                  {stat.label}
                </div>
                <div
                  className="text-sm sm:text-base font-extrabold my-0.5 tracking-tight truncate"
                  style={{ color: current.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-[var(--text-subtle)] truncate">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Architecture Data Flow */}
          <div className="p-3.5 rounded-xl bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] border border-[var(--border)]">
            <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[var(--accent)]" />
                <span>Architecture Transaction Flow</span>
              </span>
              <span className="text-emerald-400 font-semibold">● Verified</span>
            </div>

            <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
              {current.flow.map((node, i) => (
                <React.Fragment key={node}>
                  <div className="px-2.5 py-1 rounded bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] text-center truncate flex-1 shadow-sm">
                    {node}
                  </div>
                  {i < current.flow.length - 1 && (
                    <span className="text-[var(--text-subtle)] font-bold px-1">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Live Action Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all shadow-md hover:scale-[1.02]"
                style={{
                  backgroundColor: current.accent,
                  color: "#0a0f1d",
                }}
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {current.githubUrl && (
                <a
                  href={current.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs font-mono text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production Grade</span>
            </span>
          </div>
        </div>

        {/* Interactive Mini Terminal Console */}
        <div className="bg-[color-mix(in_srgb,var(--bg)_95%,transparent)] border-t border-[var(--border)] p-3.5 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Interactive Telemetry Terminal:</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleCommand("verify")}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer border ${
                  lastCmd === "verify"
                    ? "bg-[var(--accent)] text-[var(--accent-dark)] font-bold border-transparent"
                    : "bg-[var(--panel)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]"
                }`}
              >
                $ verify
              </button>
              <button
                type="button"
                onClick={() => handleCommand("stack")}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer border ${
                  lastCmd === "stack"
                    ? "bg-[var(--accent)] text-[var(--accent-dark)] font-bold border-transparent"
                    : "bg-[var(--panel)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]"
                }`}
              >
                $ stack
              </button>
              <button
                type="button"
                onClick={() => handleCommand("contact")}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer border ${
                  lastCmd === "contact"
                    ? "bg-[var(--accent)] text-[var(--accent-dark)] font-bold border-transparent"
                    : "bg-[var(--panel)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]"
                }`}
              >
                $ contact
              </button>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#050811] border border-[var(--border)] text-[11px] text-emerald-300/90 leading-relaxed min-h-[38px] flex items-center">
            <span className="text-[var(--text-muted)] mr-2 select-none">&gt;</span>
            <span className="animate-in fade-in duration-150">{consoleOutput}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
