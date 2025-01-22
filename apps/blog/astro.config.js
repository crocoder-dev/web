import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import createRemarkPlugin from '@crocoder-dev/remark-plugin';

const classes = {
  titleClass: 'font-bold text-[1.25rem] mt-[2.5rem]',
  summaryClass: 'cursor-pointer font-bold text-[1.25rem]',
  detailsClass: 'mt-[2.5rem]',
}

const remarkPlugin = createRemarkPlugin(classes);

export default defineConfig({
  output: 'static',
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [640, 936],
      domains: ['*'],
    },
  }),
  redirects: {
    '/feed': '/rss.xml'
  },
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [remarkPlugin],
  },
});