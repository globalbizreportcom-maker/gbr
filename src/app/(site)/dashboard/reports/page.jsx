"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { apiUrl } from "@/api/api";
import { useDashboard } from "../DashboardContext";
import { useRouter } from "next/navigation";



export default function ViewReports() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { user } = useDashboard();

    useEffect(() => {
        const fetchReports = async () => {
            if (!user?._id) return;

            setLoading(true); // start loading
            try {
                const res = await apiUrl.get("/user/delivered-reports", {
                    params: { userId: user._id },
                });
                setReports(res.data);
            } catch (err) {
                console.error("Error fetching reports:", err);
            } finally {
                setLoading(false); // stop loading
            }
        };

        fetchReports();
    }, [user?._id]);

    return (
        <div className="min-h-screen bg-gray-50 p-0 max-w-5xl mx-auto">
            <h1 className="text-md font-semibold text-gray-800 mb-4">
                My  Reports
            </h1>
            <p className="text-gray-600 mb-6">
                Here you’ll be able to view and track all your report requests.
            </p>

            <div className="bg-white  rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Report History
                </h2>

                {loading ? (
                    <p className="text-gray-500">Loading reports...</p>
                ) : reports.length === 0 ? (
                    <p className="text-gray-500">No reports found.</p>
                ) : (
                    <ul className="space-y-4">
                        {reports.map((report, idx) => (
                            <li
                                onClick={() => router.push(`/dashboard/report/${report._id}`)}
                                key={report._id}
                                className="cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center p-0 bg-white rounded-lg border border-b-gray-100"
                            >
                                {/* Index */}
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 font-semibold mr-4 mb-2 sm:mb-0">
                                    {idx + 1}
                                </div>

                                {/* Report Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-md font-semibold text-gray-800 break-words sm:truncate">
                                        {report.targetCompany.name.length > 20 ? report.targetCompany.name.slice(0, 20) + "..." : report.targetCompany.name || "Unnamed Company"}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Requested on {new Date(report.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Action Link */}
                                <Link
                                    href={`/dashboard/report/${report._id}`}
                                    className="mt-2 sm:mt-0 inline-block text-blue-600 font-medium hover:underline"
                                >
                                    View  →
                                </Link>
                            </li>
                        ))}
                    </ul>

                )}
            </div>
        </div>
    );
}
