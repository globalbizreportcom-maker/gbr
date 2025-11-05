"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const DateWiseChart = ({ data, title = "Activity Overview", link }) => {

    const router = useRouter();

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // 🧠 Get the last 10 days if no filter is applied
    const defaultFilteredData = useMemo(() => {
        if (!data || data.length === 0) return [];
        const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        return sorted.slice(-10);
    }, [data]);

    // 📅 Filter by selected date range
    const filteredData = useMemo(() => {
        if (!fromDate && !toDate) return defaultFilteredData;

        return data.filter((item) => {
            const itemDate = new Date(item.date);
            const start = fromDate ? new Date(fromDate) : new Date("2000-01-01");
            const end = toDate ? new Date(toDate) : new Date();
            return itemDate >= start && itemDate <= end;
        });
    }, [data, fromDate, toDate, defaultFilteredData]);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <h2 className="text-lg font-semibold text-gray-800">{title} <span className="cursor-pointer text-blue-500 text-sm ml-1" onClick={() => router.push(link)}>View</span></h2>

                {/* Date Filter */}
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border border-gray-300 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-500 text-white"
                    />
                    <span className="text-gray-500 text-sm">to</span>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border border-gray-300 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-500 text-white"
                    />
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            }}
                            labelStyle={{ color: "#111827", fontWeight: 500 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#2563EB"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#2563EB", strokeWidth: 1 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DateWiseChart;
