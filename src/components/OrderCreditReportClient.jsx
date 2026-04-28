"use client";

import OrderCreditReport from "@/components/OrderCreditReport";
import React, { useRef, useState } from "react";
import { FaGlobe, FaBolt, FaTrophy, FaCheckCircle, FaLock, FaStar, FaChevronRight, FaMoneyBill, FaFile, FaGlobeAsia, FaShieldAlt, FaInfo, FaUserCheck, FaFileAlt, FaBuilding } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Testimonials from "./Testimonials";
import Image from "next/image";




const OrderCreditReportClient = () => {

    const router = useRouter();
    const formRef = useRef(null);

    const handleScrollToForm = () => {
        const offset = -100; // scroll 100px above the form (adjust as needed)

        if (formRef.current) {
            const top = formRef.current.getBoundingClientRect().top + window.scrollY + offset;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
    };



    return (
        <section className="py-0 md:py-5  max-w-[1500px] mx-auto px-1 bg-white text-gray-800">


            <div className="grid grid-cols-1 xl:grid-cols-2 rounded-2xl gap-8  px-0 md:px-10 py-2 md:py-10 bg-gradient-to-t from-white via-white to-indigo-100">


                <div className="relative z-10 flex flex-col py-2 md:py-0  px-3" >

                    <h1 >
                        <span className="text-primary text-xl lg:text-3xl xl:text-4xl font-extrabold "> Verify Any Company Worldwide</span>    <span className="text-lg text-gray-900 font-bold lg:text-3xl">  -  Order a Comprehensive Due Diligence & Risk Report on Any Company in 220+ Countries.</span>
                    </h1>

                    <div className="relative max-w-3xl">
                        <div
                            className="relative p-6 md:p-4 rounded-xl overflow-hidden"
                        >

                            {/* Content */}
                            <ul className="relative  text-left text-md list-disc  space-y-4">
                                <li>
                                    Get <span className="font-semibold text-gray-900"> Freshly investigated Business Credit Reports & Company Status Reports </span>on any Business Worldwide.
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-900">    Access Authenticity, Credibility & Financial stability </span> of Partners, Vendors, Buyers, & Suppliers.
                                </li>
                            </ul>
                        </div>
                    </div>



                    <div className="flex flex-col md:hidden justify-start mb-5 gap-4">
                        <button
                            onClick={handleScrollToForm}
                            className="cursor-pointer font-semibold px-8 py-3 rounded-lg shadow-none hover:shadow-lg hover:scale-105 transition-all duration-300 items-center gap-2 btn btn-primary "
                        >
                            Order Report Now <FaChevronRight />
                        </button>
                    </div>

                    {/* <p className="text-md text-orange-800 mb-5 font-semibold">
                        Why Businesses Trust Us
                    </p> */}

                    <div className="flex flex-col justify-between items-start gap-4">
                        {[
                            {
                                text: (
                                    <>
                                        Trusted by <span className="font-bold">20,000+ Global Companies</span>
                                    </>
                                ),
                                icon: <FaBuilding className="text-gray-500 mr-4" />
                            },
                            {
                                text: (
                                    <>
                                        <span className="font-bold">10,000+ Reports</span> delivered Monthly
                                    </>
                                ),
                                icon: <FaFileAlt className="text-gray-500 mr-4" />
                            },
                            {
                                text: (
                                    <>
                                        <span className="font-bold">Human-Verified</span> B2B data & insights
                                    </>
                                ),
                                icon: <FaUserCheck className="text-gray-500 mr-4" />
                            },
                            {
                                text: (
                                    <>
                                        <span className="font-bold">Pay-Per-Report Pricing</span>.
                                        No Minimums.
                                        <span className="font-bold">Starts from USD 49 </span>
                                        (varies by country)
                                    </>
                                ),
                                icon: <FaBolt className="text-gray-500 mr-4" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center">
                                {item.icon}
                                <span className="text-md md:text-base text-gray-700">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Order Form Section */}

                <div ref={formRef} className="">
                    <OrderCreditReport />
                </div>
            </div>


            <section className=" py-2 md:py-10 px-6 md:px-10 lg:px-20 text-gray-800 w-full">
                <div className="max-w-6xl mx-auto text-center mb-5 md:mb-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Make  <span className="text-indigo-500">Informed <span className="text-gray-900">&</span> Smarter</span>  Business Decisions
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-6 max-w-6xl mx-auto mb-12">

                    {/* Point 1 */}
                    <div className="bg-white rounded-xl p-3 md:p-6 text-left flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-400 text-2xl flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-md leading-relaxed">
                            Gain detailed insights into a company's Reliability, Credibility, Financials, Credit Ratings, and more
                        </p>
                    </div>

                    {/* Point 2 */}
                    <div className="bg-white rounded-xl p-3 md:p-6 text-left flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-400 text-2xl flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-md leading-relaxed">
                            Get a Self-Assessment Report for your own company to build credibility and transparency.
                        </p>
                    </div>

                    {/* Point 3 */}
                    <div className="bg-white rounded-xl p-3 md:p-6 text-left flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-400 text-2xl flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-md leading-relaxed">
                            Quick & effortless Ordering Process. Worldwide Coverage.
                        </p>
                    </div>

                    {/* Point 4 */}
                    <div className="bg-white rounded-xl p-3 md:p-6 text-left flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-400 text-2xl flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-md leading-relaxed">
                            No contracts. No minimums. No annual fees. Just simple <span className="font-bold text-gray-700">Pay-Per-Report</span>   pricing.
                        </p>
                    </div>

                    {/* Point 5 */}
                    <div className="bg-white rounded-xl p-3 md:p-6 text-left flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-400 text-2xl flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-md leading-relaxed ">
                            <strong>Pricing of the credit</strong>   report varies based on the country of the company
                            to be verified, and you will find the pricing for the required Credit
                            Report on submission of the order form.
                        </p>
                    </div>

                    {/* Point 6 */}
                    <div className="bg-white rounded-xl p-3 md:p-6 text-left flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-400 text-2xl flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-md leading-relaxed ">
                            <strong>You will receive</strong>  a freshly investigated credit report digitally on your
                            email within the expected delivery time of <span className="font-bold">3-5 business days</span>.
                        </p>
                    </div>

                </div>

            </section>

            <div className="max-w-6xl mx-auto hidden md:block">
                <Image
                    src={require("../../public/images/300_1.png")}
                    alt="Example"
                    height={400}
                    className="rounded-xl mx-auto"
                />
            </div>
            <div className="max-w-6xl mx-auto block md:hidden">
                <Image
                    src={require("../../public/images/8.png")}
                    alt="Example"
                    height={400}
                    className="rounded-xl mx-auto"
                />
            </div>


            <section className="bg-gray-50 py-2 md:py-2 mt-5 px-6 md:px-10 lg:px-20 text-gray-800 w-full">

                {/* Why Choose Section */}
                <div className="max-w-5xl mx-auto py-10">
                    <h3 className="text-xl md:text-3xl font-extrabold text-center mb-8 text-gray-900">
                        Why Choose <span className="text-indigo-500">GlobalBizReport?</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-6 ">
                        {[
                            { icon: <FaGlobe className="text-gray-400 text-3xl mb-1" />, title: "Global Coverage", desc: "Coverage in 220+ countries and territories." },
                            { icon: <FaBolt className="text-gray-400 text-3xl mb-1" />, title: "Accurate Data", desc: "Freshly investigated, accurate data." },
                            { icon: <FaTrophy className="text-gray-400 text-3xl mb-1" />, title: "No Annual Fees", desc: "No contracts, no minimums, no annual fees." },
                            { icon: <FaCheckCircle className="text-gray-400 text-3xl mb-1" />, title: "Trusted Worldwide", desc: "Trusted by 20,000+ Global Companies." },
                            { icon: <FaLock className="text-gray-400 text-3xl mb-1" />, title: "Secure & Confidential", desc: "100% secure and confidential process." },
                            { icon: <FaMoneyBill className="text-gray-400 text-3xl mb-1" />, title: "Cost-Effective ", desc: "Lowest prices with single/bulk options." },

                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white  rounded-2xl p-3 md:p-6 text-center  hover:border-indigo-300"
                            >
                                <div className="flex justify-center">{item.icon}</div>
                                <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-2 mt-2">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>


            {/* testimonials */}
            <div className='max-w-6xl mx-auto py-10' >
                <Testimonials />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-2 py-2 max-w-6xl mx-auto">

                {/* 2. Global Coverage */}
                <div className="flex items-start gap-3  p-4 rounded-lg bg-gray-50">
                    <span className="w-7 h-7 text-indigo-500 flex items-center justify-center rounded-sm text-lg">
                        <FaGlobeAsia />
                    </span>
                    <p className=" text-sm md:text-md">
                        At Global Biz Report (GBR), we deliver freshly investigated business credit reports for any company in 220+ countries.
                    </p>
                </div>

                {/* 3. Safer Business Decisions */}
                <div className="flex items-start gap-3  p-4 rounded-lg bg-gray-50">
                    <span className="w-7 h-7 text-indigo-500 flex items-center justify-center rounded-sm text-lg">
                        <FaShieldAlt />
                    </span>
                    <p className=" text-sm md:text-md">
                        Don’t let unverified partners hold you back. Order now and transform how you do business!
                    </p>
                </div>

                {/* 1. Fresh Reports */}
                <div className="flex items-start gap-3  p-4 rounded-lg bg-gray-50">
                    <span className="w-7 h-7 text-indigo-500 flex items-center justify-center rounded-sm text-lg">
                        <FaFile />
                    </span>
                    <p className=" text-sm md:text-md">
                        Freshly Investigated – Not Recycled Data
                    </p>
                </div>



            </div>


            <p className=" text-sm text-gray-500 text-center py-5 flex flex-row justify-center items-center px-2">
                <FaInfo className="mr-5 bg-gray-100" />    Over 20,000+ global businesses trust GBR for company assessment and due-diligence checks – join them and safeguard your growth!
            </p>

        </section>
    );
};

export default OrderCreditReportClient;
