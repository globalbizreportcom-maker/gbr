"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useDashboard } from "../../DashboardContext";
import { apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";

const statusStyles = {
    "initiated": "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "completed": "bg-green-100 text-green-800",
    "delivered": "bg-purple-100 text-purple-800"
}


export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { user } = useDashboard();

    useEffect(() => {
        const fetchReports = async () => {
            if (!user?._id) return;

            setLoading(true); // start loading
            try {
                const res = await apiUrl.get("/user/total/orders", {
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
        <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto">
            <h1 className="text-md font-semibold text-gray-800 mb-4">
                Track Reports
            </h1>
            <p className="text-gray-600 mb-6">
                Here you’ll be able to view and track all your report requests.
            </p>

            <div>
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
                                onClick={() =>
                                    router.push(
                                        report.status.toLowerCase() === "delivered"
                                            ? `/dashboard/report/${report._id}`
                                            : `/dashboard/track-report/${report._id}`
                                    )
                                }
                                key={report._id}
                                className="cursor-pointer flex flex-col xs:flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg border border-gray-200"
                            >
                                {/* Index */}
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 font-semibold mr-4 mb-2 sm:mb-0">
                                    {idx + 1}
                                </div>

                                {/* Report Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-md font-semibold text-gray-800 break-words sm:truncate">
                                        {report.targetCompany?.name || "Unnamed Company"}
                                    </h3>

                                    <div className="text-sm text-gray-500 mt-1 flex flex-col xs:flex-col sm:flex-row sm:items-center sm:space-x-2">
                                        <span>
                                            Requested on {new Date(report.createdAt).toLocaleDateString()}
                                        </span>
                                        <span
                                            className={`py-1 rounded-xl uppercase text-[10px] font-semibold px-2 mt-1 sm:mt-0 w-fit ${statusStyles[report.status] || "bg-gray-100 text-gray-800"}`}
                                        >
                                            {report.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Link */}
                                <Link
                                    href={
                                        report.status.toLowerCase() === "delivered"
                                            ? `/dashboard/report/${report._id}`
                                            : `/dashboard/track-report/${report._id}`
                                    }
                                    className="mt-2 sm:mt-0 inline-block text-blue-600 font-medium hover:underline whitespace-nowrap"
                                >
                                    {report.status.toLowerCase() === "delivered" ? "View Report →" : "Details & Tracking →"}
                                </Link>


                            </li>
                        ))}
                    </ul>


                )}
            </div>
        </div>
    );
}
