'use client';

import { adminUrl, apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowRight, FaMailBulk } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useAlert } from "@/context/AlertProvider";

// Define colors for each status
const STATUS_COLORS = {
    "initiated": "bg-gray-200 text-gray-800",
    "in-progress": "bg-yellow-500 text-white",
    "completed": "bg-blue-500 text-white",
    "delivered": "bg-green-600 text-white",
};

const STATUS_TABS = ["all", "initiated", "in-progress", "completed", "delivered"];


const ReportsAdmin = ({ defaultTab }) => {


    const { showAlert } = useAlert();

    const router = useRouter(); // inside your component

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [activeTab, setActiveTab] = useState(defaultTab && STATUS_TABS.includes(defaultTab) ? defaultTab : "all");
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState(selectedReport?.status || STATUS_TABS[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [files, setFiles] = useState([]);

    const [forwardModalOpen, setForwardModalOpen] = useState(false);
    const [forwardCompany, setForwardCompany] = useState({});


    useEffect(() => {
        const segments = window.location.pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        if (STATUS_TABS.includes(lastSegment)) setActiveTab(lastSegment);
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const { data } = await adminUrl.get("/report-requests");
                if (data.success) setReports(data.reports);
            } catch (error) {
                console.log("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    useEffect(() => {
        // Sync activeTab with defaultTab if it changes
        if (defaultTab && STATUS_TABS.includes(defaultTab)) {
            setActiveTab(defaultTab);
        }
    }, [defaultTab]);

    const handleView = (report) => setSelectedReport(report);
    const handleClose = () => setSelectedReport(null);

    useEffect(() => {
        if (selectedReport) setNewStatus(selectedReport.status);
    }, [selectedReport]);

    // Handle Save button click
    const handleSaveStatus = async () => {
        if (!selectedReport) return;
        setUpdatingStatus(true);
        try {
            const { data } = await adminUrl.put(
                `/update/report-requests/${selectedReport._id}/status`,
                { status: newStatus }
            );
            if (data.success) {
                // Update local state
                setReports((prev) =>
                    prev.map((r) =>
                        r._id === selectedReport._id ? { ...r, status: newStatus } : r
                    )
                );
                setSelectedReport({ ...selectedReport, status: newStatus });
                handleClose();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setUpdatingStatus(false);
        }
    };

    // Open modal with existing company info
    useEffect(() => {
        if (forwardModalOpen && selectedReport) {
            setForwardCompany({ ...selectedReport.targetCompany });
        }
    }, [forwardModalOpen, selectedReport]);

    const handleForward = async () => {
        try {
            // await apiUrl.post("/forward-to-mira", forwardCompany);
            // setForwardModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    };



    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc", ".docx"],
            "application/vnd.ms-excel": [".xls", ".xlsx"]
        },
        multiple: false,
    });

    const handleUpload = async () => {


        if (!files.length) return showAlert(`Please select a file`, "error");
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("reportRequestId", selectedReport._id);

        try {
            setLoading(true);
            const { data } = await adminUrl.post("/report-files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (data.success) {
                showAlert(`File uploaded successfully`, "success");
                setFiles([]);
            }
        } catch (err) {
            console.log("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredReports =
        activeTab === "all" ? reports : reports.filter((r) => r.status === activeTab);

    const displayedReports = filteredReports.filter((r) => {
        const query = searchQuery.trim().toLowerCase();
        return (
            (r.targetCompany?.name || "").toLowerCase().includes(query) ||
            (r.requesterInfo?.name || "").toLowerCase().includes(query) ||
            (r.requesterInfo?.country || "").toLowerCase().includes(query)

        );
    });



    return (
        <div className="p-0 max-w-6xl mx-auto">
            <h1 className="text-xl font-bold mb-6">Report Requests</h1>

            {/* Tabs */}
            <div
                className="mb-6 overflow-x-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex gap-2 min-w-max">
                    {STATUS_TABS.map((tab) => {
                        // Compute count for this tab
                        const count =
                            tab === "all"
                                ? reports.length
                                : reports.filter((r) => r.status === tab).length;

                        return (
                            <button
                                key={tab}
                                className={`btn border-none shadow-none px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === tab
                                    ? "text-indigo-500 bg-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                onClick={() => {
                                    setActiveTab(tab);
                                    router.push(`/admin/order-request/${tab}`);
                                }}
                            >
                                {tab === "all"
                                    ? `Total Orders (${count})`
                                    : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${count})`}
                            </button>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
  div::-webkit-scrollbar {
    display: none;
  }
`}</style>


            {/* Table */}
            {filteredReports.length === 0 ? (
                <p className="text-center mt-10 text-gray-500">
                    No reports found for "{activeTab}" status.
                </p>
            ) : (
                <>

                    {/* Search Field */}
                    <div className="mb-4 w-full flex justify-end">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by company name..."
                            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>


                    {/* Table for medium and above screens */}
                    <div className="hidden md:block overflow-x-auto bg-white py-6 rounded-2xl">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-black">
                                    <th>#</th>
                                    <th>Company</th>
                                    <th>Requester</th>
                                    <th>Requester Country</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedReports.map((report, index) => (
                                    <tr key={report._id}>
                                        <td>{index + 1}</td>
                                        <td>{report.targetCompany.name.length > 20 ? report.targetCompany.name.slice(0, 20) + "..." : report.targetCompany.name}</td>
                                        <td>{report.requesterInfo.name}</td>
                                        <td>{report.requesterInfo.country}</td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[report.status] || "bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>{new Date(report.createdAt).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleView(report)}
                                            >
                                                View <FaArrowRight />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for small screens */}
                    <div className="md:hidden space-y-4">
                        {displayedReports.map((report, index) => (
                            <div
                                key={report._id}
                                className="bg-white border border-gray-200 rounded-xl p-5"
                            >
                                {/* Header: Number + Status */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-gray-700">#{index + 1}</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[report.status] || "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                    </span>
                                </div>

                                {/* Company & Requester Info */}
                                <div className="space-y-1 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-800">Company:</span>{" "}
                                        {report.targetCompany.name.length > 20 ? report.targetCompany.name.slice(0, 20) + "..." : report.targetCompany.name}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-800">Requester:</span>{" "}
                                        {report.requesterInfo.name}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-800">Created At:</span>{" "}
                                        {new Date(report.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* View Button */}
                                <button
                                    className="mt-4 w-[150px] btn btn-primary py-2 shadow-none font-medium rounded-lg"
                                    onClick={() => handleView(report)}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                </>
            )}


            {/* Fullscreen Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 bg-gray-50 bg-opacity-50 flex justify-center items-start overflow-auto p-4">
                    <div className="bg-white w-full max-w-6xl mx-auto rounded-lg overflow-y-auto relative">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 sticky top-0 bg-gray-100 z-10 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-500">Report Details</h2>
                            <button
                                className="btn btn-sm btn-circle btn-ghost"
                                onClick={handleClose}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">

                        </div>

                        {/* Status Dropdown */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-3 p-4 border-b border-gray-200 bg-gray-50 rounded-md">
                            {/* Status */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                                <span className="font-medium text-gray-600 whitespace-nowrap">Update Status:</span>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    disabled={updatingStatus}
                                    className="select select-bordered bg-white border-black w-full sm:w-40"
                                >
                                    {STATUS_TABS.filter(status => status !== 'all').map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className='btn btn-sm btn-primary w-full sm:w-auto'
                                    onClick={handleSaveStatus}
                                    disabled={updatingStatus || newStatus === selectedReport.status}
                                >
                                    Save
                                </button>
                                {updatingStatus && <span className="text-gray-500 ml-2">Updating...</span>}
                            </div>

                            {/* Forward to Mira */}
                            <div className="flex justify-end w-full sm:w-auto">
                                {/* <button
                                    className="btn btn-sm btn-warning flex items-center gap-2 w-full sm:w-auto"
                                    onClick={() => setForwardModalOpen(true)}
                                >
                                    Forward to Mira <FaMailBulk />
                                </button> */}
                            </div>
                        </div>



                        {/* Content */}
                        <div className="p-0 space-y-6">

                            {/* File Upload Section */}
                            <div className="bg-white rounded-lg p-5 border border-gray-200">
                                <h3 className="text-gray-500 font-semibold text-lg mb-4">
                                    Upload Report Files
                                </h3>

                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the file here ...</p>
                                    ) : (
                                        <p>{files.length ? files[0].name : "Drag & drop a file here, or click to select"}</p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className="mt-4 btn btn-primary btn-sm"
                                >
                                    {loading ? 'Uploading' : 'Upload File'}
                                </button>
                            </div>

                            {/* Company Info */}
                            <div className="bg-white rounded-lg p-5 border border-gray-200">
                                <h3 className="text-gray-500 font-semibold text-lg mb-4">
                                    Company Info
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {selectedReport.targetCompany.name && (
                                        <p>
                                            <span className="font-medium">Name:</span>{" "}
                                            {selectedReport.targetCompany.name}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.address && (
                                        <p>
                                            <span className="font-medium">Address:</span>{" "}
                                            {selectedReport.targetCompany.address}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.country && (
                                        <p>
                                            <span className="font-medium">Country:</span>{" "}
                                            {selectedReport.targetCompany.country}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.state && (
                                        <p>
                                            <span className="font-medium">State:</span>{" "}
                                            {selectedReport.targetCompany.state}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.city && (
                                        <p>
                                            <span className="font-medium">City:</span>{" "}
                                            {selectedReport.targetCompany.city}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.postalCode && (
                                        <p>
                                            <span className="font-medium">Postal Code:</span>{" "}
                                            {selectedReport.targetCompany.postalCode}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.phone && (
                                        <p>
                                            <span className="font-medium">Phone:</span>{" "}
                                            {selectedReport.targetCompany.phone}
                                        </p>
                                    )}
                                    {selectedReport.targetCompany.website && (
                                        <p>
                                            <span className="font-medium">Website:</span>{" "}
                                            {selectedReport.targetCompany.website}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Requester Info */}
                            <div className="bg-white rounded-lg p-5 border border-gray-200">
                                <h3 className="text-gray-500 font-semibold text-lg mb-4">
                                    Requester Info
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {selectedReport.requesterInfo.name && (
                                        <p>
                                            <span className="font-medium">Name:</span>{" "}
                                            {selectedReport.requesterInfo.name}
                                        </p>
                                    )}
                                    {selectedReport.requesterInfo.email && (
                                        <p>
                                            <span className="font-medium">Email:</span>{" "}
                                            {selectedReport.requesterInfo.email}
                                        </p>
                                    )}
                                    {selectedReport.requesterInfo.phone && (
                                        <p>
                                            <span className="font-medium">Phone:</span>{" "}
                                            {selectedReport.requesterInfo.phone}
                                        </p>
                                    )}
                                    {selectedReport.requesterInfo.company && (
                                        <p>
                                            <span className="font-medium">Company:</span>{" "}
                                            {selectedReport.requesterInfo.company}
                                        </p>
                                    )}
                                    {selectedReport.requesterInfo.optionalEmail && (
                                        <p>
                                            <span className="font-medium">Optional Email:</span>{" "}
                                            {selectedReport.requesterInfo.optionalEmail}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Info */}
                            {selectedReport.payment && (
                                <div className="bg-white rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-gray-500 font-semibold text-lg mb-4">
                                        Payment Info
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedReport.payment.status && (
                                            <p>
                                                <span className="font-medium">Status:</span>{" "}
                                                <span className={`${selectedReport.payment.status === 'paid' ? 'text-green-600 font-bold uppercase' : 'text-black'}`}>{selectedReport.payment.status}</span>
                                            </p>
                                        )}
                                        {selectedReport.payment.method && (
                                            <p>
                                                <span className="font-medium">Method:</span>{" "}
                                                {selectedReport.payment.method}
                                            </p>
                                        )}
                                        {(selectedReport.payment.amount ||
                                            selectedReport.payment.currency) && (
                                                <p>
                                                    <span className="font-medium">Amount:</span>{" "}
                                                    {selectedReport.payment.amount}{" "}
                                                    {selectedReport.payment.currency}
                                                </p>
                                            )}
                                        {selectedReport.payment.paidAt && (
                                            <p>
                                                <span className="font-medium">Paid At:</span>{" "}
                                                {new Date(selectedReport.payment.paidAt).toLocaleString()}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.payerName && (
                                            <p>
                                                <span className="font-medium">Payer Name:</span>{" "}
                                                {selectedReport.payment.details.payerName}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.payerEmail && (
                                            <p>
                                                <span className="font-medium">Payer Email:</span>{" "}
                                                {selectedReport.payment.details.payerEmail}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.upiId && (
                                            <p>
                                                <span className="font-medium">UPI ID:</span>{" "}
                                                {selectedReport.payment.details.upiId}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.upiTransactionId && (
                                            <p>
                                                <span className="font-medium">UPI Transaction:</span>{" "}
                                                {selectedReport.payment.details.upiTransactionId}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.rrn && (
                                            <p>
                                                <span className="font-medium">RRN:</span>{" "}
                                                {selectedReport.payment.details.rrn}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.bankName && (
                                            <p>
                                                <span className="font-medium">Bank:</span>{" "}
                                                {selectedReport.payment.details.bankName}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.cardLast4 && (
                                            <p>
                                                <span className="font-medium">Card Last4:</span>{" "}
                                                {selectedReport.payment.details.cardLast4}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.description && (
                                            <p>
                                                <span className="font-medium">Description:</span>{" "}
                                                {selectedReport.payment.details.description}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.fee !== undefined && (
                                            <p>
                                                <span className="font-medium">Fee:</span>{" "}
                                                {selectedReport.payment.details.fee}
                                            </p>
                                        )}
                                        {selectedReport.payment.details?.tax !== undefined && (
                                            <p>
                                                <span className="font-medium">Tax:</span>{" "}
                                                {selectedReport.payment.details.tax}
                                            </p>
                                        )}
                                    </div>



                                </div>
                            )}

                            {/* Forward Modal */}
                            {forwardModalOpen && selectedReport && (
                                <div className="fixed inset-0 z-50 bg-gray-50 bg-opacity-50 flex justify-center items-start overflow-auto p-4">
                                    <div className="bg-white w-full max-w-4xl mx-auto rounded-lg overflow-y-auto relative p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-bold text-gray-600">Edit Company Info</h2>
                                            <button
                                                className="btn btn-xs btn-circle btn-ghost"
                                                onClick={() => setForwardModalOpen(false)}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { label: "Name", key: "name" },
                                                { label: "Address", key: "address" },
                                                { label: "Country", key: "country" },
                                                { label: "State", key: "state" },
                                                { label: "City", key: "city" },
                                                { label: "Postal Code", key: "postalCode" },
                                                { label: "Phone", key: "phone" },
                                                { label: "Website", key: "website" },
                                            ].map((field) => (
                                                <div key={field.key} className="flex flex-col">
                                                    <label className="font-medium text-gray-600 text-xs mb-2">{field.label}</label>
                                                    <input
                                                        type="text"
                                                        className="input input-bordered border border-gray-200 w-full bg-white"
                                                        value={forwardCompany[field.key] || ""}
                                                        onChange={(e) =>
                                                            setForwardCompany((prev) => ({
                                                                ...prev,
                                                                [field.key]: e.target.value,
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex justify-end gap-3 mt-6">
                                            <button
                                                className="btn btn-sm btn-ghost"
                                                onClick={() => setForwardModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={handleForward}
                                            >
                                                Forward
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsAdmin;
