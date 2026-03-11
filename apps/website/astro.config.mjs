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
  ctaClass: "my-12 rounded-lg border-l-4 border-primary bg-primary/5 p-6",
  ctaTitleClass: "text-xl font-semibold text-foreground mb-3",
};

const remarkPlugin = createRemarkPlugin(classes);

export default defineConfig({
  prefetch: true,
  output: "server",
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [
        160, 320, 480, 578, 640, 720, 800, 940, 960, 1200, 1280, 1412, 1440,
        1536, 1600, 1800, 1920,
      ],
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
