// app/sitemap.xml/route.js
import { NextResponse } from "next/server";

const API_URL = "https://backend.globalbizreport.com/companies-directory/india"; // update this if needed
const PER_PAGE = 20;
const PAGES_PER_SITEMAP = 50; // each sitemap contains 50 pages (1,000 companies)

export async function GET() {
    try {
        // Get total company count from backend
        const res = await fetch(API_URL, { next: { revalidate: 86400 } });
        const data = await res.json();
        const totalCompanies = data.total || 0;

        const totalPages = Math.ceil(totalCompanies / PER_PAGE);
        const totalSitemaps = Math.ceil(totalPages / PAGES_PER_SITEMAP);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        for (let i = 1; i <= totalSitemaps; i++) {
            xml += `  <sitemap>\n`;
            xml += `    <loc>https://www.globalbizreport.com/sitemaps/sitemap-${i}.xml</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `  </sitemap>\n`;
        }

        xml += `</sitemapindex>`;

        return new NextResponse(xml, {
            headers: { "Content-Type": "application/xml" },
        });
    } catch (error) {
        console.log("Error generating sitemap index:", error);
        return NextResponse.json({ error: "Failed to generate sitemap index" }, { status: 500 });
    }
}
