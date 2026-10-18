"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { ArrowUp, Mail, FileDown, Award, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useResumeModal } from "@/context/ResumeModalContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = PORTFOLIO_DATA;
  const { openResume } = useResumeModal();

  return (
    <footer className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
          {/* Brand & Subtext */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[var(--border-strong)] overflow-hidden bg-[var(--panel)] flex-shrink-0 shadow-sm">
              <img
                src="/images/sameer.jpg"
                alt="Sameer Ali"
                className="w-full h-full object-cover object-top"
              />
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

            <button
              type="button"
              onClick={() => openResume("ats")}
              className="text-[var(--accent)] hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Interactive Résumé & LOR</span>
            </button>
          </div>

          {/* Back to Top */}
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Legal & Tech disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-subtle)] font-mono">
          <p>© {currentYear} Sameer Ali. All rights reserved.</p>
          <p>Full-Stack Engineering & Applied GenAI · Built with Next.js, TypeScript & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
