"use client";


import PayPalCheckout from "@/components/PayPalCheckout";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export const dynamic = "force-dynamic";


const EmailCheckout = () => {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState(null);
    const [countries, setCountries] = useState([]);

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
                console.error("❌ Failed to load countries:", err);
            }
        }
        fetchCountries();
    }, []);

    // ✅ Decode visitor data
    useEffect(() => {
        const encoded = searchParams.get("data");
        if (encoded) {
            try {
                const decoded = JSON.parse(
                    Buffer.from(decodeURIComponent(encoded), "base64").toString("utf8")
                );
                console.log(decoded);
                setFormData(decoded);
            } catch (err) {
                console.error("❌ Invalid data:", err.message);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (!formData) return;

        const timeout = setTimeout(() => {
            localStorage.setItem("gbr_form", JSON.stringify(formData));
        }, 500); // wait half a second after user stops typing

        return () => clearTimeout(timeout);
    }, [formData]);


    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                <FaSpinner className="animate-spin" /> <p>Loading...</p>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("✅ Checkout Data:", formData);
        alert("Proceeding to payment with updated info!");
    };

    return (
        <div className=" max-w-7xl mx-auto py-10 px-1 sm:px-6 lg:px-8 text-gray-800">
            <h1 className="text-xl font-semibold mb-8 text-left p-2">
                Complete Your Business Credit Report Order
            </h1>

            <div className="max-w-full justify-center items-center md:justify-end md:items-end mt-6 flex flex-col space-y-4">
                {formData?.currency === 'INR' ? (
                    <label className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                            Pay via Razorpay <span className="text-xs">(For payments in INR from India)</span>
                        </span>
                        <div className="w-full md:w-auto flex justify-center">
                            <RazorpayCheckout amount={formData?.paymentAmount?.toString() || '0'} userId={formData?.user || ""} />
                        </div>
                    </label>
                ) : (
                    <label className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                            Pay via PayPal
                        </span>
                        <div className="w-full md:w-auto flex justify-center">
                            <PayPalCheckout amount={formData?.paymentAmount?.toString() || '0'} userId={formData?.user || ""} />
                        </div>
                    </label>
                )}
            </div>


            <form
                onSubmit={handleSubmit}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 bg-white rounded-2xl p-1 md:p-8"
            >

                {/* ================= left Side – Company Details ================= */}
                <div className="space-y-4 border border-gray-200 p-6 rounded-2xl bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Order Summary
                        <p className="text-xs font-normal text-gray-500 mb-4 pb-2">
                            Make the payment through PayPal / Credit or Debit Card.
                        </p>
                    </h2>


                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Country
                                </label>
                                <select
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
                                    City
                                </label>
                                <input
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
                <div className="space-y-4 border border-gray-200 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Billing Details
                        <p className="text-xs font-normal text-gray-500 mb-4 pb-2">
                            Billing info solely for payment, not shared.
                        </p>
                    </h2>


                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Contact Name
                            </label>
                            <input
                                type="text"
                                name="contactName"
                                value={formData.contactName || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 uppercase focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="contactPhone"
                                value={formData.contactPhone || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Country
                            </label>
                            <select
                                name="country"
                                value={formData.country || ""}
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

            </form >

            <div className="max-w-full justify-center items-center  mt-6 flex flex-col space-y-4">
                {formData?.currency === 'INR' ? (
                    <label className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                            Pay via Razorpay <span className="text-xs">(For payments in INR from India)</span>
                        </span>
                        <div className="w-full md:w-auto flex justify-center">
                            <RazorpayCheckout amount={formData?.paymentAmount?.toString() || '0'} userId={formData?.user || ""} />
                        </div>
                    </label>
                ) : (
                    <label className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-600 mb-2 md:mb-0 md:mr-4 text-center md:text-left">
                            Pay via PayPal
                        </span>
                        <div className="w-full md:w-auto flex justify-center">
                            <PayPalCheckout amount={formData?.paymentAmount?.toString() || '0'} userId={formData?.user || ""} />
                        </div>
                    </label>
                )}
            </div>

        </div >
    );
}

export default EmailCheckout;