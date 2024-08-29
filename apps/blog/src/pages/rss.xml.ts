import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const markdownPosts = await getCollection("posts");

const prefix = import.meta.env.DEV ? "/" : "/blog";

const posts = markdownPosts.map((post) => ({
  url: `${prefix}${prefix === "/" ? "" : "/"}${post.slug}`,
  title: post.data.title,
  date: new Date(post.data.date),
  description: post.data.description || "",
}));

posts.sort((a, b) => b.date.getTime() - a.date.getTime());

export const GET = () =>
  rss({
    title: "CroCoder | Blog",
    description: "Tips and ideas to help you learn, build and improve your projects.",
    site: 'https://www.crocoder.dev/blog',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: post.url,
      pubDate: post.date,
    })),
  });
