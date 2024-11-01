import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import createRemarkPlugin from '@crocoder-dev/remark-plugin';
import { classes } from "./astro-tailwind.config";

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
