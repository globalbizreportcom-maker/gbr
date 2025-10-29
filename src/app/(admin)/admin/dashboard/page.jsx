'use client'

import React, { useEffect, useState } from 'react';
import Stats from '@/components/admin/stats';
import Table from '@/components/admin/Table';
import UsersPage from '../users/page';
import DateWiseChart from '@/components/admin/DateWiseChart';
import { apiUrl } from '@/api/api';

const AdminDashboard = () => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const { data } = await apiUrl.get("/visitors/abandoned-checkouts");
                const visitors = data.visitors || [];

                // 🧮 Transform: Group by date and count
                const grouped = visitors.reduce((acc, item) => {
                    const date = new Date(item.createdAt)
                        .toISOString()
                        .split("T")[0]; // format: YYYY-MM-DD
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

                // Convert into recharts format
                const formatted = Object.entries(grouped).map(([date, count]) => ({
                    date,
                    count,
                }));

                // Sort chronologically
                formatted.sort((a, b) => new Date(a.date) - new Date(b.date));

                setChartData(formatted);
            } catch (err) {
                console.log("Error fetching abandoned visitors:", err);
            }
        };

        fetchVisitors();
    }, []);


    return (
        <div className="max-w-6xl mx-auto">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                <main className="p-1 space-y-6">
                    <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

                    {/* Stats Section */}
                    <Stats />

                    {/* datewise chart  */}

                    <DateWiseChart data={chartData} title="Abandon Checkout - Chart" link='/admin/abandon-checkout' />

                    {/* users Section */}
                    <UsersPage />


                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
