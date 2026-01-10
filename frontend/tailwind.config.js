/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#0B0B0C", // negro carbón
          panel: "#111113", // panel principal
          surface: "#1A1A1D", // cards / sidebar
        },
        text: {
          primary: "#F4F4F5", // blanco roto
          secondary: "#A1A1AA", // gris moderno
          muted: "#71717A",
        },
        accent: {
          lime: "#A3E635", // neon lime
          violet: "#8B5CF6", // electric violet
          coral: "#FB7185", // hot coral
        },
        border: {
          subtle: "#27272A",
        },
      },

      // 🧱 BREAKPOINTS 2025
      screens: {
        xs: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1720px", // pantallas grandes modernas
      },

      // 🔠 TIPOGRAFÍA
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },

      // 🌫️ SOMBRAS MODERNAS
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.02), 0 20px 40px rgba(0,0,0,0.45)",
        neon: "0 0 12px rgba(163,230,53,0.35)",
      },

      // 🌀 ANIMACIONES
      animation: {
        fadeUp: "fadeUp 0.4s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
