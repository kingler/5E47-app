import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0b",
          elev: "#111114",
          card: "#15151a",
          border: "#23232b",
        },
        accent: {
          DEFAULT: "#e6ff3d",
          muted: "#a8bd2e",
          ink: "#0a0a0b",
        },
        ink: {
          DEFAULT: "#f5f5f7",
          muted: "#9a9aa6",
          soft: "#6b6b78",
        },
        role: {
          creator: "#7c5cff",
          operator: "#2dd4bf",
          sponsor: "#fb923c",
          investor: "#60a5fa",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Inter",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(230,255,61,0.18), 0 8px 30px -8px rgba(230,255,61,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
