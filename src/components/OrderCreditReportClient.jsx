"use client";

import OrderCreditReport from "@/components/OrderCreditReport";
import React, { useRef, useState } from "react";
import { FaGlobe, FaBolt, FaTrophy, FaCheckCircle, FaLock, FaStar, FaChevronRight, FaMoneyBill, FaFile, FaGlobeAsia, FaShieldAlt, FaInfo } from "react-icons/fa";
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
        <section className="py-0 md:py-5  max-w-7xl mx-auto px-1 bg-white text-gray-800">


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-0 md:px-10 py-10">

                <div
                    className="relative  rounded-2xl overflow-hidden text-white px-6 py-5 md:py-10 h-[500px] "
                    style={{
                        backgroundImage:
                            "url('https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181951_960_720.jpg')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1c28]/90 via-[#0c2331]/95 to-[#0f2b3b]/90"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-evenly h-full ">
                        <h2 className="text-3xl md:text-4xl xl:text-4xl 2xl:text-4xl max-w-xl font-bold md:font-extrabold mb-5 text-left">
                            Order a Comprehensive Business Information Report for Any Company Worldwide
                        </h2>

                        <p className="text-gray-300 text-left max-w-3xl mx-auto mb-5 text-lg md:text-lg xl:text-xl italic">
                            Order a{' '}
                            <span className="font-extrabold">Full Company Due-Diligence Report </span>{' '}
                            on your business partners, vendors, buyers, and suppliers, including registration details, financials, credit rating, risk indicators, and more.
                        </p>


                        <div className="flex flex-col md:hidden justify-start mb-5 gap-4">


                            <button
                                onClick={handleScrollToForm}
                                className="cursor-pointer   font-semibold px-8 py-3 rounded-lg shadow-none hover:shadow-lg hover:scale-105 transition-all duration-300 items-center gap-2 btn btn-warning "
                            >
                                Order Report Now <FaChevronRight />
                            </button>

                            <button
                                onClick={() => window.open('/sample-reports', '_blank')}
                                className="cursor-pointer  font-semibold px-8 py-3 rounded-lg shadow-none hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 btn btn-outline"
                            >
                                View Sample Report
                            </button>


                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {["Trusted by 20,000+ Global Companies"].map((service, idx) => (
                                <div
                                    key={idx}
                                    className="p-2 text-left"
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
                <div ref={formRef} className="">
                    <OrderCreditReport />
                </div>
            </div>


            <section className="bg-gray-50 py-2 md:py-10 px-6 md:px-10 lg:px-20 text-gray-800 w-full">
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
                            Find out if your business partners, suppliers, or buyers are trustworthy.
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
                            No contracts. No minimums. No annual fees. Just simple pay-per-report pricing.
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
                            email within the expected delivery time of 1–3 business days.
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
            <div className='max-w-lg mx-auto py-10' >
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
