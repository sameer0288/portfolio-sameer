"use client";

import React from "react";
import { Terminal, Cpu, Sparkles, Orbit } from "lucide-react";

export function CosmosScene() {
  return (
    <div
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center select-none"
      aria-label="Cosmic Engineering Orbit Illustration"
    >
      {/* Outer subtle glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[rgba(72,104,190,0.18)] via-transparent to-[rgba(197,255,89,0.12)] blur-3xl pointer-events-none" />

      {/* Main Orbit Ring 1 */}
      <div
        className="absolute w-[92%] h-[92%] rounded-full border border-[rgba(160,190,240,0.22)] -rotate-[22deg] animate-orbit pointer-events-none"
        style={{ animationDuration: "45s" }}
      >
        {/* Orbital Satellite Node 1 */}
        <div className="absolute top-[8%] left-[22%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-auto">
          <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_var(--accent)] transition-transform group-hover:scale-150" />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--panel-solid)] border border-[var(--border)] px-2.5 py-1 rounded text-[11px] font-mono text-[var(--text)] shadow-lg opacity-85 group-hover:opacity-100 transition-opacity">
            <span className="text-[var(--accent)] font-bold">01 //</span> VECTOR RETRIEVAL (3M+)
          </div>
        </div>

        {/* Orbital Satellite Node 2 */}
        <div className="absolute bottom-[14%] right-[20%] translate-x-1/2 translate-y-1/2 group cursor-pointer pointer-events-auto">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_14px_#38ef7d] transition-transform group-hover:scale-150" />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--panel-solid)] border border-[var(--border)] px-2.5 py-1 rounded text-[11px] font-mono text-[var(--text)] shadow-lg opacity-85 group-hover:opacity-100 transition-opacity">
            <span className="text-cyan-400 font-bold">02 //</span> HIGH-THROUGHPUT EMR
          </div>
        </div>
      </div>

      {/* Second Orbit Ring (Inclined) */}
      <div className="absolute w-[108%] h-[34%] rounded-[50%] border border-[rgba(197,255,89,0.32)] rotate-[26deg] shadow-[0_0_24px_rgba(197,255,89,0.08)] pointer-events-none" />

      {/* Central Planet Sphere */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-[inset_-28px_-18px_60px_#02040a,0_0_80px_rgba(72,104,190,0.22)] border border-[rgba(255,255,255,0.08)] animate-planet-float flex items-center justify-center">
        {/* Planet Surface Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,#eef5ff_0%,#a6c5ff_6%,#506fb8_18%,#15254a_42%,#050814_72%)]" />

        {/* Internal Atmosphere Rings */}
        <div className="absolute inset-2 rounded-full border border-white/10 opacity-30 pointer-events-none" />

        {/* Engineering Core Telemetry */}
        <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] backdrop-blur-md flex flex-col items-center justify-center p-3 text-center shadow-inner">
          <Cpu className="w-6 h-6 text-[var(--accent)] mb-1 animate-pulse" />
          <div className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
            System
          </div>
          <div className="text-xs font-bold text-[var(--text)] tracking-wider">
            CORE ACTIVE
          </div>
          <div className="text-[9px] font-mono text-[var(--accent)] mt-0.5">
            2.5+ YRS PROD
          </div>
        </div>
      </div>

      {/* Orbiting Moon */}
      <div className="absolute top-10 right-6 sm:top-14 sm:right-10 w-12 h-12 rounded-full bg-[radial-gradient(circle_at_32%_28%,#f6ede0,#a4b38d_25%,#3a4d46_60%,#111827_85%)] shadow-[0_0_24px_rgba(197,255,89,0.2)] animate-planet-float-reverse border border-white/10 flex items-center justify-center">
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] opacity-80" />
      </div>

      {/* Floating Status Badges */}
      <div className="absolute -bottom-3 left-4 sm:left-6 cosmic-panel px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs z-20">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
        <div>
          <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Status</div>
          <div className="font-semibold text-[var(--text)]">Open to High-Impact SDE Roles</div>
        </div>
      </div>

      <div className="absolute -top-2 left-6 cosmic-panel px-3 py-1.5 rounded-lg hidden sm:flex items-center gap-2 text-xs font-mono z-20">
        <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
        <span className="text-[var(--text-muted)]">stack:</span>
        <span className="text-[var(--accent)] font-semibold">React · Node · Python · AI</span>
      </div>
    </div>
  );
}
