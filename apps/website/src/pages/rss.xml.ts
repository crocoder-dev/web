import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const markdownPosts = await getCollection("posts");

const postImportResult = import.meta.glob("./blog/**/*.astro", { eager: true });
const pages = Object.values(postImportResult).filter(
  (page: any) =>
    !page.url?.includes("[") &&
    !page.url?.includes("index.astro") &&
    !(page.url === "/blog"),
);

const posts = [
  ...markdownPosts.map((post: any) => ({
    url: `/blog/${post.slug}`,
    title: post.data.title,
    createdAt: new Date(post.data.createdAt),
    description: post.data.description || "",
  })),
  ...pages.map((post: any) => ({
    url: post.url,
    title: post.data.title,
    createdAt: new Date(post.data.createdAt),
    description: post.data.description || "",
  })),
];

posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export const GET = () =>
  rss({
    customData:
      '<atom:link href="https://www.crocoder.dev/blog/feed" rel="self" type="application/rss+xml" />',
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: "CroCoder | Blog",
    description:
      "Tips and ideas to help you learn, build and improve your projects.",
    site: "https://www.crocoder.dev/blog",
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      link: post.url,
      pubDate: post.createdAt,
    })),
  });
