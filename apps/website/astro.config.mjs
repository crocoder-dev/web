import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

const siteUrl = env.PUBLIC_SITE_URL;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  redirects: {
    '/sitemap': '/sitemap-0.xml',
    '/sitemap.xml': '/sitemap-0.xml'
  },
  output: "static",
  adapter: vercel({
    imageService: true,
  }),
  integrations: [tailwind(), react(), sitemap({
    lastmod: new Date(),
    changefreq: 'monthly',
    priority: 0.85,
    customPages: [`${siteUrl}/blog`],
  })],
});