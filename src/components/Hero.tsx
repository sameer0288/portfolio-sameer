"use client";

import React from "react";
import { CosmosScene } from "./CosmosScene";
import { ArrowDown, ArrowUpRight, FileDown, Sparkles, Code2, Server, BrainCircuit } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Hero() {
  const { headline, bio, resumeUrl } = PORTFOLIO_DATA.personal;

  return (
    <section
      id="home"
      className="relative min-h-[calc(92vh-80px)] flex items-center pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Mission Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--panel)] backdrop-blur-md mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse" />
              <span className="mono-label text-[11px] text-[var(--text-muted)] tracking-wider">
                Full-Stack SDE × Applied GenAI Engineer
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] text-[var(--text)] mb-6">
              <span>I build </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--text)] via-[var(--text-muted)] to-[var(--text)]">
                software
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                that works.
              </span>
              <span className="block text-[var(--accent)] underline decoration-[rgba(var(--accent-rgb),0.35)] decoration-wavy decoration-2">
                AI that delivers.
              </span>
            </h1>

            {/* Subheading / Bio */}
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
              {bio}
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
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--panel)] border border-[var(--border)]">
                <Code2 className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[var(--text)]">React & TypeScript</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Enterprise UI Architecture</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--panel)] border border-[var(--border)]">
                <Server className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[var(--text)]">Backend & APIs</div>
                  <div className="text-[11px] text-[var(--text-muted)]">PostgreSQL, Node, FastAPI</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--panel)] border border-[var(--border)]">
                <BrainCircuit className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[var(--text)]">Applied GenAI</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Milvus Vector DB & RAG</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Cosmos Scene */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <CosmosScene />
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
