"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiUrl } from "@/api/api";
import { useDashboard } from "./DashboardContext";

export default function DashboardHome() {
    const { user } = useDashboard();
    const router = useRouter();

    const [stats, setStats] = useState({
        totalOrders: 0,
        receivedReports: 0,
        trackOrders: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            if (!user?._id) return;

            try {
                const res = await apiUrl.get(`/user/dashboard/stats/${user._id}`);
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            }
        };

        fetchStats();
    }, [user?._id]);


    return (
        <div className="min-h-screen bg-gray-50 p-0  lg:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-xl font-semibold text-gray-800">
                    Welcome, {user?.name || "User"}
                </h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">

                {/* Track Orders (Optional, you can remove if not needed) */}
                <div
                    onClick={() => router.push("/dashboard/orders-tracking")}
                    className="cursor-pointer bg-white rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-200 hover:shadow-md transition"
                >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⏳</div>
                    <p className="text-gray-500 text-sm sm:text-base">Track Orders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{stats.trackOrders}</p>
                </div>

                {/* Received Reports */}
                <div
                    onClick={() => router.push("/dashboard/reports")}
                    className="cursor-pointer bg-white rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-200 hover:shadow-md transition"
                >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📑</div>
                    <p className="text-gray-500 text-sm sm:text-base">Received Reports</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{stats.receivedReports}</p>
                </div>


                {/* Total Orders */}
                <div
                    onClick={() => router.push("/dashboard/total/orders")}
                    className="cursor-pointer bg-white rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-200 hover:shadow-md transition"
                >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📦</div>
                    <p className="text-gray-500 text-sm sm:text-base">Total Orders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{stats.totalOrders}</p>
                </div>


            </div>

            {/* Quick Actions */}
            <div className="bg-white  rounded-lg p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                        onClick={() => router.push('/dashboard/reports')}
                        className="btn shadow-none border-none flex-1 bg-gray-100 text-gray-800 py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition font-medium text-sm sm:text-base"
                    >
                        View Reports
                    </button>

                    <button
                        onClick={() => router.push('/dashboard/orders-tracking')}
                        className="btn shadow-none border-none flex-1 bg-gray-100 text-gray-800 py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition font-medium text-sm sm:text-base"
                    >
                        Track Orders
                    </button>

                    <button
                        onClick={() => router.push('/dashboard/payment-history')}
                        className="btn shadow-none border-none flex-1 bg-gray-100 text-gray-800 py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition font-medium text-sm sm:text-base"
                    >
                        View Payments
                    </button>
                </div>
            </div>


        </div>
    );
}
