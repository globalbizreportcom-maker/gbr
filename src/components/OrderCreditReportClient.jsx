"use client";

import OrderCreditReport from "@/components/OrderCreditReport";
import React, { useRef } from "react";
import { FaGlobe, FaBolt, FaTrophy, FaCheckCircle, FaLock, FaStar, FaChevronRight } from "react-icons/fa";

const OrderCreditReportClient = () => {
    const formRef = useRef(null);

    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="py-4 md:py-10  px-1 bg-white text-gray-800">
            <div
                className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden text-white px-6 py-5 md:py-10"
                style={{
                    backgroundImage:
                        "url('https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181951_640.jpg",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950/75 via-gray-900/90 to-gray-800/65"></div>

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-xl md:text-3xl font-bold mb-5 text-center">
                        Order a Business Credit Report for Any Company Worldwide
                    </h2>

                    <p className="text-gray-300 text-center max-w-2xl mx-auto mb-5 text-sm md:text-base leading-relaxed">
                        Verify your partners, vendors, buyers, and suppliers with a comprehensive Business Information Report
                        covering registration details, financial data, credit rating, risk indicators, and more.
                    </p>

                    <div className="flex justify-center mb-5">
                        <button
                            onClick={handleScrollToForm}
                            className="cursor-pointer   font-semibold px-8 py-3 rounded-full shadow-none hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 btn btn-primary"
                        >
                            Order Report Now <FaChevronRight />
                        </button>

                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {["Trusted by 20,000+ Global Companies"].map((service, idx) => (
                            <div
                                key={idx}
                                className="p-2 text-center"
                            >
                                <h4 className="font-medium text-sm md:text-base text-gray-100">
                                    {service}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Order Form Section */}
            <div ref={formRef} className="max-w-6xl mx-auto">
                <OrderCreditReport />
            </div>


            <section className="bg-gray-50 py-30 px-6 md:px-10 lg:px-20 text-gray-800">
                <div className="max-w-6xl mx-auto text-center mb-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
                        Make  <span className="text-indigo-500">Informed, Smarter</span>  Business Decisions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Discover trustworthy business partners, suppliers, or buyers and strengthen your business credibility with
                        transparent, verified information — anywhere in the world.
                    </p>
                </div>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
                    {[
                        "Find out if your business partners, suppliers, or buyers are trustworthy.",
                        "Get a Self-Assessment Report for your own company to build credibility and transparency.",
                        "Quick & effortless Ordering Process. Worldwide Coverage.",
                        "No contracts. No minimums. No annual fees. Just simple pay-per-report pricing.",
                    ].map((point, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-6  text-left flex items-start  gap-3"
                        >
                            {/* <span className="text-green-600 text-xl mt-0.5"><FaCheckCircle className="text-md text-green-600" /> </span> */}
                            <p className="text-gray-700 text-sm  leading-relaxed">{point}</p>
                        </div>
                    ))}
                </div>

                {/* Trust Line */}
                <div className="text-center mb-14">
                    <h4 className="font-semibold text-gray-500 text-base md:text-lg">
                        Trusted by 20,000+ Global Companies
                    </h4>
                </div>

                {/* Why Choose Section */}
                <div className="max-w-5xl mx-auto py-10">
                    <h3 className="text-xl md:text-3xl font-extrabold text-center mb-8 text-gray-900">
                        Why Choose <span className="text-indigo-500">GlobalBizReport?</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { icon: <FaGlobe className="text-gray-400 text-3xl mb-3" />, title: "Global Coverage", desc: "Coverage in 220+ countries and territories." },
                            { icon: <FaBolt className="text-gray-400 text-3xl mb-3" />, title: "Accurate Data", desc: "Freshly investigated, accurate data." },
                            { icon: <FaTrophy className="text-gray-400 text-3xl mb-3" />, title: "No Commitments", desc: "No contracts, no minimums, no annual fees." },
                            { icon: <FaCheckCircle className="text-gray-400 text-3xl mb-3" />, title: "Trusted Worldwide", desc: "Trusted by 20,000+ Global Companies." },
                            { icon: <FaLock className="text-gray-400 text-3xl mb-3" />, title: "Secure & Confidential", desc: "100% secure and confidential process." },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white  rounded-2xl p-6 text-center  hover:border-indigo-300"
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


        </section>
    );
};

export default OrderCreditReportClient;
