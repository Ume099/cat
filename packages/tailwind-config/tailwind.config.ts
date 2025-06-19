import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      colors: {
        theme: {
          DEFAULT: "#000000",
        },
        primary: {
          light: "#eff6ff",
          DEFAULT: "#4f46e5",
        },
        danger: {
          DEFAULT: "#ef4444",
        },
        secondary: {
          DEFAULT: "#888888",
        },
        accent: {
          DEFAULT: "#FFD700",
        },
      },
    },
  },
  plugins: [],
};

export default config;
