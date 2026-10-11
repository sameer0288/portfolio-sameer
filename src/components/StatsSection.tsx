"use client";

import React from "react";
import { Terminal, Database, Sparkles, GitBranch, Zap, ShieldCheck } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Terminal,
      value: "SDE-1",
      label: "Current Role",
      detail: "Techdome",
      badge: "Indore / Active",
      accent: "text-[var(--accent)]",
    },
    {
      icon: Database,
      value: "3M+",
      label: "Vector Records",
      detail: "Milvus vector DB deal-scout @ Kuanta",
      badge: "GenAI Scale",
      accent: "text-cyan-400",
    },
    {
      icon: Zap,
      value: "~30%",
      label: "Latency Reduction",
      detail: "PostgreSQL query tuning @ SBI YONO 2.0",
      badge: "High-Traffic Banking",
      accent: "text-emerald-400",
    },
    {
      icon: GitBranch,
      value: "250+ / 80+",
      label: "DSA & Repositories",
      detail: "Competitive coding & open source systems",
      badge: "CS Foundations",
      accent: "text-indigo-400",
    },
  ];

  return (
    <section className="relative z-10 -mt-4 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="cosmic-panel rounded-2xl p-6 sm:p-8 border border-[var(--border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex flex-col justify-between ${idx !== 0 ? "sm:pl-6 sm:pt-0 pt-6" : ""
                } ${idx !== stats.length - 1 ? "sm:pr-6" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] border border-[var(--border)] flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.accent}`} />
                </div>
                <span className="mono-label text-[10px] px-2 py-0.5 rounded bg-[var(--panel-solid)] text-[var(--text-muted)] border border-[var(--border)]">
                  {stat.badge}
                </span>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${stat.accent}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[var(--text)] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">
                  {stat.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
