'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminUrl } from "@/api/api";
import { FaUsers, FaClipboardList, FaTruck, FaClock, FaDollarSign } from "react-icons/fa";

const Stats = () => {
    const [stats, setStats] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await adminUrl.get("/dashboard-stats");
                if (data.success) setStats(data.stats);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    const data = [
        { label: "Total Users", value: stats.totalUsers || 0, icon: <FaUsers className="text-blue-400 text-3xl" />, bg: "bg-blue-50", route: "/admin/users" },
        { label: "Total Orders", value: stats.totalOrders || 0, icon: <FaClipboardList className="text-purple-700 text-3xl" />, bg: "bg-purple-50", route: "/admin/order-request/all" },
        { label: "Delivered Orders", value: stats.deliveredOrders || 0, icon: <FaTruck className="text-green-700 text-3xl" />, bg: "bg-green-50", route: "/admin/order-request/delivered" },
        { label: "Pending Orders", value: stats.pendingOrders || 0, icon: <FaClock className="text-amber-600 text-3xl" />, bg: "bg-rose-50", route: "/admin/order-request/initiated" },
        { label: "Total Revenue", value: `$${stats.totalRevenue || 0}`, icon: <FaDollarSign className="text-green-700 text-3xl" />, bg: "bg-yellow-50", route: "/admin/payments" },
    ];

    const handleClick = (route) => {
        router.push(route);
    };

    return (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {data.map((stat, idx) => (
                <div
                    key={idx}
                    className={`bg-white p-5 rounded-xl flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow duration-200`}
                    onClick={() => handleClick(stat.route)}
                >
                    <div className="p-4 mb-3 bg-white rounded-full flex items-center justify-center">
                        {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
