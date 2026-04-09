"use client"

import { useEffect, useRef, useState } from "react"
import SelfReportButton from "@/components/SelfReportButton"
import ClientPurchaseButton from "@/utils/ClientPurchaseButton"
import { FaCalendarAlt, FaCheckCircle, FaFile, FaIndustry, FaUsers } from "react-icons/fa"

export default function EditedCompany({ govtData, editedValue }) {

    const [activeTab, setActiveTab] = useState("Overview")
    const contentRef = useRef(null)

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }, [activeTab])

    const company = {
        name: govtData?.companyname,
        logo: editedValue?.header?.logo || 'https://placehold.co/300x400?text=Logo',
        banner: editedValue?.header?.banner || 'https://plus.unsplash.com/premium_photo-1700251650989-ff25432c4b65?w=600',
        tagline: editedValue?.header?.tagline,
        location: "Chennai, India"
    }


    const stats = [
        {
            key: "founded",
            title: "Founded",
            value: editedValue?.stats?.founded,
            icon: <FaCalendarAlt className="text-blue-600 text-lg" />,
        },
        {
            key: "employees",
            title: "Employees",
            value: editedValue?.stats?.employees,
            icon: <FaUsers className="text-orange-600 text-lg" />,
        },
        {
            key: "industry",
            title: "Industry",
            value: govtData?.companyindustrialclassification,
            icon: <FaIndustry className="text-gray-600 text-lg" />,
        },
        {
            key: "status",
            title: "Status",
            value: govtData?.companystatus,
            icon: <FaCheckCircle className="text-green-600 text-lg" />,
        },
    ];



    return (

        <div className=" px-2 flex flex-col py-12 bg-gray-100 rounded-lg min-h-svh">

            <div className="max-w-6xl mx-auto">

                {/* Banner */}
                <div className="relative w-full h-[220px] md:h-[300px] rounded-lg overflow-hidden">
                    {/* Blurred Banner */}
                    <img
                        src={company.banner}
                        alt="banner"
                        className="w-full h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/80"></div>

                    {/* Company Info */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                        <img
                            src={company.logo}
                            alt="logo"
                            className="rounded-lg border-2 h-[70px] w-[70px] md:h-[100px] md:w-[100px] mb-4 object-cover"
                        />
                        <h1 className="text-white text-xl md:text-4xl font-semibold tracking-wider">
                            {company.name}
                        </h1>
                        <p className="text-gray-200 text-sm md:text-base">{company.tagline}</p>
                    </div>
                </div>

                {/* stats */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 py-2 md:py-2">
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className={`bg-gray-50  rounded-xl p-5 ${item.value ? 'flex' : 'hidden'}  flex-col gap-3`}
                        >
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                {item.icon}
                                <span>{item.title}</span>
                            </div>

                            <div className="text-lg md:text-xl font-semibold text-gray-900">
                                {item.value}
                            </div>
                        </div>
                    ))}
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

                                            {[
                                                "Overview",
                                                editedValue?.about?.content && "about",
                                                editedValue?.services.length > 0 && "services",
                                                "Business-Report",
                                                editedValue?.contact && "contact"
                                            ]
                                                .filter(Boolean) // ✅ removes false, null, undefined, empty string
                                                .map((tab) => (

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

                                        {/* govt details */}
                                        <div className=" rounded-lg  max-w-4xl mx-auto">
                                            <h2 className="text-xl text-black font-semibold mb-4">
                                                Company Details</h2>

                                            <div className=" rounded-lg  max-w-4xl mx-auto">

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">CIN:</span>
                                                        <span className="text-gray-900">{govtData?.cin}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">State Code:</span>
                                                        <span className="text-gray-900">{govtData?.companystatecode}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Status:</span>
                                                        <span className="text-gray-900">{govtData?.companystatus}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Category:</span>
                                                        <span className="text-gray-900">{govtData?.companycategory}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Sub Category:</span>
                                                        <span className="text-gray-900">{govtData?.companysubcategory}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Class:</span>
                                                        <span className="text-gray-900">{govtData?.companyclass}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">ROC Code:</span>
                                                        <span className="text-gray-900">{govtData?.companyroccode}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Listing Status:</span>
                                                        <span className="text-gray-900">{govtData?.listingstatus}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">NIC Code:</span>
                                                        <span className="text-gray-900">{govtData?.nic_code}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Incorporation Date:</span>
                                                        <span className="text-gray-900">{govtData?.companyregistrationdate_date}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Industrial Classification:</span>
                                                        <span className="text-gray-900">{govtData?.companyindustrialclassification}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Indian/Foreign:</span>
                                                        <span className="text-gray-900">{govtData['CompanyIndian/Foreign Company'] || 'Indian'}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Paid-up Capital:</span>
                                                        <span className="text-gray-900">{govtData?.paidupcapital}</span>
                                                    </div>
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Authorized Capital:</span>
                                                        <span className="text-gray-900">{govtData?.authorizedcapital}</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                                                        <span className="font-medium text-gray-500">Registered Address:</span>
                                                        <span className="text-gray-900">{govtData?.registered_office_address}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Company Overview */}
                                        <div className="  text-gray-800 space-y-4 rounded-lg shadow-none">

                                            <p className="leading-relaxed">
                                                <span className="font-medium">{govtData?.companyname}</span>,
                                                incorporated on{" "}
                                                <span className="font-medium">{govtData?.companyregistrationdate_date}</span>,
                                                is a <span className="font-medium">{govtData?.companycategory}</span> operating under the{" "}
                                                <span className="font-medium">{govtData?.companysubcategory}</span> category. Legally registered as a{" "}
                                                <span className="font-medium">{govtData?.companyclass}</span>, the company falls under the jurisdiction of the
                                                Registrar of Companies, <span className="font-medium">{govtData?.companyroccode}</span>. The official Corporate
                                                Identification Number (CIN) is <span className="font-medium">{govtData?.cin}</span>, and its current status is
                                                recorded as <span className="font-medium">{govtData?.companystatus}</span>. Established with compliance to
                                                Indian corporate laws, the organization has maintained its presence as a{" "}
                                                <span className="font-medium">{govtData?.listingstatus}</span> entity.
                                            </p>

                                            <p className="leading-relaxed break-words">
                                                The company is engaged in <span className="font-medium">{govtData?.companyindustrialclassification}</span>,
                                                with its primary operations identified under NIC code <span className="font-medium">{govtData?.nic_code}</span>.
                                                Its registered office is situated at{" "}
                                                <span className="font-medium break-words">{govtData?.registered_office_address}</span>, located in{" "}
                                                <span className="font-medium">{govtData?.companystatecode}</span>. Structurally, the company is recognized as{" "}
                                                <span className="font-medium">{govtData['CompanyIndian/Foreign Company'] || 'Indian'}</span>, with financial backing that includes an
                                                authorized capital of <span className="font-medium">₹{govtData?.authorizedcapital}</span> and a paid-up capital of{" "}
                                                <span className="font-medium">₹{govtData?.paidupcapital}</span>.
                                            </p>


                                            <div className="btn btn-primary px-6 py-3 z-11 text-base font-medium items-center gap-2 w-fit">
                                                <FaFile className="h-5 w-5" />
                                                <ClientPurchaseButton
                                                    companyData={govtData} // not needed for static
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

                                    <div className="py-8 px-2 md:py-10 max-w-5xl space-y-8 md:space-y-10"
                                    >

                                        {/* Intro */}
                                        <div>
                                            <h2 className="text-xl text-black font-semibold mb-4">
                                                About Company
                                            </h2>

                                            <p className="text-gray-600 leading-relaxed">
                                                {editedValue?.about?.content}
                                            </p>


                                        </div>

                                    </div>

                                )}

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

                                {activeTab === "services" && (

                                    <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                        <div>
                                            <h2 className="text-xl text-black font-semibold mb-4">
                                                Our Services
                                            </h2>

                                            {editedValue?.services.map((service, i) => (

                                                <div key={i} className=" rounded-lg bg-gray-50 p-5">

                                                    <h3 className="font-semibold text-black">
                                                        {service.title}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-2">
                                                        {service.description}
                                                    </p>

                                                </div>

                                            ))}

                                        </div>
                                    </div>

                                )}

                                {activeTab === "contact" && (

                                    <div className="py-8 ">

                                        <h2 className="text-xl font-semibold text-black mb-6">
                                            Contact Information
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600">
                                            <div className=" rounded-lg p-4 ">
                                                <p className="font-medium text-black mb-1">Address</p>
                                                <p>
                                                    {govtData?.registered_office_address}
                                                </p>
                                            </div>


                                            {
                                                editedValue?.contact?.phone &&
                                                <div className=" rounded-lg p-4 ">
                                                    <p className="font-medium text-black mb-1">Phone</p>
                                                    <p>+{editedValue?.contact.phone}</p>
                                                </div>
                                            }

                                            {
                                                editedValue?.contact?.email &&
                                                <div className=" rounded-lg p-4 ">
                                                    <p className="font-medium text-black mb-1">Email</p>
                                                    <p>{editedValue?.contact.email}</p>
                                                </div>
                                            }


                                            {
                                                editedValue?.contact?.website &&
                                                <div className="rounded-lg p-4 ">
                                                    <p className="font-medium text-black mb-1">Website</p>
                                                    <p>{editedValue?.contact.website}</p>
                                                </div>
                                            }

                                            {
                                                editedValue?.contact?.workingHours &&
                                                <div className="rounded-lg p-4  md:col-span-2">
                                                    <p className="font-medium text-black mb-1">Working Hours</p>
                                                    <p>{editedValue?.contact.workingHours}</p>
                                                </div>
                                            }
                                        </div>

                                    </div>

                                )}

                            </div>
                        </div>

                    </div>

                    <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 px-2 py-10">

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
                                    {/* Custom Button Style: Sharp Emerald */}
                                    <ClientPurchaseButton
                                        companyData={govtData}
                                        label="Request Full Report"
                                        bgColor="emerald"
                                        className="!bg-blue-600 !hover:bg-blue-700 !text-white !rounded-none !px-6 !py-3 !text-[10px] !uppercase !tracking-widest !font-bold !transition-all"
                                    />
                                </div>
                            </div>

                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                        </div>

                    </div>



                </div>


            </div>

        </div>


    )
}