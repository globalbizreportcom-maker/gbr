"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertProvider";
import { FiLoader, FiLock } from "react-icons/fi";


export function RazorpayCheckout({ amount = 100, userId }) {

    const { showAlert } = useAlert();

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
            const { orderId, key, currency, amount: totalAmountFromBackend } = res.data;

            const options = {
                key,
                amount: totalAmountFromBackend * 100,
                currency: currency, // <--- CHANGE THIS from 'USD' to the dynamic variable
                name: "Global Biz Report",
                description: "Business Credit Report",
                order_id: orderId,
                image: "https://www.globalbizreport.com/images/gbr_favicon.jpg",

                method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: false,    // Hides Wallets
                    emi: false,       // Hides EMI
                    paylater: false   // Hides Pay Later
                },

                handler: async function (response) {
                    try {
                        await apiUrl.post("/api/payment/verify", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        showAlert("Payment successful", "success");
                        window.location.href = `/order-success?paymentId=${response.razorpay_payment_id}`;
                    } catch (e) {
                        console.log("Verification failed", e);
                    }
                },

                modal: {
                    ondismiss: async function () {
                        // console.log("User closed the payment modal", formData);
                        await apiUrl.post("/api/payment/cancellation", {
                            userId: userId,
                            orderId,
                            data: formData,
                        });
                        showAlert(`Payment Cancelled`, "error");

                    }
                },

                prefill: { name: formData?.contactName || "", email: formData?.contactEmail || "", contact: formData?.contactPhone || "" },
                theme: { color: "#000000" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error);
            showAlert(`Payment failed. Please try again`, "error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
            {/* <button onClick={handlePayment} className=" btn flex items-center border border-transparent justify-center px-16 py-1 bg-indigo-500 rounded-md text-white shadow-none text-lg hover:bg-blue-600 transition-all ">  {loading ? "Processing..." : "Pay Now"}</button> */}

            <button
                onClick={handlePayment}
                disabled={loading}
                className={`
    btn group relative flex items-center justify-center gap-2 
    px-8 py-2 rounded-lg text-lg font-medium
    transition-all duration-200 ease-in-out
    ${loading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-600 active:transform active:scale-95 shadow-md hover:shadow-lg"
                    } 
    text-white border-none outline-none focus:ring-4 focus:ring-indigo-300
  `}
            >
                {loading ? (
                    <>
                        <FiLoader className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <FiLock className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span>Pay Now</span>
                    </>
                )}
            </button>

        </>
    );
}
