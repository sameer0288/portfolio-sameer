"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  Cloud,
  Cpu,
  Wrench,
} from "lucide-react";

export function SkillsGrid() {
  const { skills } = PORTFOLIO_DATA;

  const getIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return Code2;
      case "Layout":
        return Layout;
      case "Server":
        return Server;
      case "Database":
        return Database;
      case "Sparkles":
        return Sparkles;
      case "Cloud":
        return Cloud;
      default:
        return Cpu;
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-28 relative border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mono-label mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>03 // TECHNICAL SKILLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Core stack & <span className="text-[var(--accent)]">technologies.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Frontend UI libraries, backend API frameworks, databases, and GenAI systems used in production applications.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => {
            const Icon = getIcon(category.iconName);
            return (
              <div
                key={category.title}
                className="cosmic-panel p-6 sm:p-7 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="mono-label text-[10px] text-[var(--text-subtle)]">
                      ENGINEERING
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                        skill.highlight
                          ? "bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)] font-semibold border border-[rgba(var(--accent-rgb),0.3)]"
                          : "bg-[var(--panel)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text)]"
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
