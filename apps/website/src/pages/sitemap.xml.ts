const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const blogUrl = import.meta.env.PUBLIC_BLOG_URL;

export async function GET() {

  const urls = [
    `<url>
      <loc>${siteUrl}</loc>
      <lastmod>${new Date()}</lastmod>
      <priority>1</priority>
    </url>`,
  ];
  if (blogUrl) {
    try {
      const blogSitemapRes = await fetch(`${blogUrl}/sitemap.xml`);
      if (blogSitemapRes.ok) {
        const blogSitemap = await blogSitemapRes.text();
        const blogUrls = blogSitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
        urls.push(...blogUrls);
      }
    } catch (error) {
      console.error('Error fetching blog sitemap:', error);
    }
  }

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${urls.join("")}
    </urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
