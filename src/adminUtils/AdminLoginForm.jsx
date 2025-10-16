"use client"; // ✅ Client Component

import { useState } from "react";
import { adminUrl } from "@/api/api";

export default function AdminLoginForm() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("superadmin"); // default role
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await adminUrl.post(`/login`,
                { userName, password, role }, // request body
                { withCredentials: true } // important for sending/receiving cookies
            );

            window.location.href = "/admin/dashboard";

        } catch (err) {
            console.log(err);
            // Axios error handling
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };


    return (
        <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Role Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="superadmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="support">Support</option>
                    </select>
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
