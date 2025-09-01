import { getCollection } from "astro:content";

const siteUrl = "https://www.crocoder.dev";
const markdownPosts = await getCollection("posts");

const postImportResult = import.meta.glob("./blog/**/*.astro", { eager: true });
const pages = Object.values(postImportResult).filter(
  (page: any) =>
    !page.url?.includes("[") &&
    !page.url?.includes("index.astro") &&
    !(page.url === "/blog"),
);

export async function GET() {
  const currentDate = new Date();

  const generateUrlEntry = (
    url: string,
    lastmod: Date,
    priority: number,
    imageUrl?: string,
  ) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>
      <priority>${priority}</priority>
      <changefreq>monthly</changefreq>
      ${
        imageUrl
          ? `
          <image:image>
            <image:loc>${imageUrl}</image:loc>
          </image:image>`
          : ""
      }
    </url>
  `;

  const posts = [
    ...markdownPosts.map((post: any) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      updatedAt: post.data.updatedAt
        ? new Date(post.data.updatedAt)
        : currentDate,
      imageUrl: post.data.image ? `${siteUrl}${post.data.image}` : null,
    })),
    ...pages.map((post: any) => ({
      url: `${siteUrl}${post.url}`,
      updatedAt: post.data.updatedAt
        ? new Date(post.data.updatedAt)
        : currentDate,
      imageUrl: post.data.image ? `${siteUrl}${post.data.image}` : null,
    })),
  ];

  const staticUrls = [
    { path: "/", priority: 1 },
    { path: "/contact", priority: 1 },
    { path: "/blog", priority: 1 },
    { path: "/terms", priority: 1 },
  ];

  const sitemapEntries = [
    ...staticUrls.map((item) =>
      generateUrlEntry(`${siteUrl}${item.path}`, currentDate, item.priority),
    ),
    ...posts.map((post: any) =>
      generateUrlEntry(post.url, post.updatedAt, 1, post.imageUrl),
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${sitemapEntries.join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
