"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/api/api";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaSpinner,
    FaSearch,
    FaBuilding,
    FaUser,
    FaGlobe,
    FaInfo,
    FaChevronRight,
} from "react-icons/fa";

const PaymentVisitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedVisitor, setSelectedVisitor] = useState(null);


    // Pagination states
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // items per page
    const totalPages = Math.ceil(filtered.length / limit);

    // Fetch visitors
    const fetchVisitors = async () => {
        try {
            setLoading(true);
            const { data } = await apiUrl.get("/visitors/payments");
            const list = data.visitors || [];
            setVisitors(list);
            setFiltered(list);
        } catch (err) {
            setError("Failed to load visitors.");
        } finally {
            setLoading(false);
        }
    };

    // Search logic
    useEffect(() => {
        if (!search.trim()) {
            setFiltered(visitors);
        } else {
            const term = search.toLowerCase();
            setFiltered(
                visitors.filter(
                    (v) =>
                        v.companyName?.toLowerCase().includes(term) ||
                        v.contactName?.toLowerCase().includes(term) ||
                        v.contactEmail?.toLowerCase().includes(term) ||
                        v.contactPhone?.toLowerCase().includes(term) ||
                        v.user?.name?.toLowerCase().includes(term) ||
                        v.user?.email?.toLowerCase().includes(term)
                )
            );
        }
        setPage(1); // reset to first page after search
    }, [search, visitors]);

    const paginatedData = filtered.slice((page - 1) * limit, page * limit);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    useEffect(() => {
        fetchVisitors();
    }, []);

    return (
        <div className="py-10 bg-gray-50 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-lg font-semibold text-gray-800">
                    Payment – Visitors
                </h1>

                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:lue-500"
                    />
                </div>
            </div>

            {/* Loading / Error / Empty */}
            {loading ? (
                <div className="flex items-center justify-center h-40 text-gray-600">
                    <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                    Loading visitors...
                </div>
            ) : error ? (
                <div className="text-red-600 text-center font-medium">{error}</div>
            ) : filtered.length === 0 ? (
                <div className="text-gray-500 text-center font-medium">
                    No visitors found.
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden ">
                        {/* 🌐 Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full border-collapse text-sm text-gray-700">
                                <thead className="bg-gray-100 text-gray-800 text-xs uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-left">#</th>
                                        <th className="px-4 py-3 text-left">User</th>
                                        <th className="px-4 py-3 text-left">Target Company</th>
                                        <th className="px-4 py-3 text-left">Contact Name</th>
                                        <th className="px-4 py-3 text-left">Country</th>
                                        <th className="px-4 py-3 text-left">Created</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map((v, i) => (
                                        <tr
                                            onClick={() => setSelectedVisitor(v)}
                                            key={v._id}
                                            className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-4 py-3">{i + 1}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">{v.user?.name || "-"}</span>
                                                    <span className="text-xs text-gray-500">{v.user?.email || ""}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold capitalize text-indigo-500">{v.companyName || "-"}</td>
                                            <td className="px-4 py-3">{v.contactName || "-"}</td>
                                            <td className="px-4 py-3">{v.contactCountry || v.country || "-"}</td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {new Date(v.createdAt).toLocaleString("en-GB", {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                    timeZone: "Asia/Kolkata",
                                                    hour12: true,
                                                })}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedVisitor(v);
                                                    }}
                                                    className="px-3 py-1 btn btn-xs btn-primary transition-colors flex items-center justify-center gap-1"
                                                >
                                                    View <FaChevronRight className="text-xs" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View - Card Layout */}
                        <div className="md:hidden">
                            {paginatedData.map((v, i) => (
                                <div
                                    key={v._id}
                                    onClick={() => setSelectedVisitor(v)}
                                    className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center">
                                        #{i + 1}

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedVisitor(v);
                                            }}
                                            className="text-blue-600 text-xs font-medium flex items-center gap-1"
                                        >
                                            View <FaChevronRight className="text-[10px]" />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <div>
                                            <p className="font-medium text-gray-800">{v.user?.name || "-"}</p>
                                            <p className="text-xs text-gray-500">{v.user?.email || ""}</p>
                                        </div>

                                    </div>

                                    {/* Info Section */}
                                    <div className="mt-3 space-y-1 text-xs text-gray-600">
                                        <p>
                                            <strong>Target Company:</strong>{" "}
                                            <span className="text-gray-700">
                                                {v.companyName
                                                    ? v.companyName
                                                        .toLowerCase()
                                                        .replace(/\b\w/g, (char) => char.toUpperCase())
                                                    : "-"}
                                            </span>
                                        </p>

                                        <p>
                                            <strong>Contact:</strong>{" "}
                                            <span className="text-gray-700">{v.contactName || "-"}</span>
                                        </p>
                                        <p>
                                            <strong>Country:</strong>{" "}
                                            <span className="text-gray-700">
                                                {v.contactCountry || v.country || "-"}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Date:</strong>{" "}
                                            <span className="text-gray-700">
                                                {new Date(v.createdAt).toLocaleDateString("en-GB")}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between mt-6 text-sm text-gray-700 px-2">
                        <p>
                            Showing <strong>{(page - 1) * limit + 1}</strong>–
                            <strong>{Math.min(page * limit, filtered.length)}</strong> of{" "}
                            <strong>{filtered.length}</strong>
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className={`px-3 py-1 border rounded-lg ${page === 1
                                    ? "text-gray-400 border-gray-200"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                Prev
                            </button>
                            <span className="px-3 py-1 border rounded-lg bg-gray-100">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className={`px-3 py-1 border rounded-lg ${page === totalPages
                                    ? "text-gray-400 border-gray-200"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {selectedVisitor && (
                        <div className="fixed  inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-50 ">
                            <div className="bg-white max-w-6xl h-full overflow-hidden border border-gray-200 animate-fadeIn">

                                {/* Header */}
                                <div className="flex justify-between items-center px-8 py-5 bg-gray-100 text-black">
                                    <div>
                                        <h2 className="text-sm font-bold tracking-wide">
                                            Visited
                                        </h2>
                                        <p className=" text-sm mt-1">
                                            {selectedVisitor.companyName || "Untitled Company"} &mdash;{" "}
                                            {new Date(selectedVisitor.createdAt).toLocaleString("en-GB")}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedVisitor(null)}
                                        className=" text-3xl "
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-10 overflow-y-auto max-h-[80vh]">

                                    {/* 🧍 Requester Information */}
                                    <div className="bg-white border border-gray-200 rounded-xl  transition-all duration-200">
                                        <div className="flex items-center justify-between  px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-70">
                                            <h3 className="text-gray-800 font-semibold text-md flex items-center gap-2">
                                                <FaUser className="text-gray-600" /> User Info (Registered as)
                                            </h3>
                                        </div>

                                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 text-gray-700 text-sm">
                                            <p><strong className="text-gray-800">Name:</strong> {selectedVisitor.user?.name || <span className="text-gray-500 italic">Not provided</span>}</p>
                                            <p><strong className="text-gray-800">Email:</strong> {selectedVisitor.user?.email || <span className="text-gray-500 italic">Not provided</span>}</p>
                                            <p><strong className="text-gray-800">Phone:</strong> {selectedVisitor.user?.phone || <span className="text-gray-500 italic">-</span>}</p>
                                            <p><strong className="text-gray-800">Country:</strong> {selectedVisitor.user?.country || <span className="text-gray-500 italic">-</span>}</p>
                                            <p><strong className="text-gray-800">Company:</strong> {selectedVisitor.user?.company || <span className="text-gray-500 italic">-</span>}</p>
                                            <p className="col-span-full">
                                                <strong className="text-gray-800">Registered On:</strong>{" "}
                                                {selectedVisitor.user?.createdAt
                                                    ? new Date(selectedVisitor.user.createdAt).toLocaleString("en-GB", { dateStyle: 'short', timeStyle: 'short', timeZone: "Asia/Kolkata", hour12: true })
                                                    : <span className="text-gray-500 italic">-</span>}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-gray-700 font-semibold text-sm  flex items-center gap-2">
                                        Order Details :
                                    </h3>

                                    {/* 👤 Contact & 🏢 Target Company - Side by Side */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* 👤 Contact Info */}
                                        <div className="bg-white border border-gray-200 rounded-xl  transition-all duration-200">
                                            <div className="flex items-center justify-between  px-6 py-4 bg-gradient-to-r from-red-50 to-red-70">
                                                <h3 className="text-red-800 font-semibold text-md flex items-center gap-2">
                                                    <FaPhone className="text-red-800" /> Order Placed By
                                                </h3>

                                            </div>
                                            <p className="text-xs text-center text-gray-500 flex items-center justify-end gap-1 py-2 px-2 italic">
                                                (<FaInfo className="text-[10px] " />
                                                <span>This section contains the contact details provided by the user for this order.</span>)
                                            </p>

                                            <div className="p-6 grid grid-cols-1 sm:grid-cols-1 gap-4 text-gray-700">
                                                <p><strong>Name:</strong> {selectedVisitor.contactName || "-"}</p>
                                                <p><strong>Email:</strong> {selectedVisitor.contactEmail || "-"}</p>
                                                <p><strong>Phone:</strong> {selectedVisitor.contactPhone || "-"}</p>
                                                <p><strong>Country:</strong> {selectedVisitor.contactCountry || "-"}</p>
                                                <p><strong>Company:</strong> {selectedVisitor.contactCompany || "-"}</p>
                                                <p><strong>Optional Email:</strong> {selectedVisitor.optionalEmail || "-"}</p>
                                            </div>
                                        </div>

                                        {/* 🏢 Target Company */}
                                        <div className="bg-white border border-gray-200 rounded-xl  transition-all duration-200">
                                            <div className="flex items-center justify-between  px-6 py-4 bg-gradient-to-r from-emerald-50 to-emerald-70">
                                                <h3 className="text-emerald-800 font-semibold text-md flex items-center gap-2">
                                                    <FaBuilding className="text-emerald-700" /> Target Company
                                                </h3>
                                            </div>

                                            <div className="p-6 text-gray-700 bg-gray-50  rounded-xl">

                                                <div className="p-0 grid grid-cols-1 sm:grid-cols-1 gap-4 text-gray-700">
                                                    <p>
                                                        <strong>Company:</strong>{" "}
                                                        {selectedVisitor.companyName
                                                            ? selectedVisitor.companyName
                                                                .toLowerCase()
                                                                .replace(/\b\w/g, (char) => char.toUpperCase())
                                                            : "-"}
                                                    </p>
                                                    <p>
                                                        <strong>Address:</strong>{" "}
                                                        {selectedVisitor.address
                                                            ? selectedVisitor.address
                                                                .toLowerCase()
                                                                .replace(/\b\w/g, (char) => char.toUpperCase())
                                                            : "-"}
                                                    </p>
                                                    <p>
                                                        <strong>City:</strong>{" "}
                                                        {selectedVisitor.city
                                                            ? selectedVisitor.city
                                                                .toLowerCase()
                                                                .replace(/\b\w/g, (char) => char.toUpperCase())
                                                            : "-"}
                                                    </p>

                                                    <p>
                                                        <strong>State:</strong>{" "}
                                                        {selectedVisitor.state
                                                            ? selectedVisitor.state
                                                                .toLowerCase()
                                                                .replace(/\b\w/g, (char) => char.toUpperCase())
                                                            : "-"}
                                                    </p>

                                                    <p>
                                                        <strong>Postal Code:</strong>{" "}
                                                        {selectedVisitor.postalCode || "-"}
                                                    </p>

                                                    <p>
                                                        <strong>Country:</strong>{" "}
                                                        {selectedVisitor.country
                                                            ? selectedVisitor.country
                                                                .toLowerCase()
                                                                .replace(/\b\w/g, (char) => char.toUpperCase())
                                                            : "-"}
                                                    </p>

                                                    <p>
                                                        <strong>Website:</strong>{" "}
                                                        {selectedVisitor.website ? (
                                                            <a
                                                                href={selectedVisitor.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-emerald-700 hover:underline"
                                                            >
                                                                {selectedVisitor.website}
                                                            </a>
                                                        ) : "-"}
                                                    </p>

                                                    <p>
                                                        <strong>Telephone:</strong>{" "}
                                                        {selectedVisitor.telephone || "-"}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    {/* 🗂 System Information */}
                                    <div className="bg-white border border-gray-200 rounded-xl  transition-all duration-200">
                                        <div className="flex items-center justify-between  px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100">
                                            <h3 className="text-slate-800 font-semibold text-md flex items-center gap-2">
                                                🗂 System Information
                                            </h3>
                                        </div>

                                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                                            <p><strong>Agreed To Terms:</strong>{" "}
                                                {selectedVisitor.agreedToTerms ? (
                                                    <span className="text-green-600 font-medium"> Yes</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">No</span>
                                                )}
                                            </p>
                                            <p><strong>Timestamp:</strong>{" "}
                                                {new Date(selectedVisitor.createdAt).toLocaleString("en-GB")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className=" bg-gray-50 px-8 py-4 flex justify-end gap-3">
                                        <button
                                            onClick={() => setSelectedVisitor(null)}
                                            className="px-5 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-gray-100 transition"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>



                            </div>
                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default PaymentVisitors;
