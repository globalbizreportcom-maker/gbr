"use client";
import React, { useEffect, useState } from "react";
import { adminUrl } from "@/api/api";

const AdminPayment = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await adminUrl.get("/payments");
            setPayments(res.data);
            setFilteredPayments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        let data = payments;

        if (statusFilter !== "all") {
            data = data.filter((p) => p.status === statusFilter);
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
                    p.details?.payerEmail
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
            );
        }

        setFilteredPayments(data);
    }, [statusFilter, methodFilter, search, payments]);

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
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="ml-auto text-red-600  px-4 py-2 "
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
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Payment ID</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Method</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Payer Email</th>
                            <th className="px-4 py-2">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((p, idx) => (
                                <tr key={p._id} className="border border-gray-200 text-sm">
                                    <td className="px-4 py-4">{idx + 1}</td>
                                    <td className="px-4 py-4">{p.orderId}</td>
                                    <td className="px-4 py-4">{p.paymentId}</td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`px-2 uppercase py-1 rounded text-xs font-semibold ${{
                                                paid: "bg-green-100 text-green-700",
                                                pending: "bg-yellow-100 text-yellow-700",
                                                failed: "bg-red-100 text-red-700",
                                            }[p.status] || "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">{p.method}</td>
                                    <td className="px-4 py-4">
                                        {p.amount} {p.currency}
                                    </td>
                                    <td className="px-4 py-4">{p.details?.payerEmail}</td>
                                    <td className="px-4 py-4">
                                        {new Date(p.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center text-gray-500 py-6"
                                >
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔹 Mobile Card View for sm screens */}
            <div className="md:hidden flex flex-col gap-4 ">
                {filteredPayments.length > 0 ? (
                    filteredPayments.map((p, idx) => (
                        <div
                            key={p._id}
                            className="border border-gray-300 rounded-lg py-4 px-4 bg-white flex flex-col gap-2"
                        >
                            <div className="flex justify-between">
                                <span>#{idx + 1}</span>
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
                                        failed: "bg-red-100 text-red-700",
                                    }[p.status] || "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
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
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-6">No payments found.</p>
                )}
            </div>
        </div>



    );
};

export default AdminPayment;
