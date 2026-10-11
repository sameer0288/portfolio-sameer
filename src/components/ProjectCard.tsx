"use client";

import React from "react";
import { Project } from "@/data/portfolio-data";
import { ArrowUpRight, ExternalLink, Terminal, Sparkles, Building2, Store } from "lucide-react";
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

  return (
    <article className="group cosmic-panel rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
      {/* Visual Header / Simulated Engineering Terminal */}
      <div className="relative h-48 sm:h-52 bg-gradient-to-br from-[#0c1428] via-[#090e1c] to-[#12232b] p-5 flex flex-col justify-between overflow-hidden border-b border-[var(--border)]">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(175,197,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(175,197,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top bar of mock window */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <span className="mono-label text-[10px] px-2 py-0.5 rounded bg-[var(--panel-solid)] text-[var(--accent)] border border-[var(--border)] font-semibold">
            {project.verifiedStatus}
          </span>
        </div>

        {/* Center UI preview box */}
        <div className="relative z-10 my-auto p-3.5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md transform group-hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-1">
            <span className="flex items-center gap-1.5 text-[var(--text)]">
              <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="font-bold">{project.title}</span>
            </span>
            <span className="text-[10px] text-[var(--accent)]">ONLINE</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
            {project.tagline}
          </p>
        </div>

        {/* Bottom meta tag in header */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>INDEX: 0{index + 1}</span>
          <span className="text-[var(--accent)]">{project.category}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-[var(--accent)] font-semibold">
              ROLE: {project.role}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--panel)] border border-[var(--border)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[var(--text-subtle)]">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect(project)}
            type="button"
            className="text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          >
            <span>Case Study & Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                title={`Visit ${project.title} live`}
                aria-label={`Visit ${project.title} live website`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                title={`View ${project.title} source on GitHub`}
                aria-label={`View ${project.title} GitHub repository`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
