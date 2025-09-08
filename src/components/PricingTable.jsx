"use client";

import { useState } from "react";

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

const PricingTable = () => {
    const [currency, setCurrency] = useState("USD");

    return (



        <>
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
        </>

    );
};

export default PricingTable;
