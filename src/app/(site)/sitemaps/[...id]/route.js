
// import { NextResponse } from "next/server";

// const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 10000;

// function cleanUrlSegment(text) {
//     if (!text) return "na";
//     return text
//         .toString()
//         .replace(/\s+/g, "-")           // Spaces to hyphens
//         .replace(/&/g, "AND")           // Convert raw '&' or '%26' cleanly to 'AND'
//         .replace(/[^a-zA-Z0-9\-]/g, "") // Strip brackets, dots, and trailing punctuation completely
//         .toLowerCase();                 // Force lowercase for standard web conventions
// }


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
//             const name = cleanUrlSegment(c.companyname);
//             const cin = c.cin;
//             const country = cleanUrlSegment(c.CompanyIndian?.["Foreign Company"] || c["CompanyIndian/Foreign Company"] || 'india');
//             const state = cleanUrlSegment(c.companystatecode);

//             const fullPath = `https://www.globalbizreport.com/${name}/${cin}/${country}/${state}/company-business-financial-credit-report`;

//             xml += `  <url>\n    <loc>${fullPath}</loc>\n  </url>\n`;
//         }

//         xml += `</urlset>`;

//         return new NextResponse(xml, {
//             headers: { "Content-Type": "application/xml" },
//         });
//     } catch (err) {
//         console.error(err);
//         return new NextResponse("Server error", { status: 500 });
//     }
// }




import { NextResponse } from "next/server";

const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 10000;

function cleanUrlSegment(text, type = "lowercase") {
    if (!text) return "na";
    const clean = text
        .toString()
        .replace(/\s+/g, "-")
        .replace(/&/g, "AND")
        .replace(/[^a-zA-Z0-9\-]/g, "");

    return type === "uppercase" ? clean.toUpperCase() : clean.toLowerCase();
}

export async function GET(req, context) {
    // 1. Next.js Catch-all route handling (extract parameters cleanly)
    const idArray = await context.params?.id;

    if (!idArray || idArray.length === 0) {
        return new NextResponse("Sitemap chunk target not specified", { status: 404 });
    }

    const rawParam = idArray[0];

    // Direct bypass if the index asks for static entries
    if (rawParam === "static.xml") {
        return new NextResponse("Static pages layout configuration placeholder", { status: 501 });
    }

    const cleanNumberString = rawParam.replace("sitemap-", "").replace(".xml", "");
    const sitemapId = Number(cleanNumberString);

    if (!Number.isInteger(sitemapId) || sitemapId < 1) {
        return new NextResponse("Invalid sitemap ID configuration", { status: 400 });
    }

    try {
        const lastId = (sitemapId - 1) * URLS_PER_SITEMAP;

        // Fetch data array from backend API
        const res = await fetch(`${BACKEND_URL}?lastId=${lastId}&perPage=${URLS_PER_SITEMAP}`, {
            cache: "no-store",
        });
        const data = await res.json();

        if (!data.rows || !data.rows.length) {
            return new NextResponse("No company dataset matches this range", { status: 404 });
        }

        // Base date to use if individual items lack their own unique update timestamps
        const generalizedToday = new Date().toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        for (const c of data.rows) {
            const name = cleanUrlSegment(c.companyname, "lowercase");
            const cin = cleanUrlSegment(c.cin, "uppercase");
            const country = cleanUrlSegment(c.CompanyIndian?.["Foreign Company"] || c["CompanyIndian/Foreign Company"] || 'india', "lowercase");
            const state = cleanUrlSegment(c.companystatecode, "lowercase");

            const fullPath = `${BASE_URL}/${name}/${cin}/${country}/${state}/company-business-financial-credit-report`;

            // SEO Optimization: Safely parse a real modification date if your database provides one,
            // otherwise use a clean date string instead of a highly unstable raw timestamp.
            const recordDate = c.updatedAt || c.last_modified;
            const finalLastMod = recordDate ? new Date(recordDate).toISOString().split('T')[0] : generalizedToday;

            xml += `  <url>\n`;
            xml += `    <loc>${fullPath}</loc>\n`;
            xml += `    <lastmod>${finalLastMod}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`; // Deep directory profiles typically update monthly
            xml += `    <priority>0.6</priority>\n`;       // Secondary directory pages sit naturally at 0.5 - 0.6
            xml += `  </url>\n`;
        }

        xml += `</urlset>`;

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml",
                // "X-Robots-Tag": "noindex", // Directs engine crawlers to parse links but skip indexing the raw code output
                "Cache-Control": "public, max-age=43200, stale-while-revalidate=3600"
            },
        });
    } catch (err) {
        console.error(`Sitemap chunk ${sitemapId} compilation failed:`, err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}