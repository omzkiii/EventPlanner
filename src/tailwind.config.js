// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      sans: ["var(--font-ubuntu)", "sans-serif"],
      mono: ["var(--font-ubuntu-mono)", "monospace"],
    },
  },
  darkMode: "class",
  plugins: [],
};