import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#121212",
        parchment: "#F5F5DC",
        gold: "#D4AF37",
        muted: "#2A2A2A",
        deepBrown: "#3A2F2F",
        softWhite: "#EDEDED",
        success: "#3FA34D",
        danger: "#A83232",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333333%)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        }
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        slowZoom: "slowZoom 20s ease-out forwards",
      }
    },
  },
  plugins: [],
};
export default config;
