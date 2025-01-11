import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

const siteUrl = import.meta.env.SITE_URL;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [tailwind(), sitemap({
    lastmod: new Date(),
    changefreq: 'monthly',
    priority: 0.85,
    customPages: [`${siteUrl}/blog`],
  })],
  redirects: {
    '/sitemap': '/sitemap.xml'
  },
});