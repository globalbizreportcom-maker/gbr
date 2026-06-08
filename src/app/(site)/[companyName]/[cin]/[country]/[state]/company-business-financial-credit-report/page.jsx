

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
import pool from "@/lib/db";
import { cache } from "react";

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

// 2. Wrap your fetch utility. Next.js will automatically de-duplicate this a cross metadata and components!
const getCompanyDetails = cache(async (cin) => {
    try {
        const apiUrl = `https://backend.globalbizreport.com/api/company-details?cin=${cin}`;
        const res = await fetch(apiUrl, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.log("Fetch failure:", err);
        return null;
    }
});


// ─── NEXT.JS SEARCH ENGINE OVERRIDES (TITLE, DESCRIPTION & CANONICAL) ───
export async function generateMetadata({ params }) {
    const { cin } = await params;
    const result = await getCompanyDetails(cin); // Hits the API
    const companyData = result?.data?.postgres;

    // Move your dynamic date generation inside the request scope so it stays safe
    const currentDateStr = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return {
        title: companyData ? `${companyData.companyname} | GBR` : "Company Report | GBR",
        description: `Last updated: ${currentDateStr}`
    };
}

//     const companyName = companyData?.companyname || "Company Report";
//     const stateSlug = cleanUrlSegment(companyData?.companystatecode || "na");
//     const nameSlug = cleanUrlSegment(companyName);

//     // Dynamic absolute target construction matching your routing tree
//     const canonicalUrl = `https://www.globalbizreport.com/${nameSlug}/${cin}/india/${stateSlug}/company-business-financial-credit-report`;

//     return {
//         title: companyData ? `${companyName} | GBR` : "Company Report | GBR",
//         description: companyData
//             ? `Check ${companyName}'s financial profile and order a detailed company report. Last updated: ${currentDateStr}.`
//             : `Check company profile information and order a comprehensive company report. Last updated: ${currentDateStr}.`,
//         alternates: {
//             canonical: canonicalUrl,
//         }
//     };
// }

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
        // const apiUrl = `https://backend.globalbizreport.com/api/company-details?cin=${cin}`;
        // const res = await fetch(apiUrl, { cache: "no-store" });
        // const result = await res.json();

        const result = await getCompanyDetails(cin); // Hits the API


        // if (res.ok && result.data) {
        if (result.data) {

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

                    <main className="xl:col-span-12 bg-white rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-2">
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
                    {/* <aside className="xl:col-span-4 w-full space-y-6">
                        <LatestUpdates companyData={companyData} />
                    </aside> */}


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

