import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Prevents 404 static generation bugs

const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 10000;

export async function GET(req, context) {
    try {
        // Await params first to comply with Next.js standards
        const params = await context.params;

        // Strip the trailing ".xml" from the incoming route parameter string
        const cleanId = params.id.replace(/\.xml$/, "");
        const sitemapId = Number(cleanId);

        if (!Number.isInteger(sitemapId) || sitemapId < 1) {
            return new NextResponse(`Invalid sitemap ID: ${params.id}`, { status: 400 });
        }

        // Calculate the starting lastId for this page
        const lastId = (sitemapId - 1) * URLS_PER_SITEMAP;

        // Fetch 10,000 companies after lastId
        const res = await fetch(`${BACKEND_URL}?lastId=${lastId}&perPage=${URLS_PER_SITEMAP}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return new NextResponse("Failed to fetch data from backend", { status: 502 });
        }

        const data = await res.json();

        if (!data.rows || !data.rows.length) {
            return new NextResponse("No data found for this range", { status: 404 });
        }

        // Generate sitemap XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        for (const c of data.rows) {
            const name = encodeURIComponent(c.companyname?.replace(/\s+/g, "-").toUpperCase() || "");
            const cin = encodeURIComponent(c.cin || "");
            const state = encodeURIComponent(c.companystatecode?.toLowerCase().replace(/\s+/g, "_") || "unknown");

            xml += `<url><loc>${BASE_URL}/${name}/${cin}/india/${state}/company-business-financial-credit-report</loc></url>\n`;
        }

        xml += `</urlset>`;

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=43200, s-maxage=43200, stale-while-revalidate=3600" // Cache 12 hours
            },
        });
    } catch (err) {
        console.error("Sitemap execution error:", err);
        return new NextResponse("Server error", { status: 500 });
    }
}














// import { NextResponse } from "next/server";

// const BACKEND_URL = "http://localhost:5000/companies-directory";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 10000;

// export async function GET(req, context) {
//     const sitemapId = Number(context.params.id);

//     if (!Number.isInteger(sitemapId) || sitemapId < 1) {
//         return new NextResponse("Invalid sitemap ID", { status: 400 });
//     }

//     try {
//         // Calculate the starting lastId for this page
//         const lastId = (sitemapId - 1) * URLS_PER_SITEMAP;

//         // Fetch 10,000 comp anies after lastId
//         const res = await fetch(`${BACKEND_URL}?lastId=${lastId}&perPage=${URLS_PER_SITEMAP}`, {
//             cache: "no-store",
//         });
//         const data = await res.json();

//         if (!data.rows || !data.rows.length) {
//             return new NextResponse("No data", { status: 404 });
//         }

//         // Generate sitemap XML
//         let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//         xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//         for (const c of data.rows) {
//             const name = encodeURIComponent(c.companyname?.replace(/\s+/g, "-").toUpperCase());
//             const cin = encodeURIComponent(c.cin || "");
//             const state = encodeURIComponent(c.companystatecode?.toLowerCase().replace(/\s+/g, "_") || "unknown");

//             xml += `<url><loc>${BASE_URL}/${name}/${cin}/india/${state}/company-business-financial-credit-report</loc></url>\n`;
//         }

//         xml += `</urlset>`;

//         return new NextResponse(xml, {
//             headers: { "Content-Type": "application/xml" },
//             "Cache-Control": "public, max-age=43200, stale-while-revalidate=3600" // Cache 12 hours
//         });
//     } catch (err) {
//         console.error(err);
//         return new NextResponse("Server error", { status: 500 });
//     }
// }