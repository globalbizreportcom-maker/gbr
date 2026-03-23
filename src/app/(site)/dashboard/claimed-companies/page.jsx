"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiCheckCircle, FiClock, FiEdit, FiXCircle } from "react-icons/fi"; // Edit icon
import { useDashboard } from "../DashboardContext";
import { apiUrl } from "@/api/api";
import { FaBuilding, FaInfo, FaInfoCircle, FaRupeeSign } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClaimedCompanies() {

    const router = useRouter();

    const { user } = useDashboard();
    const [claimedPayments, setClaimedPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?._id) return;

        const fetchClaimedPayments = async () => {
            try {
                const res = await apiUrl.get(`/user/claimed-payments/${user._id}`);
                // Filter only paid payments
                const paidPayments = res.data;
                setClaimedPayments(paidPayments);
            } catch (err) {
                console.error("Failed to fetch claimed payments", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClaimedPayments();
    }, [user?._id]);

    if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
    if (claimedPayments.length === 0)
        return <p className="p-6 text-center text-gray-500">No  claimed companies found. <Link className="text-blue-400" href='/search'> Search your company to claim</Link></p>;

    return (
        <div className="min-h-screen md:p-6 bg-gray-50 max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-700 mb-1">Claimed Companies</h1>

            <div className="flex items-center text-gray-400 text-xs mb-10 rounded-md">
                <span><FaInfoCircle className="mr-3" /></span>
                <span>If you are seeing Claim Status as <span className="text-orange-500">Pending</span> , we will be shortly <span className="text-green-700 ">Approve</span> the service (within 24 hrs).</span>
            </div>

            <div className="grid gap-6">
                {claimedPayments.map((claim, idx) => (
                    <div
                        key={claim._id}
                        className="bg-white rounded-xl border border-gray-200 p-3  md:p-6"
                    >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-500 font-semibold text-lg hidden md:block" >{idx + 1}.</span>
                                <div className="flex flex-col">
                                    <p className="flex flex-row items-center text-gray-900 font-bold text-lg"> {claim.company?.name || "-"}
                                        <span>  <FaBuilding className="text-gray-500 mr-2" /></span>
                                    </p>
                                    <span className="text-gray-400 text-sm truncate">
                                        {claim.razorpayOrderId}
                                    </span>
                                </div>
                            </div>

                            {claim.claimStatus === "approved" && (
                                <button className="btn btn-sm btn-primary shadow-none flex flex-row items-center  mt-3 sm:mt-0 "
                                    onClick={() => {
                                        console.log(claim.company?.cin);
                                        router.push(`/dashboard/claimed-companies/${claim.company?.cin}`)
                                    }}
                                >
                                    Edit     <FiEdit className="ml-2" />
                                </button>
                            )}
                        </div>

                        {/* Body Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                            {/* Amount */}
                            <div>
                                <span className="text-gray-500 text-sm">Amount</span>
                                <p className="text-gray-900 font-semibold text-md">
                                    {claim.amount / 100} {claim.currency}
                                </p>
                            </div>

                            {/* Claim Status */}
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 text-sm">Claim Status</span>
                                <span
                                    className={`flex items-center px-3 py-1 capitalize rounded-md text-sm font-semibold ${claim.claimStatus === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : claim.claimStatus === "approved"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {claim.claimStatus === "pending" && <FiClock className="mr-1" />}
                                    {claim.claimStatus === "approved" && <FiCheckCircle className="mr-1" />}
                                    {claim.claimStatus === "rejected" && <FiXCircle className="mr-1" />}
                                    {claim.claimStatus}
                                </span>
                            </div>

                            {/* Payment Status */}
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 text-sm">Payment Status</span>
                                <span
                                    className={`px-3 py-1 rounded-md text-sm capitalize font-semibold ${claim.paymentStatus === "paid"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {claim.paymentStatus}
                                </span>
                            </div>

                            {/* CIN */}
                            <div>
                                <span className="text-gray-500 text-sm">CIN</span>
                                <p className="text-gray-900 font-medium">{claim.company?.cin || "-"}</p>
                            </div>

                            {/* Address */}
                            <div>
                                <span className="text-gray-500 text-sm">Address</span>
                                <p className="text-gray-900 font-medium truncate">{claim.company?.address || "-"}</p>
                            </div>

                            {/* Created At */}
                            <div>
                                <span className="text-gray-500 text-sm">Paid On</span>
                                <p className="text-gray-900 font-medium">
                                    {new Date(claim.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", hour12: true })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}