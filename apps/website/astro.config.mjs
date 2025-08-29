import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import createRemarkPlugin from "@crocoder-dev/remark-plugin";
import tailwindcss from "@tailwindcss/vite";

const classes = {
  titleClass: "font-bold text-[1.25rem] mt-[2.5rem]",
  summaryClass: "cursor-pointer font-bold text-[1.25rem]",
  detailsClass: "mt-[2.5rem]",
  iframeClass: "border-none w-full h-[360px] overflow-y-hidden",
};

const remarkPlugin = createRemarkPlugin(classes);

export default defineConfig({
  prefetch: true,
  output: "server",
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [320, 480, 578, 640, 720, 800, 1196, 1920],
      formats: ["image/avif", "image/webp"],
    },
  }),
  redirects: {
    "/feed": "/rss.xml",
    "/sitemap": "/sitemap.xml",
  },
  integrations: [tailwindcss(), react()],
  markdown: {
    remarkPlugins: [remarkPlugin],
  },
});
