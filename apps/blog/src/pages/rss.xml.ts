import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const markdownPosts = await getCollection("posts");

const authorsCollection = await getCollection("authors");

const prefix = import.meta.env.DEV ? "/" : "/blog";

const authorMap = authorsCollection.reduce(
  (acc, author) => {
    acc[author.slug] = author.data.name;
    return acc;
  },
  {} as { [slug: string]: string },
);

const posts = markdownPosts.map((post) => ({
  url: `${prefix}${prefix === "/" ? "" : "/"}${post.slug}`,
  title: post.data.title,
  date: new Date(post.data.date),
  description: post.data.description || "",
  authors: post.data.authors.map((slug: string) => authorMap[slug] || slug),
}));

posts.sort((a, b) => b.date.getTime() - a.date.getTime());

export const get = () =>
  rss({
    title: "My Blog RSS Feed",
    description: "Latest posts from my blog",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: post.url,
      pubDate: post.date,
    })),
  });
