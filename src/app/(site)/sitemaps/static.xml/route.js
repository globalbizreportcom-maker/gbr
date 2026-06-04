import { NextResponse } from "next/server";

export async function GET() {
    // Dynamically uses your public site URL, falling back to localhost for local testing
    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.globalbizreport.com';

    const staticPaths = [
        "/",
        "/about",
        "/company-directory/india",
        "/services",
        "/pricing",
        "/contact",
        "/register",
        "/order-business-credit-report",
        "/login",
        "/terms",
        "/privacy-policy",
        "/refund-policy",
        "/shipping-policy",
    ];

    const currentIsoDate = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPaths.forEach((path) => {
        // Formats the absolute URL cleanly without breaking double slashes
        const absoluteUrl = `${domain.replace(/\/$/, '')}${path}`;

        xml += `  <url>\n`;
        xml += `    <loc>${absoluteUrl}</loc>\n`;
        xml += `    <lastmod>${currentIsoDate}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400, s-maxage=86400"
        },
    });
}