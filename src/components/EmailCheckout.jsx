"use client";


import { useDashboard } from "@/app/(site)/dashboard/DashboardContext";
import PayPalCheckout from "@/components/PayPalCheckout";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { useAlert } from "@/context/AlertProvider";
import PhoneInputWithCountry from "@/utils/PhoneFiled";
import RequiredStar from "@/utils/RequiredStar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export const dynamic = "force-dynamic";

const highlights = [
    "100% Freshly Investigated Reports",
    "Trusted by 20,000+ Global Companies",
    "Advanced Company Rating System",
    "Detailed Report with Comprehensive Insights",
    "Make Informed Decisions and Mitigate Risks",
];

const HighlightsGrid = ({ className = "" }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 ${className}`}>
        {highlights.map((text, idx) => (
            <div
                key={idx}
                className="border border-gray-200 rounded-md bg-gray-50 p-3 text-center border-l-4 border-l-primary"
            >
                <h4 className="text-xs font-small">{text}</h4>
            </div>
        ))}
    </div>
);

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);



const EmailCheckout = () => {

    const { showAlert } = useAlert();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState(null);
    const [countries, setCountries] = useState([]);
    const [showBtn, setBtn] = useState(false)
    const [countryIso, setCountryIso] = useState("");
    const [loading, setLoading] = useState(false)

    const { user } = useDashboard();

    const getRegion = (country) => {
        if (!country) return "Other Countries";
        // const asiaExcl = ["Japan", "South Korea", "Singapore", "Thailand", "Malaysia", "Indonesia", "Philippines", "Vietnam", "Nepal", "Sri Lanka", "Bangladesh", "Pakistan", "Myanmar", "Bhutan", "Cambodia", "Laos", "Brunei", "Maldives"];
        // const australiaNZ = ["Australia", "New Zealand"];
        // const middleEast = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"];
        // const latinAmerica = ["Brazil", "Mexico", "Argentina", "Colombia", "Chile", "Peru"];
        // const africa = ["South Africa", "Nigeria", "Egypt", "Kenya", "Morocco", "Ethiopia"];
        // const oceania = ["Fiji", "Papua New Guinea", "Samoa", "Tonga"];


        const asiaExcl = ["Afghanistan", "Bangladesh", "Bhutan", "Brunei", "Myanmar", "Cambodia", "Timor-Leste", "Hong Kong", "Indonesia", "Japan", "Kazakhstan", "North Korea", "South Korea", "Kyrgyzstan", "Laos", "Malaysia", "Maldives", "Mongolia", "Nepal", "Pakistan", "Philippines", "Russia", "Singapore", "Sri Lanka", "Tajikistan", "Taiwan", "Thailand", "Turkmenistan", "Uzbekistan", "Vietnam"];
        const australiaNZ = ["Australia", "New Zealand"];
        const middleEast = ["Bahrain", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", "Oman", "Qatar", "Saudi Arabia", "Syria", "Turkey", "Turkmenistan", "United Arab Emirates", "Yemen"];
        const latinAmerica = ["Brazil", "Mexico", "Argentina", "Colombia", "Chile", "Peru"];
        const africa = ["Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros", "Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "Sudan", "Eswatini", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"];
        const oceania = ["Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"];
        const europe = [
            "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
            "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
            "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece",
            "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein",
            "Lithuania", "Luxembourg", "North Macedonia", "Malta", "Moldova", "Monaco",
            "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania",
            "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
            "United Kingdom", "Ukraine", "Vatican City State (Holy See)"
        ];

        const c = country.toLowerCase();
        if (c === "india") return "India";
        if (c === "china") return "China";
        if (asiaExcl.map(x => x.toLowerCase()).includes(c)) return "Asia (excluding India & China)";
        if (australiaNZ.map(x => x.toLowerCase()).includes(c)) return "Australia & New Zealand";
        if (middleEast.map(x => x.toLowerCase()).includes(c)) return "Middle East";
        if (latinAmerica.map(x => x.toLowerCase()).includes(c)) return "Latin America";
        if (africa.map(x => x.toLowerCase()).includes(c)) return "Africa";
        if (oceania.map(x => x.toLowerCase()).includes(c)) return "Oceania";
        if (["usa", "united states"].includes(c)) return "USA";
        if (["canada"].includes(c)) return "Canada";
        if (europe.map(x => x.toLowerCase()).includes(c)) return "Europe";

        // if (["europe", "uk", "germany", "france", "italy", "spain"].includes(c)) return "Europe";
        return "Other Countries";
    };

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
        "Other Countries": 89,
    };

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





    // ✅ Fetch country list dynamically
    useEffect(() => {
        async function fetchCountries() {
            try {
                const res = await fetch("https://countriesnow.space/api/v0.1/countries");
                const data = await res.json();
                if (data?.data) {
                    setCountries(data.data.map((c) => c.country));
                }
            } catch (err) {
                console.log(" Failed to load countries:", err);
            }
        }
        fetchCountries();
    }, []);


    useEffect(() => {
        const fetchIsoForCountry = async () => {
            if (!formData?.contactCountry) return;

            try {
                const res = await fetch('https://countriesnow.space/api/v0.1/countries');
                const data = await res.json();

                if (data?.data?.length) {
                    const match = data.data.find(
                        (c) =>
                            c.country.toLowerCase() ===
                            formData.contactCountry.toLowerCase()
                    );

                    if (match) {
                        setCountryIso(match.iso2);
                    } else {
                        setCountryIso('');
                    }
                }
            } catch (err) {
                console.log('Failed to fetch ISO code:', err);
                setCountryIso('');
            }
        };

        fetchIsoForCountry();
    }, [formData?.contactCountry]);



    // ✅ Decode visitor data
    useEffect(() => {
        const encoded = searchParams.get("data");
        if (encoded) {
            try {
                const decoded = JSON.parse(
                    Buffer.from(decodeURIComponent(encoded), "base64").toString("utf8")
                );
                setFormData(decoded);
            } catch (err) {
                console.log(" Invalid data:", err.message);
            }
        }
    }, [searchParams]);

    // 🧩 Keep formData in sync with currency and amount
    useEffect(() => {
        if (!formData) return;

        setFormData((prev) => ({
            ...prev,
            currency: isINR ? "INR" : "USD",
            paymentAmount: paymentAmount,
        }));
    }, [isINR, paymentAmount]);


    useEffect(() => {
        if (!formData) return;

        const timeout = setTimeout(() => {
            localStorage.setItem("gbr_form", JSON.stringify(formData));
        }, 500); // wait half a second after user stops typing

        return () => clearTimeout(timeout);
    }, [formData]);


    if (!formData) {
        return (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[50vh] py-10">
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)
        localStorage.setItem("gbr_form", JSON.stringify(formData));

        if (!formData?.user
            // || !user?._id
        ) {
            showAlert('User Id is missing! Contact Us to continue checkout!', 'error');
            setLoading(false);

            return
        }

        if (!formData?.contactPhone
            // || !user?._id
        ) {
            showAlert('Billing Phone Number is missing!', 'error');
            setLoading(false);

            return
        }

        // Delay showing payment buttons by 1 second
        setTimeout(() => {
            setBtn(true);
            setLoading(false)
        }, 1000);
    };




    return (
        <div className=" max-w-7xl mx-auto py-10 px-1 sm:px-6 lg:px-8 text-gray-800 ">

            <HighlightsGrid className="hidden sm:grid" />

            {/* <div className="w-full bg-gray-50 rounded-xl  p-4 md:p-6 mb-4">
                <h1 className="text-xl font-semibold text-gray-800 mb-1">
                    Complete Your Order
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                    <span className="text-indigo-500 font-semibold">Step 1:</span> Confirm Order
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-indigo-500 font-semibold">Step 2:</span> Payment
                </p>
            </div> */}



            <div
                className={`p-4 items-end justify-center md:justify-end ${showBtn ? "flex" : "hidden"}`}
            >
                <button
                    onClick={() => setBtn(false)}
                    className="mt-4 w-full md:w-auto px-6 py-2 rounded-md btn btn-dash hidden xs:flex"
                >
                    Edit Order
                </button>
            </div>



            <form
                onSubmit={handleSubmit}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 bg-white rounded-2xl md:py-5"
            >

                {/* ================= left Side – Company Details ================= */}
                <div className="space-y-4  p-2 rounded-2xl border border-gray-100  ">
                    <div className="w-full bg-gray-50 py-4 px-2 border border-gray-100  rounded-xl mb-4">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-baseline justify-between">
                            <span>Order Summary</span>
                            <span className="text-indigo-600 font-bold text-lg">{displayPrice}</span>
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500 mt-2">
                            Make the payment securely via PayPal,{" "}
                            Razorpay, or your{" "}
                            Credit / Debit Card.
                        </p>
                    </div>



                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Company Name <RequiredStar />
                            </label>
                            <input
                                disabled={showBtn}

                                required
                                type="text"
                                name="companyName"
                                value={formData.companyName || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Address <RequiredStar />
                            </label>
                            <textarea
                                disabled={showBtn}
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                rows={3}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Country <RequiredStar />
                                </label>
                                <select
                                    disabled={showBtn}
                                    required
                                    name="country"
                                    value={formData.country || ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                                >
                                    {countries.length > 0 ? (
                                        countries.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))
                                    ) : (
                                        <option>Loading countries...</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    City <RequiredStar />
                                </label>
                                <input
                                    disabled={showBtn}
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city || ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    State
                                </label>
                                <input
                                    disabled={showBtn}
                                    type="text"
                                    name="state"
                                    value={formData.state || ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Postal Code
                                </label>
                                <input
                                    disabled={showBtn}
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode || ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= right Side – Contact Details ================= */}
                <div className="space-y-4 border border-gray-100 p-6 rounded-2xl bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800 ">
                        Billing Details
                        <p className="text-xs font-normal text-gray-500 mb-4 pb-2">
                            Billing info solely for payment, not shared.
                        </p>
                    </h2>


                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Contact Name <RequiredStar />
                            </label>
                            <input
                                disabled={showBtn}
                                required
                                type="text"
                                name="contactName"
                                value={formData.contactName || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 uppercase focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Contact Email <RequiredStar />
                            </label>
                            <input
                                disabled={showBtn}
                                required
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div className={`${showBtn ? 'disabled' : ''} `}>
                            <label className="block text-sm font-medium text-gray-600">
                                Phone Number <RequiredStar />
                            </label>


                            <PhoneInputWithCountry
                                key={formData.contactCountry || ''}
                                defaultCountry={countryIso.toLowerCase() || ''}
                                value={formData.contactPhone || ''}
                                onChange={(phone) =>
                                    setFormData({ ...formData, contactPhone: phone })
                                }
                            />


                            {/* <input
                                disabled={showBtn}
                                required
                                type="text"
                                name="contactPhone"
                                value={formData.contactPhone || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            /> */}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Country <RequiredStar />
                            </label>
                            <select
                                disabled={showBtn}
                                required
                                name="contactCountry"
                                value={formData.contactCountry || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            >
                                {countries.length > 0 ? (
                                    countries.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))
                                ) : (
                                    <option>Loading countries...</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="bg-green-100 rounded-2xl p-4">
                        <p className="text-xs">You will receive freshly investigated business credit report on your email within 1–3 business days.</p>
                    </div>
                </div>

                <div
                    className={`p-4 items-end justify-center md:justify-end ${showBtn ? "hidden" : "flex"}`}
                >
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 w-full md:w-auto px-6 py-2 rounded-md flex items-center justify-center gap-2
        ${loading ? 'bg-primary text-white opacity-90 cursor-not-allowed' : 'btn btn-primary'}
    `}
                    >
                        {loading && <FaSpinner className="animate-spin" />}
                        <span>{loading ? "Requesting Checkout..." : `Submit & Proceed to Payment ${displayPrice}`}</span>
                    </button>



                </div>

            </form >

            {showBtn && (
                <div className="max-w-full flex flex-col md:flex-row justify-evenly items-center mt-6 space-y-4 md:space-y-0">
                    {/* 🔹 Edit Order Button */}
                    <button
                        onClick={() => setBtn(false)}
                        className="mt-4 w-full md:w-auto px-6 py-2 rounded-md btn btn-dash"
                    >
                        Edit Order
                    </button>

                    {/* 🔹 Payment Section */}
                    <div className="w-full md:w-auto flex flex-col md:flex-row items-center justify-center  gap-4">
                        {isINR ? (
                            <div className="w-full md:w-auto flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl  hover:bg-gray-50 transition">
                                <span className="font-medium text-gray-600 text-center md:text-left mb-2 md:mb-0 md:mr-4">
                                    Pay via Razorpay{" "}
                                    <span className="text-xs text-gray-500">(INR payments only)</span>
                                </span>
                                <div className="w-full md:w-auto flex justify-center">
                                    {paymentAmount && (
                                        <RazorpayCheckout
                                            key={`razor-${paymentAmount}-${formData?.currency}`}
                                            amount={paymentAmount.toString()}
                                            userId={formData.user || user?._id || ""}
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full md:w-auto flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl  hover:bg-gray-50 transition">
                                <span className="font-medium text-gray-600 text-center md:text-left mb-2 md:mb-0 md:mr-4">
                                    Pay via PayPal
                                </span>
                                <div className="w-full md:w-auto flex justify-center">
                                    {paymentAmount && (
                                        <PayPalCheckout
                                            key={`paypal-${paymentAmount}-${formData?.currency}`}
                                            amount={paymentAmount.toString()}
                                            userId={formData.user || user?._id || ""}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}



            <HighlightsGrid className="grid sm:hidden" />

        </div >
    );
}

export default EmailCheckout;