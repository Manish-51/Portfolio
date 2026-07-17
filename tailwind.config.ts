import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#07080b",
          900: "#0b0d12",
          800: "#12151c",
          700: "#1b1f29",
          600: "#262b38",
        },
        ivory: {
          100: "#f7f5f0",
          200: "#ece7dc",
        },
        amber: {
          400: "#e8b872",
          500: "#d4a05a",
          600: "#b8813e",
        },
        emerald: {
          400: "#5fd9b4",
          500: "#3bbf9a",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at center, rgba(212,160,90,0.15) 0%, rgba(0,0,0,0) 70%)",
        "grain-overlay":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
