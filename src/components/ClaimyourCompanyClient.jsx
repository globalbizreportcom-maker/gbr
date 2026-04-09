"use client";

import React, { useRef, useState } from "react";
import { FaGlobe, FaBolt, FaTrophy, FaCheckCircle, FaLock, FaStar, FaChevronRight, FaMoneyBill, FaFile, FaGlobeAsia, FaShieldAlt, FaInfo } from "react-icons/fa";
import "@splidejs/splide/dist/css/splide.min.css";
import { useRouter } from "next/navigation";
import Testimonials from "./Testimonials";
import Image from "next/image";
import ClaimyourcompanyForm from "./ClaimyourcompanyForm";


const ClaimyourCompanyClient = () => {

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

        <div>

            <section className="py-0 md:py-5 mt-5 mb-10  mx-auto max-w-[1600px] w-full rounded-2xl bg-gradient-to-t from-gray-50 via-white to-blue-200 text-gray-800">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-0 md:px-10 py-10">

                    {/* Left Content */}
                    <div className="rounded-2xl px-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Grow Your Business with Our Corporate Solutions
                        </h1>

                        <p className="mt-6 text-lg text-gray-600">
                            Join thousands of companies using our platform to manage operations,
                            increase visibility, and reach new customers. Claim your company
                            profile today and start growing faster.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() =>
                                    formRef.current?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Claim Your Company
                            </button>

                        </div>

                        <div className="mt-10 text-sm text-gray-500">
                            ⭐ Trusted by 10,000+ companies worldwide
                        </div>
                    </div>

                    {/* Right Form */}
                    <div
                        ref={formRef}
                        className="rounded-2xl p-1"
                    >

                        <ClaimyourcompanyForm />
                    </div>
                </div>

            </section>


            {/* testimonials */}
            <div className='max-w-6xl mx-auto py-10' >
                <Testimonials />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-2 py-2 max-w-6xl mx-auto">

                {/* 2. Global Coverage */}
                <div className="flex items-start gap-3  p-4 rounded-lg bg-gray-50 text-gray-700">
                    <span className="w-7 h-7 text-blue-500 flex items-center justify-center rounded-sm text-lg">
                        <FaGlobeAsia />
                    </span>
                    <p className=" text-sm md:text-md">
                        At Global Biz Report (GBR), we deliver freshly investigated business credit reports for any company in 220+ countries.
                    </p>
                </div>

                {/* 3. Safer Business Decisions */}
                <div className="flex items-start gap-3  p-4 rounded-lg bg-gray-50 text-gray-700">
                    <span className="w-7 h-7 text-blue-500 flex items-center justify-center rounded-sm text-lg">
                        <FaShieldAlt />
                    </span>
                    <p className=" text-sm md:text-md">
                        Don’t let unverified partners hold you back. Order now and transform how you do business!
                    </p>
                </div>

                {/* 1. Fresh Reports */}
                <div className="flex items-start gap-3  p-4 rounded-lg bg-gray-50 text-gray-700">
                    <span className="w-7 h-7 text-blue-500 flex items-center justify-center rounded-sm text-lg">
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

        </div>
    );
};

export default ClaimyourCompanyClient;
