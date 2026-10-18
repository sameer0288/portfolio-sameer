"use client";

import React, { useState } from "react";
import { useResumeModal } from "@/context/ResumeModalContext";
import {
  ArrowUpRight,
  FileDown,
  Code2,
  Server,
  BrainCircuit,
  Database,
  ShieldCheck,
  Terminal,
  User,
  MapPin,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"profile" | "code">("profile");
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<"kuanta" | "mprar" | "journeywise">("kuanta");
  const { openResume } = useResumeModal();
  const { personal } = PORTFOLIO_DATA;

  const CODE_SNIPPETS = {
    kuanta: {
      filename: "deal_scout.py",
      title: "Kuanta AI · Milvus Vector Search",
      language: "python",
      caption: "FastAPI service performing cosine search over 3M+ indexed records",
      code: `# Kuanta AI - Vector similarity search in Milvus
@app.post("/api/v1/deal-scout/search")
async def semantic_search(query: QuerySchema):
    embedding = await embedding_service.embed(query.text)
    search_params = {"metric_type": "COSINE", "params": {"nprobe": 16}}
    results = milvus_collection.search(
        data=[embedding],
        anns_field="vector",
        param=search_params,
        limit=query.top_k
    )
    return format_ranked_startups(results)`,
    },
    mprar: {
      filename: "timesheet_tx.sql",
      title: "MPRAR CRM · Attendance Transaction",
      language: "sql",
      caption: "Audited clock-in/out SQL transaction handling geo-spatial coordinates",
      code: `-- PostgreSQL attendance verification with conflict resolution
INSERT INTO employee_timesheets (
  employee_id, shift_id, clock_in_timestamp, location_point
)
VALUES ($1, $2, CURRENT_TIMESTAMP, ST_Point($3, $4))
ON CONFLICT (employee_id, shift_id) 
DO UPDATE SET clock_out_timestamp = CURRENT_TIMESTAMP
WHERE employee_timesheets.clock_out_timestamp IS NULL
RETURNING id, shift_id, duration_minutes;`,
    },
    journeywise: {
      filename: "evaluator.ts",
      title: "JourneyWise AI · Structured Parser",
      language: "typescript",
      caption: "Schema-grounded LLM inference pipeline generating rubric readiness scores",
      code: `// JourneyWise AI - Schema-grounded rubric evaluation
export async function evaluateCandidateRubric(resumeText: string, jobDescription: string) {
  const prompt = \`Evaluate candidate profile against target role requirements.
Return JSON strictly adhering to schema:
{ readinessScore: number, strengths: string[], missingKeywords: string[], gaps: string[] }\`;
  return await llmClient.generateStructuredOutput({ 
    prompt, 
    context: { resumeText, jobDescription } 
  });
}`,
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(90vh-80px)] flex items-center pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Human Editorial Pitch & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Verified Role & Availability Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--panel)] backdrop-blur-md mb-5 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
              <span className="mono-label text-[11px] text-[var(--text)] font-semibold">
                SDE-1 @ Techdome · Full-Stack & GenAI Engineer
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] text-[var(--text)] mb-5 [text-wrap:balance]">
              <span>Building scalable web platforms, </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                resilient backends & practical AI.
              </span>
            </h1>

            {/* Subheading / Human Bio */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
              I&apos;m <strong className="text-[var(--text)] font-semibold">Sameer Ali</strong>, an SDE-1 at <strong className="text-[var(--text)] font-semibold">Techdome</strong> with <strong className="text-[var(--text)] font-semibold">2.5+ years of production experience</strong>. I craft high-performance web applications, scalable backend APIs, and vector search systems. From enterprise EMR platforms to indexing 3M+ records in Milvus at Kuanta, optimizing queries on SBI YONO 2.0 at TCS, and earning the Silver Belt Badge at Markoknow, I build code that scales in production.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shadow-sm cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => openResume("resume")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:border-emerald-500/50 text-slate-100 font-semibold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>View Full Résumé</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-100 font-medium text-xs sm:text-sm transition-all duration-200"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Production Proof Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 border-t border-[var(--border)] max-w-2xl">
              <div className="p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Current Role</div>
                <div className="text-xs sm:text-sm font-bold text-[var(--text)] mt-0.5">SDE-1 @ Techdome</div>
                <div className="text-[10px] text-emerald-400 font-mono">EMR Platforms</div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Vector Search</div>
                <div className="text-xs sm:text-sm font-bold text-cyan-400 mt-0.5">3M+ Milvus Vectors</div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono">Kuanta AI</div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Enterprise Scale</div>
                <div className="text-xs sm:text-sm font-bold text-[var(--text)] mt-0.5">~30% Latency Cut</div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono">TCS SBI YONO</div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)]">
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Honors</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">Silver Belt Badge</div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono">Markoknow Cert #110080</div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Tab Engineer Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* View Mode Toggle Controls */}
            <div className="flex items-center justify-between mb-3 w-full max-w-[560px]">
              <div className="p-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800/80 inline-flex items-center gap-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeTab === "profile"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeTab === "code"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Production Code</span>
                </button>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800/70 text-[11px] font-mono text-slate-300 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>SDE-1 @ Techdome</span>
              </div>
            </div>

            {/* TAB 1: GENUINE ENGINEER PROFILE */}
            {activeTab === "profile" && (
              <div className="w-full max-w-[560px] rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--panel-solid)_95%,transparent)] backdrop-blur-2xl shadow-2xl p-4 sm:p-5 overflow-hidden transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.35)] animate-in fade-in duration-200">
                {/* Genuine Portrait Canvas */}
                <div className="relative w-full h-[360px] sm:h-[400px] rounded-xl overflow-hidden border border-[var(--border)] group bg-[#050811]">
                  <img
                    src="/images/sameer.jpg"
                    alt="Sameer Ali — Software Development Engineer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top Right Floating Badge */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white flex items-center gap-2 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span className="font-semibold">SDE-1 @ Techdome</span>
                  </div>

                  {/* Top Left Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-gray-200 flex items-center gap-1.5 shadow-xl">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Indore / Remote</span>
                  </div>

                  {/* Bottom Vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

                  {/* Bottom Floating Highlights */}
                  <div className="absolute bottom-3.5 inset-x-3.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] text-white">3M+ Vectors</div>
                        <div className="text-[9px] text-gray-300 font-mono">Milvus Vector DB @ Kuanta</div>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] text-emerald-300">Silver Belt Badge</div>
                        <div className="text-[9px] text-gray-300 font-mono">Markoknow Cert #110080</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
                      <span>Sameer Ali</span>
                      <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                        <span>SDE-1</span>
                      </span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Full-Stack Architecture · Applied GenAI · Scalable Backend
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openResume("resume")}
                    className="px-3 py-2 rounded-xl bg-[var(--panel)] hover:bg-emerald-500/10 border border-[var(--border)] hover:border-emerald-500/30 text-xs font-mono text-[var(--text)] transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0 shadow-sm"
                  >
                    <span>View CV</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTION CODE */}
            {activeTab === "code" && (
              <div className="w-full max-w-[560px] rounded-2xl border border-[var(--border-strong)] bg-[#0c121e] shadow-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[460px] sm:min-h-[490px] animate-in fade-in duration-200">
                <div>
                  {/* Code snippet sub-tabs */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">
                        {CODE_SNIPPETS[activeCodeSnippet].filename}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setActiveCodeSnippet("kuanta")}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          activeCodeSnippet === "kuanta"
                            ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                            : "text-slate-400 hover:text-slate-200 border border-transparent"
                        }`}
                      >
                        Milvus
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveCodeSnippet("mprar")}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          activeCodeSnippet === "mprar"
                            ? "bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30"
                            : "text-slate-400 hover:text-slate-200 border border-transparent"
                        }`}
                      >
                        SQL
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveCodeSnippet("journeywise")}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          activeCodeSnippet === "journeywise"
                            ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                            : "text-slate-400 hover:text-slate-200 border border-transparent"
                        }`}
                      >
                        GenAI
                      </button>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-200 mb-1">
                    {CODE_SNIPPETS[activeCodeSnippet].title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mb-3">
                    {CODE_SNIPPETS[activeCodeSnippet].caption}
                  </div>

                  {/* Code Editor Body */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>
                      <code>{CODE_SNIPPETS[activeCodeSnippet].code}</code>
                    </pre>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-4">
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Tested in Production</span>
                  </span>

                  <a
                    href="#projects"
                    className="text-xs font-mono text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    <span>View System Case Studies</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
