import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cleanUrlSegment } from '@/utils/slugify';
// Import your raw base URL string (e.g., 'https://backend.globalbizreport.com' or your remote API domain)
import { apiUrl } from '@/api/api';
import { ArrowRight, Building2 } from 'lucide-react';

export default async function IndustryDirectoryPage({ params, searchParams }) {
    const { state, industry } = await params;
    const resolvedSearchParams = await searchParams;

    const currentPage = parseInt(resolvedSearchParams.page) || 1;
    if (currentPage < 1) notFound();

    let apiData = null;

    try {
        // 2. Build a clean string URL
        const url = `https://backend.globalbizreport.com/state/directory/${state}/${industry}?page=${currentPage}`;

        // 3. Native fetch correctly utilizes the next-revalidate object config
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            if (response.status === 404) {
                notFound();
            }
            throw new Error(`Backend pipeline returned status: ${response.status}`);
        }

        // 4. Extract data smoothly
        apiData = await response.json();

    } catch (error) {
        console.error("👉 FRONTEND FETCH EXCEPTION DETECTED:", error);

        // Axios throws on non-2xx status codes automatically. 
        // We safely look for the 404 response to trigger Next.js notFound()
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            notFound();
        }

        // Fallback layout initialization preventing rendering loop crashes
        apiData = { companies: [], totalPages: 1, dbStateName: state, dbIndustryName: industry };
    }

    const { companies, totalPages, dbStateName, dbIndustryName } = apiData;

    // Safeguards in case the API backend error fallback gets triggered
    const formattedStateTitle = (dbStateName || state).replace(/-/g, " ").toUpperCase();
    const formattedIndustryTitle = dbIndustryName || industry.replace(/-/g, " ");


    return (
        <main className="min-h-screen bg-slate-50/50 py-10 font-sans antialiased">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Modern Minimal Breadcrumbs */}
                <nav className="mb-6 flex items-center space-x-2 text-xs font-medium tracking-wide uppercase text-slate-400">
                    <Link href="/" className="transition-colors hover:text-blue-600">Home</Link>
                    <span>/</span>
                    <Link href="/directory" className="transition-colors hover:text-blue-600">Directory</Link>
                    <span>/</span>
                    <Link href={`/directory/${state}`} className="transition-colors hover:text-blue-600 text-slate-500">{formattedStateTitle}</Link>
                    <span>/</span>
                    <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">{formattedIndustryTitle}</span>
                </nav>

                {/* Main Hero Header Layout Card */}
                <div className="bg-blue-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-indigo-600" />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-3 border border-blue-100 uppercase tracking-wider">
                                Regional Classification Matrix
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
                                {formattedIndustryTitle} Sectors
                            </h1>
                            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                                Verified corporate entities and commercial enterprises operating inside the jurisdiction of <span className=" text-indigo-600 font-bold">{formattedStateTitle}</span>.
                            </p>
                        </div>

                        {/* Dynamic Metric Counter Box */}
                        <div className="bg-white border border-slate-200/60 rounded-xl p-4 flex items-center justify-between md:justify-center md:flex-col gap-2 min-w-[160px] text-right md:text-center shadow-2xs">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Page</span>
                            <span className="text-3xl font-black text-slate-800 tracking-tight">{currentPage} <span className="text-sm font-medium text-slate-400">/ {totalPages}</span></span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Corporate Directory Grid List */}
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Registered Corporate Title</span>
                        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase hidden sm:block">Identifier Registry</span>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {!companies || companies.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-400 text-sm font-medium">No verified company registries mapped to this specific sub-category index page block.</p>
                            </div>
                        ) : (
                            companies.map((co, idx) => {
                                const companySlug = cleanUrlSegment(co.companyname);
                                const targetUrl = `/${companySlug}/${co.cin}/india/${cleanUrlSegment(co.companystatecode)}/company-business-financial-credit-report`;

                                return (
                                    <div
                                        key={idx + 1}
                                        className="p-4 sm:p-5 hover:bg-slate-50/80 transition-all duration-150 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group border-b border-slate-100 last:border-0"
                                    >
                                        {/* Left Block: Core Company Details */}
                                        <div className="space-y-1.5 min-w-0 flex-1">
                                            <Link
                                                href={targetUrl}
                                                target="_blank"
                                                className="text-base underline md:decoration-0 font-bold text-slate-800 hover:text-blue-600 group-hover:text-blue-600 transition-colors line-clamp-2 sm:line-clamp-1 block break-words"
                                            >
                                                {co.companyname}
                                            </Link>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                                    <Building2 className="w-3 h-3" />
                                                    {co.companystatecode} Registry
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Block: CIN & Action Navigation */}
                                        <div className="flex flex-row items-stretch sm:items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t border-slate-100 sm:border-0 min-w-0">

                                            {/* Registration ID Badge Box */}
                                            <div className="font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 sm:px-2.5 sm:py-1 select-all sm:group-hover:bg-blue-50/30 sm:group-hover:border-blue-200 transition-colors min-w-0">
                                                <span className="text-[10px] text-slate-400 font-sans block sm:hidden font-bold uppercase tracking-wider mb-1">
                                                    Corporate Registration ID (CIN)
                                                </span>
                                                <span className="block break-all sm:break-normal truncate font-medium tracking-wide">
                                                    {co.cin}
                                                </span>
                                            </div>

                                            {/* Desktop Interactive Row Arrow indicator */}
                                            <div className="text-slate-300 group-hover:text-blue-500 transition-colors transform translate-x-0 group-hover:translate-x-1 duration-200 flex items-center justify-center pl-1">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* High-End Clean HTML Pagination Interface */}
                {totalPages > 1 && (
                    <nav aria-label="Directory Pagination Controls" className="flex flex-wrap items-center justify-center gap-2 mt-12 bg-white border border-slate-200/60 p-3 rounded-2xl shadow-2xs">
                        {currentPage > 1 && (
                            <Link
                                href={`/directory/${state}/${industry}?page=${currentPage - 1}`}
                                className="px-3 py-2 border border-slate-200 rounded-xl text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 transition-all font-medium text-xs sm:text-sm shadow-2xs"
                            >
                                &#8592; Prev
                            </Link>
                        )}

                        <Link
                            href={`/directory/${state}/${industry}?page=1`}
                            className={`px-3.5 py-2 border rounded-xl text-xs sm:text-sm font-medium transition-all shadow-2xs ${currentPage === 1 ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            1
                        </Link>

                        {currentPage > 3 && <span className="text-slate-300 font-bold px-1 select-none">...</span>}

                        {Array.from({ length: 3 }, (_, idx) => currentPage - 1 + idx)
                            .filter(p => p > 1 && p < totalPages)
                            .map(p => (
                                <Link
                                    key={p}
                                    href={`/directory/${state}/${industry}?page=${p}`}
                                    className={`px-3.5 py-2 border rounded-xl text-xs sm:text-sm font-medium transition-all shadow-2xs ${currentPage === p ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    {p}
                                </Link>
                            ))
                        }

                        {currentPage < totalPages - 2 && <span className="text-slate-300 font-bold px-1 select-none">...</span>}

                        <Link
                            href={`/directory/${state}/${industry}?page=${totalPages}`}
                            className={`px-3.5 py-2 border rounded-xl text-xs sm:text-sm font-medium transition-all shadow-2xs ${currentPage === totalPages ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            {totalPages}
                        </Link>

                        {currentPage < totalPages && (
                            <Link
                                href={`/directory/${state}/${industry}?page=${currentPage + 1}`}
                                className="px-3 py-2 border border-slate-200 rounded-xl text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 transition-all font-medium text-xs sm:text-sm shadow-2xs"
                            >
                                Next &rarr;
                            </Link>
                        )}
                    </nav>
                )}
            </div>
        </main>
    );
}