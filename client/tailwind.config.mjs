import { Jaro, Monomaniac_One, Bangers } from 'next/font/google';


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000416",
        textGray: "#8A8A8A",
      },
      fontFamily: {
        monomaniac: ["Monomaniac One", 'serif'],
        jaro: ["Jaro", 'serif'],
        bangers: ["Bangers", 'serif'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
};
