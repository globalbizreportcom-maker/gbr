

import { apiUrl } from "@/api/api";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const OtpVerificationDialog = ({
    open,
    email,
    payload,
    onClose,
    onSuccess
}) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    const handleVerify = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await apiUrl.post("/api/users/verify-otp", {
                ...payload,
                email,
                otp
            });

            onSuccess?.(res.data);
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 z-10 animate-in fade-in zoom-in-95">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <FaTimes size={18} />
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900">
                    Verify your email
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-1 mb-5 leading-relaxed">
                    We’ve sent a 6-digit OTP to{" "}
                    <span className="font-medium text-gray-800">{email}</span>
                </p>

                {/* OTP Input */}
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition
              ${error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:ring-2 focus:ring-black/20"
                        }`}
                />

                {/* Helper / Error */}
                <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-gray-400"}`}>
                    {error || "Check your inbox or spam folder"}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6">

                    {/* Optional resend (future ready) */}
                    <button
                        className="text-xs text-gray-500 font-semibold hover:text-gray-700 transition"
                    >
                        Resend OTP
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleVerify}
                            disabled={otp.length < 6 || loading}
                            className="cursor-pointer px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50 transition"
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationDialog;