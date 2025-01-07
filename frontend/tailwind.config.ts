import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["bg-pastel-purple", "bg-pastel-pink", "bg-pastel-green", "bg-pastel-yellow"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ClashGrotesk", "sans-serif"],
      },
      colors: {
        pastel: {
          purple: "#E4DBFA",
          pink: "#FBE2F4",
          green: "#D5F6ED",
          yellow: "#FFE1CC",
        },
      },
    },
  },
  plugins: [forms],
};
export default config;
