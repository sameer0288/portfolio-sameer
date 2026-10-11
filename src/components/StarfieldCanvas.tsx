"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
  p: number;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Star density calculated to remain performant on low-end devices
      const count = Math.min(180, Math.floor((width * height) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.55 + 0.25,
        s: Math.random() * 0.2 + 0.04,
        p: Math.random() * Math.PI * 2,
      }));
    };

    handleResize();

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Subtle twinkling calculation
        const twinkle = 0.7 + Math.sin(time * 0.0008 + star.p) * 0.3;
        const alpha = Math.max(0.1, Math.min(1, star.a * twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(50, 75, 115, ${alpha * 0.5})`
          : `rgba(220, 235, 255, ${alpha})`;
        ctx.fill();

        if (!prefersReducedMotion) {
          star.y += star.s;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(0);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[-3] opacity-80"
    />
  );
}
