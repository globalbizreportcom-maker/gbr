// app/sitemaps/sitemap-[id].xml/route.js
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    const sitemapId = parseInt(id, 10);
    const totalCompanies = 200;
    const perPage = 20;
    const totalPages = Math.ceil(totalCompanies / perPage);
    const pagesPerSitemap = 10;

    const startPage = (sitemapId - 1) * pagesPerSitemap + 1;
    const endPage = Math.min(sitemapId * pagesPerSitemap, totalPages);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (let page = startPage; page <= endPage; page++) {
        xml += `  <url>\n`;
        xml += `    <loc>https://www.globalbizreport.com/company-directory/india?page=${page}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
