import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  adapter: vercel({
    imageService: true,
  }),
  integrations: [tailwind(), react()],
  vite: {
    server: {
      proxy: {
        '/api': 'https://web-contact-gloria-crocoderdev-crocoder.vercel.app/api', // Proxy API requests to your backend
      },
    },
    define: {
      'process.env.VITE_CONTACT_URL': JSON.stringify(process.env.VITE_CONTACT_URL),
    },
  },
});