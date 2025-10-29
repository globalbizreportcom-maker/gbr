import { NextResponse } from "next/server";

export async function GET() {
    const totalPages = 136179; // from your backend
    const batchSize = 500; // each sitemap covers 500 API pages (10,000 companies)
    const totalSitemaps = Math.ceil(totalPages / batchSize);

    const sitemaps = Array.from({ length: totalSitemaps }, (_, i) => `
    <sitemap>
      <loc>https://www.globalbizreport.com/sitemaps/sitemap-${i + 1}.xml</loc>
    </sitemap>`).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps}
  </sitemapindex>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
