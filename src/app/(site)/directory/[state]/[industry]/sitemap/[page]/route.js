import { NextResponse } from 'next/server';
import { cleanUrlSegment } from '@/utils/slugify';

export async function GET(request, { params }) {
    const { state, industry, page: pageParam } = await params;
    const pageNumber = pageParam.replace('.xml', '');

    if (isNaN(parseInt(pageNumber))) {
        return new NextResponse('Invalid sitemap page format', { status: 400 });
    }

    let urlElements = [];

    try {
        const url = `https://backend.globalbizreport.com/state/directory/${state}/${industry}?page=${pageNumber}`;
        const response = await fetch(url, {
            next: { revalidate: 86400 }
        });

        if (response.ok) {
            const apiData = await response.json();
            const companies = apiData.companies || [];

            for (const co of companies) {
                const companySlug = cleanUrlSegment(co.companyname);
                const targetUrl = `https://www.globalbizreport.com/${companySlug}/${co.cin}/india/${cleanUrlSegment(co.companystatecode)}/company-business-financial-credit-report`;

                urlElements.push(`
    <url>
        <loc>${targetUrl}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>`);
            }
        }
    } catch (error) {
        console.error(`SITEMAP CHUNK EXCEPTION FOR ${state}/${industry} [Page ${pageNumber}]:`, error);
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlElements.join('')}
</urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=43200, s-maxage=43200'
        }
    });
}