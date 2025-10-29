"use client";

import { useEffect, useState } from "react";
import { adminUrl } from "@/api/api"; // axios instance

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
                                    <th className="p-2">Email</th>
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
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.phone || "-"}</td>
                                        <td className="p-2">{user.country}</td>
                                        <td className="p-2">{user.company || "-"}</td>
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
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Pagination Controls */}
                    {!showAll && filteredUsers.length > usersPerPage && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className={`btn bg-transparent btn-sm shadow-none px-3 py-1 border rounded-md text-sm ${currentPage === 1
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                                    }`}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`cursor-pointer px-3 py-1 text-sm rounded-md ${currentPage === i + 1
                                        ? "bg-gray-700 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className={`btn bg-transparent btn-sm shadow-none px-3 py-1 border rounded-md text-sm ${currentPage === totalPages
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                                    }`}
                            >
                                Next
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
