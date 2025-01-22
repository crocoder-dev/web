import { getCollection } from "astro:content";

export async function get({ site }: { site: any }) {
  const markdownPosts = await getCollection("posts");

  const prefix = import.meta.env.DEV ? "/" : "/blog";

  const posts = [
    ...markdownPosts.map((post: any) => ({
      slug: `${prefix}${prefix === "/" ? "" : "/"}${post.slug}`,
      updatedAt: post.data.updatedAt
        ? new Date(post.data.updatedAt)
        : new Date(),
      image: post.data.image,
    })),
  ];

  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const urls = posts
    .map(
      (post) => `
    <url>
      <loc>${site}${post.slug}</loc>
      <lastmod>${post.createdAt}</lastmod>
      ${
        post.image
          ? `
          <image:image>
            <image:loc>${post.image}</image:loc>
          </image:image>`
          : ""
      }
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
