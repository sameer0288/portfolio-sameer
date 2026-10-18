"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio-data";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Sparkles } from "lucide-react";

const CATEGORIES = [
  "All",
  "AI & GenAI",
  "Product Engineering",
  "Workforce & Enterprise",
  "Full Stack",
] as const;

type Category = (typeof CATEGORIES)[number];

export function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Featured projects & <span className="text-[var(--accent)]">applications.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Full-stack platforms, workforce CRMs, and applied GenAI applications built with modern web technologies.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar" role="tablist">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "All"
                ? PORTFOLIO_DATA.projects.length
                : PORTFOLIO_DATA.projects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm"
                    : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-slate-800/80 text-slate-400 border border-slate-700/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
