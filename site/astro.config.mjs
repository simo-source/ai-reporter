import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://simo-source.github.io",
  base: process.env.BASE_PATH || "/",
  output: "static",
  vite: {
    server: {
      fs: { allow: [".."] },
    },
  },
});
