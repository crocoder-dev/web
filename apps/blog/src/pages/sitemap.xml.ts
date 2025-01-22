import { getCollection } from "astro:content";
const markdownPosts = await getCollection("posts");

export function GET() {
  const prefix = import.meta.env.DEV ? "/" : "/blog";

  const siteUrl = import.meta.env.SITE_URL + (prefix === "/" ? "" : prefix);

  const posts = [
    ...markdownPosts.map((post: any) => ({
      url: `${siteUrl}${prefix}${prefix === "/" ? "" : "/"}${post.slug}`,
      createdAt: post.data.createdAt
        ? new Date(post.data.createdAt)
        : new Date(),
      imageUrl: `${siteUrl}${post.data.image}`,
    })),
  ];

  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const urls = posts
    .map(
      (post) => `
    <url>
      <loc>${post.url}</loc>
      <lastmod>${post.createdAt}</lastmod>
      ${
        post.image
          ? `
          <image:image>
            <image:loc>${post.imageUrl}</image:loc>
          </image:image>`
          : ""
      }
      <priority>1</priority>
    </url>
  `,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${urls}
    </urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
