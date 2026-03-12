"use client"

import { useEffect, useRef, useState } from "react"
import SelfReportButton from "@/components/SelfReportButton"
import ClientPurchaseButton from "@/utils/ClientPurchaseButton"
import { FaCalendarAlt, FaCheckCircle, FaFile, FaIndustry, FaUsers } from "react-icons/fa"

export default function Page() {

    const [activeTab, setActiveTab] = useState("about")
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
        name: "Techcent Innovations",
        logo: "https://images.pexels.com/photos/13748756/pexels-photo-13748756.jpeg",
        banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
        tagline: "Innovative Business Solutions",
        location: "Chennai, India"
    }

    const services = [
        {
            title: "UI/UX Design",
            description: "Modern and user-friendly product designs"
        },
        {
            title: "Brand Identity",
            description: "Logo, color system and branding solutions"
        },
        {
            title: "Web Applications",
            description: "Scalable web apps using modern frameworks"
        }
    ]

    const stats = [
        {
            title: "Founded",
            value: "2018",
            icon: <FaCalendarAlt className="text-gray-600 text-lg" />,
        },
        {
            title: "Employees",
            value: "50+",
            icon: <FaUsers className="text-gray-600 text-lg" />,
        },
        {
            title: "Industry",
            value: "IT Services",
            icon: <FaIndustry className="text-gray-600 text-lg" />,
        },
        {
            title: "Status",
            value: "Active",
            icon: <FaCheckCircle className="text-gray-600 text-lg" />,
        },
    ]


    return (

        <div className=" px-2 flex flex-col py-12 md:py-20 bg-gray-100 rounded-lg min-h-svh">

            <div className="max-w-6xl mx-auto">

                {/* Banner */}
                <div className="relative h-[280px] w-full">

                    <img
                        src={company.banner}
                        alt="banner"
                        className="w-full h-full object-cover rounded-lg"
                    />

                    <div className="absolute inset-0 rounded-lg bg-black/30"></div>

                    {/* Company Info */}
                    <div className="absolute bottom-[-30px] md:bottom-[-50px] left-10 flex items-center gap-5">

                        <div className="bg-white rounded-xl p-1 md:p-2">
                            <img
                                src={company.logo}
                                alt="logo"
                                className="rounded-lg h-[50px] w-[50px] md:h-[90px] md:w-[90px] object-cover"
                            />
                        </div>

                        <div className="text-white">
                            <h1 className="text-xl md:text-3xl font-semibold mb-2">{company.name}</h1>
                            <p className="text-sm opacity-90 text-gray-600">{company.tagline}</p>
                        </div>

                    </div>

                </div>

                {/* stats */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20 py-2 md:py-10">
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-50  rounded-xl p-5 flex flex-col gap-3 "
                        >
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                {item.icon}
                                <span>{item.title}</span>
                            </div>

                            <div className="text-lg font-semibold text-gray-900">
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

                                    <div className=" px-1 rounded-lg overflow-x-auto">

                                        <div className="flex gap-1 text-sm font-medium w-max">

                                            {["about", "services", "Business-Report", "contact"].map((tab) => (

                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`px-4 py-2 cursor-pointer rounded-md capitalize whitespace-nowrap transition-all duration-200
                ${activeTab === tab
                                                            ? "bg-gray-700 text-white shadow-sm"
                                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {tab.replace("-", " ")}
                                                </button>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                                {/* ABOUT */}
                                {activeTab === "about" && (

                                    <div className="py-8 px-2 md:py-10 max-w-5xl space-y-8 md:space-y-10">
                                        {/* Intro */}
                                        <div>
                                            <h2 className="text-2xl text-black font-semibold mb-4">
                                                About Company
                                            </h2>

                                            <p className="text-gray-600 leading-relaxed">
                                                Techcent Innovations is a modern technology and digital solutions
                                                company dedicated to helping businesses grow and succeed in an
                                                increasingly digital world. Our mission is to combine creativity,
                                                strategy, and technology to build powerful digital experiences
                                                that deliver measurable business results.
                                            </p>

                                            <p className="text-gray-600 leading-relaxed mt-4">
                                                From startups to established enterprises, we partner with
                                                organizations to transform ideas into scalable digital products.
                                                Our team of developers, designers, and digital specialists work
                                                collaboratively to deliver solutions that are reliable,
                                                user-focused, and future-ready.
                                            </p>
                                        </div>


                                        {/* Services / Expertise */}
                                        <div>

                                            <h3 className="text-xl font-semibold text-black mb-5">
                                                Our Expertise
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                <div className=" rounded-lg p-5 bg-gray-50">
                                                    <h4 className="font-semibold text-black mb-2">
                                                        Web Development
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Building fast, responsive, and scalable websites and
                                                        applications using modern technologies like React,
                                                        Next.js, and cloud-based architectures.
                                                    </p>
                                                </div>

                                                <div className=" rounded-lg p-5 bg-gray-50">
                                                    <h4 className="font-semibold text-black mb-2">
                                                        Branding & Design
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Creating meaningful brand identities, visual systems,
                                                        and digital experiences that help businesses connect
                                                        with their audiences effectively.
                                                    </p>
                                                </div>

                                                <div className=" rounded-lg p-5 bg-gray-50">
                                                    <h4 className="font-semibold text-black mb-2">
                                                        Digital Marketing
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Helping brands grow their online presence through
                                                        strategic marketing, SEO, social media campaigns,
                                                        and performance-driven advertising.
                                                    </p>
                                                </div>

                                            </div>

                                        </div>


                                        {/* Mission + Vision */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                            <div className=" rounded-lg p-6 bg-gray-50">
                                                <h3 className="font-semibold text-black mb-3">
                                                    Our Mission
                                                </h3>

                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    To empower businesses with innovative technology solutions
                                                    that simplify operations, enhance digital presence, and
                                                    create long-term value for customers.
                                                </p>
                                            </div>

                                            <div className=" rounded-lg p-6 bg-gray-50">
                                                <h3 className="font-semibold text-black mb-3">
                                                    Our Vision
                                                </h3>

                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    To become a trusted global technology partner known for
                                                    creativity, reliability, and delivering impactful digital
                                                    products that help businesses thrive.
                                                </p>
                                            </div>

                                        </div>


                                        {/* Location */}
                                        <div className="text-sm text-gray-500">
                                            Location: {company.location}
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


                                        <div className="flex flex-col items-left text-left   ">

                                            <h2 className="text-xl font-semibold text-black mb-2">What is Self Company Report?</h2>

                                            <h2 className="text-base text-gray-800  mb-4">
                                                You may want to get a clear understanding of your company’s financial strength, trust score, and potential risks with a detailed credit report. It shows how buyers, investors, and partners perceive your business, helping you identify weaknesses, improve credibility, and confidently present your company for better deals and long-term growth.
                                            </h2>

                                            <button className="btn btn-md btn-warning shadow-none rounded-md px-5 w-fit">

                                                <SelfReportButton />

                                            </button>
                                        </div>


                                    </div>
                                )}

                                {activeTab === "services" && (

                                    <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                        {services.map((service, i) => (

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

                                )}

                                {activeTab === "contact" && (

                                    <div className="py-8 ">

                                        <h2 className="text-xl font-semibold text-black mb-6">
                                            Contact Information
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600">
                                            <div className=" rounded-lg p-4 bg-gray-50">
                                                <p className="font-medium text-black mb-1">Address</p>
                                                <p>
                                                    Techcent Innovations Pvt Ltd<br />
                                                    5th Floor, Olympia Tech Park<br />
                                                    Guindy Industrial Estate<br />
                                                    Chennai, Tamil Nadu 600032<br />
                                                    India
                                                </p>
                                            </div>

                                            <div className=" rounded-lg p-4 bg-gray-50">
                                                <p className="font-medium text-black mb-1">Phone</p>
                                                <p>+91 98765 43210</p>
                                            </div>

                                            <div className=" rounded-lg p-4 bg-gray-50">
                                                <p className="font-medium text-black mb-1">Email</p>
                                                <p>contact@techcent.in</p>
                                            </div>

                                            <div className="rounded-lg p-4 bg-gray-50">
                                                <p className="font-medium text-black mb-1">Website</p>
                                                <p>www.techcent.in</p>
                                            </div>

                                            <div className="rounded-lg p-4 bg-gray-50 md:col-span-2">
                                                <p className="font-medium text-black mb-1">Working Hours</p>
                                                <p>Monday – Friday : 9:30 AM – 6:30 PM</p>
                                            </div>

                                        </div>

                                    </div>

                                )}

                            </div>
                        </div>

                    </div>

                    <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 px-2 py-10">

                        {/* --- BANNER 1 --- */}

                        {/* Content */}
                        <div className="relative z-10 text-left p-5 flex flex-col items-start bg-gray-200  rounded-2xl" >
                            {/* <FaFile className= "text-white text-5xl mb-4 opacity-80" /> */}

                            <p className="text-md font-semibold leading-relaxed mb-4 text-gray-600">
                                Order a Comprehensive Business Information Report for detailed company insights
                            </p>

                            <div className="btn btn-primary px-1 py-3 text-base font-medium  flex items-center gap-2">
                                <FaFile className="h-5 w-5" />
                                <ClientPurchaseButton
                                    // companyData={companyData}
                                    label="Full Company Report  "
                                    bgColor="primary"
                                    overlay={1}
                                />
                            </div>
                        </div>

                        {/* --- BANNER 2  --- */}

                        {/* Content */}
                        <div className="relative z-10 text-left p-5 flex flex-col items-start bg-gray-200 rounded-2xl" >
                            {/* <FaUserAlt className="text-white text-5xl mb-4 opacity-80" /> */}

                            <p className="text-md font-semibold leading-relaxed mb-4 text-gray-600">
                                Buy a Credit Report of your own company to boost
                                credibility and trustworthiness.
                            </p>

                            <button className="btn btn-md btn-warning border-none rounded-md shadow-none px-5 w-fit">

                                <SelfReportButton label="Get Self Report" />

                            </button>
                        </div>


                    </div>



                </div>


            </div>

        </div>


    )
}