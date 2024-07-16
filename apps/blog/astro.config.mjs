import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkToc from 'remark-toc';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [640, 768, 1024, 1280],
      domains: ['*'],
    },
    devImageService: 'shrap',
  }),
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [remarkToc],
  },
});
