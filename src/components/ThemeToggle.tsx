"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sameer-portfolio-theme") as "dark" | "light" | null;
    const initialTheme = saved === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", initialTheme === "light" ? "#f4f7fb" : "#060913");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("sameer-portfolio-theme", nextTheme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", nextTheme === "light" ? "#f4f7fb" : "#060913");
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--panel)] flex items-center justify-center opacity-70">
        <Moon className="w-4 h-4 text-[var(--accent)]" />
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer text-[var(--text)] group"
      aria-label={isLight ? "Switch to dark cosmic space theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      {isLight ? (
        <Moon className="w-4 h-4 text-[var(--accent)] transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-[var(--accent)] transition-transform group-hover:rotate-45" />
      )}
    </button>
  );
}
