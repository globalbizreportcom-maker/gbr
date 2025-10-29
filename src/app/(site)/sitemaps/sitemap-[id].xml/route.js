import { NextResponse } from "next/server";

const PER_PAGE = 20; // how many companies per backend page
const PAGES_PER_SITEMAP = 50; // how many backend pages per sitemap
const BACKEND_URL = "https://www.globalbizreport.com/companies-directory/india";
const BASE_URL = "https://www.globalbizreport.com";

export async function GET(req, { params }) {
    const { id } = params;
    const sitemapId = parseInt(id, 10);

    if (isNaN(sitemapId) || sitemapId < 1) {
        return new NextResponse("Invalid sitemap ID", { status: 400 });
    }

    try {
        // 1️⃣ Get total companies
        const totalRes = await fetch(BACKEND_URL, { next: { revalidate: 86400 } });
        const totalData = await totalRes.json();
        const totalCompanies = totalData.total || 0;
        const totalPages = Math.ceil(totalCompanies / PER_PAGE);

        const startPage = (sitemapId - 1) * PAGES_PER_SITEMAP + 1;
        const endPage = Math.min(sitemapId * PAGES_PER_SITEMAP, totalPages);

        if (startPage > totalPages) {
            return new NextResponse("Sitemap not found", { status: 404 });
        }

        // 2️⃣ Fetch companies from multiple pages
        let allCompanies = [];

        for (let page = startPage; page <= endPage; page++) {
            const res = await fetch(`${BACKEND_URL}?page=${page}`, { next: { revalidate: 86400 } });
            const data = await res.json();
            if (data && Array.isArray(data.companies)) {
                allCompanies = [...allCompanies, ...data.companies];
            }
        }

        // 3️⃣ Build XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        allCompanies.forEach((company) => {
            const name = encodeURIComponent(company.companyName.replace(/\s+/g, "-"));
            const cin = encodeURIComponent(company.cin || "");
            const state = encodeURIComponent(company.state?.toLowerCase() || "unknown");

            const url = `${BASE_URL}/${name}/${cin}/india/${state}/company-business-financial-credit-report`;

            xml += `  <url>\n`;
            xml += `    <loc>${url}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;

        return new NextResponse(xml, {
            headers: { "Content-Type": "application/xml" },
        });

    } catch (error) {
        console.error(`Error generating sitemap-${id}.xml:`, error);
        return new NextResponse("Failed to generate sitemap", { status: 500 });
    }
}
