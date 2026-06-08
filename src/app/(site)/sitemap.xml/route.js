// import { NextResponse } from "next/server";

// const META_URL = "https://backend.globalbizreport.com/companies-meta";
// const BASE_URL = "https://www.globalbizreport.com";
// const URLS_PER_SITEMAP = 2000;

// export async function GET() {
//   try {
//     const metaRes = await fetch(META_URL, {
//       next: { revalidate: 86400 }, // Cache the meta count for 24 hours
//     });

//     if (!metaRes.ok) {
//       throw new Error("Failed to fetch meta data from backend");
//     }

//     const metaData = await metaRes.json();
//     const totalUrls = metaData.total || 0;
//     const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP);

//     // Stable date format (YYYY-MM-DD) prevents Googlebot from seeing meaningless updates
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
//         "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
//       },
//     });
//   } catch (err) {
//     console.error("Sitemap index generation failed:", err);
//     return new NextResponse("Error generating sitemap index", { status: 500 });
//   }
// }

// app/sitemap.xml/route.js

import { NextResponse } from 'next/server';
import { cleanUrlSegment } from '@/utils/slugify';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman & Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export async function GET() {

  const xmlItems = STATES.map(state => {
    const stateSlug = cleanUrlSegment(state);
    return `
    <sitemap>
        <loc>https://www.globalbizreport.com/directory/${stateSlug}/sitemap.xml</loc>
    </sitemap>`;
  }).join('');

  // 2. Wrap BOTH your static map link and dynamic items inside the root index mapping node [cite: 1652]
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://www.globalbizreport.com/sitemaps/static.xml</loc>
    </sitemap>
    ${xmlItems}
</sitemapindex>`;

  return new NextResponse(sitemapIndexXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600'
    }
  });
}


