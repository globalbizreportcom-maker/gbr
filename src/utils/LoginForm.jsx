'use client';
import { useEffect, useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { apiUrl } from "@/api/api";
import { usePathname, useRouter } from "next/navigation";
import { useDashboard } from "@/app/(site)/dashboard/DashboardContext";


export default function LoginForm({ onClose }) {

    const router = useRouter();
    const pathname = usePathname();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginMethod, setLoginMethod] = useState("password");
    const [otpSent, setOtpSent] = useState(false);

    const { user, setUser } = useDashboard();

    useEffect(() => {
        const storedData = localStorage.getItem("gbr_form");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setEmail(parsedData.contactEmail);
        }
    }, []);



    // 🔹 Send OTP
    const sendOtp = async () => {
        try {
            const res = await apiUrl.post(`/login/send-otp`, { email });
            alert(res.data.message);
            setOtpSent(true);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to send OTP");
        }
    };

    // 🔹 Handle Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (loginMethod === "password") {
                const res = await apiUrl.post(`/login/form-submit`, {
                    email,
                    password,
                });
                alert(res.data.message || "Login successful");
                setUser(res.data.user);
                if (pathname === "/login") {
                    router.push("/dashboard");
                }
                if (onClose) onClose(); // call the onClose prop if provided

            } else {
                if (!otpSent) {
                    alert("Please request an OTP first");
                    return;
                }
                const res = await apiUrl.post(`/login/verify-otp`, {
                    email,
                    otp,
                });
                alert(res.data.message || "OTP login successful");
                setUser(res.data.user);

                if (pathname === "/login") {
                    router.push("/dashboard");
                }

                if (onClose) onClose(); // call the onClose prop if provided

            }
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm bg-white rounded-lg ">
            {/* Toggle Login Method */}
            <div className="flex justify-center mb-6">
                <button
                    type="button"
                    onClick={() => setLoginMethod("password")}
                    className={`px-4 py-2 rounded-l-md border border-gray-300 ${loginMethod === "password"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    Password
                </button>
                <button
                    type="button"
                    onClick={() => setLoginMethod("otp")}
                    className={`px-4 py-2 rounded-r-md border border-gray-300 ${loginMethod === "otp"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    OTP
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {/* Email */}
                <EmailInput value={email || ''} onChange={(e) => setEmail(e.target.value)} />

                {/* Password Login */}
                {loginMethod === "password" ? (
                    <PasswordInput
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                ) : (
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            value={otp ?? ""}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="One Time Password"
                            className="input input-bordered w-full bg-white border border-gray-300 focus:border-indigo-500 focus:ring-0 h-[50px]"
                        />
                        <button
                            type="button"
                            className="text-sm text-indigo-500 p-2 mt-1 hover:underline"
                            onClick={sendOtp}
                            disabled={!email}
                        >
                            {otpSent ? "Resend OTP" : "Send OTP"}
                        </button>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-indigo-500 text-white w-full h-[50px] mt-4 hover:bg-indigo-600 transition-all duration-300"
                >
                    {loading
                        ? "Logging in..."
                        : loginMethod === "password"
                            ? "Login with Password"
                            : "Login with OTP"}
                </button>

                {/* Link */}
                <p className="text-sm text-gray-500 text-center mt-2">
                    Don't have an account?{" "}
                    <a href="/register" className="text-indigo-500 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
