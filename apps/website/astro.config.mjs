import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.crocoder.dev/',
  integrations: [tailwind(), sitemap({
    lastmod: new Date(),
    changefreq: 'monthly',
    priority: 0.85,
    customPages: ['https://www.crocoder.dev/blog'],
  })],
  redirects: {
    '/sitemap': '/sitemap.xml'
  },
});