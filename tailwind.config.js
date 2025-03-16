import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#2563EB",
          "secondary": "#10B981",
          "accent": "#F59E0B",
          "neutral": "#F3F4F6",
          "base-100": "#FFFFFF",
          "info": "#3B82F6",
          "success": "#14B8A6",
          "warning": "#F59E0B",
          "error": "#F97316",
        },
        dark: {
          "primary": "#3B82F6",
          "secondary": "#14B8A6",
          "accent": "#F97316",
          "neutral": "#1E293B",
          "base-100": "#111827",
          "info": "#60A5FA",
          "success": "#22D3EE",
          "warning": "#FACC15",
          "error": "#F43F5E",
        },
      }
    ],
  },
};
