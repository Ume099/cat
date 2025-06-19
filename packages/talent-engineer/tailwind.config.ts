import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

interface ExtendedConfig extends Config {
  safelist?: string[] | { pattern: RegExp; variants?: string[] }[];
}

const config: ExtendedConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui//src/**/*.tsx",
  ],
  presets: [sharedConfig],
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
  safelist: [
    "ml-[64px]",
    "ml-[128px]",
    "ml-[256px]",
    "ml-[512px]",
    "ml-[1024px]",
  ],
};

export default config;
