"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiUrl } from "@/api/api";

const statusSteps = ["initiated", "in-progress", "completed", "delivered"];

export default function DetailedReport() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;

            try {
                const res = await apiUrl.get(`/user/get-report/${id}`);
                setReport(res.data);
            } catch (err) {
                console.log("Error fetching report:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleDownload = async (url, name) => {
        const res = await fetch(url);
        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = name;
        link.click();
        window.URL.revokeObjectURL(link.href);
    };


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

    const currentIndex = statusSteps.indexOf(report.report.status);

    return (
        <div className="max-w-6xl mx-auto min-h-screen bg-gray-50 p-0 sm:p-6 lg:p-8">
            <h1 className="text-md font-semibold text-gray-800 mb-6">
                Detailed   Report
            </h1>

            {/* Status Tracker Card */}
            <div className="bg-white rounded-xl p-4 sm:p-6  mb-8 ">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        {report.report.targetCompany?.name || "Unnamed Company"}
                    </h2>
                    <span className="text-sm text-gray-500">
                        Requested on {new Date(report.report.createdAt).toLocaleDateString()}
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

                <div className="flex flex-wrap justify-end gap-6 w-full">
                    {report.files && report.files.length > 0 ? (
                        report.files.map((file) => {
                            const fileName = file.fileUrl.split("/").pop();
                            const ext = fileName.split(".").pop().toLowerCase();

                            const fileIcon =
                                ext === "pdf" ? "📄" :
                                    ext === "doc" || ext === "docx" ? "📝" :
                                        ext === "xls" || ext === "xlsx" ? "📊" :
                                            "📁";

                            return (
                                <div
                                    key={file._id}
                                    className="bg-white border border-gray-200 rounded-xl flex flex-col p-4 max-w-sm"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">{fileIcon}</span>
                                        <p className="font-medium text-gray-400 truncate">{fileName}</p>
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        <a
                                            href={file.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
                                        >
                                            View Report
                                        </a>
                                        <button
                                            onClick={() => handleDownload(file.fileUrl, fileName)}
                                            className="flex-1 text-center py-2 px-3 btn btn-primary text-white rounded-lg transition"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-400 col-span-full text-center py-10">No files available.</p>
                    )}
                </div>




                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">



                    {/* Target Company */}
                    <div className="bg-gray-50 p-4 rounded-lg ">
                        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-4">Target Company</h3>
                        <div className="space-y-2 text-sm sm:text-base">
                            {["name", "address", "city", "state", "country", "postalCode", "phone", "website"].map((field) => (
                                <div key={field}>
                                    <p className="text-gray-500 capitalize">{field.replace(/([A-Z])/g, ' $1')}</p>
                                    <p className="text-gray-800 font-medium">{report.report.targetCompany?.[field] || "-"}</p>
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
                                    <p className="text-gray-800 font-medium">{report.report.requesterInfo?.[field] || "-"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
