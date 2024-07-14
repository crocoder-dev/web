import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkToc from 'remark-toc';

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkToc],
  },
});
