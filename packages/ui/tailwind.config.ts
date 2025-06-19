import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "ui-",
  presets: [sharedConfig],
  plugins: [],
};

export default config;
