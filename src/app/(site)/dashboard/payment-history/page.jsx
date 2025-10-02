"use client";
import React, { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext";
import { apiUrl } from "@/api/api";

export default function PaymentHistory() {
    const { user } = useDashboard();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState(null); // accordion

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user?._id) return;

            try {
                const res = await apiUrl.get(`/user/payments`, {
                    params: { userId: user._id },
                });
                setPayments(res.data);
            } catch (err) {
                console.log("Error fetching payments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user?._id]);

    console.log(payments);

    if (loading) return <p className="p-6 text-gray-500">Loading payments...</p>;
    if (payments.length === 0) return <p className="p-6 text-gray-500">No payments found.</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-0  lg:p-8 max-w-5xl mx-auto" >
            {/* Header */}
            <h1 className="text-md font-bold text-gray-600 mb-6">
                Payment History
            </h1>

            {/* Payments List */}
            <div className="space-y-4">
                {payments.map((payment, idx) => (
                    <div
                        key={payment._id}
                        className="bg-white "
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="cursor-pointer w-full flex justify-between items-center p-4 sm:p-5 focus:outline-none"
                        >
                            {/* Left: Serial Number + Order Info */}
                            <div className="flex items-center space-x-3">
                                {/* Serial Number */}
                                <span className="text-black font-bold">{idx + 1}.</span>

                                {/* Order ID */}
                                <span className="text-black font-medium truncate">
                                    {payment.orderId.slice(0, 10)}
                                </span>

                                {/* Status */}
                                <span
                                    className={`px-2 py-1 rounded text-xs sm:text-sm font-semibold ${payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {payment.status === "paid" ? 'Success' : payment.status === "pending" ? "Failed" : 'Cancelled'}
                                </span>
                            </div>

                            {/* Right: Date + Dropdown Arrow */}
                            <div className="flex items-center space-x-2">
                                <span className="text-black text-sm ">
                                    {new Date(payment.createdAt).toLocaleDateString()}
                                </span>

                                {/* Dropdown Arrow */}
                                <svg
                                    className={`w-4 h-4 text-gray-700 transform transition-transform duration-200 ${openIndex === idx ? "rotate-180" : "rotate-0"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>


                        {/* Accordion Content */}
                        {openIndex === idx && (
                            <div className="p-4  border-t border-gray-200 space-y-4 bg-gray-50 rounded-b-xl shadow-inner transition-all duration-300">

                                {/* Payment Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-sm">Payment ID</span>
                                        <span className="text-black font-medium">{payment.paymentId}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-sm ">Amount</span>
                                        <span className="text-black font-medium">{payment.amount} {payment.currency}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-sm ">Paid At</span>
                                        <span className="text-black font-medium">{payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "-"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-sm ">Status</span>
                                        <span className={`text-black font-semibold ${payment.status === "paid" ? "text-green-600" : "text-red-600"}`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Report Request Details */}
                                {payment.reportRequest && (
                                    <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 ">
                                        <h3 className="font-semibold text-gray-400 mb-3 text-sm">Report Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm ">Company</span>
                                                <span className="text-black font-medium">{payment.reportRequest.targetCompany?.name || "-"}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm ">Requested By</span>
                                                <span className="text-black font-semibold ">
                                                    {payment.reportRequest.requesterInfo?.email
                                                        ? payment.reportRequest.requesterInfo.email.toLowerCase()
                                                        : "-"}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm ">Requested On</span>
                                                <span className="text-black font-medium">{new Date(payment.reportRequest.createdAt).toLocaleDateString()}</span>
                                            </div>

                                            <div className="flex flex-col space-y-1">
                                                <span className="text-gray-500 text-sm ">
                                                    Report will be sent to:
                                                </span>
                                                <div className="flex flex-col sm:flex-row sm:space-x-2">
                                                    {payment.reportRequest.requesterInfo?.email && (
                                                        <span className="text-black font-semibold">
                                                            {payment.reportRequest.requesterInfo.email.toLowerCase()}
                                                        </span>
                                                    )}
                                                    {payment.reportRequest.requesterInfo?.optionalEmail && (
                                                        <span className="text-black font-semibold">
                                                            ({payment.reportRequest.requesterInfo.optionalEmail.toLowerCase()})
                                                        </span>
                                                    )}
                                                    {!payment.reportRequest.requesterInfo?.email && !payment.reportRequest.requesterInfo?.optionalEmail && (
                                                        <span className="text-black font-semibold">-</span>
                                                    )}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>

    );
}
