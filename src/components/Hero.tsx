"use client";

import React, { useState } from "react";
import { CosmosScene } from "./CosmosScene";
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
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Hero() {
  const [activeView, setActiveView] = useState<"profile" | "console">("profile");
  const { resumeUrl } = PORTFOLIO_DATA.personal;

  return (
    <section
      id="home"
      className="relative min-h-[calc(92vh-80px)] flex items-center pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Human Editorial Pitch & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Verified Role Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--panel)] backdrop-blur-md mb-6 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
              <span className="mono-label text-[11px] text-[var(--text)] tracking-wider font-semibold">
                SDE-1 @ Techdome · Full-Stack & GenAI Engineer
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.08] text-[var(--text)] mb-6">
              <span>Engineering robust systems. </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                AI grounded in reality.
              </span>
            </h1>

            {/* Subheading / Human Bio */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
              Hi, I&apos;m <strong className="text-[var(--text)] font-semibold">Sameer Ali</strong>. Software Engineer with 2.5+ years of production experience crafting scalable enterprise web apps at Techdome, vector-search pipelines indexing 3M+ records in Milvus (Kuanta), and high-throughput banking systems (SBI YONO 2.0 at TCS).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={resumeUrl}
                download="Sameer_Ali_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--panel)] hover:border-[var(--accent)] text-[var(--text)] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shadow-sm"
              >
                <FileDown className="w-4 h-4 text-[var(--accent)]" />
                <span>Download Résumé</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-transparent hover:border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] font-medium text-sm transition-all duration-200"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[var(--border)] max-w-2xl">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)] shadow-sm">
                <Code2 className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[var(--text)]">React & TypeScript</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Enterprise UI Architecture</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)] shadow-sm">
                <Server className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[var(--text)]">Backend & APIs</div>
                  <div className="text-[11px] text-[var(--text-muted)]">PostgreSQL, Node, FastAPI</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--panel)] border border-[var(--border)] shadow-sm">
                <BrainCircuit className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[var(--text)]">Applied GenAI</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Milvus Vector DB & RAG</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dual-Mode Engineer Spotlight / Systems Console */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* View Mode Toggle Controls */}
            <div className="flex items-center justify-between mb-3 w-full max-w-[560px]">
              <div className="p-1 rounded-xl bg-[var(--panel-solid)] border border-[var(--border)] inline-flex gap-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveView("profile")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${activeView === "profile"
                      ? "bg-[var(--accent)] text-[var(--accent-dark)] font-bold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--panel)]"
                    }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Engineer Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("console")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${activeView === "console"
                      ? "bg-[var(--accent)] text-[var(--accent-dark)] font-bold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--panel)]"
                    }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Systems Console</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeView === "profile" ? "Indore / Remote" : "5 Production Systems"}</span>
              </span>
            </div>

            {/* View Canvas */}
            {activeView === "profile" ? (
              <div className="w-full max-w-[560px] rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--panel-solid)_95%,transparent)] backdrop-blur-2xl shadow-2xl p-4 sm:p-5 overflow-hidden transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.35)] animate-in fade-in duration-200">
                {/* Genuine Portrait Canvas */}
                <div className="relative w-full h-[370px] sm:h-[410px] rounded-xl overflow-hidden border border-[var(--border)] group bg-[#050811]">
                  <img
                    src="/images/sameer.jpg"
                    alt="Sameer Ali — Software Development Engineer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top Right Floating Badge: SDE-1 */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white flex items-center gap-2 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span className="font-semibold">SDE-1 @ Techdome</span>
                  </div>

                  {/* Top Left Floating Badge: Location */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-gray-200 flex items-center gap-1.5 shadow-xl">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Indore / Remote</span>
                  </div>

                  {/* Bottom Vignette Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

                  {/* Bottom Floating Highlights */}
                  <div className="absolute bottom-3.5 inset-x-3.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] text-white">3M+ Vectors</div>
                        <div className="text-[9px] text-gray-300 font-mono">Milvus Ingestion @ Kuanta</div>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] text-white">TCS SBI YONO</div>
                        <div className="text-[9px] text-gray-300 font-mono">Banking Scale Systems</div>
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
                        <span>Verified SDE</span>
                      </span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Full-Stack Architecture · Applied GenAI · Scalable Backend
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveView("console")}
                    className="px-3.5 py-2 rounded-xl bg-[var(--panel)] hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0 shadow-sm"
                  >
                    <span>Inspect Systems</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full animate-in fade-in duration-200">
                <CosmosScene />
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex justify-center mt-12">
          <a
            href="#projects"
            className="flex flex-col items-center gap-2 text-xs font-mono text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors group"
            aria-label="Scroll down to projects section"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center p-1 group-hover:border-[var(--accent)]">
              <span className="w-1 h-2 rounded-full bg-[var(--accent)] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
