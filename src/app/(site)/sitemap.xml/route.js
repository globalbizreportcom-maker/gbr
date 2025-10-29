// app/sitemap.xml/route.js
import { NextResponse } from "next/server";

export async function GET() {
    // Suppose you have total 200 companies, 20 per page
    const totalCompanies = 200;
    const perPage = 20;
    const totalPages = Math.ceil(totalCompanies / perPage);
    const sitemaps = Math.ceil(totalPages / 10); // e.g. 10 pages per sitemap file

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (let i = 1; i <= sitemaps; i++) {
        xml += `  <sitemap>\n`;
        xml += `    <loc>https://www.globalbizreport.com/sitemaps/sitemap-${i}.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `  </sitemap>\n`;
    }

    xml += `</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
