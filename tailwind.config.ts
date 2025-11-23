import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a8a", // Deep navy blue
          dark: "#1e40af",
          light: "#3b82f6",
        },
        accent: {
          DEFAULT: "#d4af37", // Gold/tan accent
          light: "#f4d03f",
        },
        mint: {
          DEFAULT: "#e0f2e9", // Light mint green background
          light: "#f1f8f4",
        },
        darkGreen: {
          DEFAULT: "#2d5016", // Dark green for buttons
          dark: "#1f350f",
        },
        darkBlue: {
          DEFAULT: "#4a5568", // Dark blue/purple for headlines
          purple: "#5a4fcf", // Purple-blue gradient
        },
      },
    },
  },
  plugins: [],
};
export default config;

