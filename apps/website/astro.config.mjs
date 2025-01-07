import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  output: "static",
  adapter: vercel({
    imageService: true,
    devImageService: "sharp"
  }),
  integrations: [tailwind(), react()],
});
