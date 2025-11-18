"use client";
import { useState } from "react";

export default function SampleReports() {

    const sampleReports = [
        { country: "India", title: "Business Credit Report - India", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1763462244/GlobalBizReport-India_Sample_wmihch.pdf" },
        // { country: "France", title: "Business Credit Report - France", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1759910759/GlobalBizReport-France_Sample_phxxva.pdf" },
        // { country: "Netherlands", title: "Business Credit Report - Netherlands", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1759910761/GlobalBizReport-Netherlands_Sample_wgl9fp.pdf" },
        // { country: "Taiwan", title: "Business Credit Report - Taiwan", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1759910759/GlobalBizReport-Taiwan_Sample_l3ki0q.pdf" },
        { country: "USA", title: "Business Credit Report - USA", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1763462255/GlobalBizReport-US_Sample_m6mgow.pdf" },
        // { country: "China", title: "Business Credit Report - China", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1759910760/GlobalBizReport-China_Sample_owd5mt.pdf" },
        // { country: "Italy", title: "Business Credit Report - Italy", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1759910761/GlobalBizReport-Italy_Sample_oxq9pi.pdf" },
        // { country: "Spain", title: "Business Credit Report - Spain", url: "https://res.cloudinary.com/dwccr86av/image/upload/v1759910760/GlobalBizReport-Spain_Sample_vscc6c.pdf" },
    ];

    const [selectedCountry, setSelectedCountry] = useState("");
    const [search, setSearch] = useState("");

    const countries = [...new Set(sampleReports.map((r) => r.country))];

    const filteredReports = sampleReports.filter((r) => {
        const matchesCountry =
            !selectedCountry || r.country === selectedCountry;
        const matchesSearch = r.title
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchesCountry && matchesSearch;
    });

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto">

            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3">

                <div className="bg-primary text-md text-white font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto uppercase">
                    Sample Reports
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center max-w-2xl text-black mx-auto">
                    Worldwide Business Credit Reports at   <span className="text-primary">Cost-Effective Price</span>
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    GlobalBizReport (GBR) is a preferred Business Credit Reporting Partner for leading Corporates, SMEs, B2B Marketplaces, Banks & Financial Institutes, Global Consultancy & Market Research companies worldwide.
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl font-semibold text-gray-800 mb-6">
                    Sample Business Credit Reports
                </h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search report..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    />
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    >
                        <option value="" disabled hidden>
                            Select Country
                        </option>
                        <option value="">All Countries</option>
                        {countries.map((country, idx) => (
                            <option key={`${country}-${idx}`} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Report Grid */}
                <div className="grid gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {filteredReports.length > 0 ? (

                        filteredReports.map((report, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl  transition p-6 flex flex-col justify-between"
                            >
                                {/* PDF Preview */}
                                <div className="w-full h-56 md:h-64 rounded-xl border border-gray-200 overflow-hidden">
                                    <iframe
                                        src={`${report.url}#toolbar=0&navpanes=0&scrollbar=0`}
                                        title={report.title}
                                        scrolling="no"
                                        className="w-full h-full pointer-events-none rounded-xl"
                                        style={{ border: "none" }}
                                    />
                                </div>

                                {/* Title & Country */}
                                <div className="mt-4">
                                    <h2 className="text-sm font-semibold text-gray-800 truncate">
                                        {report.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">{report.country}</p>
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 flex flex-col sm:flex-col gap-3">
                                    <a
                                        href={report.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        View Sample Report
                                    </a>

                                    <a
                                        href="/order-business-credit-report"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        Order Report
                                    </a>
                                </div>
                            </div>
                        ))


                    ) : (
                        <p className="text-gray-500 text-center col-span-full">
                            No reports found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
