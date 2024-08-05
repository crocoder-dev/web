import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkToc from 'remark-toc';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import createRemarkPlugin from '@crocoder-dev/remark-plugin';

const remarkPlugin = createRemarkPlugin({
  titleClass: 'bg-red-500',
  summaryClass: 'bg-green-500',
  detailsClass: 'bg-blue-500',
});

export default defineConfig({
  output: 'static',
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [640, 936],
      domains: ['*'],
    },
  }),
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [remarkToc, remarkPlugin],
  },
});
