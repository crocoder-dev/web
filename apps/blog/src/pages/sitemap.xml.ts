import { getCollection } from "astro:content";

export async function get({ site }: { site: any }) {
  const markdownPosts = await getCollection("posts");

  const pages = (await Astro.glob("../pages/**/*.astro")).filter(
    (page: any) =>
      !page.url?.includes("[") && !page.url?.includes("index.astro"),
  );

  const prefix = import.meta.env.DEV ? "/" : "/blog";

  const posts = [
    ...markdownPosts.map((post: any) => ({
      url: `${prefix}${prefix === "/" ? "" : "/"}${post.slug}`,
      updatedAt: new Date(post.data.updatedAt),
      image: post.data.image,
    })),
    ...pages.map((page: any) => ({
      url: `${prefix === "/" ? "" : prefix}${page.url}`,
      updatedAt: new Date((page as any).data.updatedAt),
      image: (page as any).data.image,
    })),
  ];

  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const urls = posts
    .map(
      (post) => `
    <url>
      <loc>${site}${post.slug}</loc>
      <lastmod>${post.createdAt}</lastmod>
    </url>
  `,
    )
    .join("");

  return {
    body: `<?xml version="1.0" encoding="UTF-8"?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${urls}
    </urlset>`,
    headers: { "Content-Type": "application/xml" },
  };
}
