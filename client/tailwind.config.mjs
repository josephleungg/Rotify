import { Jaro, Monomaniac_One } from 'next/font/google';

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
        Monomaniac: ["Monomaniac One", 'serif'],
        Jaro: ["Jaro", 'serif']
      }
    },
  },
  plugins: [],
};
