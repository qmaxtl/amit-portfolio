import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090A",
        surface: {
          subtle: "#0C0E12",
          DEFAULT: "#11141A",
          elevated: "#181D26",
          card: "#1F2430",
          border: "rgba(255, 255, 255, 0.08)",
          borderBright: "rgba(255, 255, 255, 0.18)",
        },
        brand: {
          cyan: "#00F0FF",
          cobalt: "#3B82F6",
          emerald: "#10B981",
          amber: "#F59E0B",
          violet: "#8B5CF6",
        },
        telemetry: {
          green: "#10B981",
          blue: "#38BDF8",
          amber: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SF Mono", "Menlo", "Courier New", "monospace"],
        display: ["var(--font-display)", "Cabinet Grotesk", "Syne", "sans-serif"],
      },
      letterSpacing: {
        monumental: "-0.04em",
        technical: "0.15em",
        hud: "0.25em",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radial-dark": "radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.05), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
