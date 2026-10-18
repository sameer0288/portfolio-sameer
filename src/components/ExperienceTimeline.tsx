"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { useResumeModal } from "@/context/ResumeModalContext";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Building,
  Award,
  ExternalLink,
  FileText,
  ArrowUpRight,
  Eye,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export function ExperienceTimeline() {
  const { experience } = PORTFOLIO_DATA;
  const { openResume } = useResumeModal();
  const [selectedRole, setSelectedRole] = useState<string>("techdome");

  const scrollToRole = (id: string) => {
    setSelectedRole(id);
    const element = document.getElementById(`role-${id}`);
    if (element) {
      const topOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="experience" className="py-20 sm:py-28 relative border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
              Experience building <span className="text-[var(--accent)]">production systems.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            2.5+ years building full-stack applications, vector-search pipelines, enterprise banking platforms (SBI YONO 2.0 at TCS), and enterprise EMR systems at Techdome.
          </p>
        </div>

        {/* Mobile-only Quick Company Switcher & Resume Pill (< lg) */}
        <div className="lg:hidden mb-8 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Companies</span>
            <span className="text-[10px] text-emerald-400 font-mono">4 Roles</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {experience.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToRole(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap flex items-center gap-1.5 border transition-all cursor-pointer flex-shrink-0 ${
                  selectedRole === item.id
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold shadow-sm"
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                <span>{item.company}</span>
                {item.id === "techdome" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
                {item.certificateBadge && (
                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300">
                    Silver Belt
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Quick Action Pill */}
          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => openResume("resume")}
              className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View Full Résumé</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* 2-Column Balanced Layout with Sticky Navigation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: STICKY Career Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Quick Company Directory / Jump Switcher */}
            <div className="cosmic-panel p-5 sm:p-6 rounded-2xl border border-[var(--border)] shadow-xl">
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center justify-between">
                <span>Companies</span>
                <span className="text-[10px] text-emerald-400 font-semibold">4 Roles</span>
              </div>

              <div className="space-y-2">
                {experience.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToRole(item.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      selectedRole === item.id
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm"
                        : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                        <span className={selectedRole === item.id ? "text-emerald-300" : "text-slate-100"}>
                          {item.company}
                        </span>
                        {item.id === "techdome" && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            Active
                          </span>
                        )}
                        {item.certificateBadge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Silver Belt
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-[240px]">
                        {item.role}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        selectedRole === item.id
                          ? "text-emerald-400 translate-x-1"
                          : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Career Highlights Row */}
              <div className="pt-4 mt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Experience</div>
                  <div className="text-sm sm:text-base font-bold text-slate-100 mt-1">2.5+ Years</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Focus Roles</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1">SDE-1 / SDE-2</div>
                </div>
              </div>

              {/* Single Clean Résumé Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => openResume("resume")}
                  className="w-full py-3 px-4 rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-teal-500/10 hover:from-emerald-500/25 hover:to-teal-500/20 text-slate-100 font-semibold text-xs sm:text-sm flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>View Full Résumé</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Roles Detailed Cards */}
          <div className="lg:col-span-7 space-y-10">
            {experience.map((item, index) => {
              const isMarkoknow = Boolean(item.certificateUrl);

              return (
                <article
                  key={item.id}
                  id={`role-${item.id}`}
                  className={`cosmic-panel p-6 sm:p-8 rounded-2xl border transition-all duration-300 scroll-mt-28 ${
                    selectedRole === item.id
                      ? "border-emerald-500/50 shadow-2xl ring-1 ring-emerald-500/20"
                      : "border-[var(--border)] hover:border-slate-700"
                  }`}
                >
                  {/* Role Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="mono-label text-xs sm:text-sm text-[var(--accent)] font-bold flex items-center gap-1.5">
                      <Building className="w-4 h-4" />
                      <span>{item.company}</span>
                    </span>
                    <span className="mono-label text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 bg-[var(--panel-solid)] px-3 py-1 rounded-md border border-[var(--border)] font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mb-1">
                    {item.role}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{item.location}</span>
                    <span>·</span>
                    <span>{item.type}</span>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                    {item.summary}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-6">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[var(--text-muted)] flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Dedicated, High-End Markoknow Certificate & LOR Display */}
                  {isMarkoknow && (
                    <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 shadow-2xl space-y-4">
                      {/* Top Header of Credential */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 border-b border-slate-800 pb-3.5">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-slate-100">
                                Certificate of Completion & Letter of Recommendation
                              </span>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ID: #{item.certificateId}
                              </span>
                            </div>
                            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                              Silver Belt Badge · Markoknow Full Stack Internship
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0 pt-1 md:pt-0">
                          <button
                            type="button"
                            onClick={() => openResume("markoknow")}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-400 text-xs font-mono text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Preview Full Size</span>
                          </button>

                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs font-mono hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <span>Drive LOR</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* UN-CROPPED Complete Certificate Image Canvas */}
                      {item.certificateImage && (
                        <div
                          onClick={() => openResume("markoknow")}
                          className="relative w-full rounded-xl overflow-hidden border border-slate-800 group cursor-pointer bg-[#050811] shadow-2xl p-2 transition-all hover:border-emerald-500/50"
                        >
                          <img
                            src={item.certificateImage}
                            alt="Markoknow Certificate of Completion — Sameer Ali Silver Belt Badge"
                            className="w-full h-auto object-contain max-h-[340px] mx-auto rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-[1px]">
                            <span className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-2xl">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Click to Enlarge in Lightbox</span>
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-300 font-mono leading-relaxed pt-1">
                        ★ Awarded for successfully completing the Full Stack Developer Internship (MERN) from January 26th, 2023 to May 26th, 2023 and engineering ~60% faster response times via Redis caching architectures.
                      </p>
                    </div>
                  )}

                  {/* Technologies Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--panel-solid)] border border-[var(--border)] text-[var(--text)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
