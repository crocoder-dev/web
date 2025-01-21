import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
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
  integrations: [tailwind(), sitemap({
    lastmod: new Date(),
    changefreq: 'monthly',
    priority: 0.85,
    customPages: [`${siteUrl}/blog`],
  })]
});