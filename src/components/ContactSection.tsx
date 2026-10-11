"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, FileDown, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function ContactSection() {
  const { personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    botField: "", // Honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your name (min 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please include a message (at least 10 characters).";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setResponseMsg(data.error || "Failed to submit message. Please try direct email.");
        return;
      }

      setStatus("success");
      setResponseMsg(data.message || "Message received successfully!");
      if (data.mailtoFallback) {
        setMailtoFallback(data.mailtoFallback);
      }
      setFormData({ name: "", email: "", subject: "", message: "", botField: "" });
    } catch {
      setStatus("error");
      setResponseMsg("Network error. Please use direct email to reach Sameer.");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mono-label mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>04 // CONTACT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
              Let&apos;s talk about <br />
              <span className="text-[var(--accent)]">your engineering needs.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Available for full-time Software Engineer (SDE-1 / SDE-2) roles, contract engineering, and high-impact GenAI development.
            </p>

            {/* Direct Channels */}
            <div className="cosmic-panel p-6 rounded-2xl border border-[var(--border)] space-y-4 pt-6">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3.5 text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--panel-solid)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Direct Email</div>
                  <div className="font-semibold">{personal.email}</div>
                </div>
              </a>

              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-3.5 text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--panel-solid)] border border-[var(--border)] flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Phone / WhatsApp</div>
                  <div className="font-semibold">{personal.phone}</div>
                </div>
              </a>

              <div className="pt-4 border-t border-[var(--border)] flex items-center gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] flex items-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text)] flex items-center gap-2 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personal.resumeUrl}
                  download="Sameer_Ali_Resume.pdf"
                  className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono text-[var(--accent)] flex items-center gap-2 transition-colors ml-auto"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>PDF CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="cosmic-panel p-6 sm:p-8 rounded-2xl border border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                Send an Inquiry or Job Opportunity
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
                Fill out the form below. Client-side and server-side rate limits protect this endpoint against spam.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-[var(--text)]">Message Logged</h4>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
                    {responseMsg}
                  </p>
                  {mailtoFallback && (
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      <span>Open in Mail Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <div className="pt-2">
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot field (hidden from genuine users) */}
                  <input
                    type="text"
                    name="botField"
                    value={formData.botField}
                    onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                        }}
                        placeholder="e.g. Alex Mercer"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--panel)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
                          fieldErrors.name ? "border-rose-500" : "border-[var(--border)]"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--panel)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
                          fieldErrors.email ? "border-rose-500" : "border-[var(--border)]"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase">
                      Subject / Role Title
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. SDE Opportunity / Technical Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-[var(--text-muted)] mb-1.5 uppercase">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
                      }}
                      placeholder="Share details about the role, technical challenge, or project scope..."
                      className={`w-full px-4 py-2.5 rounded-xl border bg-[var(--panel)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-y ${
                        fieldErrors.message ? "border-rose-500" : "border-[var(--border)]"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] text-rose-400 mt-1 font-mono">{fieldErrors.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 flex items-center gap-2 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{responseMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(var(--accent-rgb),0.3)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Transmission</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
