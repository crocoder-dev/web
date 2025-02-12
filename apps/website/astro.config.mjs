import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";
import createRemarkPlugin from "@crocoder-dev/remark-plugin";

const classes = {
  titleClass: "font-bold text-[1.25rem] mt-[2.5rem]",
  summaryClass: "cursor-pointer font-bold text-[1.25rem]",
  detailsClass: "mt-[2.5rem]",
  iframeClass: "border-none w-full h-[380px] overflow-y-hidden",
};

const remarkPlugin = createRemarkPlugin(classes);

export default defineConfig({
  output: "static",
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [640, 936],
      domains: ["*"],
    },
  }),
  redirects: {
    "/feed": "/rss.xml",
    "/sitemap": "/sitemap.xml",
  },
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [remarkPlugin],
  },
  vite: {
    server: {
      proxy: {
        "/api":
          "https://web-contact.vercel.app", // Proxy API requests to your backend
      },
    },
    define: {
      "process.env.VITE_CONTACT_URL": JSON.stringify(
        process.env.VITE_CONTACT_URL,
      ),
    },
  },
});
