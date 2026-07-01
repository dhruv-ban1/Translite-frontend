/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-primary": "#ffffff",
        "primary-container": "#0f172a",
        "secondary": "#fd761a",
        "primary": "#0f172a",
        "surface": "#f8f9ff",
        "outline-variant": "#c6c6cd",
        "on-surface-variant": "#45464d",
        "on-primary-container": "#cbd5e1",
        "on-surface": "#0b1c30",
        "on-secondary": "#ffffff",
        "surface-container-low": "#eff4ff",
        // Added fallbacks for undefined colors in the design
        "surface-tint": "#565e74",
      },
      spacing: {
        "margin-desktop": "48px",
        "container-max": "1280px",
      },
      fontFamily: {
        "label-md": ["Inter", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-sm": ["Montserrat", "sans-serif"],
        "display-lg": ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}