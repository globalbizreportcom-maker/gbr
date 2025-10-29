// app/sitemaps/sitemap-[id].xml/route.js
import { NextResponse } from "next/server";

const PER_PAGE = 20;
const PAGES_PER_SITEMAP = 50; // number of pagination pages per sitemap
const BASE_URL = "https://www.globalbizreport.com/company-directory/india";

export async function GET(req, { params }) {
    const { id } = params;
    const sitemapId = parseInt(id, 10);

    if (isNaN(sitemapId) || sitemapId < 1) {
        return new NextResponse("Invalid sitemap ID", { status: 400 });
    }

    try {
        // Optionally get total pages from backend
        const res = await fetch("https://backend.globalbizreport.com/companies-directory/count", { next: { revalidate: 86400 } });
        const data = await res.json();
        const totalCompanies = data.total || 0;
        const totalPages = Math.ceil(totalCompanies / PER_PAGE);

        const startPage = (sitemapId - 1) * PAGES_PER_SITEMAP + 1;
        const endPage = Math.min(sitemapId * PAGES_PER_SITEMAP, totalPages);

        // If sitemap ID exceeds total pages
        if (startPage > totalPages) {
            return new NextResponse("Sitemap not found", { status: 404 });
        }

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        for (let page = startPage; page <= endPage; page++) {
            xml += `  <url>\n`;
            xml += `    <loc>${BASE_URL}?page=${page}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            xml += `  </url>\n`;
        }

        xml += `</urlset>`;

        return new NextResponse(xml, {
            headers: { "Content-Type": "application/xml" },
        });
    } catch (error) {
        console.error(`Error generating sitemap-${id}.xml:`, error);
        return new NextResponse("Failed to generate sitemap", { status: 500 });
    }
}
