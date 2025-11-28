"use client";

import { useEffect, useState } from "react";
import { adminUrl } from "@/api/api"; // axios instance
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { splitPhone } from "@/utils/splitPhone";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await adminUrl.get("/users");
                if (data.success) {
                    setUsers(data.users);
                    setFilteredUsers(data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // 🔍 Search filter
    useEffect(() => {
        if (!search.trim()) {
            setFilteredUsers(users);
        } else {
            const lower = search.toLowerCase();
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.name?.toLowerCase().includes(lower) ||
                        user.email?.toLowerCase().includes(lower) ||
                        user.phone?.toLowerCase().includes(lower) ||
                        user.company?.toLowerCase().includes(lower) ||
                        user.country?.toLowerCase().includes(lower)
                )
            );
        }
        setCurrentPage(1);
    }, [search, users]);

    // 📄 Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIdx = (currentPage - 1) * usersPerPage;
    const paginatedUsers = showAll
        ? filteredUsers
        : filteredUsers.slice(startIdx, startIdx + usersPerPage);

    if (loading) return <p className="text-center mt-10">Loading...</p>;




    return (
        <div className="p-1 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <h1 className="text-md text-gray-500 font-bold">
                    Users List ({filteredUsers.length})
                </h1>

                {/* ✅ Search Bar */}
                <input
                    type="text"
                    placeholder="Search by name, email, phone, company, country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {filteredUsers.length === 0 ? (
                <p>No users found</p>
            ) : (
                <>
                    {/* ✅ Desktop Table */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-lg border border-gray-200">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-100 text-left text-black">
                                    <th className="p-2">#</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Phone</th>
                                    <th className="p-2">Country</th>
                                    <th className="p-2">Company</th>
                                    <th className="p-2">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedUsers.map((user, idx) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="p-2">{startIdx + idx + 1}</td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span>{user.name || "-"}</span>
                                                <span className="text-gray-500 text-sm">{user.email || "-"}</span>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            {(() => {
                                                const p = splitPhone(user.phone);
                                                return p ? `+${p.countryCode} ${p.nationalNumber}` : "-";
                                            })()}
                                        </td>


                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span>{user.country || "-"}</span>
                                                <span className="text-gray-500 text-sm">{user.state || "-"}</span>
                                            </div>

                                        </td>
                                        <td className="p-2">
                                            <div className="flex flex-col">
                                                <span>{user.company || "-"}</span>
                                                {user.gstin && <span className="text-gray-500 text-sm"> GST : {user.gstin}</span>}

                                            </div>
                                        </td>
                                        <td className="p-2">
                                            {new Date(user.createdAt).toLocaleString("en-GB", {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                                hour12: true,
                                                timeZone: "Asia/Kolkata",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Mobile Cards */}
                    <div className="space-y-4 md:hidden">
                        {paginatedUsers.map((user, idx) => (
                            <div
                                key={user._id}
                                className="bg-white rounded-lg p-4 border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-600">
                                        #{startIdx + idx + 1}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-800 font-medium">{user.name}</p>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                <div className="mt-2 text-sm text-gray-600 space-y-1">
                                    <p>
                                        <span className="font-medium">Phone:</span>{" "}
                                        {user.phone || "-"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Country:</span>{" "}
                                        {user.country}
                                    </p>
                                    <p>
                                        <span className="font-medium">Company:</span>{" "}
                                        {user.company || "-"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Gst:</span>{" "}
                                        {user.gstin || "-"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Compact Pagination Controls */}
                    {!showAll && filteredUsers.length > usersPerPage && (
                        <div className="flex justify-center items-center flex-wrap gap-2 mt-6 text-sm">
                            {/* ⏮ First Page */}
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className={`px-2 py-1 border rounded-md ${currentPage === 1
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100 border-gray-300"
                                    }`}
                            >
                                {"<<"}
                            </button>

                            {/* ◀ Prev */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-2 py-1 border rounded-md ${currentPage === 1
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100 border-gray-300"
                                    }`}
                            >
                                {"<"}
                            </button>

                            {/* Page Numbers */}
                            {[...Array(totalPages)].slice(
                                Math.max(0, currentPage - 3),
                                Math.min(totalPages, currentPage + 2)
                            ).map((_, i) => {
                                const pageNum = Math.max(0, currentPage - 3) + i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1 rounded-md border ${currentPage === pageNum
                                            ? "bg-gray-800 text-white border-gray-700"
                                            : "text-gray-700 hover:bg-gray-100 border-gray-300"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* ▶ Next */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-2 py-1 border rounded-md ${currentPage === totalPages
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100 border-gray-300"
                                    }`}
                            >
                                {">"}
                            </button>

                            {/* ⏭ Last Page */}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className={`px-2 py-1 border rounded-md ${currentPage === totalPages
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100 border-gray-300"
                                    }`}
                            >
                                {">>"}
                            </button>
                        </div>
                    )}



                    {/* ✅ Show All / Paginated Toggle */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="text-sm text-blue-600 hover:underline font-medium"
                        >
                            {showAll ? "Show Paginated View" : "Show All"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UsersPage;
