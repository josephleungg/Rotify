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
        roboto: ["Roboto", 'serif'],
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat .2s forwards',
      },
    },
  },
  plugins: [],
};
