import { NextResponse } from "next/server";

const META_URL = "https://backend.globalbizreport.com/companies-meta";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 10000;

export async function GET() {
  try {
    const metaRes = await fetch(META_URL, {
      next: { revalidate: 86400 }, // cache 1 day
    });

    if (!metaRes.ok) {
      throw new Error("Failed to fetch meta");
    }

    const metaData = await metaRes.json();

    const totalUrls = metaData.total || 0;
    const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static sitemap
    xml += `
<sitemap>
  <loc>${BASE_URL}/sitemaps/static</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</sitemap>\n`;

    // Dynamic sitemaps
    for (let i = 1; i <= totalSitemaps; i++) {
      xml += `
<sitemap>
  <loc>${BASE_URL}/sitemaps/sitemap/${i}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</sitemap>\n`;
    }

    xml += `</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("Sitemap index error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}