"use client";



import Subscription from "@/components/Subscription";
import { useState } from "react";
import { FaGlobe, FaMailBulk, FaMoneyBill, FaMoneyCheckAlt } from "react-icons/fa";

const pricingData = {
    USD: [
        { country: "USA", price: 69 },
        { country: "Canada", price: 69 },
        { country: "India", price: 49 },
        { country: "China", price: 79 },
        { country: "Asia (excluding India & China)", price: 79 },
        { country: "Europe", price: 79 },
        { country: "Middle East", price: 79 },
        { country: "Australia & New Zealand", price: 89 },
        { country: "Africa", price: 89 },
        { country: "Oceania", price: 89 },
        { country: "Latin America", price: 99 },
        { country: "Other Countries", price: 99 },
    ],
    INR: [
        { country: "USA", price: 6000 },
        { country: "Canada", price: 6000 },
        { country: "India", price: 4000 },
        { country: "China", price: 6500 },
        { country: "Asia (excluding India & China)", price: 6500 },
        { country: "Europe", price: 6500 },
        { country: "Middle East", price: 6500 },
        { country: "Australia & New Zealand", price: 7500 },
        { country: "Africa", price: 7000 },
        { country: "Oceania", price: 7500 },
        { country: "Latin America", price: 8000 },
        { country: "Other Countries", price: 8000 },
    ],
};

const Pricing = () => {
    const [currency, setCurrency] = useState("USD");

    return (
        <section className="py-16 px-1 bg-white text-gray-800">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3">

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    <span className="text-primary">Pricing</span>    for GBR Business Information Report
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Freshly Investigated Business Information Report
                </p>
            </div>

            <div className="max-w-6xl mx-auto">

                <section className="py-16 px-4 bg-white text-gray-800">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Left Column */}
                        <div className=" p-6 rounded-xl border border-blue-100">
                            <h2 className="text-2xl md:text-2xl font-bold text-black mb-4">
                                Business Credit Reports in 220+ Countries
                            </h2>

                            <ul className="list-disc text-md list-inside space-y-2 text-gray-500">
                                <li>
                                    GlobalBizReport is one of the most trusted business services platforms providing freshly Investigated and comprehensive Business Information Reports to Corporates, SMEs, B2B Marketplaces, Financial Institutes, Global Consultancy & Market Research companies worldwide.
                                </li>
                                <br />
                                <li>
                                    GBR is one of leading provider of Business Credibility Reports, Company Information Reports, Company Due-Diligence reports, Company Assessment Reports in over 220+ countries Worldwide.
                                </li>
                            </ul>
                        </div>

                        {/* Right Column */}
                        <div className=" p-6 rounded-xl border border-blue-100">
                            <h2 className="text-2xl md:text-2xl font-bold text-black mb-4">
                                Choose GBR as your Credit Reporting PARTNER and Save MAXIMUM Countries
                            </h2>

                            <ul className="list-disc text-md list-inside space-y-2 text-gray-500">
                                <li>GBR Business Information Report gives you full picture of company’s reliability and verification data, credit worthiness check, financial health, registration data, credit rating score, Directors Info, Risk assessment details, details on any Negative information and much more.</li>
                                <br />
                                <li>Verify your Business Partners, Vendors, Buyers, Suppliers, Clients with GBR Reports.</li>
                            </ul>
                        </div>

                    </div>
                </section>

                <div className="flex justify-end gap-2 mb-6">
                    <button
                        className={`btn ${currency === "USD" ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setCurrency("USD")}
                    >
                        USD
                    </button>
                    <button
                        className={`btn ${currency === "INR" ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setCurrency("INR")}
                    >
                        INR
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow-xs border border-gray-200 max-w-4xl mx-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-primary text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-3 px-4 text-left">Country</th>
                                <th className="py-3 px-4 text-left">
                                    Price {currency === "INR" ? "(INR)" : "(USD)"}
                                </th>
                                {currency === "INR" && (
                                    <>
                                        <th className="py-3 px-4 text-left">GST (18%)</th>
                                        <th className="py-3 px-4 text-left">Total (INR)</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pricingData[currency].map((item, idx) => {
                                const gst = currency === "INR" ? Math.round(item.price * 0.18) : 0;
                                const total = currency === "INR" ? item.price + gst : item.price;

                                return (
                                    <tr key={idx} >
                                        <td className="py-3 px-4 text-md font-bold">{item.country}</td>
                                        <td className="py-3 px-4">
                                            {currency === "USD" ? `USD ${item.price}` : `₹${item.price}`}
                                        </td>
                                        {currency === "INR" && (
                                            <>
                                                <td className="py-3 px-4">₹{gst}</td>
                                                <td className="py-3 px-4 font-medium text-primary">₹{total}</td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 max-w-6xl mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">

                        {/* Card Item */}
                        <div className="bg-white shadow-xs transition rounded-xl p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl pt-1">
                                    <FaMoneyCheckAlt />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Pricing</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Pricing of the credit report varies based on the country of the company to be verified and you will find the pricing for the required Credit Report on submission of the order form.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Time */}
                        <div className="bg-white shadow-xs  transition rounded-xl p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl pt-1">
                                    <FaMailBulk />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Delivery Time</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        You will receive freshly investigated credit report digitally on your email within the expected delivery time of 1–3 business days.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Global Coverage */}
                        <div className="bg-white shadow-xs transition rounded-xl p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl pt-1">
                                    <FaGlobe />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Global Coverage</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        GBR provides Comprehensive Business Credit Reports in 220+ Countries that are also called as International Company Credit Reports, Business Information Report, Business Credit Rating Report, Company Credit Report, Company Due-diligence Reports etc.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* newsletter */}
                <Subscription />
            </div>
        </section>
    );
};

export default Pricing;
