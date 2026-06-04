// app/[stateSitemap]/route.js
import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.PG_HOST_REMOTE || "195.35.23.249",
    port: Number(process.env.PG_PORT) || 5432,
    database: process.env.PG_DATABASE || "gbr",
    user: process.env.PG_USER || "gbr_user",
    password: process.env.PG_PASSWORD || "6!qZe@8.gwZ,F?Y",
    ssl: { rejectUnauthorized: false }
});

const INDUSTRIES = [
    "agriculture-and-allied-activities", "business-services", "community-personal-and-social-services",
    "construction", "electricity-gas-and-water-companies", "finance", "insurance",
    "manufacturing-food-stuffs", "manufacturing-leather-and-products-thereof",
    "manufacturing-machinery-and-equipments", "manufacturing-metals-and-chemicals-and-products-thereof",
    "manufacturing-others", "manufacturing-paper-and-paper-products-publishing-printing-and-reproduction-of-recorded-media",
    "manufacturing-textiles", "manufacturing-wood-products", "mining-and-quarrying", "others",
    "real-estate-and-renting", "trading", "transport-storage-and-communications"
];

const SLUG_TO_INDUSTRY_MAP = {
    "agriculture-and-allied-activities": "Agriculture and Allied Activities",
    "business-services": "Business Services",
    "community-personal-and-social-services": "Community, personal and Social Services",
    "construction": "Construction",
    "electricity-gas-and-water-companies": "Electricity, Gas and Water companies",
    "finance": "Finance",
    "insurance": "Insurance",
    "manufacturing-food-stuffs": "Manufacturing (Food stuffs)",
    "manufacturing-leather-and-products-thereof": "Manufacturing (Leather and products thereof)",
    "manufacturing-machinery-and-equipments": "Manufacturing (Machinery and Equipments)",
    "manufacturing-metals-and-chemicals-and-products-thereof": "Manufacturing (Metals and Chemicals, and products thereof)",
    "manufacturing-others": "Manufacturing (Others)",
    "manufacturing-paper-and-paper-products-publishing-printing-and-reproduction-of-recorded-media": "Manufacturing (Paper and Paper products, Publishing, printing and reproduction of recorded media)",
    "manufacturing-textiles": "Manufacturing (Textiles)",
    "manufacturing-wood-products": "Manufacturing (Wood Products)",
    "mining-and-quarrying": "Mining and Quarrying",
    "others": "Others",
    "real-estate-and-renting": "Real Estate and Renting",
    "trading": "Trading",
    "transport-storage-and-communications": "Transport, storage and Communications"
};

export async function GET(req, { params }) {
    const { stateSitemap } = await params;
    const DOMAIN = "https://www.globalbizreport.com"; // Replace with your production domain
    const LIMIT = 100;

    // Validate that the request matches the pattern: sitemap-[state].xml
    if (!stateSitemap.startsWith('sitemap-') || !stateSitemap.endsWith('.xml')) {
        return new Response('Not Found', { status: 404 });
    }

    // Extract the state slug (e.g., "goa" or "andhra-pradesh")
    const stateSlug = stateSitemap.replace('sitemap-', '').replace('.xml', '');
    const dbStateName = stateSlug.replace(/-/g, " ");

    try {
        let xmlUrls = '';

        // 1. Add the main parent state hub link
        xmlUrls += `  <url>\n    <loc>${DOMAIN}/directory/${stateSlug}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;

        // 2. Loop through all 19 industries to find dynamic pagination limits
        for (const indSlug of INDUSTRIES) {
            const dbIndustryName = SLUG_TO_INDUSTRY_MAP[indSlug];
            if (!dbIndustryName) continue;

            const countQuery = `
                SELECT COUNT(*) as total 
                FROM companies 
                WHERE LOWER(companystatecode) = LOWER($1) 
                  AND LOWER(companyindustrialclassification) = LOWER($2);
            `;
            const countResult = await pool.query(countQuery, [dbStateName, dbIndustryName]);
            const totalCompanies = parseInt(countResult.rows[0].total);

            if (totalCompanies === 0) continue;
            const totalPages = Math.ceil(totalCompanies / LIMIT);

            // 3. Generate individual leaf pagination links that point to your custom lists
            for (let page = 1; page <= totalPages; page++) {
                xmlUrls += `  <url>\n`;
                xmlUrls += `    <loc>${DOMAIN}/directory/${stateSlug}/${indSlug}?page=${page}</loc>\n`;
                xmlUrls += `    <changefreq>daily</changefreq>\n`;
                xmlUrls += `    <priority>0.7</priority>\n`;
                xmlUrls += `  </url>\n`;
            }
        }

        const finalXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}</urlset>`;

        return new Response(finalXml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=600' // Cache for 12 hours
            }
        });

    } catch (error) {
        console.error(`Sitemap generation crash for [${stateSlug}]:`, error);
        return new Response('<error>Database mapping pipeline error</error>', {
            status: 500,
            headers: { 'Content-Type': 'application/xml' }
        });
    }
}