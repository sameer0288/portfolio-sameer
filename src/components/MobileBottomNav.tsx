"use client";

import React, { useState, useEffect } from "react";
import { Home, FolderGit2, Briefcase, Cpu, FileText, Award } from "lucide-react";
import { useResumeModal } from "@/context/ResumeModalContext";

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ElementType;
  isAction?: boolean;
}

const ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", href: "#experience", icon: Briefcase },
  { id: "skills", label: "Skills", href: "#skills", icon: Cpu },
  { id: "resume", label: "CV & LOR", icon: FileText, isAction: true },
];

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const { openResume, isOpen } = useResumeModal();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "experience", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

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
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl shadow-[0_-10px_35px_rgba(0,0,0,0.7)] px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isAction && activeSection === item.id;
          const isResumeActive = item.isAction && isOpen;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openResume("ats")}
                className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer group ${
                  isResumeActive
                    ? "text-emerald-400 bg-emerald-500/15"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950 shadow-[0_0_8px_#34d399] animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-medium tracking-tight mt-1 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          }

          const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (item.href?.startsWith("#")) {
              e.preventDefault();
              const targetId = item.href.slice(1);
              const targetEl = document.getElementById(targetId);
              if (targetEl) {
                const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({ top: targetY, behavior: "smooth" });
                setActiveSection(targetId);
              }
            }
          };

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={handleNavClick}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer group ${
                isActive
                  ? "text-emerald-400 bg-emerald-500/15 font-bold"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                )}
              </div>
              <span className="text-[10px] font-mono font-medium tracking-tight mt-1 truncate max-w-full">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
