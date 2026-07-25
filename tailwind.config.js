// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        card: "#151515",
        accent: "#f97316",
        positive: "#22c55e",
        negative: "#ef4444",
        neutral: "#8e8e93",
      },
    },
  },
  plugins: [],
};
