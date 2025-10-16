'use client';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import PayPalCheckout from './PayPalCheckout';
import { useDashboard } from '@/app/(site)/dashboard/DashboardContext';
import RazorpayCheckout from './RazorpayCheckout';

const OrderConfirmContent = () => {
    const [formData, setFormData] = useState([]);
    const { user } = useDashboard();

    const [selected, setSelected] = useState("paypal");

    useEffect(() => {
        const storedData = localStorage.getItem('gbr_form');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    if (!formData) return <p className="text-sm text-gray-600">Loading...</p>;
    const country = typeof formData?.contactCountry === "string"
        ? formData.contactCountry
        : formData?.contactCountry?.label;

    // 🇮🇳 INR pricing (with GST)
    const inrPricing = [
        { country: "USA", total: 7080 },
        { country: "Canada", total: 7080 },
        { country: "India", total: 4720 },
        { country: "China", total: 7670 },
        { country: "Asia (excluding India & China)", total: 7670 },
        { country: "Europe", total: 7670 },
        { country: "Middle East", total: 7670 },
        { country: "Australia & New Zealand", total: 8850 },
        { country: "Africa", total: 8260 },
        { country: "Oceania", total: 8850 },
        { country: "Latin America", total: 9440 },
        { country: "Other Countries", total: 9440 },
    ];

    // 💵 USD pricing
    const usdPricing = {
        "USA": 69,
        "Canada": 69,
        "India": 49,
        "China": 79,
        "Asia (excluding India & China)": 79,
        "Europe": 79,
        "Middle East": 79,
        "Australia & New Zealand": 89,
        "Africa": 89,
        "Oceania": 89,
        "Latin America": 99,
        "Other Countries": 99,
    };

    // 🌏 Asian countries (excluding India & China)
    const asianCountries = [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambodia",
        "Cyprus",
        "Georgia",
        "Indonesia",
        "Iran",
        "Iraq",
        "Israel",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Lebanon",
        "Malaysia",
        "Maldives",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "North Korea",
        "Oman",
        "Pakistan",
        "Palestine",
        "Philippines",
        "Qatar",
        "Saudi Arabia",
        "Singapore",
        "South Korea",
        "Sri Lanka",
        "Syria",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Turkmenistan",
        "United Arab Emirates",
        "Uzbekistan",
        "Vietnam",
        "Yemen",
    ];


    // 🧭 Normalize country input
    const normalizedCountry = country?.trim()?.toLowerCase();
    let priceKey = "Other Countries"; // Default fallback

    // ✅ Region-based mapping logic
    if (normalizedCountry === "india") {
        priceKey = "India";
    } else if (normalizedCountry === "china") {
        priceKey = "China";
    } else if (asianCountries.some(c => c.toLowerCase() === normalizedCountry)) {
        priceKey = "Asia (excluding India & China)";
    } else if (["usa", "united states", "united states of america"].includes(normalizedCountry)) {
        priceKey = "USA";
    } else if (normalizedCountry === "canada") {
        priceKey = "Canada";
    } else if (normalizedCountry?.includes("australia") || normalizedCountry?.includes("new zealand")) {
        priceKey = "Australia & New Zealand";
    } else if (["uae", "united arab emirates", "saudi arabia", "qatar", "oman", "bahrain", "kuwait"].includes(normalizedCountry)) {
        priceKey = "Middle East";
    } else if (["england", "france", "germany", "italy", "spain", "netherlands", "uk", "united kingdom"].includes(normalizedCountry)) {
        priceKey = "Europe";
    } else if (["nigeria", "south africa", "kenya", "egypt", "ghana"].includes(normalizedCountry)) {
        priceKey = "Africa";
    } else if (["fiji", "samoa", "tonga", "papua new guinea"].includes(normalizedCountry)) {
        priceKey = "Oceania";
    } else if (["brazil", "argentina", "mexico", "chile", "peru"].includes(normalizedCountry)) {
        priceKey = "Latin America";
    }


    // 💰 Get matching prices
    const inrMatch = inrPricing.find(item => item.country === priceKey);
    const inrAmount = inrMatch ? inrMatch.total : inrPricing.find(i => i.country === "Other Countries").total;
    const usdAmount = usdPricing[priceKey] ?? usdPricing["Other Countries"];

    // 🇮🇳 or 💵 Final display
    const isIndia = normalizedCountry === "india";
    const displayPrice = isIndia ? `₹${inrAmount}.00` : `USD ${usdAmount}`;

    console.log({ priceKey, displayPrice });




    return (
        < div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left: Payment Section */}
                <div className="lg:col-span-8 bg-gray-50 p-6 border border-gray-200 rounded-xl">
                    <h2 className="text-xl font-semibold">Payment Summary</h2>
                    <h6 className="text-xs text-gray-600 mb-4 pb-4 border-b border-gray-300">
                        Make the payment through Paypal / Credit or Debit Card.
                    </h6>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead>
                                <tr className="border-b border-gray-200 text-left text-gray-500 uppercase text-xs tracking-wider">
                                    <th className="py-2 pr-4">Description</th>
                                    <th className="py-2 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="pt-4 pr-4 font-bold">Business Credit Report</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 pr-4 text-primary">{formData.companyName}</td>
                                    <td className="py-3 text-right text-base font-semibold">{displayPrice}</td>
                                </tr>
                                <tr className="border-t border-gray-300 font-semibold">
                                    <td className="py-3 pr-4 text-xl">Total Amount</td>
                                    <td className="py-3 text-right text-xl">{displayPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="w-full mx-auto mt-6 flex flex-col md:flex-col md:gap-4 space-y-4 md:space-y-0">
                        {(() => {
                            const country = typeof formData?.contactCountry === "string"
                                ? formData.contactCountry
                                : formData?.contactCountry?.label;

                            // If India, show Razorpay
                            if (country?.toLowerCase() === "india") {
                                return (
                                    <label className="flex-1 flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                        <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                                            Pay via Razorpay <span className="text-xs">(For payments in INR from India)</span>
                                        </span>
                                        <div className="w-full md:w-auto flex justify-center">
                                            <RazorpayCheckout amount="1" userId={user?._id || ""} />
                                        </div>
                                    </label>
                                );
                            }

                            // Otherwise, show PayPal
                            return (
                                <label className="flex-1 flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                                    <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                                        Pay via PayPal
                                    </span>
                                    <div className="w-full md:w-auto flex justify-center">
                                        <PayPalCheckout amount="1" userId={user?._id || ""} />
                                    </div>
                                </label>
                            );
                        })()}
                    </div>









                    <h6 className="text-xs text-center text-gray-600 mb-4 pb-4 border-b border-gray-300 mt-5">WE ACCEPT</h6>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <img src="https://badges.razorpay.com/badge-light.png" alt="Visa" className="h-6 object-contain" />
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" alt="Mastercard" className="h-6 object-contain" />
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="PayPal" className="h-6 object-contain" />
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-upi-logo-icon-svg-download-png-1747946.png?f=webp&w=512" alt="UPI" className="h-6 object-contain" />
                    </div>
                </div>

                {/* Right: Billing Summary */}
                <div className="lg:col-span-4 p-6 border border-gray-200 rounded-xl">
                    <h3 className="text-lg font-semibold">Billing Detail</h3>
                    <h6 className="text-xs mb-4 pb-4 border-b border-gray-300">Billing info solely for payment, not shared.</h6>

                    <table className="w-full text-sm text-left text-gray-800 border-separate border-spacing-y-2">
                        <tbody>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Name</td>
                                <td className="py-2 text-right">{formData.contactName}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Company</td>
                                <td className="py-2 text-right">{formData.contactCompany}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold" >Country</td>
                                <td className="py-2 text-right">
                                    {typeof formData?.contactCountry === "string"
                                        ? formData.contactCountry
                                        : formData?.contactCountry?.label}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Email</td>
                                <td className="py-2 text-right">{formData.contactEmail}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Telephone</td>
                                <td className="py-2 text-right">{formData.contactPhone}</td>
                            </tr>
                        </tbody>
                    </table>


                    <p className="text-xs text-black mt-4 p-4 border border-green-200 bg-green-100 rounded-lg text-center">
                        You will receive freshly investigated business credit report on your email within the expected delivery time of 1–3 business days.
                    </p>
                </div>
            </div>

            <div className='border border-gray-200 rounded-lg p-10 mt-10'>

                <h3 className='text-2xl font-semibold'>Your Order Information</h3>

                <div className="collapse rounded-lg mt-10" >
                    <input type="checkbox" />

                    <div className="collapse-title flex justify-between items-center font-semibold text-base bg-gray-100 py-5">
                        <div>
                            <span className='text-2xl'>{formData.companyName}</span>
                        </div>
                        <FaEye className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="collapse-content">
                        <div className="overflow-x-auto">
                            <table className="table table-md border-0 uppercase">
                                <tbody >
                                    <tr className='border-b-gray-200 '>
                                        <td className="font-bold">COMPANY NAME</td>
                                        <td align='right'>{formData.companyName}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>
                                        <td className="font-bold">ADDRESS</td>
                                        <td align='right'>{formData.address}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>

                                        <td className="font-bold">CITY</td>
                                        <td align='right'>{formData.city}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>

                                        <td className="font-bold">STATE</td>
                                        <td align='right'>{formData.state}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>

                                        <td className="font-bold">COUNTRY</td>
                                        <td align='right'>{formData.country?.label}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>
                                        <td className="font-bold">POSTAL CODE</td>
                                        <td align='right'>{formData.postalCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div >

    );
};

export default OrderConfirmContent;
