import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#03050a",
          900: "#060913",
          850: "#090e1d",
          800: "#0e162c",
          700: "#15203f",
          600: "#1e2e59",
        },
        cosmic: {
          lime: "#c5ff59",
          limeDark: "#3f6a00",
          cyan: "#38ef7d",
          teal: "#00f0ff",
          indigo: "#4e75ff",
          purple: "#8a5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      animation: {
        "planet-float": "planetFloat 8s ease-in-out infinite",
        "planet-float-reverse": "planetFloat 6s ease-in-out infinite reverse",
        orbit: "orbit 32s linear infinite",
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        planetFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
