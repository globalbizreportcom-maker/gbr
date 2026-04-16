"use client";
import Script from "next/script";
import { useState } from "react";

export default function RazorpayDummyTest() {
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);

        const options = {
            // 1. ⚠️ REPLACE WITH YOUR ACTUAL TEST KEY
            key: "rzp_test_RLLP7cC84Ep2ms",
            amount: "50000", // ₹500.00
            currency: "INR",
            name: "Dummy Test Store",
            description: "Testing UPI Visibility",
            image: "https://www.globalbizreport.com/images/gbr_favicon.jpg",

            // 2. Prefill is crucial for UPI detection
            prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9999999999",
            },

            handler: function (response) {
                // alert("Payment Successful! ID: " + response.razorpay_payment_id);
                setLoading(false);
            },
            modal: {
                ondismiss: function () {
                    console.log("Checkout closed");
                    setLoading(false);
                },
            },
            theme: { color: "royalblue" },
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Razorpay failed to load", err);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <h1 className="text-xl font-bold">Razorpay UPI Isolation Test</h1>

            <button
                onClick={handlePayment}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Opening..." : "Test Pay Now (INR)"}
            </button>

            <div className="text-sm text-gray-500 max-w-md text-center">
                <p>If you click this and <strong>still</strong> don't see UPI:</p>
                <ul className="list-disc text-left mt-2 ml-4">
                    <li>Your account is likely in "International Only" mode.</li>
                    <li>The <strong>Order ID</strong> might be mandatory for your account type (this dummy doesn't use one).</li>
                    <li>Check your Razorpay Dashboard → Settings → Payment Methods.</li>
                </ul>
            </div>
        </div>
    );
}