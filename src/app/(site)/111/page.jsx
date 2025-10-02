"use client";

import Script from "next/script";

// id : rzp_test_RLLP7cC84Ep2ms
// Test Key Secret : lCg8ZeIBhKQ93v9CDmZ4QrS2

export default function RazorpayCheckout({ amount = 100, orderId }) {
    const handlePayment = () => {
        const options = {
            key: "rzp_test_RLLP7cC84Ep2ms",
            amount: amount * 100,
            currency: "INR",
            name: "Your Company Name",
            description: "Business Credit Report",
            order_id: orderId,
            handler: function (response) {
                console.log("✅ Razorpay payment successful:", response);
                alert("Payment successful!");
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            theme: { color: "#000000" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />
            <button onClick={handlePayment} id="rzp-button" className="cursor-pointer flex items-center justify-center px-8 py-2 bg-blue-500 rounded-md text-white font-semibold text-lg tracking-wide hover:shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#006494]">Pay Now</button>
        </>
    );
}
