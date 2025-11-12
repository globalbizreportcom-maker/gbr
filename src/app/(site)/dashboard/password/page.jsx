"use client";
import { useState } from "react";
import { useDashboard } from "../DashboardContext";
import { apiUrl } from "@/api/api";
import { useAlert } from "@/context/AlertProvider";

export default function PasswordPage() {

    const { showAlert } = useAlert();

    const { user, setUser } = useDashboard();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddPassword = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            showAlert(`Please fill all fields`, "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showAlert(`Passwords do not match`, "error");
            return;
        }

        try {
            setLoading(true);
            const res = await apiUrl.post("/user/add-password", {
                userId: user._id,
                password: newPassword,
            });
            showAlert(`${res.data.message}`, "success");
            setUser(res.data.user); // update user in context
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            showAlert(`${error.response?.data?.message || "Failed to add password"}`, "success");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            showAlert(`Please fill all fields`, "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showAlert(`Passwords do not match`, "error");
            return;
        }

        try {
            setLoading(true);
            const res = await apiUrl.post("/user/change-password", {
                userId: user._id,
                currentPassword,
                newPassword,
            });
            showAlert(`${res.data.message}`, "success");
            setUser(res.data.user);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            showAlert(`${error.response?.data?.message || "Failed to change password"}`, "success");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6">
            <h1 className="text-md font-bold mb-6 text-black text-center">Password Settings</h1>

            {/* Show only one form based on passwordSet */}
            {!user?.password ? (
                <form onSubmit={handleAddPassword} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">New Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary text-white font-semibold py-2 rounded-lg transition"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Add Password"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">Current Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">New Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Change Password"}
                    </button>
                </form>
            )}
        </div>
    );
}
