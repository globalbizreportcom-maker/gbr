"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiUrl } from "@/api/api";
import { useDashboard } from "./DashboardContext";
import { FaChevronRight } from "react-icons/fa";

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
                console.log("Error fetching dashboard stats:", err);
            }
        };

        fetchStats();
    }, [user?._id]);


    return (
        <div className="min-h-screen bg-gray-50 p-0  lg:p-4 max-w-5xl mx-auto">

            <div
                className="relative rounded-2xl overflow-hidden text-white px-4 md:px-6 py-5 md:py-7 "
                style={{
                    backgroundImage:
                        "url('https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181951_960_720.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1c28]/90 via-[#0c2331]/95 to-[#0f2b3b]/90"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-evenly h-full ">
                    <h2 className="text-xl md:text-3xl font-bold  mb-5 text-left">
                        Order a Business Credit Report for Any Company Worldwide
                    </h2>

                    <p className="text-gray-300 text-left  mb-5 text-sm md:text-lg  italic">
                        Verify your partners, vendors, buyers, and suppliers with a comprehensive Business Information Report
                        covering registration details, financial data, credit rating, risk indicators, and more.
                    </p>

                    <div className="flex flex-col md:flex-row justify-start mb-5 gap-4">


                        <button
                            onClick={() => {
                                sessionStorage.setItem("credit_report", "direct");
                                router.push("/order-business-credit-report");
                            }}
                            className="cursor-pointer   font-semibold px-8 py-3 rounded-lg shadow-none hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 btn btn-warning "
                        >
                            Order Report Now <FaChevronRight />
                        </button>

                        <button
                            onClick={() => window.open('/sample-reports', '_blank')}
                            className="cursor-pointer  font-semibold px-8 py-3 rounded-lg shadow-none hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 btn btn-outline"
                        >
                            View Sample Report
                        </button>


                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {["Trusted by 20,000+ Global Companies"].map((service, idx) => (
                            <div
                                key={idx}
                                className="p-2 text-left"
                            >
                                <h4 className="font-medium text-sm md:text-base text-gray-100">
                                    {service}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="mb-6 sm:mb-8 py-5">
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
                    <p className="text-gray-500 text-sm sm:text-base">Delivered Reports</p>
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

                {/* Search Reports */}
                <div
                    onClick={() => router.push("/search")}
                    className="cursor-pointer bg-white rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-200 hover:shadow-md transition"
                >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔍</div>
                    <p className="text-gray-500 text-sm sm:text-base">Search Company</p>
                    <p className="text-blue-500 text-sm underline">Search</p>
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
