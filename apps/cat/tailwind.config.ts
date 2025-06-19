import baseConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  ...baseConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../../packages/chat/**/*.{js,ts,jsx,tsx}",
    "../../packages/calendar/**/*.{js,ts,jsx,tsx}",
    "../../packages/gantt/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        theme: {
          DEFAULT: "#000000",
        },
        primary: {
          light: "#93c5fd", // blue-300
          dark: "#4338ca", // blue-700
          text: "#2563eb", // blue-600
          tag: "#dbeafe", // blue-100
          DEFAULT: "#3b82f6", // blue-500
        },
        complementary: {
          light: "#fdba93", // orange-300
          dark: "#c2410c", // orange-700
          text: "#ea580c", // orange-600
          tag: "#ffedd5", // orange-100
          DEFAULT: "#f97316", // orange-500
        },
        danger: {
          light: "#f87171", // red-400
          DEFAULT: "#ef4444", // red-500
        },
        secondary: {
          DEFAULT: "#888888",
        },
        accent: {
          DEFAULT: "#FFD700",
        },
        separate: {
          dark: "#4b5563", // gray-600
          light: "#e5e7eb", // gray-200
          DEFAULT: "#9ca3af", // gray-400
        },
        success: {
          dark: "#16a34a",
          light: "#22c55e",
          DEFAULT: "#22c55e", // green-500
        },
        cancel: {
          text: "#6b7280", // red-500
          textDark: "#4b5563", // red-500
          dark: "#4b5563", // gray-300
          border: "#f87171", // red-300
          DEFAULT: "#6b7280", // gray-400
        },
        inActive: {
          DEFAULT: "#d1d5db",
        },
        base: {
          DEFAULT: "#f3f4f6",
        },
        retry: {
          dark: "#9ca3af", // gray-400
          DEFAULT: "#d1d5db", // gray-300
        },
      },
    },
  },
  presets: [sharedConfig],
  plugins: [heroui()],
};

export default config;
