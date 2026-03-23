"use client"

import { useEffect, useRef, useState } from "react"
import SelfReportButton from "@/components/SelfReportButton"
import ClientPurchaseButton from "@/utils/ClientPurchaseButton"
import { FaCalendarAlt, FaCheckCircle, FaFile, FaIndustry, FaUsers } from "react-icons/fa"

export default function EditedCompany({ govtData, editedValue }) {

    console.log(govtData);
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
                                        companyData={govtData}
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


            </div>

        </div>


    )
}