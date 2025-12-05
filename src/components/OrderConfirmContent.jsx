

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import PayPalCheckout from './PayPalCheckout';
import { useDashboard } from '@/app/(site)/dashboard/DashboardContext';
import { apiUrl } from '@/api/api';
import { useRouter, usePathname } from "next/navigation";
import axios from 'axios';
import { RazorpayCheckout } from './RazorpayCheckout';


const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const OrderConfirmContent = () => {


    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useDashboard();

    const hasSubmittedRef = useRef(false);
    const router = useRouter();

    // const pricingINR = {
    //     India: 4720,
    //     China: 7670,
    //     "Asia (excluding India & China)": 7670,
    //     USA: 7080,
    //     Canada: 7080,
    //     Europe: 7670,
    //     "Middle East": 7670,
    //     "Australia & New Zealand": 8850,
    //     Africa: 8260,
    //     Oceania: 8850,
    //     "Latin America": 9440,
    //     "Other Countries": 9440,
    // };

    // const pricingUSD = {
    //     India: 49,
    //     China: 79,
    //     "Asia (excluding India & China)": 79,
    //     USA: 69,
    //     Canada: 69,
    //     Europe: 79,
    //     "Middle East": 79,
    //     "Australia & New Zealand": 89,
    //     Africa: 89,
    //     Oceania: 89,
    //     "Latin America": 99,
    //     "Other Countries": 99,
    // };

    const pricingINR = {
        India: 4915,
        China: 7924,
        "Asia (excluding India & China)": 7924,
        USA: 5918,
        Canada: 5918,
        Europe: 6921,
        "Middle East": 6921,
        "Australia & New Zealand": 8927,
        Africa: 7924,
        Oceania: 8927,
        "Latin America": 8927,
        // testing
        "Christmas Island": 1,
        "Other Countries": 8927,
    };

    const pricingUSD = {
        India: 49,
        China: 79,
        "Asia (excluding India & China)": 79,
        USA: 59,
        Canada: 59,
        Europe: 69,
        "Middle East": 69,
        "Australia & New Zealand": 89,
        Africa: 79,
        Oceania: 89,
        "Latin America": 89,
        // testing
        "Christmas Island": 1,
        "Other Countries": 89,
    };

    const getRegion = (country) => {
        if (!country) return "Other Countries";

        const asiaExcl = ["Afghanistan", "Bangladesh", "Bhutan", "Brunei", "Myanmar", "Cambodia", "East Timor", "Hong Kong S.A.R.", "Indonesia", "Japan", "Kazakhstan", "North Korea", "South Korea", "Kyrgyzstan", "Laos", "Malaysia", "Maldives", "Mongolia", "Nepal", "Pakistan", "Philippines", "Russia", "Singapore", "Sri Lanka", "Tajikistan", "Taiwan", "Thailand", "Turkmenistan", "Uzbekistan", "Vietnam"];
        const australiaNZ = ["Australia", "New Zealand"];
        const middleEast = ["Bahrain", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", "Oman", "Qatar", "Saudi Arabia", "Syria", "Turkey", "Turkmenistan", "United Arab Emirates", "Yemen"];
        const latinAmerica = ["Brazil", "Mexico", "Argentina", "Colombia", "Chile", "Peru"];
        const africa = [
            "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
            "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros",
            "Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Ethiopia",
            "Gabon", "The Gambia", "Ghana", "Guinea", "Guinea-Bissau",
            "Cote D'Ivoire (Ivory Coast)", "Kenya", "Lesotho", "Liberia", "Libya",
            "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
            "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
            "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone",
            "Somalia", "South Africa", "Sudan", "Swaziland", "Tanzania", "Togo",
            "Tunisia", "Uganda", "Zambia", "Zimbabwe"
        ];
        const oceania = [
            "Fiji Islands",
            "Kiribati",
            "Marshall Islands",
            "Micronesia",
            "Nauru",
            "Palau",
            "Papua new Guinea",
            "Samoa",
            "Solomon Islands",
            "Tonga",
            "Tuvalu",
            "Vanuatu"
        ];
        const europe = [
            "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
            "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
            "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece",
            "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein",
            "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco",
            "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania",
            "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
            "United Kingdom", "Ukraine", "Vatican City State (Holy See)"
        ];


        // const asiaExcl = [
        //     "Afghanistan", "Bangladesh", "Bhutan", "Brunei Darussalam", "Burma",
        //     "Cambodia", "East Timor", "Hong Kong", "Indonesia", "Japan", "Kazakhistan",
        //     "Korea (North)", "Korea (South)", "Kyrgyzstan", "Laos", "Malaysia", "Maldives",
        //     "Mongolia", "Nepal", "Pakistan", "Philippines", "Russia", "Russian Federation",
        //     "Singapore", "Sri Lanka", "Tadjikistan", "Taiwan", "Thailand", "Turkmenistan",
        //     "Uzbekistan", "Vietnam"
        // ];

        // const africa = [
        //     "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
        //     "Cameroon", "Cape Verde Islands", "Central African Republic", "Chad",
        //     "Comoros", "Congo Democratic Rep.", "Congo Republic", "Djibouti", "Egypt",
        //     "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana",
        //     "Guinea", "Guinea Bissau", "Ivory Coast [Cote D'Ivoire]", "Kenya", "Lesotho",
        //     "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius",
        //     "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
        //     "Sao Tome & Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
        //     "Somaliland", "South Africa", "Sudan", "Swaziland", "Tanzania", "Togo",
        //     "Tonga", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
        // ];


        // const oceania = [
        //     "Fiji", "Kiribati", "Marshall Island (Majuro)", "Micronesia", "Nauru",
        //     "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga",
        //     "Tuvalu", "Vanuatu"
        // ];


        // const europe = [
        //     "Albania", "Andorra", "Armenia", "Austria", "Azerbaidjan", "Belarus", "Belgium",
        //     "Bosnia/Herzegovina", "Bulgaria", "Croatia / Hrvatsa", "Cyprus", "Czech Republic",
        //     "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece",
        //     "Hungary", "Iceland", "Ireland (Eire)", "Italy", "Latvia", "Liechtenstein",
        //     "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldavia", "Monaco",
        //     "Montenegro", "Netherlands/Holland", "Norway", "Poland", "Portugal", "Romania",
        //     "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
        //     "UK (United Kingdom)", "Ukraine", "Vatican City"
        // ];




        const c = country.toLowerCase();
        if (c === "india") return "India";
        if (c === "china") return "China";
        if (asiaExcl.map(x => x.toLowerCase()).includes(c)) return "Asia (excluding India & China)";
        if (australiaNZ.map(x => x.toLowerCase()).includes(c)) return "Australia & New Zealand";
        if (middleEast.map(x => x.toLowerCase()).includes(c)) return "Middle East";
        if (latinAmerica.map(x => x.toLowerCase()).includes(c)) return "Latin America";
        if (africa.map(x => x.toLowerCase()).includes(c)) return "Africa";
        if (oceania.map(x => x.toLowerCase()).includes(c)) return "Oceania";
        if (europe.map(x => x.toLowerCase()).includes(c)) return "Europe";

        // testing
        if (c === "christmas island") return "Christmas Island";

        if (["usa", "united states"].includes(c)) return "USA";

        if (["canada"].includes(c)) return "Canada";

        // if (["europe", "uk", "germany", "france", "italy", "spain"].includes(c)) return "Europe";
        return "Other Countries";
    };


    useEffect(() => {
        const submitVisitorPayment = async () => {
            const storedData = localStorage.getItem("gbr_form");
            if (!storedData) return;
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData);
            setLoading(false);

            if (hasSubmittedRef.current) return;
            hasSubmittedRef.current = true;
            sessionStorage.removeItem("visitor_payment_submitted");
            // if (sessionStorage.getItem("visitor_payment_submitted")) return;

            try {
                const payerCountry =
                    typeof parsedData?.contactCountry === "string"
                        ? parsedData.contactCountry
                        : parsedData?.contactCountry?.label;

                const targetCountry =
                    typeof parsedData?.country === "string"
                        ? parsedData.country
                        : parsedData?.country?.label;

                const region = getRegion(targetCountry || "");
                const isINR = payerCountry?.toLowerCase() === "india";
                const paymentAmount = isINR
                    ? pricingINR[region] || pricingINR["Other Countries"]
                    : pricingUSD[region] || pricingUSD["Other Countries"];
                const currency = isINR ? "INR" : "USD";

                const payload = {
                    ...parsedData,
                    userId: user?._id,
                    country: parsedData.country?.label || parsedData.country || "",
                    paymentAmount,
                    currency,
                };

                // await apiUrl.post("/visitors/payments", payload, {
                //     headers: { "Content-Type": "application/json" },
                // });

                // sessionStorage.setItem("visitor_payment_submitted", true);
            } catch (error) {
                console.error("❌ Error submitting visitor form:", error);
            }
        };

        submitVisitorPayment();
    }, []);

    if (loading || !formData) {
        // Skeleton Loader
        return (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-gray-50 p-6 border border-gray-200 rounded-xl space-y-4">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="lg:col-span-4 p-6 border border-gray-200 rounded-xl space-y-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        );
    }

    const payerCountry =
        typeof formData?.contactCountry === "string"
            ? formData.contactCountry
            : formData?.contactCountry?.label;

    const targetCountry =
        typeof formData?.country === "string"
            ? formData.country
            : formData?.country?.label;

    const region = getRegion(targetCountry || "");
    const isINR = payerCountry?.toLowerCase() === "india";
    const displayPrice = isINR
        ? `₹${pricingINR[region] || pricingINR["Other Countries"]}`
        : `$${pricingUSD[region] || pricingUSD["Other Countries"]}`;
    const paymentAmount = isINR
        ? pricingINR[region] || pricingINR["Other Countries"]
        : pricingUSD[region] || pricingUSD["Other Countries"];

    return (
        <div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Payment Section */}
                <div className="lg:col-span-8 bg-gray-50 p-6 border border-gray-200 rounded-xl">
                    <h2 className="text-xl font-semibold">Payment Summary</h2>
                    <h6 className="text-xs text-gray-600 mb-4 pb-4 border-b border-gray-300">
                        Make the payment through PayPal / Credit or Debit Card.
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
                                {isINR &&
                                    <tr className="border-t border-gray-300 font-semibold">
                                        <td className="py-3 pr-4 text-xl"></td>
                                        <td className="py-3 text-right text-sm">
                                            (including GST)
                                        </td>
                                    </tr>
                                }


                            </tbody>
                        </table>
                    </div>

                    <div className="w-full mx-auto mt-6 flex flex-col space-y-4 ">
                        {isINR ? (
                            <label className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl  hover:bg-gray-50">
                                <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                                    Pay via Razorpay <span className="text-xs">(For payments in INR from India)</span>
                                </span>
                                <div className="w-full md:w-auto flex justify-center z-10">
                                    <RazorpayCheckout amount={paymentAmount.toString()} userId={user?._id || ""} />
                                </div>
                            </label>
                        ) : (
                            <label className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl  hover:bg-gray-50">
                                <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                                    Pay via PayPal
                                </span>
                                <div className="w-full md:w-auto flex justify-center z-10">
                                    <PayPalCheckout amount={paymentAmount.toString()} userId={user?._id || ""} />
                                </div>
                            </label>
                        )}
                    </div>

                    <h6 className="text-xs text-center text-gray-600 mb-4 pb-4 border-b border-gray-300 mt-5">WE ACCEPT</h6>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <img src="https://badges.razorpay.com/badge-light.png" alt="Razorpay" className="h-6 object-contain" />
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" alt="PayPal" className="h-6 object-contain" />
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="Cards" className="h-6 object-contain" />
                        <img src="https://cdn.iconscout.com/icon/free/png-512/free-upi-logo-icon-svg-download-png-1747946.png?f=webp&w=512" alt="UPI" className="h-6 object-contain" />
                    </div>
                </div>

                {/* Right: Billing Summary */}
                <div className="lg:col-span-4 p-6 border border-gray-200 rounded-xl">
                    <h3 className="text-lg font-semibold">Billing Detail</h3>
                    <h6 className="text-xs mb-4 pb-4 border-b border-gray-300">Billing info solely for payment, not shared.</h6>

                    <table className="w-full text-sm text-left text-gray-800 border-separate border-spacing-y-2">
                        <tbody>
                            <tr><td className="py-2 pr-4 font-semibold">Name</td><td className="py-2 text-right">{formData.contactName}</td></tr>
                            <tr><td className="py-2 pr-4 font-semibold">Company</td><td className="py-2 text-right">{formData.contactCompany}</td></tr>
                            <tr><td className="py-2 pr-4 font-semibold">Country</td><td className="py-2 text-right">{payerCountry || formData.contactCountry}</td></tr>
                            <tr><td className="py-2 pr-4 font-semibold">Email</td><td className="py-2 text-right">{formData.contactEmail}</td></tr>
                            <tr><td className="py-2 pr-4 font-semibold">Telephone</td><td className="py-2 text-right">{formData.contactPhone}</td></tr>
                        </tbody>
                    </table>

                    <p className="text-xs text-black mt-4 p-4 border border-green-200 bg-green-100 rounded-lg text-center">
                        You will receive freshly investigated business credit report on your email within 1–3 business days.
                    </p>
                </div>
            </div>

            {/* Order Details */}
            <div className='border border-gray-200 rounded-lg px-2 mt-10 py-10'>
                <h3 className='text-xl md:text-2xl  font-semibold'>Your Order Information</h3>
                <div className="collapse rounded-lg mt-10">
                    <input type="checkbox" />
                    <div className="collapse-title flex justify-between items-center font-semibold text-base bg-gray-100 py-5 mb-10">
                        <span className='text-lg md:text-2xl'>{formData.companyName}</span>
                        <FaEye className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="collapse-content">
                        <div className="overflow-x-auto">
                            <table className="table table-md border-0 uppercase ">
                                <tbody>
                                    <tr><td className="font-bold">COMPANY NAME</td><td align='left'>{formData.companyName}</td></tr>
                                    <tr><td className="font-bold">ADDRESS</td><td align='left'>{formData.address}</td></tr>
                                    <tr><td className="font-bold">COUNTRY</td><td align='left'>{targetCountry || formData.country}</td></tr>
                                    <tr><td className="font-bold">STATE</td><td align='left'>{formData.state || '-'}</td></tr>
                                    <tr><td className="font-bold">CITY</td><td align='left'>{formData.city}</td></tr>
                                    <tr><td className="font-bold">POSTAL CODE</td><td align='left'>{formData.postalCode}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmContent;

