"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/data/portfolio-data";
import { X, ExternalLink, CheckCircle2, Terminal, Layers, Lock, BarChart3, Code2, Globe } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "code">("overview");

  useEffect(() => {
    setActiveTab("overview");
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

  const accent = project.accentColor || "var(--accent)";

  const getDisplayDomain = () => {
    if (project.liveUrl) {
      try {
        const url = new URL(project.liveUrl);
        return url.hostname + (url.pathname.length > 1 ? url.pathname : "");
      } catch {
        return project.liveUrl.replace(/^https?:\/\//, "");
      }
    }
    return `${project.id}.production`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-auto cosmic-panel rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-solid)] shadow-2xl text-left overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Browser Bar */}
        <div className="bg-[color-mix(in_srgb,var(--bg)_95%,transparent)] px-5 py-3 border-b border-[var(--border)] flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="hidden sm:inline-block text-xs font-mono text-[var(--text-muted)] ml-2">
              Case Study // {project.category}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--panel)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)]">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>{getDisplayDomain()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Real Screenshot Banner */}
          {project.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-space-950 shadow-lg relative group">
              <img
                src={project.imageUrl}
                alt={`${project.title} live interface banner`}
                className="w-full h-52 sm:h-72 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span
                  className="mono-label text-[11px] px-2.5 py-1 rounded font-semibold border backdrop-blur-md"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${accent} 20%, transparent)`,
                    color: "#ffffff",
                    borderColor: `color-mix(in srgb, ${accent} 50%, transparent)`,
                  }}
                >
                  {project.verifiedStatus}
                </span>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-white hover:border-[var(--accent)] transition-colors"
                  >
                    <span>Open Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Title & Tagline */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                {project.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base font-semibold" style={{ color: accent }}>
              {project.tagline}
            </p>
          </div>

          {/* Role & Verification Banner */}
          <div className="p-4 rounded-xl bg-[var(--panel)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Sameer&apos;s Engineering Contribution</div>
              <div className="text-sm font-semibold text-[var(--text)]">{project.role}</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Production Codebase</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-[var(--border)] flex items-center gap-2" role="tablist">
            <button
              onClick={() => setActiveTab("overview")}
              type="button"
              className={`px-4 py-2.5 text-xs font-mono border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "overview"
                  ? "text-[var(--text)] font-bold"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              style={activeTab === "overview" ? { borderColor: accent, color: accent } : {}}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Overview & Scope</span>
            </button>

            <button
              onClick={() => setActiveTab("metrics")}
              type="button"
              className={`px-4 py-2.5 text-xs font-mono border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "metrics"
                  ? "text-[var(--text)] font-bold"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              style={activeTab === "metrics" ? { borderColor: accent, color: accent } : {}}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Production Metrics</span>
            </button>

            {project.codeSnippet && (
              <button
                onClick={() => setActiveTab("code")}
                type="button"
                className={`px-4 py-2.5 text-xs font-mono border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "code"
                    ? "text-[var(--text)] font-bold"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
                style={activeTab === "code" ? { borderColor: accent, color: accent } : {}}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Architecture & Code</span>
              </button>
            )}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4 text-sm text-[var(--text-muted)] leading-relaxed">
              <p>{project.longDescription}</p>

              <div className="pt-2">
                <div className="text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider mb-2">
                  Technologies & System Architecture
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
            </div>
          )}

          {/* Tab 2: Metrics */}
          {activeTab === "metrics" && (
            <div className="space-y-4">
              <p className="text-xs text-[var(--text-muted)]">
                Key metrics, scale, and performance statistics:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.metrics?.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[var(--panel)] border border-[var(--border)] text-xs text-[var(--text)] flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1 flex-shrink-0" />
                    <span className="font-medium leading-relaxed">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Code */}
          {activeTab === "code" && project.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{project.codeSnippet.caption}</span>
                </span>
                <span className="text-[10px] uppercase text-[var(--accent)]">{project.codeSnippet.language}</span>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[#070b14] p-4 overflow-x-auto text-xs font-mono text-emerald-300 shadow-inner">
                <pre>
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[color-mix(in_srgb,var(--bg)_95%,transparent)] p-4 sm:p-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
