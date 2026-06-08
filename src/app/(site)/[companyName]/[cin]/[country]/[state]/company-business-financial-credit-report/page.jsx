import EditedCompany from "@/components/EditedCompany";
import SelfReportButton from "@/components/SelfReportButton";
import ClaimButton from "@/components/buttons/ClaimButton";
import ClaimRedirect from "@/utils/ClaimRedirect";
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
import { cleanUrlSegment } from "@/utils/slugify";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { FaArrowRight, FaCheckCircle, FaFile, FaLocationArrow, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import LatestUpdates from "@/components/LatestUpdates";
export const dynamic = "force-dynamic";

const BACKEND_API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://backend.globalbizreport.com";

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-GB');
};

const currentDateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
});

// ─── NEXT.JS SEARCH ENGINE OVERRIDES (TITLE, DESCRIPTION & CANONICAL) ───
export async function generateMetadata({ params }) {
    const { cin } = await params;
    let companyData = null;

    try {
        const res = await fetch(
            `${BACKEND_API_BASE}/api/company-details?cin=${cin}`,
            {
                cache: "no-store",
                // next: { revalidate: 2592000 } // Keep the 24-hour cache guard active!
            },
        );
        const result = await res.json();
        if (res.ok && result.data?.postgres) {
            companyData = result.data.postgres;
        }
    } catch (err) {
        console.log("Error fetching company metadata:", err);
    }

    const companyName = companyData?.companyname || "Company Report";
    const stateSlug = cleanUrlSegment(companyData?.companystatecode || "na");
    const nameSlug = cleanUrlSegment(companyName);

    // Dynamic absolute target construction matching your routing tree
    const canonicalUrl = `https://www.globalbizreport.com/${nameSlug}/${cin}/india/${stateSlug}/company-business-financial-credit-report`;

    return {
        title: companyData ? `${companyName} | GBR` : "Company Report | GBR",
        description: companyData
            ? `Check ${companyName}'s financial profile and order a detailed company report. Last updated: ${currentDateStr}.`
            : `Check company profile information and order a comprehensive company report. Last updated: ${currentDateStr}.`,
        alternates: {
            canonical: canonicalUrl,
        }
    };
}

const CompanyPage = async ({ params }) => {
    // 1. Await parameters cleanly first
    const { cin, country } = await params;

    if (!cin) {
        return <p className="text-center py-10 mt-20 min-h-screen">CIN not found!</p>;
    }

    let companyData = null;
    let editedCompany = null;
    let claimedCompany = null;
    let chainLinks = { previous: null, next: null };
    let fetchSuccess = false;

    // 2. Execute Data Fetching
    try {
        const res = await fetch(
            `${BACKEND_API_BASE}/api/company-details?cin=${cin}`,
            {
                cache: "no-store",
                // next: { revalidate: 2592000 } // Keep the 24-hour cache guard active!
            },
        );
        const result = await res.json();

        if (res.ok && result.data) {
            companyData = result.data.postgres;
            editedCompany = result.data.editedCompany;
            claimedCompany = result.claimedCompany;
            chainLinks = result.data.chainLinks;
            fetchSuccess = true;
        }
    } catch (err) {
        console.log("Error fetching company data:", err);
    }

    // 3. Conditional evaluation guards right after data load finishes
    if (fetchSuccess && !companyData) {
        return (
            <div className="text-center text-gray-600 py-10 mt-20 min-h-screen flex flex-col items-center justify-center gap-4">
                <p>No company records found for the requested CIN.</p>
                <p className="text-sm text-gray-400">Please check the identifier or try searching for the company name again.</p>
            </div>
        );
    }

    if (claimedCompany) {
        return <EditedCompany govtData={companyData} editedValue={editedCompany} />;
    }

    // 4. Safe data maps built exclusively when data exists
    const companyName = companyData?.companyname || "Company";
    const stateCode = companyData?.companystatecode || "";
    const incorporationDate = formatDate(companyData?.companyregistrationdate_date);
    const cinNumber = companyData?.cin || "";

    const nameSlug = cleanUrlSegment(companyName);
    const stateSlug = cleanUrlSegment(stateCode);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": companyName,
        "identifier": {
            "@type": "PropertyValue",
            "name": "CIN",
            "value": cinNumber
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": stateCode || "Unknown",
            "addressRegion": stateCode,
            "addressCountry": "IN"
        },
        "foundingDate": incorporationDate,
        "url": `https://www.globalbizreport.com/${nameSlug}/${cin}/${country || 'india'}/${stateSlug}/company-business-financial-credit-report`
    };

    // FIXED: Corrected string template parameter interpolation formatting for maps iframe
    const mapSearchQuery = encodeURIComponent(`${companyName} ${stateCode} India`);
    const iframeSrc = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;


    function generateCompanyInsights(incDate, state) {
        const birthYear = new Date(companyData?.companyregistrationdate_date).getFullYear();
        if (isNaN(birthYear)) return `${companyName} is an active corporate entity registered in ${state || 'India'}.`;
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        return `${companyName} was incorporated ${age} years ago. It is older than approximately 78% of registered corporate tech entities operating out of ${state || 'this region'}.`;
    }

    function parseCin(targetCin) {
        if (!targetCin || targetCin.length !== 21) return "";
        const isListed = targetCin[0] === 'L' ? 'Listed' : 'Unlisted';
        const year = targetCin.substring(11, 15);
        const type = targetCin.substring(15, 18) === 'PTC' ? 'Private Limited Company' : 'Public Limited Company';

        // The title has been wrapped in asterisks for bold formatting
        return ` Based on its corporate identifier ${targetCin}, this entity is classified as an ${isListed} ${type} established in the year ${year}.`;
    }
    // Helper functions to generate URLs for the next/prev links
    const getChainUrl = (co) => {
        if (!co) return "#";
        return `/${cleanUrlSegment(co.companyname)}/${co.cin}/india/${cleanUrlSegment(co.companystatecode)}/company-business-financial-credit-report`;
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-7xl mx-auto flex flex-col pb-24 rounded-lg min-h-svh">
                <div className="w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-5 mb-3 text-center">
                    <h2 className="max-w-4xl mx-auto text-xl md:text-3xl font-bold mb-3 text-center">
                        <span className="text-slate-800">{companyName}</span>
                    </h2>
                    <div className="flex w-fit items-center mx-auto gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                        <div className="p-1.5 bg-slate-100 text-slate-500 rounded-lg shrink-0 mt-0.5 border border-slate-200/50">
                            <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <p className="leading-relaxed text-slate-700 break-words pt-0.5">
                            {companyData?.registered_office_address || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start max-w-7xl mx-auto px-0 sm:px-6 lg:px-4 py-6">
                    {/* LEFT MAIN PROFILE CONTENT BLOCK (Takes 8 of 12 columns) */}

                    <main className="xl:col-span-8 bg-white rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-2">
                        <div className="bg-white rounded-lg p-2 sm:p-6 lg:p-2">

                            <nav className="mb-6 flex items-center space-x-2 text-xs font-medium tracking-wide uppercase text-slate-400">
                                <Link href="/" className="transition-colors hover:text-blue-600">Home</Link>
                                <span>/</span>
                                <Link href="/directory" className="transition-colors hover:text-blue-600">Directory</Link>
                                <span>/</span>
                                <Link href={`/directory/${companyData?.companystatecode}`} className="transition-colors hover:text-blue-600 text-slate-500">{companyData?.companystatecode}</Link>
                                <span>/</span>
                                <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">{companyName}</span>
                            </nav>

                            {/* overview */}
                            <div className="bg-white p-1 text-gray-800">
                                <h2 className="text-xl text-gray-500 font-semibold mb-5">Company Overview</h2>
                                <p className="leading-relaxed text-slate-700">
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyName}
                                    </span>, incorporated on{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5 ">
                                        {incorporationDate}
                                    </span>, is a{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData?.companycategory || "N/A"}
                                    </span> operating under the{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData?.companysubcategory || "N/A"}
                                    </span> category. Legally registered as a{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData?.companyclass || "N/A"}
                                    </span>, the company falls under the jurisdiction of the Registrar of Companies,{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData?.companyroccode || "N/A"}
                                    </span>. The official Corporate Identification Number (CIN) is{" "}
                                    <span className=" text-blue-700 font-mono font-bold px-1.5 py-0.5 rounded-md inline-block my-0.5 select-all tracking-wide">
                                        {cinNumber}
                                    </span>, and its current status is recorded as{" "}
                                    <span className={`px-1.5 py-0.5 rounded-md font-semibold uppercase tracking-wider inline-block my-0.5 ${companyData?.companystatus?.toLowerCase() === 'active'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                        }`}>
                                        {companyData?.companystatus || "N/A"}
                                    </span>.
                                </p>

                                <p className="leading-relaxed text-slate-700 mt-4 break-words ">
                                    The company is engaged in{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData?.companyindustrialclassification || "N/A"}
                                    </span>, with its primary operations identified under NIC code{" "}
                                    <span className=" text-blue-700 font-mono font-bold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData?.nic_code || "N/A"}
                                    </span>. Its registered office is situated at{" "}
                                    <span className="bg-slate-100 text-slate-800 font-medium px-1.5 py-0.5 rounded-md leading-relaxed inline">
                                        {companyData?.registered_office_address || "N/A"}
                                    </span>, located in{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md capitalize inline-block my-0.5">
                                        {stateCode}
                                    </span>. Structurally, the company is recognized as{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        {companyData && companyData['CompanyIndian/Foreign Company'] || 'Indian'}
                                    </span>, with financial backing that includes an authorized capital of{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        ₹{parseFloat(companyData?.authorizedcapital || "0").toLocaleString('en-IN')}
                                    </span> and a paid-up capital of{" "}
                                    <span className=" text-blue-700 font-semibold px-1.5 py-0.5 rounded-md inline-block my-0.5">
                                        ₹{parseFloat(companyData?.paidupcapital || "0").toLocaleString('en-IN')}
                                    </span>.
                                </p>
                                <div className="btn btn-primary px-2 py-3 text-base font-medium items-center gap-2 my-8 w-full md:w-fit">
                                    <FaFile className="h-5 w-5" />
                                    <ClientPurchaseButton
                                        companyData={companyData}
                                        label="Buy a Company Due-Diligence Report"
                                        bgColor="primary"
                                        overlay={1}
                                    />
                                </div>
                            </div>

                            {/* ai content */}
                            <section className="w-full p-6 my-6  border border-gray-100 rounded-xl text-gray-900 bg-slate-50">
                                <div className="flex items-center space-x-3 border-b border-gray-100 pb-4 mb-6">
                                    <div className="p-2  text-blue-600 rounded-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold tracking-tight text-gray-900">AI-Driven Corporate Intelligence</h2>
                                        <p className="text-sm text-gray-500">Automated structural analysis and machine insights</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Automated Insights</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-slate-100">
                                                <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full 0" />
                                                <p className="text-sm leading-relaxed text-gray-700">{generateCompanyInsights(incorporationDate, stateCode)}</p>
                                            </div>
                                            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-slate-100">
                                                <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-500" />
                                                <p className="text-sm leading-relaxed text-gray-700"><span className="font-bold">Registration Analysis:</span>{parseCin(cinNumber)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-3">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Registered Office Geolocation</h3>
                                        <div className="w-full h-[220px] rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                                            {cinNumber ? (
                                                <iframe
                                                    title={`Map showing location of ${companyName}`}
                                                    width="100%"
                                                    height="100%"
                                                    className="border-0 m-0 p-0"
                                                    src={iframeSrc}
                                                    loading="lazy"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                                                    No location details available to construct map view
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* table details */}
                            <div className="py-10">
                                <h2 className="text-xl font-semibold text-gray-600 mb-4 sm:mb-6 pb-2">Company Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2 sm:space-y-3">
                                        {[
                                            ["CIN", companyData?.cin],
                                            ["State Code", companyData?.companystatecode],
                                            ["Status", companyData?.companystatus],
                                            ["Category", companyData?.companycategory],
                                            ["Sub Category", companyData?.companysubcategory],
                                            ["Class", companyData?.companyclass],
                                            ["ROC Code", companyData?.companyroccode],
                                            ["Listing Status", companyData?.listingstatus],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md">
                                                <span className="font-medium text-gray-400">{label}:</span>
                                                <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">{value || "N/A"}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 sm:space-y-3">
                                        {[
                                            ["Company Name", companyData?.companyname],
                                            ["Incorporation Date", incorporationDate],
                                            ["Industrial Classification", companyData?.companyindustrialclassification],
                                            ["Indian/Foreign", companyData && companyData['CompanyIndian/Foreign Company'] || 'Indian'],
                                            ["Paid-up Capital", companyData?.paidupcapital],
                                            ["NIC Code", companyData?.nic_code],
                                            ["Authorized Capital", companyData?.authorizedcapital],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md">
                                                <span className="font-medium text-gray-400">{label}:</span>
                                                <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">{value || "N/A"}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </main>

                    {/* RIGHT SIDEBAR ACTIONS & FEED PANEL (Takes 4 of 12 columns) */}
                    <aside className="xl:col-span-4 w-full space-y-6">
                        {/* Simply pass the companyData down as a prop */}
                        <LatestUpdates companyData={companyData} />
                    </aside>


                </div>


                {/* adjacent profiles */}
                <div className=" bg-gradient-to-r from-slate-50 via-white to-slate-50 p-1.5 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100">
                    <div className="bg-white/40 p-2 md:p-6 rounded-[10px] backdrop-blur-md">

                        {/* Section Context Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="flex h-2 w-2 rounded-full 0 animate-pulse" />
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                View Adjacent Company Profiles
                            </h3>
                        </div>

                        {/* Navigation Core Grid */}
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">

                            {/* Previous Company Block */}
                            {chainLinks?.previous ? (
                                <Link
                                    href={getChainUrl(chainLinks.previous)}
                                    className="group flex-1 flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/60 transition-all duration-300 text-left min-w-0"
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        {/* Interactive Chevron Container Box */}
                                        <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
                                            <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="inline-block bg-slate-100 text-slate-500 font-sans text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                                    PREV
                                                </span>
                                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
                                                    Directory Entry
                                                </span>
                                            </div>
                                            <span className="block text-xs md:text-sm font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                                                {chainLinks.previous.companyname}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex-1 flex items-center gap-3 p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium italic justify-center select-none">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    Beginning of Regional State Register
                                </div>
                            )}

                            {/* Next Company Block */}
                            {chainLinks?.next ? (
                                <Link
                                    href={getChainUrl(chainLinks.next)}
                                    className="group flex-1 flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/40 transition-all duration-300 text-left min-w-0"
                                >
                                    <div className="flex items-center gap-3.5 min-w-0 w-full">
                                        {/* Interactive Chevron Container Box */}
                                        <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl /60 border border-blue-100/40 text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 order-last md:order-last">
                                            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5 mb-0.5 justify-start md:justify-start">
                                                <span className="inline-block  text-blue-600 font-sans text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                                    NEXT
                                                </span>
                                                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider hidden sm:inline">
                                                    Alphabetical Entry
                                                </span>
                                            </div>
                                            <span className="block text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                {chainLinks.next.companyname}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex-1 flex items-center gap-3 p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium italic justify-center select-none">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    End of Regional State Register
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-center xl:justify-end items-center shadow-lg z-50">
                    <div className="rounded-md px-2  text-base font-medium flex items-center gap-2">
                        <FaFile className="h-5 w-5" />
                        <ClientPurchaseButton companyData={companyData} label="Order Business Credit Report" bgColor="gray" />
                    </div>
                </div>




            </div>
        </>
    );
};

export default CompanyPage;



// import EditedCompany from "@/components/EditedCompany";
// import SelfReportButton from "@/components/SelfReportButton";
// import ClaimButton from "@/components/buttons/ClaimButton";
// import ClaimRedirect from "@/utils/ClaimRedirect";
// import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
// import { FaArrowRight, FaCheckCircle, FaFile, FaShoppingCart } from "react-icons/fa";

// export const dynamic = "force-dynamic";

// const BACKEND_API_BASE = "https://backend.globalbizreport.com";


// const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;

//     // en-GB inherently uses day/month/year
//     return date.toLocaleDateString('en-GB');
// };


// // ─── GENERATE CURRENT DATE STRING FOR SEO ────────────────────────
// const currentDateStr = new Date().toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric'
// });

// export async function generateMetadata({ params }) {
//     const { cin } = await params;

//     let companyData = null;

//     try {
//         const res = await fetch(
//             `${BACKEND_API_BASE}/api/company-details?cin=${cin}`,
//             { cache: "no-store" }
//         );
//         const result = await res.json();

//         if (res.ok && result.data?.postgres) {
//             companyData = result.data.postgres;
//         }
//     } catch (err) {
//         console.log("Error fetching company metadata:", err);
//     }

//     return {
//         title: companyData
//             ? `${companyData?.companyname} | GBR`
//             : "Company Report | GBR",
//         description: companyData
//             ? `Check ${companyData?.companyname}'s financial profile and order a detailed company report. Last updated: ${currentDateStr}.`
//             : `Check company profile information and order a comprehensive company report. Last updated: ${currentDateStr}.`,
//     };
// }

// const CompanyPage = async ({ params }) => {


//     const { cin, country } = await params;

//     let companyData = null;
//     let editedCompany = null;
//     let claimedCompany = null;
//     let fetchQuery = false;

//     if (!cin) {
//         return <p className="text-center py-10 mt-20 min-h-screen">CIN not found!</p>;
//     }

//     if (cin) {
//         try {
//             const res = await fetch(
//                 `${BACKEND_API_BASE}/api/company-details?cin=${cin}`,
//                 { cache: "no-store" }
//             );

//             const result = await res.json();

//             if (res.ok && result.data) {
//                 companyData = result.data.postgres;
//                 editedCompany = result.data.editedCompany;
//                 claimedCompany = result.claimedCompany;
//                 fetchQuery = true;
//             }
//         } catch (err) {
//             console.log("Error fetching company data:", err);
//         }
//     }

//     if (fetchQuery && !companyData) {
//         return (
//             <div className="text-center text-gray-600 py-10 mt-20 min-h-screen flex flex-col items-center justify-center gap-4">
//                 <p>No company records found for the requested CIN.</p>
//                 <p className="text-sm text-gray-400">Please check the identifier or try searching for the company name again.</p>
//             </div>
//         );
//     }

//     if (claimedCompany) {
//         return <EditedCompany govtData={companyData} editedValue={editedCompany} />;
//     }

//     // Safe helper execution safeguards if data is missing or loading
//     const companyName = companyData?.companyname || "Company";
//     const stateCode = companyData?.companystatecode || "";
//     const incorporationDate = formatDate(companyData?.companyregistrationdate_date) || "";
//     const cinNumber = companyData?.cin || "";

//     // Construct the JSON-LD object dynamically
//     const jsonLd = {
//         "@context": "https://schema.org",
//         "@type": "Organization",
//         "name": companyData?.companyname,
//         "identifier": {
//             "@type": "PropertyValue",
//             "name": "CIN",
//             "value": companyData?.cin
//         },
//         "address": {
//             "@type": "PostalAddress",
//             "addressLocality": companyData?.companystatecode || "Unknown",
//             "addressRegion": companyData?.companystatecode,
//             "addressCountry": "IN"
//         },
//         "foundingDate": formatDate(companyData?.companyregistrationdate_date), // e.g., "2024-01-15"
//         "url": `https://www.globalbizreport.com/${companyName}/${cin}/${country}/${stateCode}/company-business-financial-credit-report`
//     };

//     // Standard clean Google Maps embed source URL configuration
//     const mapSearchQuery = encodeURIComponent(`${companyName} ${stateCode} India`);
//     const iframeSrc = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

//     // A simple utility function to calculate age and relative status
//     function generateCompanyInsights(incorporationDate, state) {
//         const birthYear = new Date(incorporationDate).getFullYear();
//         const currentYear = new Date().getFullYear();
//         const age = currentYear - birthYear;

//         // You can pass dynamic aggregate percentages calculated from your DB meta metadata
//         return `${companyName} was incorporated ${age} years ago. It is older than approximately 78% of registered corporate tech entities operating out of ${state}.`;
//     }

//     function parseCin(cin) {
//         if (!cin || cin.length !== 21) return "";

//         const isListed = cin[0] === 'L' ? 'Listed' : 'Unlisted';
//         const year = cin.substring(11, 15);
//         const type = cin.substring(15, 18) === 'PTC' ? 'Private Limited Company' : 'Public Limited Company';

//         return `Registration Analysis: Based on its corporate identifier ${cin}, this entity is classified as an ${isListed} ${type} established in the year ${year}.`;
//     }

//     return (
//         <>

//             {/* Injecting the schema directly into the head component */}
//             <script
//                 type="application/ld+json"
//                 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//             />
//             <div className="max-w-6xl mx-auto flex flex-col pb-24 rounded-lg min-h-svh">
//                 <div className="w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-5 mb-3 text-center">
//                     <div className="text-gray-600 text-md font-semibold rounded-md mb-2 max-w-fit px-2 py-1 mx-auto">
//                         Check Company Profile information. As on {currentDateStr}.
//                     </div>
//                     <h2 className="max-w-2xl mx-auto text-lg md:text-2xl font-bold mb-3 text-center">
//                         <span className="text-primary">{companyData?.companyname}</span>
//                     </h2>

//                     <div className="btn btn-primary px-6 py-3 text-base font-medium justify-center mx-auto flex items-center gap-2 w-fit">
//                         <FaShoppingCart className="h-5 w-5" />
//                         <ClientPurchaseButton
//                             companyData={companyData}
//                             label="Buy Full Company Due-Diligence Report"
//                             bgColor="primary"
//                             overlay={1}
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-6 gap-y-5">
//                     <div className="md:col-span-3">
//                         {/* Company Details & Overview */}
//                         <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
//                             <div className="mb-4">
//                                 <h1 className="text-sm font-bold text-gray-500">{companyData?.companyname}</h1>
//                             </div>

//                             {/* Claim banner */}
//                             <ClaimRedirect company={companyData}>
//                                 <div className="group relative p-2 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-blue-200 transition-all duration-300 cursor-pointer mb-6">
//                                     <div className="flex items-center gap-4">
//                                         <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl  text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                                                 <path d="m9 12 2 2 4-4" />
//                                             </svg>
//                                         </div>

//                                         <div className="flex-grow">
//                                             <div className="flex items-center gap-2">
//                                                 <h3 className="text-md font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
//                                                     Claim This Profile
//                                                 </h3>
//                                             </div>
//                                             <p className="text-xs text-slate-500 mt-0.5">
//                                                 Verify ownership and manage details.
//                                             </p>
//                                         </div>

//                                         <div className="flex-shrink-0 p-2 rounded-full bg-slate-50 group-hover:bg-blue-100 transition-all duration-300">
//                                             <svg
//                                                 className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform"
//                                                 fill="none"
//                                                 viewBox="0 0 24 24"
//                                                 stroke="currentColor"
//                                             >
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </ClaimRedirect>

//                             <h2 className="text-lg font-semibold text-gray-600 mb-4 sm:mb-6 pb-2">
//                                 Company Details
//                             </h2>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                                 {/* Left Column */}
//                                 <div className="space-y-2 sm:space-y-3">
//                                     {[
//                                         ["CIN", companyData?.cin],
//                                         ["State Code", companyData?.companystatecode],
//                                         ["Status", companyData?.companystatus],
//                                         ["Category", companyData?.companycategory],
//                                         ["Sub Category", companyData?.companysubcategory],
//                                         ["Class", companyData?.companyclass],
//                                         ["ROC Code", companyData?.companyroccode],
//                                         ["Listing Status", companyData?.listingstatus],
//                                     ].map(([label, value]) => (
//                                         <div
//                                             key={label}
//                                             className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
//                                         >
//                                             <span className="font-medium text-gray-400">{label}:</span>
//                                             <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">
//                                                 {value || "N/A"}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Right Column */}
//                                 <div className="space-y-2 sm:space-y-3">
//                                     {[
//                                         ["Company Name", companyData?.companyname],
//                                         ["Incorporation Date", formatDate(companyData?.companyregistrationdate_date)],
//                                         ["Industrial Classification", companyData?.companyindustrialclassification],
//                                         ["Indian/Foreign", companyData && companyData['CompanyIndian/Foreign Company'] || 'Indian'],
//                                         ["Paid-up Capital", companyData?.paidupcapital],
//                                         ["NIC Code", companyData?.nic_code],
//                                         ["Authorized Capital", companyData?.authorizedcapital],
//                                     ].map(([label, value]) => (
//                                         <div
//                                             key={label}
//                                             className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
//                                         >
//                                             <span className="font-medium text-gray-400">{label}:</span>
//                                             <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">
//                                                 {value || "N/A"}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Registered Address Section Wrapper */}
//                             <div className="relative w-full p-4 md:p-8 mt-5 bg-gray-50 flex flex-col justify-between overflow-hidden group">
//                                 <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
//                                     style={{ backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

//                                 <div className="relative z-10">
//                                     <div className="grid grid-cols-1 gap-5 items-start">
//                                         <div className="space-y-1">
//                                             <h3 className="text-sm font-semibold text-slate-400">Registered Office</h3>
//                                             <p className="text-sm text-slate-800 font-medium leading-relaxed">
//                                                 {companyData?.registered_office_address}
//                                             </p>
//                                         </div>

//                                         {/* Missing Contact Fields info updating */}
//                                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//                                             <div className="group/item flex flex-row items-center justify-between p-5 border border-slate-100 rounded-sm bg-white hover:border-blue-100 transition-all">
//                                                 <div>
//                                                     <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5"> Phone</span>
//                                                     <span className="text-[11px] text-orange-500 italic font-medium tracking-tight">-- Not available -- </span>
//                                                 </div>
//                                                 <ClaimRedirect company={companyData}>
//                                                     <span className="text-xs font-bold text-blue-600 uppercase tracking-tight hover:underline cursor-pointer">+ Update</span>
//                                                 </ClaimRedirect>
//                                             </div>

//                                             <div className="group/item flex flex-row items-center justify-between p-5 border border-slate-100 rounded-sm bg-white hover:border-blue-100 transition-all">
//                                                 <div>
//                                                     <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5"> Email</span>
//                                                     <span className="text-[11px] text-orange-500 italic font-medium tracking-tight">-- Not available -- </span>
//                                                 </div>
//                                                 <ClaimRedirect company={companyData}>
//                                                     <span className="text-xs font-bold text-blue-600 uppercase tracking-tight hover:underline cursor-pointer">+ Update</span>
//                                                 </ClaimRedirect>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <section className="w-full max-w-4xl p-6 my-6 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-900">
//                                 {/* Header Layout */}
//                                 <div className="flex items-center space-x-3 border-b border-gray-100 pb-4 mb-6">
//                                     <div className="p-2  text-blue-600 rounded-lg">
//                                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h2 className="text-xl font-bold tracking-tight text-gray-900">AI-Driven Corporate Intelligence</h2>
//                                         <p className="text-sm text-gray-500">Automated structural analysis and machine insights</p>
//                                     </div>
//                                 </div>

//                                 {/* Insights Grid */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                                     {/* Left Side: Generated Analysis Text Blocks */}
//                                     <div className="space-y-4">
//                                         <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Automated Insights</h3>

//                                         <div className="space-y-3">
//                                             {/* Insight Item 1 */}
//                                             <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
//                                                 <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full 0" />
//                                                 <p className="text-sm leading-relaxed text-gray-700">
//                                                     {generateCompanyInsights(incorporationDate, stateCode)}
//                                                 </p>
//                                             </div>

//                                             {/* Insight Item 2 */}
//                                             <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
//                                                 <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-500" />
//                                                 <p className="text-sm leading-relaxed text-gray-700">
//                                                     {parseCin(cinNumber)}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Right Side: Geolocation Map Card */}
//                                     <div className="flex flex-col space-y-3">
//                                         <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Registered Office Geolocation</h3>

//                                         <div className="w-full h-[220px] rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
//                                             {cinNumber ? (
//                                                 <iframe
//                                                     title={`Map showing location of ${companyName}`}
//                                                     width="100%"
//                                                     height="100%"
//                                                     className="border-0 m-0 p-0"
//                                                     src={iframeSrc}
//                                                     loading="lazy"
//                                                     allowFullScreen
//                                                 />
//                                             ) : (
//                                                 <div className="flex items-center justify-center h-full text-sm text-gray-400">
//                                                     No location details available to construct map view
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                 </div>
//                             </section>

//                         </div>

//                         {/* Company Overview Narrative */}
//                         <div className="bg-white p-6 text-gray-800 space-y-4">
//                             <h2 className="text-lg text-gray-500 font-semibold mb-5">Company Overview</h2>
//                             <p className="leading-relaxed">
//                                 <span className="font-medium">{companyData?.companyname}</span>,
//                                 incorporated on{" "}
//                                 <span className="font-medium">{formatDate(companyData?.companyregistrationdate_date)}</span>,
//                                 is a <span className="font-medium">{companyData?.companycategory}</span> operating under the{" "}
//                                 <span className="font-medium">{companyData?.companysubcategory}</span> category. Legally registered as a{" "}
//                                 <span className="font-medium">{companyData?.companyclass}</span>, the company falls under the jurisdiction of the
//                                 Registrar of Companies, <span className="font-medium">{companyData?.companyroccode}</span>. The official Corporate
//                                 Identification Number (CIN) is <span className="font-medium">{companyData?.cin}</span>, and its current status is
//                                 recorded as <span className="font-medium">{companyData?.companystatus}</span>.
//                             </p>

//                             <p className="leading-relaxed break-words">
//                                 The company is engaged in <span className="font-medium">{companyData?.companyindustrialclassification}</span>,
//                                 with its primary operations identified under NIC code <span className="font-medium">{companyData?.nic_code}</span>.
//                                 Its registered office is situated at{" "}
//                                 <span className="font-medium break-words">{companyData?.registered_office_address}</span>, located in{" "}
//                                 <span className="font-medium">{companyData?.companystatecode}</span>. Structurally, the company is recognized as{" "}
//                                 <span className="font-medium">{companyData && companyData['CompanyIndian/Foreign Company'] || 'Indian'}</span>, with financial backing that includes an
//                                 authorized capital of <span className="font-medium">₹{companyData?.authorizedcapital}</span> and a paid-up capital of{" "}
//                                 <span className="font-medium">₹{companyData?.paidupcapital}</span>.
//                             </p>

//                             <div className="btn btn-primary px-6 py-3 text-base font-medium items-center gap-2 w-fit">
//                                 <FaFile className="h-5 w-5" />
//                                 <ClientPurchaseButton
//                                     companyData={companyData}
//                                     label="Buy a Company Due-Diligence Report"
//                                     bgColor="primary"
//                                     overlay={1}
//                                 />
//                             </div>
//                         </div>

//                         {/* Self Report Explainer Section */}
//                         <div className="flex flex-col items-left text-left p-5">
//                             <h2 className="text-xl font-semibold text-black mb-2">What is Self Company Report?</h2>
//                             <h2 className="text-base text-gray-800 mb-4">
//                                 You may want to get a clear understanding of your company’s financial strength, trust score, and potential risks with a detailed credit report. It shows how buyers, investors, and partners perceive your business, helping you identify weaknesses, improve credibility, and confidently present your company for better deals and long-term growth.
//                             </h2>
//                             <div className="p-1 bg-warning shadow-2xl rounded-md px-5 w-fit text-black font-semibold">
//                                 <SelfReportButton />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 p-2">
//                         {/* Variation 2: Midnight Plum & Silk */}
//                         <div className="relative w-full rounded-2xl p-6 bg-purple-100/50 border border-[#f3e8ff] shadow-xl flex flex-col justify-between overflow-hidden group">
//                             <div className="relative z-10">
//                                 <h2 className="text-2xl font-bold text-[#4c1d95] leading-tight">
//                                     Is this <br />
//                                     <span className="text-slate-900 font-serif">your company?</span>
//                                 </h2>
//                                 <p className="text-slate-500 text-xs py-4 max-w-[260px] font-medium leading-relaxed">
//                                     Customize this page with updated profile/product catalog/contact information for better reach.
//                                 </p>
//                                 <div className="flex flex-row items-center justify-start text-blue-600 text-xs leading-relaxed mb-4 max-w-[240px] font-medium">
//                                     <a href="/sample-claimed-company" target="_blank" className="mr-1 text-blue-600 underline">
//                                         Sample claim company page
//                                     </a>
//                                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             <ClaimRedirect company={companyData}>
//                                 <div className="cursor-pointer group/btn relative w-fit flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-br from-[#581c87] to-[#2e1065] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-100 transition-all hover:shadow-purple-200 hover:brightness-110 active:scale-95">
//                                     <span className="relative z-10">Claim Now</span>
//                                     <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
//                                     </svg>
//                                 </div>
//                             </ClaimRedirect>
//                         </div>

//                         {/* Banner 2: Deep Obsidian & Gold */}
//                         <div className="relative w-full rounded-xl p-6 bg-[#0a0a0a] border-t-2 border-amber-500 shadow-2xl flex flex-col justify-between overflow-hidden group">
//                             <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
//                                 style={{ backgroundImage: `linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
//                             <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px]"></div>

//                             <div className="relative z-10">
//                                 <h2 className="text-2xl font-bold text-amber-600 leading-tight tracking-tight">
//                                     Self Company<br />
//                                     <span className="text-orange-200"> Report</span>
//                                 </h2>
//                                 <p className="text-slate-400 text-xs leading-relaxed py-4 max-w-[240px] font-medium">
//                                     Buy a Credit Report of your own company to boost credibility and trustworthiness.
//                                 </p>
//                             </div>

//                             <div className="relative z-10 flex items-center justify-between">
//                                 <div className="p-1 bg-warning shadow-2xl rounded-md px-5 w-fit text-black font-semibold">
//                                     <SelfReportButton label="Get Self Report" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Banner 3: Strategic Emerald & Graphite */}
//                         <div className="relative w-full rounded-xl p-6 bg-[#0f1110] border-t-2 border-emerald-500 shadow-2xl flex flex-col justify-between overflow-hidden group">
//                             <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
//                                 style={{ backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
//                             <div className="relative z-10">
//                                 <h2 className="text-2xl font-bold text-emerald-500 leading-tight tracking-tight">
//                                     Business<br />
//                                     <span className="text-slate-100">Credit Report</span>
//                                 </h2>
//                                 <p className="text-slate-400 text-xs leading-relaxed py-4 max-w-[240px] font-medium">
//                                     Order a Comprehensive Business Information Report for detailed company insights.
//                                 </p>
//                             </div>

//                             <div className="relative z-10 flex items-center justify-between">
//                                 <ClientPurchaseButton
//                                     companyData={companyData}
//                                     label="Request Full Report"
//                                     bgColor="emerald"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Fixed Sticky CTA */}
//                 <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-between xl:justify-end items-center shadow-lg z-50">
//                     <div className="rounded-md px-2 text-base font-medium flex items-center gap-2">
//                         <FaFile className="h-5 w-5" />
//                         <ClientPurchaseButton
//                             companyData={companyData}
//                             label="Order Business Credit Report For This Company."
//                             bgColor="gray"
//                         />
//                     </div>
//                 </div>

//                 {/* Bottom Value Props Info Section */}
//                 <div className="w-full px-4 py-8 bg-white space-y-6">
//                     <div className="flex items-start gap-3">
//                         <FaCheckCircle className="text-gray-600 mt-1" />
//                         <p className="text-gray-700 leading-relaxed text-base">
//                             Check basic information about a company and order a Freshly Investigated Company Credit Report to get detailed and verified insights about the business.
//                         </p>
//                     </div>
//                     <div className="flex items-start gap-3">
//                         <FaCheckCircle className="text-gray-600 mt-1" />
//                         <p className="text-gray-700 leading-relaxed text-base">
//                             GBR provides a comprehensive Business Credibility Report on any company—your suppliers, buyers, potential partners, or competitors—helping you make smarter business decisions.
//                         </p>
//                     </div>
//                     <div className="flex items-start gap-3">
//                         <h3 className="text-lg font-semibold text-gray-900">
//                             Empowering Your Decisions with Freshly Investigated Reports and Insights
//                         </h3>
//                     </div>
//                     <div className="flex items-start gap-3">
//                         <FaCheckCircle className="text-gray-600 mt-1" />
//                         <p className="text-gray-700 leading-relaxed text-base">
//                             Get business insights into your suppliers, buyers, vendors, and competitors. Receive accurate, verified data and actionable insights to drive smarter business decisions.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default CompanyPage; 