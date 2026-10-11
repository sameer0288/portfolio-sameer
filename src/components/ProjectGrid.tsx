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
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mono-label mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 // SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Engineering with <span className="text-[var(--accent)]">real-world impact.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            A verified selection of production platforms, enterprise CRM modules, and AI vector-search systems. Explore live deployments and architecture notes.
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
                    ? "bg-[var(--accent)] text-[var(--accent-dark)] font-bold shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)]"
                    : "bg-[var(--panel)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isSelected
                      ? "bg-black/20 text-inherit"
                      : "bg-[var(--panel-solid)] text-[var(--text-subtle)] border border-[var(--border)]"
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
