// import { NextResponse } from "next/server";

// const META_URL = "https://backend.globalbizreport.com/companies-meta";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 10000;

// export async function GET() {
//   try {
//     const metaRes = await fetch(META_URL, {
//       next: { revalidate: 86400 }, // cache 1 day
//     });

//     if (!metaRes.ok) {
//       throw new Error("Failed to fetch meta");
//     }

//     const metaData = await metaRes.json();

//     const totalUrls = metaData.total || 0;
//     const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP);

//     let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//     xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//     // Static sitemap
//     xml += `
// <sitemap>
//   <loc>${BASE_URL}/sitemaps/static</loc>
//   <lastmod>${new Date().toISOString()}</lastmod>
// </sitemap>\n`;

//     // Dynamic sitemaps
//     for (let i = 1; i <= totalSitemaps; i++) {
//       xml += `
// <sitemap>
//   <loc>${BASE_URL}/sitemaps/sitemap/${i}</loc>
//   <lastmod>${new Date().toISOString()}</lastmod>
// </sitemap>\n`;
//     }

//     xml += `</sitemapindex>`;

//     return new NextResponse(xml, {
//       headers: {
//         "Content-Type": "application/xml",
//         // "Cache-Control":
//         //   "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
//       },
//     });
//   } catch (err) {
//     console.error("Sitemap index error:", err);
//     return new NextResponse("Error generating sitemap", { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";

// const META_URL = "https://backend.globalbizreport.com/companies-meta";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 2000;

// export async function GET() {
//   try {
//     const metaRes = await fetch(META_URL, {
//       next: { revalidate: 86400 }, // Cache on Next.js server for 24 hours
//     });

//     if (!metaRes.ok) {
//       throw new Error("Failed to fetch meta data from backend");
//     }

//     const metaData = await metaRes.json();
//     const totalUrls = metaData.total || 0;
//     const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP);

//     // SEO Optimization: Use a stable date format (YYYY-MM-DD) for index files 
//     // to prevent Googlebot from seeing constant, meaningless by-the-second updates.
//     const optimizedToday = new Date().toISOString().split('T')[0];

//     let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//     xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//     // 1. Static Pages Entry
//     xml += `  <sitemap>\n`;
//     xml += `    <loc>${BASE_URL}/sitemaps/static.xml</loc>\n`;
//     xml += `    <lastmod>${optimizedToday}</lastmod>\n`;
//     xml += `  </sitemap>\n`;

//     // 2. Dynamic Chunked Entries
//     for (let i = 1; i <= totalSitemaps; i++) {
//       xml += `  <sitemap>\n`;
//       xml += `    <loc>${BASE_URL}/sitemaps/sitemap-${i}.xml</loc>\n`;
//       xml += `    <lastmod>${optimizedToday}</lastmod>\n`;
//       xml += `  </sitemap>\n`;
//     }

//     xml += `</sitemapindex>`;

//     return new NextResponse(xml, {
//       headers: {
//         "Content-Type": "application/xml",
//         // "X-Robots-Tag": "noindex", // Prevents the index container itself from messing up search results
//         "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
//       },
//     });
//   } catch (err) {
//     console.error("Sitemap index generation failed:", err);
//     return new NextResponse("Error generating sitemap index", { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

const META_URL = "https://backend.globalbizreport.com/companies-meta";
const BASE_URL = "https://www.globalbizreport.com";
const URLS_PER_SITEMAP = 2000;

export async function GET() {
  try {
    const metaRes = await fetch(META_URL, {
      next: { revalidate: 86400 }, // Cache the meta count for 24 hours
    });

    if (!metaRes.ok) {
      throw new Error("Failed to fetch meta data from backend");
    }

    const metaData = await metaRes.json();
    const totalUrls = metaData.total || 0;
    const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP);

    // Stable date format (YYYY-MM-DD) prevents Googlebot from seeing meaningless updates
    const optimizedToday = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static Pages Entry
    xml += `  <sitemap>\n`;
    xml += `    <loc>${BASE_URL}/sitemaps/static.xml</loc>\n`;
    xml += `    <lastmod>${optimizedToday}</lastmod>\n`;
    xml += `  </sitemap>\n`;

    // 2. Dynamic Chunked Entries
    for (let i = 1; i <= totalSitemaps; i++) {
      xml += `  <sitemap>\n`;
      xml += `    <loc>${BASE_URL}/sitemaps/sitemap-${i}.xml</loc>\n`;
      xml += `    <lastmod>${optimizedToday}</lastmod>\n`;
      xml += `  </sitemap>\n`;
    }

    xml += `</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("Sitemap index generation failed:", err);
    return new NextResponse("Error generating sitemap index", { status: 500 });
  }
}