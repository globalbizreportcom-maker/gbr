"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiUrl } from "@/api/api";

const statusSteps = ["initiated", "in-progress", "completed", "delivered"];
const statusColors = {
    "initiated": "bg-blue-500 text-white",
    "in-progress": "bg-yellow-400 text-white",
    "completed": "bg-green-500 text-white",
    "delivered": "bg-purple-500 text-white"
};

export default function ReportDetailPage() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;

            try {
                const res = await apiUrl.get(`/user/track/get-report/${id}`);
                setReport(res.data);
            } catch (err) {
                console.log("Error fetching report:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading report...
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                No report found.
            </div>
        );
    }

    const currentIndex = statusSteps.indexOf(report.status);

    return (
        <div className="max-w-6xl mx-auto min-h-screen bg-gray-50 p-0 sm:p-6 lg:p-8 ">
            <h1 className="text-md font-semibold text-gray-800 mb-6">
                Report Tracking
            </h1>

            {/* Status Tracker Card */}
            <div className="bg-white rounded-xl p-4 sm:p-6  mb-8 ">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        {report.targetCompany?.name || "Unnamed Company"}
                    </h2>
                    <span className="text-sm text-gray-500">
                        Requested on {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Status Tracker */}
                <div className="flex flex-row sm:flex-row items-center sm:items-end mb-4">
                    {statusSteps.map((step, i) => {
                        const isCompleted = i <= currentIndex;
                        return (
                            <div key={step} className="flex-1 flex items-center last:flex-none mb-4 sm:mb-0">
                                {/* Circle */}
                                <div
                                    className={`rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${isCompleted ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {i + 1}
                                </div>

                                {/* Line */}
                                {i < statusSteps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 transition-colors duration-300 ${i < currentIndex ? "bg-indigo-300" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Status Labels */}
                <div className="flex flex-row sm:flex-row justify-between mt-2 text-xs lg:text-md text-gray-600 font-medium">
                    {statusSteps.map((step) => (
                        <span key={step} className="capitalize mb-1 sm:mb-0">
                            {step.replace("-", " ")}
                        </span>
                    ))}
                </div>
            </div>

            {/* Report Details */}
            <div className="bg-white rounded-xl p-4 sm:p-6  ">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                    View Report Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Target Company */}
                    <div className="bg-gray-50 p-4 rounded-lg ">
                        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-4">Target Company</h3>
                        <div className="space-y-2 text-sm sm:text-base">
                            {["name", "address", "city", "state", "country", "postalCode", "phone", "website"].map((field) => (
                                <div key={field}>
                                    <p className="text-gray-500 capitalize">{field.replace(/([A-Z])/g, ' $1')}</p>
                                    <p className="text-gray-800 font-medium">{report.targetCompany?.[field] || "-"}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requester Info */}
                    <div className="bg-gray-50 p-4 rounded-lg ">
                        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-4">Requested By</h3>
                        <div className="space-y-2 text-sm sm:text-base">
                            {["name", "email", "phone", "company", "website", "country", "optionalEmail"].map((field) => (
                                <div key={field}>
                                    <p className="text-gray-500 capitalize">{field.replace(/([A-Z])/g, ' $1')}</p>
                                    <p className="text-gray-800 font-medium">{report.requesterInfo?.[field] || "-"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
