import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const markdownPosts = await getCollection("posts");

const prefix = import.meta.env.DEV ? "/" : "/blog";

const posts = markdownPosts.map((post) => ({
  url: `${prefix}${prefix === "/" ? "" : "/"}${post.slug}`,
  title: post.data.title,
  createdAt: new Date(post.data.createdAt),
  description: post.data.description || "",
}));

posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export const GET = () =>
  rss({
    title: "CroCoder | Blog",
    description: "Tips and ideas to help you learn, build and improve your projects.",
    site: 'https://www.crocoder.dev/blog',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: post.url,
      pubDate: post.createdAt,
    })),
  });
