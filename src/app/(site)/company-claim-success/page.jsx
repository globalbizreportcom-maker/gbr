

"use client";



import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { apiUrl } from "@/api/api";

export const dynamic = "force-dynamic";


export default function CompanyClaimSuccess() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("id"); // ?id=razorpayPaymentId

    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!paymentId) {
            router.replace("/"); // redirect immediately if no id
            return;
        }

        // Verify payment with backend
        const verifyPayment = async () => {
            try {
                const res = await apiUrl.post("/claim-company/order-verify", {
                    razorpayPaymentId: paymentId
                });

                // If backend confirms, show the page
                if (res.data.success) {
                    setIsVerified(true);
                } else {
                    router.replace("/"); // redirect if not valid
                }
            } catch (err) {
                // alert(err?.data.message || err?.message || 'Something Went Wrong!')
                router.replace("/"); // redirect on error
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [paymentId, router]);

    useEffect(() => {
        if (!isVerified) return;

        const timer = setTimeout(() => {
            router.push("/dashboard");
        }, 5000); // 5 seconds

        return () => clearTimeout(timer); // cleanup
    }, [isVerified, router]);


    if (loading) return null; // optional: add a spinner here
    if (!isVerified) return null; // prevent flicker

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                {/* Success Icon */}
                <div className="text-green-500 mb-4">
                    <FaCheckCircle className="mx-auto text-6xl" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-semibold mb-2 text-green-700">
                    Payment Successful!
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-2">
                    Thank you for your order. Your payment has been successfully processed.
                </p>

                <p className="text-gray-700 font-semibold mb-6 ">
                    Your Reference ID : {paymentId}
                </p>

                <p className="text-sm text-gray-500 mb-2">
                    Redirecting to dashboard in 5 seconds...
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => router.push(`/dashboard/claimed-companies`)}
                        className="text-white px-6 py-2 rounded-md btn btn-primary"
                    >
                        View Order
                    </button>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="border btn btn-neutral shadow-none px-6 py-2 rounded-md"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}