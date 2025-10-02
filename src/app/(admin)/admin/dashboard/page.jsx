'use client';
import React from 'react';
import Stats from '@/components/admin/stats';
import Table from '@/components/admin/Table';
import UsersPage from '../users/page';

const AdminDashboard = () => {
    return (
        <div className="max-w-6xl mx-auto">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                <main className="p-1 space-y-6">
                    <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

                    {/* Stats Section */}
                    <Stats />

                    {/* users Section */}
                    <UsersPage />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
