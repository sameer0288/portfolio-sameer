"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { GraduationCap, Award, CheckCircle, Trophy, BookOpen } from "lucide-react";

export function EducationAchievements() {
  const { education, certifications, achievements } = PORTFOLIO_DATA;

  return (
    <section className="py-20 sm:py-24 relative border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mono-label mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Education & Computer Science Rigor
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Formal engineering degree specialized in Artificial Intelligence and strong mathematics / physics credentials.
            </p>

            <div className="space-y-4 pt-2">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="cosmic-panel p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[var(--text)]">
                        {edu.institution}
                      </h4>
                      <p className="text-sm text-[var(--accent)] font-medium mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="mono-label text-[11px] px-2.5 py-1 rounded bg-[var(--panel-solid)] text-[var(--text-muted)] border border-[var(--border)] whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-3 border-t border-[var(--border)] mt-4">
                    <span className="text-[var(--text)] font-bold bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2 py-0.5 rounded border border-[rgba(var(--accent-rgb),0.3)]">
                      {edu.grade}
                    </span>
                    {edu.honors && (
                      <span className="text-[var(--text-muted)]">{edu.honors}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mono-label mb-2">
              <Trophy className="w-4 h-4" />
              <span>CREDENTIALS & ACHIEVEMENTS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Certifications & Engineering Milestones
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Industry cloud certifications, competitive problem solving, and production performance milestones.
            </p>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="cosmic-panel p-4 rounded-xl border border-[var(--border)] flex items-start gap-3"
                >
                  <Award className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-[var(--text)]">{cert.title}</h5>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulleted Achievements */}
            <div className="cosmic-panel p-6 rounded-2xl border border-[var(--border)] mt-4">
              <div className="text-xs font-mono uppercase text-[var(--accent)] tracking-wider mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Verified Milestones</span>
              </div>
              <ul className="space-y-2.5">
                {achievements.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[var(--text-muted)] flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
