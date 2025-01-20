import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: vercel({
    imageService: true,
  }),
  integrations: [tailwind(), react()],
});
