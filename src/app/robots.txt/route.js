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


// import { NextResponse } from "next/server";

// const META_URL = "https://backend.globalbizreport.com/companies-meta";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 2000;

// export async function GET() {
//     try {
//         const metaRes = await fetch(META_URL, { next: { revalidate: 86400 } });
//         const metaData = await metaRes.json();
//         const totalBackendPages = metaData.totalPages || 0;
//         const PER_PAGE = 20;

//         const totalUrls = totalBackendPages * PER_PAGE;
//         const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP);

//         // Build robots.txt content
//         let content = `
// User-agent: *
// Disallow: /admin/
// Allow: /

// # Static sitemaps
// Sitemap: ${BASE_URL}/sitemaps/static
// Sitemap: ${BASE_URL}/company-directory/india
// `;

//         // Add dynamic sitemaps
//         for (let i = 1; i <= totalSitemaps; i++) {
//             content += `Sitemap: ${BASE_URL}/sitemaps/sitemap/${i}\n`;
//         }

//         // Ensure final newline
//         content += "\n";

//         return new NextResponse(content.trim(), {
//             headers: { "Content-Type": "text/plain" },
//         });
//     } catch (err) {
//         console.error("Robots.txt generation error:", err);

//         // Fallback robots.txt
//         const fallback = `
// User-agent: *
// Disallow: /admin/
// Allow: /

// # Static sitemap only
// Sitemap: ${BASE_URL}/sitemaps/static
// `.trim();

//         return new NextResponse(fallback, {
//             headers: { "Content-Type": "text/plain" },
//         });
//     }
// }



import { NextResponse } from "next/server";

export async function GET() {
    try {
        const content = `
# Cloudflare / Custom robots.txt with content signals

# Googlebot - allow search, AI training, AI input
User-agent: Googlebot
Content-signal: search=yes, ai-train=yes, ai-input=yes
Disallow:

# Googlebot-Image - allow search, AI training, AI input
User-agent: Googlebot-Image
Content-signal: search=yes, ai-train=yes, ai-input=yes
Disallow:

# Bingbot - allow search, AI training, AI input
User-agent: Bingbot
Content-signal: search=yes, ai-train=yes, ai-input=yes
Disallow:

# Block all other bots
User-agent: *
Disallow: /
`;

        return new NextResponse(content.trim(), {
            headers: {
                "Content-Type": "text/plain",
            },
        });
    } catch (err) {
        console.error("Robots.txt generation error:", err);

        const fallback = `
# Googlebot - allow search, AI training, AI input
User-agent: Googlebot
Content-signal: search=yes, ai-train=yes, ai-input=yes
Disallow:

# Googlebot-Image - allow search, AI training, AI input
User-agent: Googlebot-Image
Content-signal: search=yes, ai-train=yes, ai-input=yes
Disallow:

# Bingbot - allow search, AI training, AI input
User-agent: Bingbot
Content-signal: search=yes, ai-train=yes, ai-input=yes
Disallow:

# Block all other bots
User-agent: *
Disallow: /
`;

        return new NextResponse(fallback.trim(), {
            headers: { "Content-Type": "text/plain" },
        });
    }
}
