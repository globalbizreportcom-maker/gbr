import EditedCompany from "@/components/EditedCompany";
import SelfReportButton from "@/components/SelfReportButton";
import ClaimButton from "@/components/buttons/ClaimButton";
import ClaimRedirect from "@/utils/ClaimRedirect";
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
import { FaArrowRight, FaCheckCircle, FaFile, FaShoppingCart, } from "react-icons/fa";

export const dynamic = "force-dynamic";


export async function generateMetadata({ params }) {
    const { cin } = await params;

    let companyData = null;
    let fetchError = null;

    try {
        const res = await fetch(
            `https://backend.globalbizreport.com/api/company-details?cin=${cin}`,
            { cache: "no-store" } // fresh data
        );
        const result = await res.json();

        if (!res.ok) {
            fetchError = `Failed to fetch company details: ${res.status}`;
        } else if (result.data) {

            const pg = result.data.postgres; // PostgreSQL company data
            companyData = pg;

        }

    } catch (err) {
        console.log("Error fetching company metadata:", err);
    }

    return {
        title: companyData
            ? `${companyData.companyname} | GBR`
            : "Company Report | GBR",
        description: companyData
            ? `Check ${companyData.companyname}'s financial profile and order a detailed company report.`
            : "Check company profile information and order a comprehensive company report.",
    };
}


const CompanyPage = async ({ params }) => {

    const { cin } = params; // no await

    let companyData = null;
    let editedCompany = null;
    let claimedCompany = null;
    let fetchError = null;

    console.log(claimedCompany);

    if (cin) {

        try {

            const res = await fetch(
                `https://backend.globalbizreport.com/api/company-details?cin=${cin}`,
                { cache: "no-store" }
            );

            const result = await res.json();

            if (!res.ok) {
                fetchError = `Failed to fetch company details: ${res.status}`;
            } else if (result.data) {

                const pg = result.data.postgres; // PostgreSQL company data

                companyData = pg;
                editedCompany = result.data.editedCompany
                claimedCompany = result.claimedCompany

            }
        } catch (err) {
            console.log("Error fetching company data:", err);
        }

        if (!companyData) {
            return (
                <>

                    <p className="text-center text-gray-600 py-10 mt-20 min-h-screen">
                        No company found.
                    </p>

                    <button>
                        Refresh the page to fetch the data/ Search the company again!
                    </button>
                </>
            );
        }

    }

    if (!cin) {
        return <p className="text-center"> Loading</p>
    }

    if (!companyData) {
        return <p className="text-center text-gray-600 py-10 mt-20">No company found.</p>;
    }

    if (claimedCompany) {
        return <EditedCompany govtData={companyData} editedValue={editedCompany} />
    } else {

        return (

            <div className="max-w-6xl mx-auto flex flex-col pb-24  rounded-lg min-h-svh">
                <div className="w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-5 mb-3 text-center">
                    <div className="text-gray-600 text-md font-semibold rounded-md mb-2 max-w-fit px-2 py-1 mx-auto">
                        Check Company Profile information
                    </div>
                    <h2 className="max-w-2xl mx-auto text-lg md:text-2xl font-bold mb-3 text-center">
                        <span className="text-primary">{companyData.companyname}</span>
                    </h2>

                    <div className="btn btn-primary px-6 py-3 text-base font-medium justify-center mx-auto flex items-center gap-2 w-fit">
                        <FaShoppingCart className="h-5 w-5" />
                        <ClientPurchaseButton
                            companyData={companyData}
                            label="Buy Full Company Due-Diligence Report"
                            bgColor="primary"
                            overlay={1}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-6 gap-y-5">
                    <div className="md:col-span-3">
                        {/* Company Details & Overview */}
                        <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
                            <div className="mb-4">
                                <h1 className="text-sm font-bold text-gray-500">{companyData.companyname}</h1>
                            </div>

                            {/* claim banner */}

                            <ClaimRedirect company={companyData}>
                                <div className="group relative p-2 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-blue-200 transition-all duration-300 cursor-pointer mb-6">
                                    <div className="flex items-center gap-4">

                                        {/* 1. Icon Section: Visual Trust */}
                                        <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                <path d="m9 12 2 2 4-4" />
                                            </svg>
                                        </div>

                                        {/* 2. Content Section */}
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-md font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    Claim This Profile
                                                </h3>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Verify ownership and manage details.
                                            </p>
                                        </div>

                                        {/* 3. Action Indicator (The Chevron) */}
                                        <div className="flex-shrink-0 p-2 rounded-full bg-slate-50 group-hover:bg-blue-100 transition-all duration-300">
                                            <svg
                                                className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </ClaimRedirect>


                            <h2 className="text-lg font-semibold text-gray-600 mb-4 sm:mb-6  pb-2">
                                Company Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {/* Left Column */}
                                <div className="space-y-2 sm:space-y-3">
                                    {[
                                        ["CIN", companyData.cin],
                                        ["State Code", companyData.companystatecode],
                                        ["Status", companyData.companystatus],
                                        ["Category", companyData.companycategory],
                                        ["Sub Category", companyData.companysubcategory],
                                        ["Class", companyData.companyclass],
                                        ["ROC Code", companyData.companyroccode],
                                        ["Listing Status", companyData.listingstatus],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                                        >
                                            <span className="font-medium text-gray-400">{label}:</span>
                                            <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">
                                                {value || "N/A"}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Column */}
                                <div className="space-y-2 sm:space-y-3">
                                    {[
                                        ["Company Name", companyData.companyname],
                                        ["Incorporation Date", companyData.companyregistrationdate_date],
                                        // ["Address", companyData.registered_office_address],
                                        ["Industrial Classification", companyData.companyindustrialclassification],
                                        ["Indian/Foreign", companyData['CompanyIndian/Foreign Company'] || 'Indian'],
                                        ["Paid-up Capital", companyData.paidupcapital],
                                        ["NIC Code", companyData.nic_code],
                                        ["Authorized Capital", companyData.authorizedcapital],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className={`flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md ${label === "Address" ? "items-start" : ""
                                                }`}
                                        >
                                            <span className="font-medium text-gray-400">{label}:</span>
                                            <span
                                                className={`text-gray-900 mt-1 sm:mt-0 ${label === "Address" ? "break-words w-full sm:max-w-[70%]" : "sm:text-right break-words"
                                                    }`}
                                            >
                                                {value || "N/A"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* UI Theme: Refined Architectural CTA */}
                            <div className="relative w-full p-4 md:p-8 mt-5 bg-gray-50 flex flex-col justify-between overflow-hidden group">

                                {/* Subtle Data-Grid Background */}
                                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                                    style={{ backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

                                <div className="relative z-10">
                                    <div className="grid grid-cols-1  gap-5 items-start">

                                        {/* Registered Address Section */}
                                        <div className="space-y-1">
                                            <h3 className="text-sm font-semibold text-slate-400">Registered Office</h3>
                                            <p className="text-sm text-slate-800 font-medium leading-relaxed">
                                                {companyData.registered_office_address}
                                            </p>
                                        </div>

                                        {/* Missing Data Fields */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                            <div className="group/item flex flex-row items-center justify-between p-5 border border-slate-100 rounded-sm bg-white hover:border-blue-100 transition-all">
                                                <div>
                                                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5"> Phone</span>
                                                    <span className="text-[11px] text-orange-500 italic font-medium tracking-tight">-- Not avaiable -- </span>
                                                </div>

                                                <ClaimRedirect company={companyData}>
                                                    <a className="text-xs  font-bold text-blue-600 uppercase tracking-tight hover:underline">+ Update</a>
                                                </ClaimRedirect>

                                            </div>

                                            <div className="group/item flex items-center justify-between p-5 border border-slate-100 rounded-sm bg-white hover:border-blue-100 transition-all">
                                                <div>
                                                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5"> Email</span>
                                                    <span className="text-[11px] text-orange-500 italic font-medium tracking-tight">-- Not avaiable -- </span>
                                                </div>
                                                <ClaimRedirect company={companyData}>
                                                    <a className="text-xs font-bold text-blue-600 uppercase tracking-tight hover:underline">+ Update</a>
                                                </ClaimRedirect>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Call-To-Action */}
                                {/* <div className="relative z-10 flex items-center justify-end mt-5">
                                    <a
                                        href="/update-profile"
                                        className="btn btn-primary "
                                    >
                                        Update Profile <FiEdit3 />
                                    </a>
                                </div> */}
                            </div>
                        </div>

                        {/* Company Overview */}
                        <div className="bg-white p-6 text-gray-800 space-y-4">
                            <h2 className="text-lg text-gray-500 font-semibold mb-5">Company Overview</h2>

                            <p className="leading-relaxed">
                                <span className="font-medium">{companyData.companyname}</span>,
                                incorporated on{" "}
                                <span className="font-medium">{companyData.companyregistrationdate_date}</span>,
                                is a <span className="font-medium">{companyData.companycategory}</span> operating under the{" "}
                                <span className="font-medium">{companyData.companysubcategory}</span> category. Legally registered as a{" "}
                                <span className="font-medium">{companyData.companyclass}</span>, the company falls under the jurisdiction of the
                                Registrar of Companies, <span className="font-medium">{companyData.companyroccode}</span>. The official Corporate
                                Identification Number (CIN) is <span className="font-medium">{companyData.cin}</span>, and its current status is
                                recorded as <span className="font-medium">{companyData.companystatus}</span>. Established with compliance to
                                Indian corporate laws, the organization has maintained its presence as a{" "}
                                <span className="font-medium">{companyData.listingstatus}</span> entity.
                            </p>

                            <p className="leading-relaxed break-words">
                                The company is engaged in <span className="font-medium">{companyData.companyindustrialclassification}</span>,
                                with its primary operations identified under NIC code <span className="font-medium">{companyData.nic_code}</span>.
                                Its registered office is situated at{" "}
                                <span className="font-medium break-words">{companyData.registered_office_address}</span>, located in{" "}
                                <span className="font-medium">{companyData.companystatecode}</span>. Structurally, the company is recognized as{" "}
                                <span className="font-medium">{companyData['CompanyIndian/Foreign Company'] || 'Indian'}</span>, with financial backing that includes an
                                authorized capital of <span className="font-medium">₹{companyData.authorizedcapital}</span> and a paid-up capital of{" "}
                                <span className="font-medium">₹{companyData.paidupcapital}</span>.
                            </p>



                            <div className="btn btn-primary px-6 py-3 z-11 text-base font-medium items-center gap-2 w-fit">
                                <FaFile className="h-5 w-5" />
                                <ClientPurchaseButton
                                    companyData={companyData}
                                    label="Buy a Company Due-Diligence Report"
                                    bgColor="primary"
                                    overlay={1}
                                />
                            </div>
                        </div>

                        {/* Self Report Section */}
                        <div className="flex flex-col items-left text-left p-5">
                            <h2 className="text-xl font-semibold text-black mb-2">What is Self Company Report?</h2>
                            <h2 className="text-base text-gray-800 mb-4">
                                You may want to get a clear understanding of your company’s financial strength, trust score, and potential risks with a detailed credit report. It shows how buyers, investors, and partners perceive your business, helping you identify weaknesses, improve credibility, and confidently present your company for better deals and long-term growth.
                            </h2>
                            <button className="btn btn-md btn-warning shadow-2xl rounded-md px-5 w-fit">
                                <SelfReportButton />
                            </button>
                        </div>
                    </div>

                    {/* Right Banners */}
                    {/* <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 p-2">

                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                <p className="text-md font-semibold text-gray-300 leading-relaxed mb-4">
                                    View ownership and manage details
                                </p>

                                <ClaimButton company={companyData} label="Claim Your Company" />
                            </div>
                        </div>

                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                <p className="text-md font-semibold text-gray-300 leading-relaxed mb-4">
                                    Order a Comprehensive Business Information Report for detailed company insights
                                </p>
                                <div className="btn btn-primary px-6 py-3 text-base font-medium flex items-center gap-2">
                                    <FaFile className="h-5 w-5" />
                                    <ClientPurchaseButton companyData={companyData} label="Order Full Company Report" bgColor="primary" overlay={1} />
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                <p className="text-md font-semibold text-gray-300 leading-relaxed mb-4">
                                    Buy a Credit Report of your own company to boost credibility and trustworthiness.
                                </p>
                                <button className="btn btn-md btn-warning shadow-2xl rounded-md px-5 w-fit">
                                    <SelfReportButton label="Get Self Report" />
                                </button>
                            </div>
                        </div>


                    </div> */}


                    <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 p-2">

                        {/* Variation 2: Midnight Plum & Silk */}
                        <div className="relative w-full rounded-2xl p-6 bg-purple-100/50 border border-[#f3e8ff] shadow-xl flex flex-col justify-between overflow-hidden group">
                            {/* Dynamic Radial Glow */}
                            {/* <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-100 rounded-full blur-[80px]"></div> */}

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-[#4c1d95] leading-tight">
                                    Is this <br />
                                    <span className="text-slate-900 font-serif">your company?</span>
                                </h2>
                                <p className="text-slate-500 text-xs py-4 max-w-[260px] font-medium leading-relaxed">
                                    Customize this page with updated profile/product catalog/contact information for better reach.
                                </p>

                                <div className="flex flex-row items-center justify-start text-blue-600 text-xs leading-relaxed mb-4 max-w-[240px] font-medium">
                                    <a href="/sample-claimed-company" target="_blank" className="mr-1 text-blue-600 underline">
                                        Sample claim company page
                                    </a>
                                    <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                                    </svg>
                                </div>

                            </div>

                            <ClaimRedirect company={companyData}>

                                <button className="cursor-pointer group/btn relative w-fit flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-br from-[#581c87] to-[#2e1065] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-100 transition-all hover:shadow-purple-200 hover:brightness-110 active:scale-95">
                                    <span className="relative z-10">Claim Now</span>
                                    <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                                    </svg>
                                </button>

                            </ClaimRedirect>
                        </div>

                        {/* Banner 2: Deep Obsidian & Gold (Executive Variant) */}
                        <div className="relative w-full rounded-xl p-6 bg-[#0a0a0a] border-t-2 border-amber-500 shadow-2xl flex flex-col justify-between overflow-hidden group">

                            {/* 1. Background Architecture (Gold Technical Grid) */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{ backgroundImage: `linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

                            {/* Dynamic Radial Glow (Amber/Gold) */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] group-hover:bg-amber-600/20 transition-all duration-700"></div>

                            {/* 2. Abstract Security Mark (Gold Outline) */}
                            <div className="absolute top-8 right-8 text-white/5 group-hover:text-amber-500/10 transition-colors duration-500">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    {/* Document Outline */}
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* Data/Bar Chart inside the report */}
                                    <path d="M8 13v4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                                    <path d="M12 11v6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 15v2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                                </svg>
                            </div>

                            {/* 3. Main Content Section */}
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-amber-600 leading-tight tracking-tight">
                                    Self Company<br />
                                    <span className="text-orange-200"> Report</span>
                                </h2>

                                <p className="text-slate-400 text-xs leading-relaxed py-4 max-w-[240px] font-medium  ">
                                    Buy a Credit Report of your own company to boost credibility and trustworthiness.
                                </p>
                            </div>

                            {/* 4. Action Section */}
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="transform transition-transform active:scale-95">
                                    <button className="btn btn-md btn-warning shadow-2xl rounded-md px-5 w-fit">
                                        <SelfReportButton label="Get Self Report" />
                                    </button>
                                </div>

                            </div>

                            {/* Bottom Accent Line (Amber Gradient) */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
                        </div>

                        {/* Banner 3: Strategic Emerald & Graphite */}
                        <div className="relative w-full rounded-xl p-6 bg-[#0f1110] border-t-2 border-emerald-500 shadow-2xl flex flex-col justify-between overflow-hidden group transition-all duration-500 hover:shadow-emerald-900/20">

                            {/* 1. Background Architecture (Emerald Technical Grid) */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

                            {/* Dynamic Radial Glow (Emerald/Forest) */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                            {/* 2. Self Report SVG Mark */}
                            <div className="absolute top-8 right-8 text-white/5 group-hover:text-emerald-500/10 transition-colors duration-500">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 13v4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                                    <path d="M12 11v6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 15v2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                                </svg>
                            </div>

                            {/* 3. Main Content Section */}
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-emerald-500 leading-tight tracking-tight">
                                    Business<br />
                                    <span className="text-slate-100">Credit Report</span>
                                </h2>

                                <p className="text-slate-400 text-xs leading-relaxed py-4 max-w-[240px] font-medium ">
                                    Order a Comprehensive Business Information Report for detailed company insights.
                                </p>
                            </div>

                            {/* 4. Action Section */}
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="transform transition-transform active:scale-95">
                                    <ClientPurchaseButton
                                        companyData={companyData}
                                        label="Request Full Report"
                                        bgColor="emerald"
                                    />
                                </div>
                            </div>

                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                        </div>

                    </div>

                    {/* Bottom Fixed CTA */}
                    <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-between xl:justify-end items-center shadow-lg z-50">
                        <div className=" rounded-md px-2 text-base font-medium flex items-center gap-2">
                            <FaFile className="h-5 w-5" />
                            <ClientPurchaseButton
                                companyData={companyData}
                                label="Order Business Credit Report For This Company."
                                bgColor="gray"
                            />
                        </div>
                    </div>
                </div >

                {/* Bottom Info Section */}
                < div className="w-full px-4 py-8 bg-white space-y-6" >
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-600 mt-1" />
                        <p className="text-gray-700 leading-relaxed text-base">
                            Check basic information about a company and order a Freshly Investigated Company Credit Report to get detailed and verified insights about the business.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-600 mt-1" />
                        <p className="text-gray-700 leading-relaxed text-base">
                            GBR provides a comprehensive Business Credibility Report on any company—your suppliers, buyers, potential partners, or competitors—helping you make smarter business decisions.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Empowering Your Decisions with Freshly Investigated Reports and Insights
                        </h3>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-600 mt-1" />
                        <p className="text-gray-700 leading-relaxed text-base">
                            Get business insights into your suppliers, buyers, vendors, and competitors. Receive accurate, verified data and actionable insights to drive smarter business decisions.
                        </p>
                    </div>
                </div >
            </div >
        );

    }
};

export default CompanyPage;