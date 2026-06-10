// src\app\(site)\directory\[state]\sitemap.xml\route.js
import { NextResponse } from 'next/server';

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
    let sitemapIndexes = [];

    try {
        for (const industry of INDUSTRIES) {
            const response = await fetch(`https://backend.globalbizreport.com/state/directory/${state}/${industry}?page=1`, {
                next: { revalidate: 86400 }
            });

            if (response.ok) {
                const data = await response.json();
                const totalPages = data.totalPages || 1;

                for (let i = 1; i <= totalPages; i++) {
                    sitemapIndexes.push(`
    <sitemap>
        <loc>https://www.globalbizreport.com/directory/${state}/${industry}/sitemap/${i}.xml</loc>
    </sitemap>`);
                }
            }
        }
    } catch (error) {
        console.error(`Sitemap generation index failure for state ${state}:`, error);
    }

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapIndexes.join('')}
</sitemapindex>`;

    return new NextResponse(indexXml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=43200, s-maxage=43200'
        }
    });
}