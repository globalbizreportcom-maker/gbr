// import { NextResponse } from "next/server";

// const BASE_URL = "https://www.globalbizreport.com";
// const API_URL = "https://backend.globalbizreport.com/companies-directory/?page=1";
// const PAGES_PER_SITEMAP = 100;

// export async function GET() {
//     try {
//         // 🧩 1️⃣ Fetch total pages from backend
//         const res = await fetch(API_URL, { next: { revalidate: 86400 } });
//         const data = await res.json();
//         const totalPages = data.totalPages || 0;
//         const totalSitemaps = Math.ceil(totalPages / PAGES_PER_SITEMAP);

//         // 🧩 2️⃣ Build robots.txt content
//         let content = `
// User-agent: *
// Disallow: /admin/
// Allow: /

// # Site maps
// Sitemap: ${BASE_URL}/sitemaps/static
// Sitemap: ${BASE_URL}/company-directory/india
// `;

//         // 🧩 3️⃣ Add dynamic company sitemaps
//         for (let i = 1; i <= totalSitemaps; i++) {
//             content += `Sitemap: ${BASE_URL}/sitemaps/sitemap/${i}\n`;
//         }

//         return new NextResponse(content.trim(), {
//             headers: { "Content-Type": "text/plain" },
//         });
//     } catch (error) {
//         // 🧩 4️⃣ Fallback if backend fetch fails
//         const fallback = `
// User-agent: *
// Disallow: /admin/
// Allow: /

// # Fallback static sitemap only
// Sitemap: ${BASE_URL}/sitemaps/static
// `.trim();

//         return new NextResponse(fallback, {
//             headers: { "Content-Type": "text/plain" },
//         });
//     }
// }


import { NextResponse } from "next/server";

const BASE_URL = "https://www.globalbizreport.com";
const API_URL = "https://backend.globalbizreport.com/companies-meta";
const PAGES_PER_SITEMAP = 100;

export async function GET() {
    try {
        // 🧩 Fetch only meta info (lightweight)
        const res = await fetch(API_URL, { next: { revalidate: 86400 } });
        const data = await res.json();
        const totalPages = data.totalPages || 0;
        const totalSitemaps = Math.ceil(totalPages / PAGES_PER_SITEMAP);

        // 🧩 Construct robots.txt
        let content = `
User-agent: Googlebot
Disallow: /admin/
Allow: /

# Site maps
Sitemap: ${BASE_URL}/sitemaps/static
Sitemap: ${BASE_URL}/company-directory/india
`;

        for (let i = 1; i <= totalSitemaps; i++) {
            content += `Sitemap: ${BASE_URL}/sitemaps/sitemap/${i}\n`;
        }

        return new NextResponse(content.trim(), {
            headers: { "Content-Type": "text/plain" },
        });
    } catch (error) {
        // 🧩 Fallback version
        const fallback = `
User-agent: Googlebot
Disallow: /admin/
Allow: /

# Fallback static sitemap only
Sitemap: ${BASE_URL}/sitemaps/static
`.trim();

        return new NextResponse(fallback, {
            headers: { "Content-Type": "text/plain" },
        });
    }
}

