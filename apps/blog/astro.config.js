import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkToc from 'remark-toc';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import createRemarkPlugin from '@crocoder-dev/remark-plugin';

const remarkPlugin = createRemarkPlugin({
  titleClass: 'font-bold text-[1.4rem]',
  summaryClass: 'cursor-pointer font-bold text-[1.4rem]',
  detailsClass: '',
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
