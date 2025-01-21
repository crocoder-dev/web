import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

const siteUrl = env.PUBLIC_SITE_URL;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [tailwind(), sitemap({
    lastmod: new Date(),
    changefreq: 'monthly',
    priority: 0.85,
    customPages: [`${siteUrl}/blog`],
  })]
});