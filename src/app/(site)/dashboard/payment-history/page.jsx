"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDashboard } from "../DashboardContext";
import { apiUrl } from "@/api/api";

export default function PaymentHistory() {
    const { user } = useDashboard();
    const [payments, setPayments] = useState([]);
    const [claimedPayments, setClaimedPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("report");
    const [reportSubTab, setReportSubTab] = useState("success");
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user?._id) return;
            try {
                const res = await apiUrl.get(`/user/payments`, { params: { userId: user._id } });
                setPayments(res.data.reportPayments || []);
                setClaimedPayments(res.data.claimPayments || []);
            } catch (err) { console.log("Error:", err); }
            finally { setLoading(false); }
        };
        fetchPayments();
    }, [user?._id]);

    // Derived filtered list
    const filteredData = useMemo(() => {
        let list = activeTab === "report" ? payments : claimedPayments;
        if (activeTab === "report") {
            list = list.filter(p => reportSubTab === "success" ? p.status === "paid" : p.status !== "paid");
        }
        return list.filter((p) =>
            (p.reportRequest?.targetCompany?.name || p.company?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.orderId || p.razorpayOrderId || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [activeTab, reportSubTab, payments, claimedPayments, searchTerm]);

    // Reset page on filter change
    useEffect(() => { setCurrentPage(1); }, [activeTab, reportSubTab, searchTerm]);

    if (loading) return <p className="p-6 text-gray-500">Loading payments...</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8 max-w-5xl mx-auto">
            <h1 className="text-lg sm:text-xl font-bold text-gray-600 mb-6">Payment History</h1>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeTab={activeTab}
                reportSubTab={reportSubTab}
                setReportSubTab={setReportSubTab}
            />

            <PaymentList
                data={filteredData}
                activeTab={activeTab}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />

            <Pagination
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

const PaymentList = ({ data, activeTab, currentPage, itemsPerPage }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    if (data.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-400 italic">No payments found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {paginatedData.map((payment, idx) => (
                activeTab === "report" ? (
                    <ReportPaymentAccordion
                        key={payment._id}
                        payment={payment}
                        idx={startIndex + idx}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                    />
                ) : (
                    <ClaimPaymentAccordion
                        key={payment._id}
                        payment={payment}
                        idx={startIndex + idx}
                        openClaimIndex={openIndex}
                        setOpenClaimIndex={setOpenIndex}
                    />
                )
            ))}
        </div>
    );
};
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-8 px-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
                Previous
            </button>

            <div className="hidden sm:block text-sm text-gray-500">
                Page <span className="font-semibold text-gray-700">{currentPage}</span> of {totalPages}
            </div>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};
const Tabs = ({ activeTab, setActiveTab }) => (
    <div className="flex space-x-4 mb-4 border-b border-gray-300">
        {["report", "claim"].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 -mb-1 text-sm font-medium capitalize cursor-pointer transition-colors ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                    }`}
            >
                {tab === "report" ? "Report Payments" : "Claimed Payments"}
            </button>
        ))}
    </div>
);

const SearchAndFilters = ({ searchTerm, setSearchTerm, activeTab, reportSubTab, setReportSubTab }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
            {activeTab === "report" && (
                <div className="flex bg-gray-200/50 p-1 rounded-lg w-fit">
                    <button
                        onClick={() => setReportSubTab("success")}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${reportSubTab === "success" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                            }`}
                    >
                        Successful Transfers
                    </button>
                    <button
                        onClick={() => setReportSubTab("failed")}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${reportSubTab === "failed" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"
                            }`}
                    >
                        Failed Attempts
                    </button>
                </div>
            )}
        </div>
        <input
            type="text"
            placeholder="Search payments..."
            className="w-full max-w-sm px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
);

// Report Accordion Component
const ReportPaymentAccordion = ({ payment, idx, openIndex, setOpenIndex }) => (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="cursor-pointer w-full flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-5 focus:outline-none"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-gray-600 font-bold text-lg">{idx + 1}.</span>
                    <div className="flex flex-col">
                        <span className="text-gray-800 font-semibold text-start text-sm sm:text-base">
                            {payment.reportRequest.targetCompany?.name || "-"}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm truncate max-w-[200px] text-start">
                            {payment.orderId}
                        </span>
                    </div>
                </div>
                <div className="mt-2 sm:mt-0 flex justify-end">
                    <span
                        className={`inline-block px-3 py-1 rounded-md text-xs sm:text-sm font-semibold ${payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {payment.status === "paid"
                            ? "Success"
                            : payment.status === "pending"
                                ? "Pending"
                                : "Cancelled"}
                    </span>
                </div>
            </div>
            <div className="flex justify-between space-x-2 mt-2 sm:mt-0">
                <span className="text-gray-600 text-sm whitespace-nowrap">
                    {new Date(payment.createdAt).toLocaleDateString("en-GB")}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${openIndex === idx ? "rotate-180" : "rotate-0"
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
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 space-y-4 transition-all duration-300">
                {/* Payment Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: "Payment ID", value: payment.paymentId },
                        { label: "Amount", value: `${payment.amount} ${payment.currency}` },
                        {
                            label: "Paid At",
                            value: payment.paidAt
                                ? new Date(payment.paidAt).toLocaleString("en-GB")
                                : "-",
                        },
                        {
                            label: "Status",
                            value: payment.status,
                            className:
                                payment.status === "paid" ? "text-green-600" : "text-red-600",
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-gray-500 text-sm">{item.label}</span>
                            <span className={`text-black font-medium ${item.className || ""}`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Report Request Details */}
                {payment.reportRequest && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                        <h3 className="font-semibold text-gray-400 mb-3 text-sm">
                            Report Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Company */}
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Company</span>
                                <span className="text-black font-medium">
                                    {payment.reportRequest.targetCompany?.name || "-"}
                                </span>
                            </div>

                            {/* Requested By */}
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Requested By</span>
                                <span className="text-black font-semibold truncate">
                                    {payment.reportRequest.requesterInfo?.email?.toLowerCase() || "-"}
                                </span>
                            </div>

                            {/* Requested On */}
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Requested On</span>
                                <span className="text-black font-medium">
                                    {new Date(payment.reportRequest.createdAt).toLocaleString("en-GB")}
                                </span>
                            </div>

                            {/* Report will be sent to */}
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Report will be sent to:</span>
                                <div className="flex flex-col sm:flex-row sm:space-x-2">
                                    {payment.reportRequest.requesterInfo?.email && (
                                        <span className="text-black font-semibold truncate">
                                            {payment.reportRequest.requesterInfo.email.toLowerCase()}
                                        </span>
                                    )}
                                    {payment.reportRequest.requesterInfo?.optionalEmail && (
                                        <span className="text-black font-semibold truncate">
                                            ({payment.reportRequest.requesterInfo.optionalEmail.toLowerCase()})
                                        </span>
                                    )}
                                    {!payment.reportRequest.requesterInfo?.email &&
                                        !payment.reportRequest.requesterInfo?.optionalEmail && (
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
);

// Claim Accordion Component
const ClaimPaymentAccordion = ({ payment, idx, openClaimIndex, setOpenClaimIndex }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button
            onClick={() => setOpenClaimIndex(openClaimIndex === idx ? null : idx)}
            className="cursor-pointer w-full flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-5 focus:outline-none"
        >

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-gray-600 font-bold text-lg">{idx + 1}.</span>
                    <div className="flex flex-col">
                        <span className="text-gray-800 font-semibold text-start text-sm sm:text-base">
                            {payment.company?.name || "-"}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm truncate max-w-[200px] text-start">
                            {payment.razorpayOrderId}
                        </span>
                    </div>
                </div>
                <div className="mt-2 sm:mt-0 flex justify-end">
                    <span
                        className={`inline-block px-3 py-1 rounded-md text-xs sm:text-sm font-semibold ${payment.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : payment.paymentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {payment.paymentStatus === "paid"
                            ? "Success"
                            : payment.paymentStatus === "pending"
                                ? "Pending"
                                : "Cancelled"}
                    </span>
                </div>
            </div>
            <div className="flex justify-between space-x-2 mt-2 sm:mt-0">
                <span className="text-gray-600 text-sm whitespace-nowrap">
                    {new Date(payment.createdAt).toLocaleDateString("en-GB")}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${openClaimIndex === idx ? "rotate-180" : "rotate-0"
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
        {openClaimIndex === idx && (
            <div className="p-4 border-t border-gray-200 space-y-4 bg-gray-50 rounded-b-xl shadow-inner transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Razorpay Order ID</span>
                        <span className="text-black font-medium">{payment.razorpayOrderId}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Amount</span>
                        <span className="text-black font-medium">
                            {payment.amount / 100} {payment.currency}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Claiming Approval Status</span>
                        <span
                            className={`capitalize font-semibold ${payment.claimStatus === "pending"
                                ? "text-yellow-600"
                                : payment.claimStatus === "approved"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {payment.claimStatus}
                        </span>
                    </div>
                </div>

                {/* Company Info */}
                {payment?.company && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                        <h3 className="font-semibold text-gray-400 mb-3 text-sm">Company Info</h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="text-gray-500 text-sm">Name</span>
                                <span className="text-black text-sm font-medium">{payment.company.name}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="text-gray-500 text-sm">CIN</span>
                                <span className="text-black text-sm font-medium">{payment.company.cin}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <span className="text-gray-500 text-sm">Address</span>
                                <span className="text-black text-sm font-medium">{payment.company.address}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}

    </div >
);
