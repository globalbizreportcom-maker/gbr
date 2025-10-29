import { NextResponse } from "next/server";

const API_URL = "https://backend.globalbizreport.com/companies-directory";
const PER_PAGE = 20;
const PAGES_PER_SITEMAP = 500; // 500 pages × 20 companies = 10,000 URLs per sitemap

// utility: slugify company name for SEO-friendly URLs
function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export async function GET(request, { params }) {
    const sitemapId = parseInt(params.id);
    if (isNaN(sitemapId) || sitemapId < 1)
        return NextResponse.json({ error: "Invalid sitemap ID" }, { status: 400 });

    const startPage = (sitemapId - 1) * PAGES_PER_SITEMAP + 1;
    const endPage = sitemapId * PAGES_PER_SITEMAP;

    let urls = [];

    for (let page = startPage; page <= endPage; page++) {
        try {
            const res = await fetch(`${API_URL}?page=${page}`, { next: { revalidate: 86400 } }); // cache 1 day
            const data = await res.json();
            if (!data.rows || !data.rows.length) break;

            const pageUrls = data.rows.map((company) => {
                const companySlug = slugify(company.CompanyName);
                const stateSlug = encodeURIComponent(company.CompanyStateCode || "unknown");

                const companyUrl = `https://www.globalbizreport.com/${companySlug}/${company.CIN}/india/${stateSlug}/company-business-financial-credit-report`;

                return `
        <url>
          <loc>${companyUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>`;
            });

            urls.push(...pageUrls);
        } catch (err) {
            console.error(`Error fetching page ${page}:`, err);
        }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
