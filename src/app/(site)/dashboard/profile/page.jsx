"use client";
import React, { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext";
import CountryInput from "@/utils/CountryInput";
import PhoneNumberInput from "@/utils/PhoneNumberInput";
import { apiUrl } from "@/api/api";
import { FaUser, FaBuilding, FaPen, FaMailBulk, FaLocationArrow, FaMobile } from "react-icons/fa";

const ProfilePage = () => {

    const { user, setUser } = useDashboard();

    const [editableField, setEditableField] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true); // <-- track user fetch
    const [alertMsg, setAlertMsg] = useState(""); // DaisyUI alert message
    const [alertType, setAlertType] = useState("success"); // success / error

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        country: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                company: user.company || "",
                country: user.country || "",
                phone: user.phone || "",
            });
        }
        setLoadingUser(false); // <-- stop loading once user is set

    }, [user]);


    const handleChange = (field, valueOrEvent) => {
        let value;

        if (field === "country" && valueOrEvent?.target?.value !== undefined) {
            // For CountryInput, extract value from event
            value = valueOrEvent.target.value;
        } else {
            // For normal inputs or custom components like PhoneInput
            value = valueOrEvent;
        }

        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const handleSave = async (field) => {

        try {
            setLoading(true);
            const res = await apiUrl.post("/user/update-profile", {
                userId: user._id,
                [field]: formData[field],
            });
            // alert(res.data.message);
            setUser(res.data.user);
            setEditableField("");

            setAlertMsg(res.data.message);
            setAlertType("success");
        } catch (error) {
            setAlertMsg(error.response?.data?.message || "Failed to update profile");
            setAlertType("error");
        } finally {
            setLoading(false);
            setTimeout(() => setAlertMsg(""), 3000);
        }
    };

    const handleCancel = async (field) => {
        setEditableField("");
    };

    if (loadingUser) {
        return (
            <div className="flex flex-col items-center justify-center mt-10">
                <svg
                    className="animate-spin h-8 w-8 text-blue-600 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="text-gray-600">Loading user data...</p>
            </div>
        );
    }

    const renderField = (label, field, icon, InputComponent = null) => (
        <div className="flex flex-col p-5 rounded-xl bg-white border border-gray-100">
            {editableField === field ? (
                <>
                    {/* Icon + Input row */}
                    <div className="flex items-center gap-3">
                        {icon}
                        {InputComponent ? (
                            <InputComponent
                                value={formData[field]}
                                onChange={(val) => handleChange(field, val)}
                                className="flex-1"
                            />
                        ) : (
                            <input
                                type="text"
                                className="flex-1 border-b border-gray-300 focus:outline-none text-gray-900 px-2 py-1"
                                value={formData[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        )}
                    </div>

                    {/* Save / Cancel buttons below */}
                    <div className="w-full flex justify-end gap-4 mt-3">
                        <button
                            onClick={() => handleCancel(field)}
                            className="btn max-w-fit flex-1 py-2 px-4 bg-gray-200 border  border-none shadow-none text-gray-700 font-semibold rounded hover:bg-gray-300 transition"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleSave(field)}
                            className="btn btn-primary max-w-fit flex-1 py-2 px-4  text-white font-semibold rounded "
                            disabled={loading}
                        >
                            Save
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-between">
                    {/* Icon + value row */}
                    <div className="flex items-center gap-3">
                        {icon}
                        <p className="text-gray-900">{formData[field] || "Not set"}</p>
                    </div>
                    <FaPen
                        className="w-4 h-4 text-gray-400 cursor-pointer"
                        onClick={() => setEditableField(field)}
                    />
                </div>
            )}
        </div>
    );


    return (
        <div className="max-w-xl mx-auto mt-6 p-1">
            <h1 className="text-md font-bold mb-10 text-center text-gray-900">Profile Details</h1>

            {alertMsg && (
                <div
                    className={`fixed bottom-5 right-5 z-50 w-80 max-w-full px-4 py-3 rounded-lg shadow-lg flex items-center justify-between ${alertType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"} transition-transform transform duration-300 `}
                >
                    <span className="truncate">{alertMsg}</span>
                    <button
                        className="ml-2 font-bold hover:opacity-80"
                        onClick={() => setAlertMsg("")}
                    >
                        ✕
                    </button>
                </div>
            )}

            {!user ? (
                <div className="text-center mt-10 text-gray-500">
                    No user data available
                </div>
            ) : loading ? (
                <div className="flex flex-col items-center justify-center mt-10">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600 mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    <p className="text-gray-600">Loading user data...</p>
                </div>
            ) : (




                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 w-full">
                    {renderField("Name", "name", <FaUser className="w-6 h-6 text-gray-400 mr-3" />)}

                    {/* Email read-only */}
                    <div className="flex items-center p-5 rounded-xl bg-white border border-gray-100">
                        <FaMailBulk className="w-6 h-6 text-gray-400 mr-3" />
                        <p className="flex-1 text-gray-900 bg-gray-50 px-2 py-1 rounded cursor-not-allowed">
                            {user.email}
                        </p>
                    </div>

                    {renderField(
                        "Phone",
                        "phone",
                        <FaMobile className="w-6 h-6 text-gray-400 mr-3" />,
                        PhoneNumberInput
                    )}

                    {renderField(
                        "Country",
                        "country",
                        <FaLocationArrow className="w-6 h-6 text-gray-400 mr-3" />,
                        CountryInput
                    )}

                    {renderField("Company", "company", <FaBuilding className="w-6 h-6 text-gray-400 mr-3" />)}

                </div>

            )}
        </div>
    );
};

export default ProfilePage;
