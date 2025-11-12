// import { NextResponse } from "next/server";

// const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory/?page=";
// const BASE_URL = "https://www.globalbizreport.com";
// const PAGES_PER_SITEMAP = 100; // adjust as needed (each sitemap = 2000 URLs if 20 per page)
// const PER_PAGE = 20;

// export async function GET(req, { params }) {
//     const { id } = params;
//     const sitemapId = parseInt(id, 10);

//     if (isNaN(sitemapId) || sitemapId < 1) {
//         return new NextResponse("Invalid sitemap ID", { status: 400 });
//     }

//     try {
//         // 1️⃣ Get total pages
//         const infoRes = await fetch(`${BACKEND_URL}1`, { next: { revalidate: 86400 } });
//         const infoData = await infoRes.json();
//         const totalPages = infoData.totalPages || 0;

//         const startPage = (sitemapId - 1) * PAGES_PER_SITEMAP + 1;
//         const endPage = Math.min(sitemapId * PAGES_PER_SITEMAP, totalPages);

//         if (startPage > totalPages) {
//             return new NextResponse("Sitemap not found", { status: 404 });
//         }

//         // 2️⃣ Fetch all pages in parallel
//         const pageFetches = [];
//         for (let p = startPage; p <= endPage; p++) {
//             pageFetches.push(fetch(`${BACKEND_URL}${p}`, { next: { revalidate: 86400 } }).then(r => r.json()));
//         }

//         const results = await Promise.all(pageFetches);
//         const allCompanies = results.flatMap(r => r.rows || []);

//         // 3️⃣ Build XML
//         let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//         xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//         allCompanies.forEach((c) => {
//             const name = encodeURIComponent(c.CompanyName?.replace(/\s+/g, "-").toUpperCase());
//             const cin = encodeURIComponent(c.CIN || "");
//             // const state = encodeURIComponent(c.CompanyStateCode?.toLowerCase() || "unknown");
//             const state = encodeURIComponent(
//                 (c.CompanyStateCode?.toLowerCase().replace(/\s+/g, "_")) || "unknown"
//             );

//             const url = `${BASE_URL}/${name}/${cin}/india/${state}/company-business-financial-credit-report`;

//             xml += `  <url>\n`;
//             xml += `    <loc>${url}</loc>\n`;
//             xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
//             xml += `    <changefreq>weekly</changefreq>\n`;
//             xml += `    <priority>0.8</priority>\n`;
//             xml += `  </url>\n`;
//         });

//         xml += `</urlset>`;

//         return new NextResponse(xml, {
//             headers: { "Content-Type": "application/xml" },
//         });

//     } catch (err) {
//         return new NextResponse("Failed to generate sitemap", { status: 500 });
//     }
// }


import { NextResponse } from "next/server";

const BACKEND_URL = "https://backend.globalbizreport.com/companies-directory/";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 2000;

export async function GET(req, context) {
    const params = await context.params;
    console.log(params.id);
    const sitemapId = parseInt(params.id, 10);

    if (isNaN(sitemapId) || sitemapId < 1) {
        return new NextResponse("Invalid sitemap ID", { status: 400 });
    }

    try {
        const offset = (sitemapId - 1) * URLS_PER_SITEMAP;
        const url = `${BACKEND_URL}?perPage=${URLS_PER_SITEMAP}&offset=${offset}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.rows || data.rows.length === 0) {
            return new NextResponse("Sitemap not found", { status: 404 });
        }

        // Build XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        data.rows.forEach(c => {
            const name = encodeURIComponent(c.CompanyName?.replace(/\s+/g, "-").toUpperCase());
            const cin = encodeURIComponent(c.CIN || "");
            const state = encodeURIComponent((c.CompanyStateCode?.toLowerCase().replace(/\s+/g, "_")) || "unknown");

            xml += `  <url>\n`;
            xml += `    <loc>${BASE_URL}/${name}/${cin}/india/${state}/company-business-financial-credit-report</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;

        return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });

    } catch (err) {
        console.error("Sitemap generation error:", err);
        return new NextResponse("Failed to generate sitemap", { status: 500 });
    }
}

