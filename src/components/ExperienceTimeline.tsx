"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building } from "lucide-react";

export function ExperienceTimeline() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 sm:py-28 relative border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mono-label mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>02 // WORK EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Experience across <span className="text-[var(--accent)]">production systems.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            2.5+ years building full-stack applications, vector-search pipelines, enterprise banking systems (SBI YONO 2.0 at TCS), and healthcare EMR software.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Philosophy & Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cosmic-panel p-8 rounded-2xl border border-[var(--border)]">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] leading-tight mb-4">
                Full-Stack SDE <br />
                & GenAI Developer <br />
                <span className="text-[var(--accent)]">2.5+ Years in Production</span>
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-4">
                I enjoy making complicated workflows feel simple—building interfaces people can use, APIs teams can depend on, and AI features that solve an actual problem instead of merely looking impressive.
              </p>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                My primary focus is the intersection of product engineering, backend reliability, and applied AI.
              </p>

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Total Experience</div>
                  <div className="text-xl font-bold text-[var(--text)]">2.5+ Years</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Target Roles</div>
                  <div className="text-xl font-bold text-[var(--accent)]">SDE-1 / SDE-2 / GenAI</div>
                </div>
              </div>
            </div>

            <div className="cosmic-panel p-6 rounded-2xl border border-[var(--border)] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                <strong className="text-[var(--text)] block mb-0.5">Verified Career Record</strong>
                All companies, tenures, titles, and performance metrics match the supplied résumé strictly.
              </div>
            </div>
          </div>

          {/* Right Column: Roles Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-8 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--border-strong)] before:to-transparent">
              {experience.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-8 sm:-left-10 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] flex items-center justify-center shadow-[0_0_14px_rgba(var(--accent-rgb),0.3)] transition-transform group-hover:scale-125">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  </div>

                  {/* Role Card */}
                  <div className="cosmic-panel p-6 sm:p-7 rounded-2xl border border-[var(--border)] group-hover:border-[var(--accent)] transition-all">
                    {/* Role Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="mono-label text-xs text-[var(--accent)] font-semibold flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{item.company}</span>
                      </span>
                      <span className="mono-label text-[11px] text-[var(--text-muted)] flex items-center gap-1 bg-[var(--panel-solid)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-[var(--text)] mb-1">
                      {item.role}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{item.location}</span>
                      <span>·</span>
                      <span>{item.type}</span>
                    </div>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-6">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[var(--text-muted)] flex items-start gap-2.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Tag Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--panel)] border border-[var(--border)] text-[var(--text)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
