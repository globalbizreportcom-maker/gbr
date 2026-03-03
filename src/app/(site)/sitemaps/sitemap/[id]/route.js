import { NextResponse } from "next/server";

const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 10000;

export async function GET(req, context) {
    const sitemapId = Number(context.params.id);

    if (!Number.isInteger(sitemapId) || sitemapId < 1) {
        return new NextResponse("Invalid sitemap ID", { status: 400 });
    }

    try {
        const offset = (sitemapId - 1) * URLS_PER_SITEMAP;

        const res = await fetch(
            `${BACKEND_URL}?perPage=${URLS_PER_SITEMAP}&offset=${offset}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return new NextResponse("Backend error", { status: 500 });
        }

        const data = await res.json();

        if (!data.rows || data.rows.length === 0) {
            return new NextResponse("No data", { status: 404 });
        }

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        for (const c of data.rows) {
            const name = encodeURIComponent(
                c.CompanyName?.replace(/\s+/g, "-").toUpperCase()
            );

            const cin = encodeURIComponent(c.CIN || "");

            const state = encodeURIComponent(
                c.CompanyStateCode?.toLowerCase().replace(/\s+/g, "_") || "unknown"
            );

            xml += `
<url>
  <loc>${BASE_URL}/${name}/${cin}/india/${state}/company-business-financial-credit-report</loc>
</url>\n`;
        }

        xml += `</urlset>`;

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml",
            },
        });

    } catch (err) {
        console.error(err);
        return new NextResponse("Server error", { status: 500 });
    }
}