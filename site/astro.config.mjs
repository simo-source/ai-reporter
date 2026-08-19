import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://theprimaryrecord.example",
  output: "static",
  vite: {
    server: {
      fs: { allow: [".."] },
    },
  },
});
