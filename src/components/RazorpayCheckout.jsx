"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";

export default function RazorpayCheckout({ amount = 100, userId }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("gbr_form");
        if (storedData) setFormData(JSON.parse(storedData));
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // 🔹 Call backend to create order
            const res = await apiUrl.post("/api/payment/create-order", { amount, userId, formData });
            const { orderId, key, amount: totalAmountFromBackend } = res.data;

            const options = {
                key,
                amount: totalAmountFromBackend * 100,
                currency: "INR",
                name: "Your Company Name",
                description: "Business Credit Report",
                order_id: orderId,
                handler: async function (response) {

                    // 🔹 Call backend to verify payment
                    await apiUrl.post("/api/payment/verify", response);

                    // alert("Payment successful!");
                    router.push('/order-success')
                },
                modal: {
                    ondismiss: async function () {
                        // console.log("User closed the payment modal", formData);
                        await apiUrl.post("/api/payment/cancellation", {
                            userId: formData.userId,
                            orderId,
                            data: formData,
                        });

                    }
                },

                prefill: { name: formData?.contactName || "", email: formData?.contactEmail || "", contact: formData?.contactPhone || "" },
                theme: { color: "#000000" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
            <button onClick={handlePayment} className=" btn flex items-center border border-transparent justify-center px-16 py-1 bg-blue-500 rounded-md text-white shadow-none text-lg hover:bg-blue-600 transition-all ">  {loading ? "Processing..." : "Pay Now"}</button>

        </>
    );
}
