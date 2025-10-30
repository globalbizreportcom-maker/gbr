import { NextResponse } from "next/server";

export async function GET() {
    const staticUrls = [
        "https://www.globalbizreport.com/",
        "https://www.globalbizreport.com/about",
        "https://www.globalbizreport.com/company-directory/india",
        "https://www.globalbizreport.com/services",
        "https://www.globalbizreport.com/pricing",
        "https://www.globalbizreport.com/contact",
        "https://www.globalbizreport.com/register",
        "https://www.globalbizreport.com/order-business-credit-report",
        "https://www.globalbizreport.com/login",
        "https://www.globalbizreport.com/terms",
        "https://www.globalbizreport.com/privacy-policy",
        "https://www.globalbizreport.com/refund-policy",
        "https://www.globalbizreport.com/shipping-policy",
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticUrls.forEach((url) => {
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
