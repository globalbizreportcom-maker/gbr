"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiUrl } from "@/api/api";
import { useDashboard } from "../../DashboardContext";
import { FaCalendarAlt, FaCheckCircle, FaFile, FaIndustry, FaInfo, FaUsers } from "react-icons/fa"
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
import SelfReportButton from "@/components/SelfReportButton";
import CompanyAboutEdit from "../components/CompanyAboutEdit";
import CompanyServicesEdit from "../components/CompanyServicesEdit";
import CompanyStatsEdit from "../components/CompanyStatsEdit";
import CompanyContactEdit from "../components/CompanyContactEdit";
import CompanyHeaderEdit from "../components/CompanyHeaderEdit";

export default function DedicatedCompany() {

    const { user } = useDashboard();
    const { companyId } = useParams(); // CIN from route
    const router = useRouter();

    const [companyData, setCompanyData] = useState(null);
    const [editableCompanyState, setEditableCompanyState] = useState({});

    const [loading, setLoading] = useState(false);

    const [activeTab, setActiveTab] = useState("Overview")
    const contentRef = useRef(null);

    let fetchError = null;

    useEffect(() => {

        const userId = user?._id

        const fetchEditableData = async () => {


            try {
                const res = await apiUrl.get("/user/company-edit", {
                    params: {
                        companyId,
                        userId,
                    },
                });

                const data = res.data;

                // Normalize structure for frontend usage
                setEditableCompanyState({
                    about: data?.about?.content || "",
                    header: data?.header || {},
                    stats: data?.stats || {},
                    services: data?.services || [],
                    contact: data?.contact || {},
                });

            } catch (err) {
                console.error("Failed to fetch editable data", err);
            }
        };

        if (companyId && userId) {
            fetchEditableData();
        }
    }, [companyId, user?._id]);


    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }, [activeTab])

    useEffect(() => {

        let fetchError = null;
        const userId = user?._id;

        async function fetchCompany() {

            try {

                setLoading(true);

                if (!userId) {
                    // If userId is missing, redirect immediately
                    router.replace("/claimed-companies");
                    return;
                }

                // ✅ Send CIN + userId to backend
                const response = await apiUrl.post(`/user/company-verify`, {
                    companyId,
                    userId,
                });

                const data = response.data;

                if (data) {
                    const res = await fetch(
                        `https://backend.globalbizreport.com/api/company-details?cin=${companyId}`,
                        { cache: "no-store" }
                    );

                    const result = await res.json();

                    if (!res.ok) {
                        fetchError = `Failed to fetch company details: ${res.status}`;
                    } else if (result.data) {

                        const pg = result.data.postgres; // PostgreSQL company data
                        setCompanyData(pg);

                    }

                }

                // 2️⃣ Check payment & claim status returned from backend
                if (!data || data.paymentStatus !== "paid" || data.claimStatus !== "approved") {
                    router.replace("/claimed-companies"); // redirect if invalid
                    return;
                }

            } catch (err) {
                console.log("Error fetching company:", err);
                // router.replace("/claimed-companies"); // redirect on error
            } finally {
                setLoading(false);
            }
        }

        if (userId && companyId) {
            fetchCompany();

        }

    }, [router, user?._id, companyId]);

    if (loading) {
        return (
            <div className="p-2 space-y-6 animate-pulse w-full max-w-5xl mx-auto">

                {/* Banner Skeleton */}
                <div className="border border-gray-200 rounded-xl h-40 bg-gray-200" />

                {/* Tabs Skeleton */}
                <div className="flex gap-4">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div
                            key={i}
                            className="h-10 w-24 bg-gray-200 rounded-md"
                        />
                    ))}
                </div>

                {/* Tab Content Card Skeleton */}
                <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                    <div className="h-5 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>

            </div>
        );
    }


    return (
        <div className=" px-2 flex flex-col py-2 bg-gray-100 rounded-lg min-h-svh">

            <div className="max-w-6xl mx-auto">

                {
                    companyData &&
                    <>
                        {/* Banner */}
                        <CompanyHeaderEdit
                            initialHeader={editableCompanyState.header}
                            companyName={companyData.companyname}
                            onSave={async (updatedHeader) => {

                                const formData = new FormData();

                                formData.append("tagline", updatedHeader.tagline || "");
                                formData.append("location", updatedHeader.location || "");

                                // Only append if file exists
                                if (updatedHeader.logoFile) {
                                    formData.append("logo", updatedHeader.logoFile);
                                }

                                if (updatedHeader.bannerFile) {
                                    formData.append("banner", updatedHeader.bannerFile);
                                }

                                try {
                                    await apiUrl.patch(
                                        `/user/update/header/company-details/${companyData.cin}`,
                                        formData,
                                        {
                                            headers: {
                                                "Content-Type": "multipart/form-data"
                                            }
                                        }
                                    );
                                } catch (err) {
                                    console.log("Header update failed", err);
                                }
                            }}
                        />

                        {/* stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 py-2 md:py-2">

                            <CompanyStatsEdit
                                initialStats={editableCompanyState.stats}
                                govtData={companyData}
                                onSave={async (updatedStats) => {

                                    // ✅ optimistic UI update
                                    setEditableCompanyState((prev) => ({
                                        ...prev,
                                        stats: updatedStats,
                                    }));

                                    try {
                                        await apiUrl.patch(
                                            `/user/update/company-details/${companyData.cin}`,
                                            {
                                                stats: updatedStats
                                            }
                                        );

                                    } catch (error) {
                                        console.log("Failed to update stats", error);
                                        setEditableCompanyState((prev) => ({
                                            ...prev,
                                            stats: prev.stats,
                                        }));
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-6 gap-y-5">

                            {/* tabs */}

                            <div className="md:col-span-3">
                                <div className="w-full max-w-5xl mx-auto min-h-screen">

                                    <div ref={contentRef} className="mt-10">

                                        {/* tabs */}
                                        <div className="sticky top-0 z-30 bg-gray-100 rounded-lg py-2">

                                            <div className=" px-1 py-2 rounded-lg overflow-x-auto no-scrollbar">

                                                <div className="flex gap-1 text-sm font-medium w-max">

                                                    {["Overview", "about", "services", "Business-Report", "contact"].map((tab) => (

                                                        <button
                                                            key={tab}
                                                            onClick={() => setActiveTab(tab)}
                                                            className={`px-4 py-2 cursor-pointer rounded-md capitalize whitespace-nowrap transition-all duration-200
            ${activeTab === tab
                                                                    ? "bg-gray-700 text-white shadow-sm"
                                                                    : "text-gray-600 bg-white border border-gray-100 hover:text-gray-900 hover:bg-gray-200"
                                                                }`}
                                                        >
                                                            {tab.replace("-", " ")}
                                                        </button>

                                                    ))}

                                                </div>

                                            </div>

                                        </div>

                                        {/* Overview */}
                                        {activeTab === "Overview" && (

                                            <div className="py-8 px-2 md:py-10 max-w-5xl space-y-8 md:space-y-10">

                                                <div className="flex items-center gap- text-yellow-700 text-sm px-3 py-2 rounded-md">
                                                    <span><FaInfo /></span>
                                                    <span>This section is not editable.</span>
                                                </div>

                                                {/* govt details */}
                                                <div className=" rounded-lg  max-w-4xl mx-auto">
                                                    <h2 className="text-xl text-black font-semibold mb-4">
                                                        Company Details</h2>

                                                    <div className="rounded-lg max-w-4xl mx-auto">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                            {/* CIN */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">CIN:</span>
                                                                <span className="text-gray-900">{companyData.cin}</span>
                                                            </div>

                                                            {/* State Code */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">State Code:</span>
                                                                <span className="text-gray-900">{companyData.companystatecode}</span>
                                                            </div>

                                                            {/* Category */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Category:</span>
                                                                <span className="text-gray-900">{companyData.companycategory}</span>
                                                            </div>

                                                            {/* Sub Category */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Sub Category:</span>
                                                                <span className="text-gray-900">{companyData.companysubcategory}</span>
                                                            </div>

                                                            {/* Class */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Class:</span>
                                                                <span className="text-gray-900">{companyData.companyclass}</span>
                                                            </div>

                                                            {/* ROC Code */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">ROC Code:</span>
                                                                <span className="text-gray-900">{companyData.companyroccode}</span>
                                                            </div>

                                                            {/* Listing Status */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Listing Status:</span>
                                                                <span className="text-gray-900">{companyData.listingstatus}</span>
                                                            </div>

                                                            {/* NIC Code */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">NIC Code:</span>
                                                                <span className="text-gray-900">{companyData.nic_code}</span>
                                                            </div>

                                                            {/* Incorporation Date */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Incorporation Date:</span>
                                                                <span className="text-gray-900">{companyData.companyregistrationdate_date}</span>
                                                            </div>

                                                            {/* Industrial Classification */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Industrial Classification:</span>
                                                                <span className="text-gray-900">{companyData.companyindustrialclassification}</span>
                                                            </div>

                                                            {/* Indian/Foreign */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Indian/Foreign:</span>
                                                                <span className="text-gray-900">
                                                                    {companyData.CompanyIndianForeignCompany || "N/A"}
                                                                </span>
                                                            </div>

                                                            {/* Paid-up Capital */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Paid-up Capital:</span>
                                                                <span className="text-gray-900">
                                                                    ₹{Number(companyData.paidupcapital).toLocaleString()}
                                                                </span>
                                                            </div>

                                                            {/* Authorized Capital */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md">
                                                                <span className="font-medium text-gray-500">Authorized Capital:</span>
                                                                <span className="text-gray-900">
                                                                    ₹{Number(companyData.authorizedcapital).toLocaleString()}
                                                                </span>
                                                            </div>

                                                            {/* Registered Address (Full Width on Desktop) */}
                                                            <div className="flex flex-col md:flex-row md:justify-between bg-gray-50 p-3 rounded-md md:col-span-2">
                                                                <span className="font-medium text-gray-500">Registered Office Address:</span>
                                                                <span className="text-gray-900 break-words">
                                                                    {companyData.registered_office_address}
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Company Overview */}
                                                <div className="  text-gray-800 space-y-4 rounded-lg shadow-none">

                                                    <p className="leading-relaxed">
                                                        <span className="font-medium">AGMAATHEY HOSPITALITY PRIVATE LIMITED</span>,
                                                        incorporated on <span className="font-medium">2018-05-08</span>,
                                                        is a <span className="font-medium">Company limited by shares</span> operating under the
                                                        <span className="font-medium"> Non-government company</span> category. Legally registered as a
                                                        <span className="font-medium"> Private</span>, the company falls under the jurisdiction of the
                                                        Registrar of Companies, <span className="font-medium">ROC Andaman</span>. The official Corporate
                                                        Identification Number (CIN) is <span className="font-medium">U55204AN2018PTC005404</span>, and its current status is
                                                        recorded as <span className="font-medium">Active</span>. Established with compliance to
                                                        Indian corporate laws, the organization has maintained its presence as an
                                                        <span className="font-medium"> Unlisted</span> entity.
                                                    </p>

                                                    <p className="leading-relaxed break-words">
                                                        The company is engaged in <span className="font-medium">Trading</span>,
                                                        with its primary operations identified under NIC code <span className="font-medium">55204</span>.
                                                        Its registered office is situated at{" "}
                                                        <span className="font-medium break-words">
                                                            HOUSE NO-MB 31, M A ROAD PHOENIX BAY, PORT BLAIR, Andaman Islands, Andaman and Nicobar Islands, 744101-India
                                                        </span>, located in <span className="font-medium">Andaman and Nicobar Islands</span>.
                                                        Structurally, the company is recognized as <span className="font-medium">Indian</span>, with financial backing that includes an
                                                        authorized capital of <span className="font-medium">₹1,000,000.00</span> and a paid-up capital of
                                                        <span className="font-medium"> ₹900,000.00</span>.
                                                    </p>

                                                    <div className="btn btn-primary px-6 py-3 z-11 text-base font-medium items-center gap-2 w-fit">
                                                        <FaFile className="h-5 w-5" />
                                                        <ClientPurchaseButton
                                                            // companyData={companyData} // not needed for static
                                                            label="Buy a Company Due-Diligence Report"
                                                            bgColor="primary"
                                                            overlay={1}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Self Report Section */}
                                                <div className="flex flex-col items-left text-left mt-6">
                                                    <h2 className="text-xl font-semibold text-black mb-2">What is Self Company Report?</h2>
                                                    <p className="text-base text-gray-800 mb-4">
                                                        You may want to get a clear understanding of your company’s financial strength, trust score, and potential risks with a detailed credit report.
                                                        It shows how buyers, investors, and partners perceive your business, helping you identify weaknesses, improve credibility, and confidently present your company for better deals and long-term growth.
                                                    </p>
                                                    <button className="btn btn-md btn-warning shadow-2xl rounded-md px-5 w-fit">
                                                        <SelfReportButton />
                                                    </button>
                                                </div>

                                            </div>

                                        )}

                                        {/* ABOUT */}
                                        {activeTab === "about" && (

                                            <CompanyAboutEdit
                                                initialContent={editableCompanyState.about}
                                                onSave={async (updatedAbout) => {

                                                    // 1️⃣ Update local state (instant UI update)
                                                    setEditableCompanyState((prev) => ({
                                                        ...prev,
                                                        about: updatedAbout,
                                                    }));

                                                    try {
                                                        await apiUrl.patch(
                                                            `/user/update/company-details/${companyData.cin}`, // ✅ use lowercase
                                                            {
                                                                about: updatedAbout
                                                            }
                                                        );

                                                    } catch (error) {
                                                        console.log("Failed to update about section", error);

                                                        setEditableCompanyState((prev) => ({
                                                            ...prev,
                                                            about: initialContent,
                                                        }));
                                                    }
                                                }}
                                            />

                                        )}

                                        {/* BUSINESS REPORT */}
                                        {activeTab === "Business-Report" && (

                                            <div className="w-full px-4 py-8  space-y-6">

                                                <div className="flex items-start gap-3">
                                                    <FaCheckCircle className="text-gray-600 mt-1" />
                                                    <p className="text-gray-700 leading-relaxed text-base">
                                                        Check basic information about a company and order a Freshly Investigated Company Credit Report
                                                        to get detailed and verified insights about the business.
                                                    </p>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <FaCheckCircle className="text-gray-600 mt-1" />
                                                    <p className="text-gray-700 leading-relaxed text-base">
                                                        GBR provides a comprehensive Business Credibility Report on any company—your suppliers, buyers,
                                                        potential partners, or competitors—helping you make smarter business decisions.
                                                    </p>
                                                </div>


                                                <div
                                                    className="btn btn-primary shadow-none px-6 py-3 z-11 text-base font-medium  items-center gap-2 w-fit"
                                                >
                                                    <FaFile className="h-5 w-5" />
                                                    <ClientPurchaseButton label='Buy a Company Due-Diligence Report' bgColor='primary' overlay={1} />
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        Empowering Your Decisions with Freshly Investigated Reports and Insights
                                                    </h3>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <FaCheckCircle className="text-gray-600 mt-1" />
                                                    <p className="text-gray-700 leading-relaxed text-base">
                                                        Get business insights into your suppliers, buyers, vendors, and competitors.
                                                        Receive accurate, verified data and actionable insights to drive smarter business decisions.
                                                    </p>
                                                </div>



                                            </div>
                                        )}

                                        {/* SERVICES */}
                                        {activeTab === "services" && (

                                            <CompanyServicesEdit
                                                initialServices={editableCompanyState.services}
                                                onSave={async (updatedServices) => {
                                                    setEditableCompanyState((prev) => ({
                                                        ...prev,
                                                        services: updatedServices,
                                                    }));

                                                    try {
                                                        await apiUrl.patch(
                                                            `/user/update/company-details/${companyData.cin}`,
                                                            {
                                                                services: updatedServices
                                                            }
                                                        );

                                                    } catch (error) {
                                                        console.log("Failed to update about section", error);

                                                        setEditableCompanyState((prev) => ({
                                                            ...prev,
                                                            about: initialContent,
                                                        }));
                                                    }

                                                }}
                                            />


                                        )}

                                        {/* CONTACT */}
                                        {activeTab === "contact" && (

                                            <CompanyContactEdit
                                                initialContact={editableCompanyState.contact}
                                                govtData={companyData}
                                                onSave={async (updatedContact) => {

                                                    setEditableCompanyState(prev => ({
                                                        ...prev,
                                                        contact: updatedContact
                                                    }));

                                                    try {
                                                        await apiUrl.patch(
                                                            `/user/update/company-details/${companyData.cin}`,
                                                            { contact: updatedContact }
                                                        );
                                                    } catch (err) {
                                                        console.log("Failed to update contact", err);
                                                    }
                                                }}
                                            />

                                        )}

                                    </div>
                                </div>

                            </div>

                            <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 px-2 py-10">

                                {/* --- BANNER 1 --- */}
                                <div
                                    className="relative rounded-2xl w-full overflow-hidden"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>

                                    {/* Content */}
                                    <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                        <p className="text-md font-semibold leading-relaxed mb-4 text-gray-300">
                                            Order a Comprehensive Business Information Report for detailed company insights
                                        </p>

                                        <div className="btn btn-primary px-1 py-3 text-base font-medium flex items-center gap-2">
                                            <FaFile className="h-5 w-5" />
                                            <ClientPurchaseButton
                                                // companyData={companyData}
                                                label="Full Company Report"
                                                bgColor="primary"
                                                overlay={1}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* --- BANNER 2 --- */}
                                <div
                                    className="relative rounded-2xl w-full overflow-hidden"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>

                                    {/* Content */}
                                    <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                        <p className="text-md font-semibold leading-relaxed mb-4 text-gray-300">
                                            Buy a Credit Report of your own company to boost credibility and trustworthiness.
                                        </p>

                                        <button className="btn btn-md btn-warning border-none rounded-md shadow-none px-5 w-fit">
                                            <SelfReportButton label="Get Self Report" />
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </>
                }

            </div>

        </div >
    );
}