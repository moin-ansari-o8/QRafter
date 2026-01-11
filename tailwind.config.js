/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "'Courier New'", "monospace"],
      },
      colors: {
        // Editorial Newspaper Palette
        ink: {
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#2d2d2d",
          800: "#1f1f1f",
          900: "#1a1a1a",
          950: "#0a0a0a",
        },
        newsprint: {
          50: "#fafaf9",
          100: "#f5f5f0",
          200: "#eeeee8",
          300: "#e1e1d8",
          400: "#cfcfc2",
          500: "#b8b8a8",
          600: "#9a9a88",
          700: "#7d7d6d",
          800: "#63635a",
          900: "#52524b",
        },
        sepia: {
          50: "#faf8f5",
          100: "#f2ede4",
          200: "#e8dcc9",
          300: "#d9c5a5",
          400: "#c9ab7f",
          500: "#b89264",
          600: "#8b7355",
          700: "#725d47",
          800: "#5f4d3d",
          900: "#514135",
        },
        archive: {
          50: "#fef2f2",
          100: "#fde3e3",
          200: "#facccc",
          300: "#f5a8a8",
          400: "#ed7575",
          500: "#e24848",
          600: "#c93636",
          700: "#a83232",
          800: "#8b2e2e",
          900: "#742c2c",
        },
        success: {
          50: "#f4f7f2",
          100: "#e6ede0",
          500: "#3d5a27",
          600: "#2d5016",
        },
        warning: {
          50: "#fefbf0",
          100: "#fdf5d9",
          500: "#a88b2f",
          600: "#8b6914",
        },
        // Alias for primary (use ink as primary)
        primary: {
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#2d2d2d",
          800: "#1f1f1f",
          900: "#1a1a1a",
        },
      },
      boxShadow: {
        paper: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "paper-lg":
          "0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "paper-xl":
          "0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
        inset: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
        editorial: "2px 2px 0 rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "paper-light":
          "url('data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E')",
        "paper-dark":
          "url('data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E')",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
  },
  plugins: [],
};
