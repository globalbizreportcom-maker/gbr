import { NextResponse } from 'next/server';
import { apiUrl } from '@/api/api';
import { cleanUrlSegment } from '@/utils/slugify';

const INDUSTRIES = [
    "agriculture-and-allied-activities", "business-services", "community-personal-and-social-services",
    "construction", "electricity-gas-and-water-companies", "finance", "insurance",
    "manufacturing-food-stuffs", "manufacturing-leather-and-products-thereof",
    "manufacturing-machinery-and-equipments", "manufacturing-metals-and-chemicals-and-products-thereof",
    "manufacturing-others", "manufacturing-paper-and-paper-products-publishing-printing-and-reproduction-of-recorded-media",
    "manufacturing-textiles", "manufacturing-wood-products", "mining-and-quarrying",
    "others", "real-estate-and-renting", "trading", "transport-storage-and-communications"
];

export async function GET(request, { params }) {
    const { state } = await params;

    let xmlUrls = [];

    try {
        // 1. Loop over industries to crawl structural pagination nodes
        for (const industry of INDUSTRIES) {
            // Ping your backend API to fetch pagination limits for this partition matrix
            const response = await fetch(`https://backend.globalbizreport.com/state/directory/${state}/${industry}?page=1`, {
                next: { revalidate: 86400 } // Cache API metadata check for 24 hours
            });

            if (response.ok) {
                const data = await response.json();
                const totalPages = data.totalPages || 1;

                // 2. Add the pagination link variants to the sitemap tree
                for (let i = 1; i <= totalPages; i++) {
                    xmlUrls.push(`
    <url>
        <loc>https://www.globalbizreport.com/directory/${state}/${industry}?page=${i}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`);
                }
            }
        }
    } catch (error) {
        console.error(`Sitemap generation error for state ${state}:`, error);
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlUrls.join('')}
</urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=43200, s-maxage=43200'
        }
    });
}