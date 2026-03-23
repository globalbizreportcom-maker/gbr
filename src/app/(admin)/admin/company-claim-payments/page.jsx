"use client";
import React, { useEffect, useState, useMemo } from "react";
import { adminUrl } from "@/api/api";
import { FaArrowRight } from "react-icons/fa";

const CompanyClaimedPayments = () => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [claimStatus, setClaimStatus] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchPayments = async () => {
        try {

            const res = await adminUrl.get("/company-claimed-payments");

            setPayments(res.data?.payments || []);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Unable to load payments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // FILTER + SEARCH
    const filteredPayments = useMemo(() => {
        return payments.filter((p) => {

            const matchSearch =
                p.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
                p.company?.cin?.toLowerCase().includes(search.toLowerCase());

            const matchPayment =
                paymentStatus ? p.paymentStatus === paymentStatus : true;

            const matchClaim =
                claimStatus ? p.claimStatus === claimStatus : true;

            return matchSearch && matchPayment && matchClaim;

        });
    }, [payments, search, paymentStatus, claimStatus]);

    // PAGINATION
    const totalPages = Math.ceil(filteredPayments.length / limit);

    const paginatedPayments = filteredPayments.slice(
        (page - 1) * limit,
        page * limit
    );

    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">{error}</div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto mt-6 p-4">

            <h1 className="text-lg font-semibold mb-6">
                Company Claimed Payments
            </h1>

            {/* SEARCH + FILTERS */}

            <div className="flex flex-wrap gap-4 mb-6 py-6">

                <input
                    type="text"
                    placeholder="Search company or CIN..."
                    className="input input-bordered bg-white flex-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered bg-white"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                >
                    <option value="">All Payment Status</option>
                    <option value="created">Created</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select
                    className="select select-bordered bg-white"
                    value={claimStatus}
                    onChange={(e) => setClaimStatus(e.target.value)}
                >
                    <option value="">All Claim Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>



            </div>

            {/* TABLE */}

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl">
                <table className="table  w-full">

                    <thead className="bg-gray-100 text-gray-500">
                        <tr>
                            <th>#</th>
                            <th>Company</th>
                            <th>Purchaser</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Payment Status</th>
                            <th>Claim Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedPayments.map((payment, idx) => (
                            <tr key={payment._id}
                                className="cursor-pointer"
                                onClick={() => {
                                    setSelectedPayment(payment);
                                    setUpdateStatus(payment.claimStatus);
                                    setDrawerOpen(true);
                                }}
                            >

                                <td>
                                    {payments.length - (page - 1) * limit - idx}
                                </td>
                                <td>
                                    <div className="font-semibold">
                                        {payment.company?.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        CIN:  {payment.company?.cin}
                                    </div>
                                </td>

                                <td>{payment.userId?.name}</td>
                                <td className="flex flex-col">
                                    <p>  {payment.userId?.country}</p>
                                    <p className="font-semibold"> {payment.userId?.state}</p>
                                    <p> {payment.userId?.city}</p>

                                </td>

                                <td className="font-semibold">
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                    }).format((payment.amount || 0) / 100)}
                                </td>

                                <td>
                                    <span
                                        className={`badge capitalize w-full border-none
              ${payment.paymentStatus === "paid"
                                                ? "bg-green-700 text-white "
                                                : payment.paymentStatus === "failed"
                                                    ? "badge-error text-white"
                                                    : "bg-gray-200  text-black"
                                            }`}
                                    >
                                        {payment.paymentStatus}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`badge capitalize w-full border-none
              ${payment.claimStatus === "approved"
                                                ? "bg-green-700 text-white "
                                                : payment.claimStatus === "failed"
                                                    ? "badge-error text-white"
                                                    : "bg-gray-200  text-black"
                                            }`}
                                    >
                                        {payment.claimStatus}
                                    </span>
                                </td>

                                <td>
                                    {new Date(payment.createdAt).toLocaleString('en-GB', { dateStyle: "short", timeStyle: "short", hour12: true })}
                                </td>

                                <td className="font-semibold justify-end">

                                    <FaArrowRight
                                        className="text-primary ml-4 cursor-pointer"
                                        onClick={() => {
                                            setSelectedPayment(payment);
                                            setUpdateStatus(payment.claimStatus);
                                            setDrawerOpen(true);
                                        }}
                                    />

                                </td>


                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">

                {paginatedPayments.map((payment, idx) => (

                    <div
                        key={payment._id}
                        className="bg-white rounded-xl shadow-sm  p-4"
                    >

                        <div className="flex justify-between items-start">

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {payment.company?.name}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    {payment.company?.address}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    CIN: {payment.company?.cin}
                                </p>
                            </div>

                            <div className="text-sm font-semibold">
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                }).format((payment.amount || 0) / 100)}
                            </div>

                        </div>


                        <div className="flex  flex-col justify-between mt-3">

                            <div className="flex  flex-row justify-between mt-3">

                                Payment :    <span
                                    className={`badge capitalize
          ${payment.paymentStatus === "paid"
                                            ? "badge-success"
                                            : payment.paymentStatus === "failed"
                                                ? "badge-error"
                                                : "badge-neutral"
                                        }`}
                                >
                                    {payment.paymentStatus}
                                </span>
                            </div>

                            <div className="flex  flex-row justify-between mt-3">
                                Claim Status :    <span
                                    className={`badge capitalize
          ${payment.claimStatus === "approved"
                                            ? "badge-success"
                                            : payment.claimStatus === "rejected"
                                                ? "badge-error"
                                                : "badge-neutral"
                                        }`}
                                >
                                    {payment.claimStatus}
                                </span>

                            </div>
                        </div>


                        <div className="text-xs text-gray-400 mt-3">
                            {new Date(payment.createdAt).toLocaleDateString()}
                        </div>

                        {
                            payment.paymentStatus === 'paid' &&

                            <div className="text-end text-gray-400 mt-3">
                                <button
                                    className="btn-sm btn btn-primary ml-4 cursor-pointer"
                                    onClick={() => {
                                        setSelectedPayment(payment);
                                        setUpdateStatus(payment.claimStatus);
                                        setDrawerOpen(true);
                                    }}
                                >Update Status</button>
                            </div>
                        }

                    </div>

                ))}

            </div>

            {drawerOpen && selectedPayment && (

                <div className="fixed inset-0 z-50 flex justify-end">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setDrawerOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="relative w-full max-w-md bg-white h-full shadow-xl p-6 overflow-y-auto">

                        <h2 className="text-lg font-bold mb-6">
                            Update Claim Status
                        </h2>


                        {
                            selectedPayment?.paymentStatus === 'paid' &&

                            <>

                                <div className="mb-6">

                                    <label className="label">
                                        <span className="label-text">
                                            Claim Status
                                        </span>
                                    </label>

                                    <select
                                        className="select border border-gray-300 w-full bg-white"
                                        value={updateStatus}
                                        onChange={(e) => setUpdateStatus(e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>

                                </div>

                                <div className="flex gap-3 mb-5">

                                    <button
                                        className="btn btn-neutral flex-1"
                                        onClick={() => setDrawerOpen(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-primary flex-1"
                                        disabled={submitting}
                                        onClick={async () => {

                                            try {

                                                setSubmitting(true);

                                                await adminUrl.patch(`/company-claimed-payments/${selectedPayment._id}`,
                                                    {
                                                        claimStatus: updateStatus
                                                    }
                                                );

                                                fetchPayments();
                                                setDrawerOpen(false);

                                            } catch (err) {

                                                console.error(err);

                                            } finally {

                                                setSubmitting(false);

                                            }

                                        }}
                                    >
                                        {submitting ? "Updating..." : "Submit"}

                                    </button>

                                </div>

                            </>

                        }

                        {/* Company Info */}

                        <div className="py-6 bg-gray-50  rounded-lg">
                            <h3 className="text-sm font-semibold mb-3 text-gray-700">
                                Company Details
                            </h3>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500">Company</p>
                                <p className="font-semibold">
                                    {selectedPayment.company?.name} <br />
                                    <span className="text-gray-500 text-xs">CIN: {selectedPayment.company?.cin}</span>
                                </p>
                            </div>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500">Address</p>
                                <p>{selectedPayment.company?.address}</p>
                            </div>

                            <div className="flex justify-end items-end flex-col">
                                <p className="text-xs text-gray-500">Amount</p>
                                <p className="font-semibold text-2xl text-green-700">
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                    }).format((selectedPayment.amount || 0) / 100)}
                                </p>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className=" bg-gray-50  rounded-lg">
                            <h3 className="text-sm font-semibold mb-3 text-gray-700">
                                User Details
                            </h3>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500">Name</p>
                                <p className="font-semibold">
                                    {selectedPayment.userId?.name}
                                </p>
                            </div>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500">Email</p>
                                <p>{selectedPayment.userId?.email}</p>
                            </div>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500">Phone</p>
                                <p>{selectedPayment.userId?.phone}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p>
                                    {selectedPayment.userId?.city}, {selectedPayment.userId?.state} ,{selectedPayment.userId?.city}
                                </p>
                            </div>
                        </div>



                    </div>

                </div>

            )
            }

            {/* PAGINATION */}

            <div className="flex justify-between items-center mt-6">

                <p className="text-sm text-gray-500">
                    Showing {paginatedPayments.length} of {filteredPayments.length}
                </p>

                <div className="join">

                    <select
                        className="select select-bordered bg-white"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>

                    <button
                        className="join-item btn btn-inherit"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        «
                    </button>

                    <button className="join-item btn text-black border-none shadow-none bg-white rounded-md">
                        Page {page} / {totalPages || 1}
                    </button>

                    <button
                        className="join-item btn btn-inherit"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        »
                    </button>



                </div>

            </div>




        </div >
    );
};

export default CompanyClaimedPayments;