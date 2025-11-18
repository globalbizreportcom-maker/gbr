'use client'

import { useState, useEffect, useRef } from 'react';


const testimonials = [
    {
        name: "Sarah L.",
        role: "Procurement Head, USA",
        text: "GBR's report on our new supplier saved us from a potential $50K loss – detailed payment history and credit rating were spot on!",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "Raj Patel",
        role: "CEO & MD, India",
        text: "Quick delivery and accurate global data helped us expand safely into Europe. Highly recommend for due diligence!",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "Emily Chen",
        role: "Risk Analyst, Global Finance Advisor, Singapore",
        text: "As a Business Analyst, GBR reports are my go-to for client assessments. Fresh insights every time – transformed my workflow.",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "Sarah Emiley",
        role: "CFO, Financial Institution, Hong-Kong",
        text: "The Report coverage and turnaround time is exceptional. We needed urgent verification for a potential partner, and GBR delivered a detailed report quickly and saved us from making a costly mistake.",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "TaeYong Kim",
        role: "Owner, Market Research, South Korea",
        text: "GlobalBizReport helped us verify international suppliers before placing large orders. The comprehensive reports gave us the confidence to expand our business globally without unnecessary risks.",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "Michael Roberts",
        role: "B2B Platform, United Kingdom",
        text: "As a B2B marketplace, we rely on GBR for vendor verification. The depth of information in their reports is outstanding, and their support team is always helpful and responsive.",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "David Martinez",
        role: "Consulting Firm, Canada",
        text: "We've been using GlobalBizReport for three years now. The global coverage is unmatched. We operate in 15 countries, and GBR provides consistent, reliable reports regardless of location.",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    {
        name: "Aisha Mohammed",
        role: "Trading Company, UAE",
        text: "The reports include everything we need - financials, credit ratings, legal information - all in one place. Highly recommended for any business doing international trade.",
        img: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
];


const PER_PAGE = 3;

export default function Testimonials() {
    const [currentPage, setCurrentPage] = useState(1);
    const testimonialRef = useRef();
    const firstRenderRef = useRef(true);

    const totalPages = Math.ceil(testimonials.length / PER_PAGE);

    const currentTestimonials = testimonials.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    );

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);

        // Scroll ONLY when clicking buttons
        if (testimonialRef.current) {
            testimonialRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <section ref={testimonialRef} className="max-w-5xl mx-auto px-4 ">
            <h3 className="text-xl md:text-3xl font-extrabold text-center mb-8 text-gray-900">
                What people are saying
            </h3>
            <p className=" text-sm md:text-base text-gray-500 text-center mb-8">
                Join <span className="text-indigo-500 font-bold">20,000+</span> companies that trust GlobalBizReport
            </p>

            <div className="flex flex-col space-y-10">
                {currentTestimonials.map((t, idx) => (
                    <div key={idx} className="flex gap-6 px-2 md:px-5 bg-gray-50 ">

                        <div>
                            <div className="flex items-center gap-4  py-3">



                                {/* Left: Image */}
                                {/* <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                                /> */}

                                {/* Right: Details */}
                                <div className="flex flex-col">

                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09L5.82 12.545 1 8.91l6.061-.455L10 3l2.939 5.455 6.06.455-4.82 3.635 1.698 5.545z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Name + Stars */}
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-800">{t.name}</h3>
                                    </div>

                                    {/* Age + Location */}
                                    <span className="text-sm text-gray-500">{t.role}</span>
                                </div>
                            </div>

                            <p className="text-gray-700">
                                {t.text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
                                    part.startsWith('**') && part.endsWith('**') ? (
                                        <strong key={i}>{part.slice(2, -2)}</strong>
                                    ) : (
                                        part
                                    )
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 space-x-3">
                {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`cursor-pointer w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-sm font-semibold ${currentPage === pageNum
                                ? 'bg-indigo-500 text-white border-transparent'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            aria-label={`Go to page ${pageNum}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
