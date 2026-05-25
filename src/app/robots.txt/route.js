import { NextResponse } from "next/server";

export async function GET() {
    try {
        const content = `User-Agent: *
Allow: /

Sitemap: https://www.globalbizreport.com/sitemap.xml`;

        return new NextResponse(content, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                // "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
            },
        });
    } catch (err) {
        console.error("Robots.txt generation error:", err);

        const fallback = `User-Agent: *
Disallow: 

Sitemap: https://www.globalbizreport.com/sitemap.xml`;

        return new NextResponse(fallback, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    }
}


// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const content = `
// # Cloudflare / Custom robots.txt with content signals

// # Googlebot - allow search, AI training, AI input
// User-agent: Googlebot
// Content-signal: search=yes, ai-train=yes, ai-input=yes
// Disallow:

// # Googlebot-Image - allow search, AI training, AI input
// User-agent: Googlebot-Image
// Content-signal: search=yes, ai-train=yes, ai-input=yes
// Disallow:

// # Bingbot - allow search, AI training, AI input
// User-agent: Bingbot
// Content-signal: search=yes, ai-train=yes, ai-input=yes
// Disallow:

// # Block all other bots
// User-agent: *
// Disallow: /
// `;

//         return new NextResponse(content.trim(), {
//             headers: {
//                 "Content-Type": "text/plain",
//             },
//         });
//     } catch (err) {
//         console.error("Robots.txt generation error:", err);

//         const fallback = `
// # Googlebot - allow search, AI training, AI input
// User-agent: Googlebot
// Content-signal: search=yes, ai-train=yes, ai-input=yes
// Disallow:

// # Googlebot-Image - allow search, AI training, AI input
// User-agent: Googlebot-Image
// Content-signal: search=yes, ai-train=yes, ai-input=yes
// Disallow:

// # Bingbot - allow search, AI training, AI input
// User-agent: Bingbot
// Content-signal: search=yes, ai-train=yes, ai-input=yes
// Disallow:

// # Block all other bots
// User-agent: *
// Disallow: /
// `;

//         return new NextResponse(fallback.trim(), {
//             headers: { "Content-Type": "text/plain" },
//         });
//     }
// }
