"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/portfolio-data";
import { X, ExternalLink, CheckCircle2, Terminal, Layers } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 cosmic-panel rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-solid)] p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
          <div className="flex items-center gap-2">
            <span className="mono-label text-[11px] px-2.5 py-1 rounded bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)] font-semibold border border-[rgba(var(--accent-rgb),0.3)]">
              {project.verifiedStatus}
            </span>
            <span className="mono-label text-[11px] text-[var(--text-muted)]">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Tagline */}
        <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {project.title}
        </h2>
        <p className="text-sm sm:text-base text-[var(--accent)] font-medium mb-6">
          {project.tagline}
        </p>

        {/* Role & Verification */}
        <div className="p-4 rounded-xl bg-[var(--panel)] border border-[var(--border)] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Sameer&apos;s Role</div>
            <div className="text-sm font-semibold text-[var(--text)]">{project.role}</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified from Résumé</span>
          </div>
        </div>

        {/* Deep Dive Description */}
        <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
          <p>{project.longDescription}</p>
        </div>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[var(--accent)]" />
              <span>Key Highlights & Engineering Scope</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.metrics.map((metric, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-xs text-[var(--text)] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Code Snippet / Architecture Peek */}
        {project.codeSnippet && (
          <div className="mb-6">
            <div className="text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>{project.codeSnippet.caption}</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[#070b14] p-4 overflow-x-auto text-xs font-mono text-emerald-300">
              <pre>
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider mb-2">
            Technologies Used
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--panel)] border border-[var(--border)] text-[var(--text)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Foot Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Source</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
