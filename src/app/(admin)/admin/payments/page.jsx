"use client";
import React, { useEffect, useState } from "react";
import { adminUrl } from "@/api/api";
import { FaChevronRight } from "react-icons/fa";

const AdminPayment = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await adminUrl.get("/payments");
            console.log(res.data);
            setPayments(res.data);
            setFilteredPayments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        let data = payments;

        if (statusFilter !== "all") {
            data = data.filter((p) => {
                if (statusFilter === "failed") {
                    // show both failed and cancelled
                    return p.status === "failed" || p.status === "cancelled";
                }
                return p.status === statusFilter;
            });
        }


        if (methodFilter !== "all") {
            data = data.filter((p) => p.method === methodFilter);
        }

        if (search.trim()) {
            data = data.filter(
                (p) =>
                    p.orderId?.toLowerCase().includes(search.toLowerCase()) ||
                    p.paymentId?.toLowerCase().includes(search.toLowerCase()) ||
                    p.status?.toLowerCase().includes(search.toLowerCase()) ||
                    p.details?.payerEmail?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredPayments(data);
        setCurrentPage(1); // reset to page 1 when filters/search change
    }, [statusFilter, methodFilter, search, payments]);


    const handleView = (payment) => {
        setSelectedPayment(payment);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedPayment(null);
    };

    const InfoItem = ({ label, value }) => (
        <div className="flex flex-col bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 hover:bg-gray-100 transition">
            <span className="text-xs uppercase text-gray-500 tracking-wide">{label}</span>
            <span className="text-sm sm:text-base font-medium text-gray-800 mt-1">{value}</span>
        </div>
    );

    const Divider = () => (
        <div className="border-t border-gray-200 my-4 opacity-70"></div>
    );


    // Pagination calculations
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentPayments = filteredPayments.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Admin Payments</h2>

            {/* 🔹 Filters */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Order ID / Email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Status Tabs */}
                <div className="flex flex-wrap gap-2">
                    {["all", "created", "pending", "paid", "failed"].map((status) => (
                        <button
                            key={status}
                            className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition ${statusFilter === status
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Method Tabs */}
                <div className="flex flex-wrap gap-2">
                    {["all", "razorpay", "paypal"].map((method) => (
                        <button
                            key={method}
                            className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition ${methodFilter === method
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => setMethodFilter(method)}
                        >
                            {method === "all"
                                ? "All Methods"
                                : method.charAt(0).toUpperCase() + method.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Clear Filters */}
                <button
                    className="ml-auto text-red-600 px-4 py-2"
                    onClick={() => {
                        setStatusFilter("all");
                        setMethodFilter("all");
                        setSearch("");
                    }}
                >
                    Clear Filters
                </button>
            </div>

            {/* 🔹 Table for md+ screens */}
            <div className="hidden md:block h-auto overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm">
                            <th className="px-4 py-2 font-semibold">#</th>
                            <th className="px-4 py-2 font-semibold">Order ID</th>
                            <th className="px-4 py-2 font-semibold">Payment ID</th>
                            <th className="px-4 py-2 font-semibold">Status</th>
                            <th className="px-4 py-2 font-semibold">Method</th>
                            <th className="px-4 py-2 font-semibold">Amount</th>
                            <th className="px-4 py-2 font-semibold">Payer Email</th>
                            <th className="px-4 py-2 font-semibold">Date</th>
                            <th className="px-4 py-2 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPayments.length > 0 ? (
                            currentPayments.map((p, idx) => (
                                <tr
                                    key={p._id}
                                    className="border border-gray-200 text-sm relative group hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-4">{startIdx + idx + 1}</td>
                                    <td className="px-4 py-4">{p.orderId}</td>
                                    <td className="px-4 py-4">{p.paymentId || '-'}</td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${{
                                                paid: "bg-green-100 text-green-700",
                                                pending: "bg-yellow-100 text-yellow-700",
                                                cancelled: "bg-red-100 text-red-700", // same as failed
                                                failed: "bg-red-100 text-red-700",
                                            }[p.status] || "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {p.status === "cancelled"
                                                ? "Failed"
                                                : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                        </span>

                                    </td>

                                    <td className="px-4 py-4">{p.method}</td>
                                    <td className="px-4 py-4">
                                        {p.amount} {p.currency}
                                    </td>
                                    <td className="px-4 py-4">{p.details?.payerEmail || '-'}</td>
                                    <td className="px-4 py-4">
                                        {new Date(p.createdAt).toLocaleString("en-GB", {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                            hour12: true,
                                            timeZone: "Asia/Kolkata", // converts from UTC to IST
                                        })
                                        }
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button
                                            onClick={() => handleView(p)}
                                            className=" font-medium btn btn-primary btn-xs"
                                        >
                                            View <FaChevronRight />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-500 py-6">
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔹 Pagination */}
            {filteredPayments.length > 0 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={`px-4 py-2 rounded-lg border ${currentPage === 1
                            ? "text-gray-400 border-gray-200"
                            : "text-blue-600 border-blue-400 hover:bg-blue-50"
                            }`}
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className={`px-4 py-2 rounded-lg border ${currentPage === totalPages
                            ? "text-gray-400 border-gray-200"
                            : "text-blue-600 border-blue-400 hover:bg-blue-50"
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* 🔹 Mobile Card View */}
            <div className="md:hidden flex flex-col gap-4 mt-6">
                {currentPayments.length > 0 ? (
                    currentPayments.map((p, idx) => (
                        <div
                            key={p._id}
                            className="border border-gray-300 rounded-lg py-4 px-4 bg-white flex flex-col gap-2"
                        >
                            <div className="flex justify-between">
                                <span>#{startIdx + idx + 1}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Order:</span>
                                <span>{p.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Payment ID:</span>
                                <span>{p.paymentId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-semibold ${{
                                        paid: "bg-green-100 text-green-700",
                                        pending: "bg-yellow-100 text-yellow-700",
                                        cancelled: "bg-red-100 text-red-700", // same as failed
                                        failed: "bg-red-100 text-red-700",
                                    }[p.status] || "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {p.status === "cancelled"
                                        ? "Failed"
                                        : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                </span>

                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Method:</span>
                                <span>{p.method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Amount:</span>
                                <span>
                                    {p.amount} {p.currency}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Email:</span>
                                <span>{p.details?.payerEmail}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Created:</span>
                                <span>{new Date(p.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-end py-4">
                                <button
                                    onClick={() => handleView(p)}
                                    className=" font-medium btn btn-primary btn-sm "
                                >
                                    View <FaChevronRight />

                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-6">No payments found.</p>
                )}
            </div>

            {openDialog && selectedPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
                    <div className="relative h-full w-full bg-white  overflow-hidden animate-slideUp border border-gray-200">

                        {/* Sticky Header */}
                        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex justify-between items-center px-6 py-4 ">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide">
                                Payment Details
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none transition"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-70px)] px-8 py-6 space-y-10 text-gray-800">

                            {/* Section: Payment Info */}
                            <section>
                                <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-200 pb-2 mb-4 tracking-wide">
                                    Payment Info
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoItem label="Order ID" value={selectedPayment.orderId} />
                                    <InfoItem label="Payment ID" value={selectedPayment.paymentId || "-"} />
                                    <InfoItem
                                        label="Status"
                                        value={
                                            <span
                                                className={`px-2 py-1 rounded text-sm font-semibold ${{
                                                    paid: "bg-green-100 text-green-700",
                                                    pending: "bg-yellow-100 text-yellow-700",
                                                    cancelled: "bg-red-100 text-red-700", // same as failed
                                                    failed: "bg-red-100 text-red-700",
                                                }[selectedPayment.status] || "bg-gray-200 text-gray-700"
                                                    }`}
                                            >
                                                {selectedPayment.status === "cancelled"
                                                    ? "Failed"
                                                    : selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                                            </span>

                                        }
                                    />

                                    <InfoItem label="Method" value={selectedPayment.method} />
                                    <InfoItem label="Amount" value={`${selectedPayment.amount} ${selectedPayment.currency}`} />
                                    <InfoItem label="Created At" value={new Date(selectedPayment.createdAt).toLocaleString()} />
                                    <InfoItem label="Payer Email" value={selectedPayment.details?.payerEmail || "-"} />
                                </div>
                            </section>

                            <Divider />

                            {/* Section: Requester Info */}
                            <section>
                                <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-200 pb-2 mb-4  tracking-wide">
                                    Requester Info
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoItem label="Name" value={selectedPayment.user?.name || selectedPayment.reportRequest?.requesterInfo?.name || "-"} />
                                    <InfoItem label="Email" value={selectedPayment.user?.email || selectedPayment.reportRequest?.requesterInfo?.email || "-"} />
                                    <InfoItem label="Phone" value={selectedPayment.user?.phone || selectedPayment.reportRequest?.requesterInfo?.phone || "-"} />
                                    <InfoItem label="Country" value={selectedPayment.user?.country || selectedPayment.reportRequest?.requesterInfo?.country || "-"} />
                                    <InfoItem label="Company" value={selectedPayment.user?.company || selectedPayment.reportRequest?.requesterInfo?.company || "-"} />
                                </div>
                            </section>

                            <Divider />

                            {/* Section: Target Company Info */}
                            <section>
                                <h3 className="text-lg font-semibold text-green-700 border-b border-gray-200 pb-2 mb-4  tracking-wide">
                                    Target Company Info
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoItem label="Name" value={selectedPayment.reportRequest?.targetCompany?.name || "-"} />
                                    <InfoItem label="Address" value={selectedPayment.reportRequest?.targetCompany?.address || "-"} />
                                    <InfoItem label="Country" value={selectedPayment.reportRequest?.targetCompany?.country || "-"} />
                                    <InfoItem label="City" value={selectedPayment.reportRequest?.targetCompany?.city || "-"} />
                                    <InfoItem label="Phone" value={selectedPayment.reportRequest?.targetCompany?.phone || "-"} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default AdminPayment;
