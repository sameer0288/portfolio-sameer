"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { useResumeModal } from "@/context/ResumeModalContext";
import {
  GraduationCap,
  Award,
  CheckCircle,
  Trophy,
  BookOpen,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export function EducationAchievements() {
  const { education, certifications, achievements } = PORTFOLIO_DATA;
  const { openResume } = useResumeModal();

  return (
    <section className="py-16 sm:py-24 relative border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Education & Academic Background
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              B.Tech in Computer Science & Artificial Intelligence with foundational coursework in algorithms and distributed systems.
            </p>

            <div className="space-y-4 pt-2">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="cosmic-panel p-5 sm:p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[var(--text)]">
                        {edu.institution}
                      </h4>
                      <p className="text-sm text-[var(--accent)] font-medium mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="mono-label text-[11px] px-2.5 py-1 rounded bg-[var(--panel-solid)] text-[var(--text-muted)] border border-[var(--border)] whitespace-nowrap self-start">
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-3 border-t border-[var(--border)] mt-4">
                    <span className="text-[var(--text)] font-bold bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2.5 py-0.5 rounded border border-[rgba(var(--accent-rgb),0.3)]">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-2">
              <Trophy className="w-4 h-4" />
              <span>Certifications</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Certifications & Key Milestones
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Cloud credentials, competitive problem solving, and professional achievements.
            </p>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {certifications.map((cert, idx) => {
                const isMarkoknow = Boolean(cert.certificateId);

                return (
                  <div
                    key={idx}
                    className={`cosmic-panel p-4 rounded-xl border transition-all ${
                      isMarkoknow
                        ? "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/70 sm:col-span-2"
                        : "border-[var(--border)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isMarkoknow
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-[var(--panel-solid)] text-[var(--accent)] border border-[var(--border)]"
                          }`}
                        >
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="text-xs sm:text-sm font-bold text-[var(--text)]">
                              {cert.title}
                            </h5>
                            {cert.badge && (
                              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.2 rounded border border-emerald-500/30">
                                {cert.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5 font-mono">
                            {cert.issuer}
                          </p>

                          {isMarkoknow && (
                            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                              <button
                                type="button"
                                onClick={() => openResume("markoknow")}
                                className="px-2.5 py-1 rounded-md bg-[var(--panel-solid)] border border-emerald-500/30 text-xs font-mono text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                              >
                                <span>Preview Certificate</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>

                              <a
                                href={cert.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-emerald-400 underline"
                              >
                                <span>Drive LOR</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {cert.certificateId && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--panel-solid)] px-2 py-0.5 rounded border border-[var(--border)] flex-shrink-0">
                          ID: #{cert.certificateId}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bulleted Achievements */}
            <div className="cosmic-panel p-5 sm:p-6 rounded-2xl border border-[var(--border)] mt-4">
              <div className="text-xs font-mono uppercase text-[var(--accent)] font-semibold tracking-wider mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Key Achievements</span>
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
