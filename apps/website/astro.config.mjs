import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  // redirects: {
  //   '/sitemap': '/sitemap.xml',
  // },
  output: "static",
  adapter: vercel({
    imageService: true,
  }),
  integrations: [tailwind(), react()],
});