"use client";

import React, { useEffect, useState } from "react";
import { useResumeModal } from "@/context/ResumeModalContext";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  X,
  FileDown,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Building,
  ShieldCheck,
  Calendar,
  Eye,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export function ResumeModal() {
  const { isOpen, activeTab, closeResume, setActiveTab } = useResumeModal();
  const [copied, setCopied] = useState(false);
  const { personal, experience, projects, skills, education, certifications, achievements } =
    PORTFOLIO_DATA;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeResume();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeResume]);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const text = `
SAMEER ALI — Software Development Engineer (SDE-1) & GenAI Developer
Email: ${personal.email} | Phone: ${personal.phone} | Location: ${personal.location}
GitHub: ${personal.github} | LinkedIn: ${personal.linkedin}

PROFESSIONAL SUMMARY
${personal.bio}

WORK EXPERIENCE
${experience
  .map(
    (exp) => `
${exp.role} — ${exp.company} (${exp.period}) | ${exp.location}
${exp.bullets.map((b) => `• ${b}`).join("\n")}
Tech: ${exp.technologies.join(", ")}`
  )
  .join("\n")}

FEATURED PROJECTS
${projects
  .map(
    (p) => `
${p.title} (${p.category}) — ${p.liveUrl || p.githubUrl || ""}
• ${p.description}
Metrics: ${p.metrics?.join("; ") || "Production deployment"}
Stack: ${p.tags.join(", ")}`
  )
  .join("\n")}

TECHNICAL SKILLS
${skills.map((s) => `${s.title}: ${s.skills.map((sk) => sk.name).join(", ")}`).join("\n")}

EDUCATION
${education
  .map(
    (e) => `
${e.degree} — ${e.institution} (${e.period})
Grade: ${e.grade} ${e.honors ? `| ${e.honors}` : ""}`
  )
  .join("\n")}

CERTIFICATIONS & CREDENTIALS
• Full Stack Developer Intern (MERN) — Silver Belt Badge (Cert ID: 110080), Markoknow
  Drive Link: https://drive.google.com/file/d/1XbJS6dSRiW62hg5Lz29BGc-0ojNn38PR/view?usp=sharing
• Microsoft Azure Certified
• Google Cloud Facilitator Program (GCP)
• Python for Everybody (Univ of Michigan)
• Java & JavaScript Training (IIT Bombay)

KEY ACHIEVEMENTS
${achievements.map((a) => `• ${a}`).join("\n")}
`.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-[92vh] max-h-[900px] flex flex-col rounded-2xl bg-[var(--panel-solid)] border border-[var(--border-strong)] shadow-2xl overflow-hidden relative"
      >
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-4 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="resume-modal-title" className="text-base sm:text-lg font-bold text-[var(--text)]">
                  Sameer Ali — Résumé & Credentials
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 inline" /> SDE-1
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                SDE-1 @ Techdome · 2.5+ Years Experience · Markoknow Silver Belt Badge
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:border-emerald-500/50 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              title="Copy Plain Text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:border-emerald-500/50 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              title="Print Résumé"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>

            <a
              href="/Sameer_Ali_Resume.pdf"
              download="Sameer_Ali_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Download PDF Résumé"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={closeResume}
              className="w-8 h-8 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-rose-500/10 hover:border-rose-500/40 hover:text-rose-400 flex items-center justify-center text-slate-400 transition-colors cursor-pointer ml-1"
              aria-label="Close Résumé Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Selection Tabs */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-800 bg-slate-900/60 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("resume")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "resume" || activeTab === "ats"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Résumé</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("markoknow")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === "markoknow"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Markoknow Certificate & LOR</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pdf")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "pdf"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PDF Document</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[var(--bg)] selection:bg-[var(--accent)] selection:text-[var(--accent-dark)]">
          {/* TAB 1: FULL RÉSUMÉ */}
          {(activeTab === "resume" || activeTab === "ats") && (
            <div className="max-w-4xl mx-auto space-y-8 text-[var(--text)] font-sans print:max-w-none">
              {/* Résumé Header */}
              <div className="border-b border-[var(--border)] pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
                      Sameer Ali
                    </h1>
                    <p className="text-base font-semibold text-[var(--accent)] mt-0.5">
                      Software Development Engineer (SDE-1) & GenAI Developer
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://drive.google.com/file/d/1XbJS6dSRiW62hg5Lz29BGc-0ojNn38PR/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold hover:bg-emerald-500/20 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Markoknow Silver Belt #110080</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <a href={`mailto:${personal.email}`} className="hover:underline text-[var(--text)]">
                      {personal.email}
                    </a>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{personal.phone}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{personal.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--text)]">
                      github.com/sameer0288
                    </a>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--text)]">
                      linkedin.com/in/sameer0288
                    </a>
                  </span>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-2 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Professional Summary</span>
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Software Development Engineer with <strong className="text-[var(--text)] font-semibold">2.5+ years of production experience</strong> crafting resilient web platforms, scalable backend architectures, and high-performance vector search systems. Proven track record optimizing high-throughput queries on India&apos;s flagship enterprise banking platform (<strong className="text-[var(--text)]">SBI YONO 2.0 at TCS</strong>), indexing 3M+ records into Milvus at <strong className="text-[var(--text)]">Kuanta</strong>, maintaining mission-critical EMR modules at <strong className="text-[var(--text)]">Techdome</strong>, and earning the <strong className="text-[var(--text)]">Silver Belt Badge</strong> at <strong className="text-[var(--text)]">Markoknow</strong>.
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-4 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5" />
                  <span>Work Experience</span>
                </h3>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h4 className="text-base font-bold text-[var(--text)]">
                            {exp.role}
                          </h4>
                          <div className="text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-2">
                            <span>{exp.company}</span>
                            <span>·</span>
                            <span className="text-[var(--text-muted)] font-normal">{exp.location}</span>
                            <span>·</span>
                            <span className="text-[var(--text-muted)] font-normal">{exp.type}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--panel-solid)] px-2.5 py-1 rounded border border-[var(--border)] w-fit">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
                        {exp.summary}
                      </p>

                      <ul className="space-y-1.5 mb-4">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm text-[var(--text-muted)] flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Markoknow Verified Credential Callout */}
                      {exp.certificateUrl && (
                        <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-emerald-400 font-semibold font-mono">
                              Verified {exp.certificateBadge} · Certificate ID #{exp.certificateId}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveTab("markoknow")}
                              className="px-2.5 py-1 rounded bg-[var(--panel-solid)] text-xs font-mono text-[var(--text)] hover:text-emerald-400 border border-[var(--border)] transition-colors cursor-pointer"
                            >
                              Inspect Certificate
                            </button>
                            <a
                              href={exp.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 underline hover:opacity-80"
                            >
                              <span>Google Drive LOR</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--panel-solid)] border border-[var(--border)] text-[var(--text)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Skills Matrix */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Technical Competencies</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((category) => (
                    <div key={category.title} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                      <div className="text-xs font-bold text-[var(--text)] mb-1.5">
                        {category.title}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {category.skills.map((s) => (
                          <span
                            key={s.name}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                              s.highlight
                                ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/25"
                                : "bg-[var(--panel-solid)] text-[var(--text-muted)] border border-[var(--border)]"
                            }`}
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Academic Rigor */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education</span>
                </h3>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-[var(--text)]">{edu.institution}</div>
                        <div className="text-xs text-[var(--accent)] font-medium">{edu.degree}</div>
                        {edu.honors && (
                          <div className="text-xs text-[var(--text-muted)] font-mono mt-0.5">{edu.honors}</div>
                        )}
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="text-xs font-mono font-bold text-[var(--text)] bg-[var(--panel-solid)] px-2.5 py-1 rounded border border-[var(--border)] inline-block">
                          {edu.grade}
                        </span>
                        <div className="text-[11px] font-mono text-[var(--text-muted)] mt-1">{edu.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Key Achievements */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certifications & Credentials</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {certifications.map((cert, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-lg border border-[var(--border)] bg-[var(--panel)] flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[var(--text)]">{cert.title}</div>
                        <div className="text-[11px] text-[var(--text-muted)]">{cert.issuer}</div>
                        {cert.certificateId && (
                          <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                            Certificate ID: {cert.certificateId}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                  <div className="text-xs font-mono uppercase text-[var(--accent)] font-semibold mb-2">
                    Key Achievements
                  </div>
                  <ul className="space-y-1.5">
                    {achievements.map((item, i) => (
                      <li key={i} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MARKOKNOW CERTIFICATE & LOR */}
          {activeTab === "markoknow" && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Highlight Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-medium mb-2 border border-emerald-500/25">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>INTERNSHIP CREDENTIAL & LOR</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text)]">
                    Markoknow Certificate of Completion & LOR
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-xl">
                    Awarded to <strong className="text-[var(--text)]">Sameer Ali</strong> for successfully completing his Full Stack Developer Internship (MERN) and achieving the prestigious <strong className="text-emerald-400 font-semibold">&quot;Silver Belt Badge&quot;</strong>.
                  </p>
                </div>

                <a
                  href="https://drive.google.com/file/d/1XbJS6dSRiW62hg5Lz29BGc-0ojNn38PR/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono hover:bg-emerald-400 transition-all flex-shrink-0 shadow-lg shadow-emerald-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Drive</span>
                </a>
              </div>

              {/* Certificate Image Canvas */}
              <div className="rounded-2xl border border-[var(--border-strong)] bg-slate-950/80 p-2 sm:p-4 shadow-2xl overflow-hidden flex flex-col items-center">
                <div className="relative w-full max-w-3xl rounded-xl overflow-hidden border border-white/10 group">
                  <img
                    src="/images/certifications/markoknow-certificate.png"
                    alt="Markoknow Certificate of Completion - Sameer Ali Silver Belt Badge"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* Credential Data Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Awarded To</div>
                  <div className="text-sm font-bold text-[var(--text)] mt-1">Sameer Ali</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Recipient</div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Honors Badge</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">Silver Belt Badge</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">Top Tier Achievement</div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Certificate ID</div>
                  <div className="text-sm font-bold text-[var(--text)] font-mono mt-1">110080</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">Authenticity Reference</div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Organization</div>
                  <div className="text-sm font-bold text-[var(--text)] mt-1">Markoknow</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">MERN Stack Internship</div>
                </div>
              </div>

              {/* LOR & Engineering Scope Summary */}
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] space-y-3">
                <h4 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Letter of Recommendation & Engineering Contributions</span>
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  During his tenure at Markoknow as a Full Stack Developer (MERN Stack), Sameer architected high-performance backend microservices and implemented multi-tiered Redis caching strategies that cut API response times by <strong className="text-[var(--text)] font-semibold">~60%</strong>. His dedication, clean architecture, and rapid feature turnaround earned him the company&apos;s coveted <strong className="text-emerald-400">Silver Belt Badge</strong> along with an official Letter of Recommendation.
                </p>

                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Tenure: January 26th, 2023 – May 26th, 2023 (Extended into 2024 Full Stack)
                  </span>
                  <a
                    href="https://drive.google.com/file/d/1XbJS6dSRiW62hg5Lz29BGc-0ojNn38PR/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold underline hover:opacity-80"
                  >
                    <span>Open in Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PDF EMBEDDED VIEWER */}
          {activeTab === "pdf" && (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-full h-[620px] rounded-xl overflow-hidden border border-[var(--border)] bg-slate-900 shadow-inner relative hidden sm:block">
                <iframe
                  src="/Sameer_Ali_Resume.pdf#toolbar=1&navpanes=0"
                  title="Sameer Ali Résumé PDF"
                  className="w-full h-full border-none"
                />
              </div>

              {/* Mobile PDF Fallback Card */}
              <div className="sm:hidden w-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)]">Sameer Ali — Résumé (PDF)</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Mobile browsers display PDF documents best when opened directly or downloaded.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="/Sameer_Ali_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-xs font-mono flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Open PDF in Full Screen</span>
                  </a>
                  <a
                    href="/Sameer_Ali_Resume.pdf"
                    download="Sameer_Ali_Resume.pdf"
                    className="w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] font-semibold text-xs font-mono flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[var(--accent)]" />
                    <span>Download PDF to Device</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
