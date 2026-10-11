import React from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="cosmic-panel p-8 sm:p-12 rounded-3xl border border-[var(--border)] max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mx-auto mb-6 shadow-sm">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="mono-label text-xs text-[var(--accent)] font-semibold mb-2">
          ERROR 404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight mb-4">
          Page Not Found
        </h1>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-dark)] font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.3)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
