const {heroui} = require('@heroui/theme');
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [heroui()],
};