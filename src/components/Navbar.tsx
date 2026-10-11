"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowUpRight, FileDown } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#home"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-1"
          aria-label="Sameer Ali - Home"
        >
          <div className="relative w-10 h-10 rounded-full border border-[var(--border-strong)] overflow-hidden shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] group-hover:scale-105 transition-transform bg-[var(--panel)] flex-shrink-0">
            <img
              src="/images/sameer.jpg"
              alt="Sameer Ali"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--bg)]" />
          </div>
          <div>
            <div className="font-bold tracking-wider text-sm sm:text-base text-[var(--text)] flex items-center gap-1.5">
              SAMEER ALI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono tracking-wider">
              SDE-1 @ TECHDOME · GENAI
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--text)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--border)_40%,transparent)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href="/Sameer_Ali_Resume.pdf"
            download="Sameer_Ali_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] text-xs font-mono font-medium text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>CV</span>
          </a>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-dark)] text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(var(--accent-rgb),0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--panel)] flex items-center justify-center text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--panel-solid)] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--border)_50%,transparent)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
            <a
              href="/Sameer_Ali_Resume.pdf"
              download="Sameer_Ali_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] text-sm font-medium text-[var(--text)]"
            >
              <FileDown className="w-4 h-4 text-[var(--accent)]" />
              <span>Download Résumé</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-dark)] text-sm font-semibold tracking-wider"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
