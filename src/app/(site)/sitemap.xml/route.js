

// import { NextResponse } from "next/server";

// const API_URL = "https://backend.globalbizreport.com/companies-directory/?page=1";
// const PAGES_PER_SITEMAP = 100; // backend pages per sitemap

// export async function GET() {
//     try {
//         const res = await fetch(API_URL, { next: { revalidate: 86400 } });
//         const data = await res.json();
//         const totalPages = data.totalPages || 0;
//         const totalSitemaps = Math.ceil(totalPages / PAGES_PER_SITEMAP);

//         let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//         xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//         // ✅ Add static sitemap first
//         xml += `  <sitemap>\n`;
//         xml += `    <loc>https://www.globalbizreport.com/sitemaps/static</loc>\n`;
//         xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
//         xml += `  </sitemap>\n`;

//         // ✅ Add dynamic company sitemaps
//         for (let i = 1; i <= totalSitemaps; i++) {
//             xml += `  <sitemap>\n`;
//             xml += `    <loc>https://www.globalbizreport.com/sitemaps/sitemap/${i}</loc>\n`;
//             xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
//             xml += `  </sitemap>\n`;
//         }

//         xml += `</sitemapindex>`;

//         return new NextResponse(xml, {
//             headers: { "Content-Type": "application/xml" },
//         });
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: "Failed to generate sitemap index" }, { status: 500 });
//     }
// }



import { NextResponse } from "next/server";

const META_URL = "https://backend.globalbizreport.com/companies-meta"; // your meta endpoint
const BASE_URL = "https://www.globalbizreport.com";
const PAGES_PER_SITEMAP = 100; // backend pages per sitemap

export async function GET() {
    try {
        // ✅ Get total pages from meta endpoint
        const res = await fetch(META_URL, { next: { revalidate: 86400 } });
        const data = await res.json();
        const totalPages = data.totalPages || 0;

        // ✅ Calculate total sitemaps
        const totalSitemaps = Math.ceil(totalPages / PAGES_PER_SITEMAP);

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // ✅ Add static sitemap first
        xml += `  <sitemap>\n`;
        xml += `    <loc>${BASE_URL}/sitemaps/static</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `  </sitemap>\n`;

        // ✅ Add dynamic sitemaps
        for (let i = 1; i <= totalSitemaps; i++) {
            xml += `  <sitemap>\n`;
            xml += `    <loc>${BASE_URL}/sitemaps/sitemap/${i}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `  </sitemap>\n`;
        }

        xml += `</sitemapindex>`;

        return new NextResponse(xml, {
            headers: { "Content-Type": "application/xml" },
        });
    } catch (err) {
        console.error("Sitemap index error:", err);
        return NextResponse.json({ error: "Failed to generate sitemap index" }, { status: 500 });
    }
}
