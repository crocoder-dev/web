import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import createRemarkPlugin from '@crocoder-dev/remark-plugin';

const classes = {
  titleClass: 'font-bold text-[1.25rem] mt-[2.5rem]',
  summaryClass: 'cursor-pointer font-bold text-[1.25rem]',
  detailsClass: 'mt-[2.5rem]',
  iframeClass: 'border-none w-full h-[360px] overflow-y-hidden'
}

const remarkPlugin = createRemarkPlugin(classes);

export default defineConfig({
  prefetch: true,
  output: 'static',
  adapter: vercel({
    imageService: true,
    devImageService: 'sharp',
    imagesConfig: {
      sizes: [320, 640, 750, 936, 1080, 1200],
      domains: [],
    }
  }),
  redirects: {
    '/feed': '/rss.xml',
    '/sitemap': '/sitemap.xml'
  },
  integrations: [
    tailwind(),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkPlugin],
  },
});

