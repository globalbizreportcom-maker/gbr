
import { NextResponse } from "next/server";

const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 10000;

function cleanUrlSegment(text) {
    if (!text) return "na";
    return text
        .toString()
        .replace(/\s+/g, "-")           // Spaces to hyphens
        .replace(/&/g, "AND")           // Convert raw '&' or '%26' cleanly to 'AND'
        .replace(/[^a-zA-Z0-9\-]/g, "") // Strip brackets, dots, and trailing punctuation completely
        .toLowerCase();                 // Force lowercase for standard web conventions
}


export async function GET(req, context) {
    const sitemapId = Number(context.params.id);

    if (!Number.isInteger(sitemapId) || sitemapId < 1) {
        return new NextResponse("Invalid sitemap ID", { status: 400 });
    }

    try {
        // Calculate the starting lastId for this page
        const lastId = (sitemapId - 1) * URLS_PER_SITEMAP;

        // Fetch 10,000 comp anies after lastId
        const res = await fetch(`${BACKEND_URL}?lastId=${lastId}&perPage=${URLS_PER_SITEMAP}`, {
            cache: "no-store",
        });
        const data = await res.json();

        if (!data.rows || !data.rows.length) {
            return new NextResponse("No data", { status: 404 });
        }

        // Generate sitemap XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;


        for (const c of data.rows) {
            const name = cleanUrlSegment(c.companyname);
            const cin = c.cin;
            const country = cleanUrlSegment(c.CompanyIndian?.["Foreign Company"] || c["CompanyIndian/Foreign Company"] || 'india');
            const state = cleanUrlSegment(c.companystatecode);

            const fullPath = `https://www.globalbizreport.com/${name}/${cin}/${country}/${state}/company-business-financial-credit-report`;

            xml += `  <url>\n    <loc>${fullPath}</loc>\n  </url>\n`;
        }

        xml += `</urlset>`;

        return new NextResponse(xml, {
            headers: { "Content-Type": "application/xml" },
        });
    } catch (err) {
        console.error(err);
        return new NextResponse("Server error", { status: 500 });
    }
}















// import { NextResponse } from "next/server";

// const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 10000;

// // Centralized cleaning engine to ensure perfect data alignment
// function cleanUrlSegment(text, type = "lowercase") {
//     if (!text) return "na";
//     const clean = text
//         .toString()
//         .replace(/\s+/g, "-")           // Spaces to hyphens
//         .replace(/&/g, "AND")           // Convert raw '&' or '%26' safely to 'AND'
//         .replace(/[^a-zA-Z0-9\-]/g, ""); // Strip brackets, dots, commas completely

//     return type === "uppercase" ? clean.toUpperCase() : clean.toLowerCase();
// }

// export async function GET(req, context) {
//     // 1. With catch-all routing, context.params.id handles arrays natively (e.g., ["sitemap-7.xml"])
//     const idArray = context.params?.id;

//     if (!idArray || idArray.length === 0) {
//         return new NextResponse("Sitemap chunk target not specified", { status: 404 });
//     }

//     // 2. Clean the incoming request string down to an actual index number
//     const rawParam = idArray[0]; // Gets "sitemap-7.xml" or "7.xml"
//     const cleanNumberString = rawParam.replace("sitemap-", "").replace(".xml", "");
//     const sitemapId = Number(cleanNumberString);

//     // 3. Fallback check for typing mistakes in the address bar
//     if (!Number.isInteger(sitemapId) || sitemapId < 1) {
//         return new NextResponse("Invalid sitemap ID configuration", { status: 400 });
//     }

//     try {
//         // Calculate pagination offset
//         const lastId = (sitemapId - 1) * URLS_PER_SITEMAP;

//         // Fetch 10,000 companies using cursor limits
//         const res = await fetch(`${BACKEND_URL}?lastId=${lastId}&perPage=${URLS_PER_SITEMAP}`, {
//             cache: "no-store",
//         });
//         const data = await res.json();

//         if (!data.rows || !data.rows.length) {
//             return new NextResponse("No company dataset matches this range", { status: 404 });
//         }

//         // Generate clean sub-sitemap XML structure
//         let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//         xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//         for (const c of data.rows) {
//             const name = cleanUrlSegment(c.companyname, "lowercase");
//             const cin = cleanUrlSegment(c.cin, "uppercase"); // Keeps your CIN safely uppercase
//             const country = cleanUrlSegment(c.CompanyIndian?.["Foreign Company"] || c["CompanyIndian/Foreign Company"] || 'india', "lowercase");
//             const state = cleanUrlSegment(c.companystatecode, "lowercase");

//             // Generates perfectly sanitized literal URLs
//             const fullPath = `${BASE_URL}/${name}/${cin}/${country}/${state}/company-business-financial-credit-report`;

//             xml += `  <url>\n    <loc>${fullPath}</loc>\n  </url>\n`;
//         }

//         xml += `</urlset>`;

//         return new NextResponse(xml, {
//             headers: {
//                 "Content-Type": "application/xml",
//                 "Cache-Control": "public, max-age=43200, stale-while-revalidate=3600" // Cache for 12 hours
//             },
//         });
//     } catch (err) {
//         console.error(`Sitemap chunk ${sitemapId} compilation failed:`, err);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }