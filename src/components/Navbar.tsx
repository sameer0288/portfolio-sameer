"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useResumeModal } from "@/context/ResumeModalContext";
import { Menu, X, ArrowUpRight, FileDown, Award, FileText } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { openResume } = useResumeModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["home", "projects", "experience", "skills", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-xl border-[var(--border)] shadow-lg shadow-black/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#home"
          className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-1"
          aria-label="Sameer Ali - Home"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--border-strong)] overflow-hidden shadow-sm group-hover:scale-105 transition-transform bg-[var(--panel)] flex-shrink-0">
            <img
              src="/images/sameer.jpg"
              alt="Sameer Ali"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--bg)]" />
          </div>
          <div>
            <div className="font-bold tracking-wider text-xs sm:text-base text-[var(--text)] flex items-center gap-1.5">
              SAMEER ALI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-mono tracking-wider">
              SDE-1 @ TECHDOME · GENAI
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? "text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/25 shadow-sm"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Quick Resume & LOR button */}
          <button
            type="button"
            onClick={() => openResume("ats")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-slate-700/80 bg-slate-900/90 hover:border-emerald-500 text-xs font-mono font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer"
            title="Open Interactive Résumé & Markoknow Certificate"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>CV & LOR</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] shadow-sm"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
