import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import createRemarkPlugin from '@crocoder-dev/remark-plugin';
import image from '@astrojs/image';

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
  }),
  redirects: {
    '/feed': '/rss.xml',
    '/sitemap': '/sitemap.xml'
  },
  integrations: [
    tailwind(),
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
  markdown: {
    remarkPlugins: [remarkPlugin],
  },
});

