"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { ArrowUp, Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = PORTFOLIO_DATA;

  return (
    <footer className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
          {/* Brand & Subtext */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[var(--accent)] text-[var(--accent)] font-bold text-xs flex items-center justify-center bg-[var(--panel)]">
              SA
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text)] tracking-wider">
                SAMEER ALI
              </div>
              <div className="text-[11px] font-mono text-[var(--text-muted)]">
                Software Development Engineer · GenAI Builder
              </div>
            </div>
          </div>

          {/* Socials & Résumé */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <a
              href={personal.resumeUrl}
              download="Sameer_Ali_Resume.pdf"
              className="text-[var(--accent)] hover:underline flex items-center gap-1.5 font-semibold"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Back to Top */}
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <span>Back to Orbit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Legal & Tech disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-subtle)] font-mono">
          <p>© {currentYear} Sameer Ali. All rights reserved.</p>
          <p>Cosmic Engineering Lab · Next.js App Router · Verified Portfolio Knowledge</p>
        </div>
      </div>
    </footer>
  );
}
