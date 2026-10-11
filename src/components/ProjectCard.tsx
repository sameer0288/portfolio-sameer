"use client";

import React from "react";
import { Project } from "@/data/portfolio-data";
import { ArrowUpRight, ExternalLink, Terminal, Sparkles, Building2, Store, Lock, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const getIcon = () => {
    switch (project.category) {
      case "AI & GenAI":
        return Sparkles;
      case "Workforce & Enterprise":
        return Building2;
      case "Product Engineering":
        return Store;
      default:
        return Terminal;
    }
  };

  const Icon = getIcon();

  // Extract a clean display hostname for the browser capsule
  const getDisplayDomain = () => {
    if (project.liveUrl) {
      try {
        const url = new URL(project.liveUrl);
        return url.hostname + (url.pathname.length > 1 ? url.pathname : "");
      } catch {
        return project.liveUrl.replace(/^https?:\/\//, "");
      }
    }
    return `${project.id}.internal`;
  };

  const accent = project.accentColor || "var(--accent)";

  return (
    <article
      onClick={() => onSelect(project)}
      className="group cosmic-panel rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--border-strong)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)] cursor-pointer relative"
    >
      {/* Top Browser Titlebar */}
      <div className="bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-mono">
        {/* macOS / Browser traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Browser URL address capsule */}
        <div className="flex-1 max-w-[280px] mx-auto px-2.5 py-1 rounded-md bg-[var(--panel-solid)] border border-[var(--border)] flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-muted)] truncate shadow-inner">
          <Lock className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
          <span className="truncate">{getDisplayDomain()}</span>
        </div>

        {/* Verified status pill */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="mono-label text-[10px] px-2 py-0.5 rounded font-semibold border"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
            }}
          >
            {project.verifiedStatus}
          </span>
        </div>
      </div>

      {/* Real High-Resolution Screenshot Preview */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-space-950 border-b border-[var(--border)]">
        {project.imageUrl ? (
          <>
            <img
              src={project.imageUrl}
              alt={`${project.title} live interface preview`}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Ambient bottom gradient so content blends smoothly */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel-solid)] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Hover inspection overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/45 backdrop-blur-[2px]">
              <span className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-mono text-xs font-bold tracking-wider uppercase shadow-xl inline-flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <span>View Architecture & Metrics</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0c1428] to-[#12232b]">
            <Icon className="w-12 h-12 text-[var(--accent)] opacity-40" />
          </div>
        )}

        {/* Index counter badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90">
          0{index + 1} // {project.category}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Role & Verification */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
            <span className="text-[var(--text-muted)]">
              Role: <strong className="text-[var(--text)]">{project.role}</strong>
            </span>
            <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified</span>
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-1.5 flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </h3>

          <p className="text-xs font-medium text-[var(--accent)] mb-3">
            {project.tagline}
          </p>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Real Metrics Badges (From live screenshot / production systems) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-4 space-y-1.5">
              <div className="grid grid-cols-1 gap-1.5">
                {project.metrics.slice(0, 3).map((m, i) => (
                  <div
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-[11px] font-mono text-[var(--text)] flex items-center gap-2 truncate"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="truncate">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[var(--panel)] border border-[var(--border)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div
          className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onSelect(project)}
            type="button"
            className="text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded cursor-pointer"
          >
            <span>Deep Dive Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                title={`Visit ${project.title} live deployment`}
                aria-label={`Visit ${project.title} live website`}
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                title={`View ${project.title} source code on GitHub`}
                aria-label={`View ${project.title} repository`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
