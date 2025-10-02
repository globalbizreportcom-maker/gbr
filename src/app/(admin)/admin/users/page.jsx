"use client";

import { useEffect, useState } from "react";
import { adminUrl } from "@/api/api"; // axios instance

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

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
    }, [search, users]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-md text-gray-500 font-bold mb-4">Users List</h1>

            {/* ✅ Search Bar */}
            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Search by name, email, phone, company, country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>


            {filteredUsers.length === 0 ? (
                <p>No users found</p>
            ) : (
                <>
                    {/* ✅ Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full ">
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
                                {filteredUsers.map((user, idx) => (
                                    <tr key={user._id} className="border-t">
                                        <td className="p-2">{idx + 1}</td>
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.phone || "-"}</td>
                                        <td className="p-2">{user.country}</td>
                                        <td className="p-2">{user.company || "-"}</td>
                                        <td className="p-2">
                                            {new Date(user.createdAt).toLocaleDateString("en-GB")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Mobile Cards */}
                    <div className="space-y-4 md:hidden">
                        {filteredUsers.map((user, idx) => (
                            <div
                                key={user._id}
                                className="bg-white shadow rounded-lg p-4 border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-600">
                                        #{idx + 1}
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
                </>
            )}
        </div>
    );
};

export default UsersPage;
