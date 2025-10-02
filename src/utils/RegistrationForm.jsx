'use client'; // this is required because it uses useState

import React, { useState } from "react";
import UsernameInput from "@/utils/UsernameInput";
import EmailInput from "@/utils/EmailInput";
import PhoneNumberInput from "@/utils/PhoneNumberInput";
import CountryInput from "@/utils/CountryInput";
import StateInput from "@/utils/StateInput";
import CityInput from "@/utils/CityInput";
import PincodeInput from "@/utils/PincodeInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import CompanyInput from "./CompanyInput";
import { apiUrl } from "@/api/api";

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!phone) {
            alert("Enter phone number!");
            return;
        }

        const formData = {
            name: username, // backend expects "name"
            email,
            phone,
            country,
            state,
            city,
            pincode,
            password,
            company,
        };

        try {
            const res = await apiUrl.post("/register/form-submit", // ✅ adjust URL to match backend
                formData
            );

            if (res.data.success) {
                alert("Registration successful!");
            } else {
                alert(res.data.message || "Something went wrong");
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Server error, please try again later"
            );
        }
    };


    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Username */}
            <div className="col-span-1">
                <UsernameInput value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            {/* Email */}
            <div className="col-span-1">
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Phone */}
            <div className="col-span-1">
                <PhoneNumberInput value={phone} onChange={setPhone} />
            </div>

            {/* Country */}
            <div className="col-span-1">
                <CountryInput
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                        setState("");
                        setCity("");
                    }}
                />
            </div>

            {/* State */}
            {/* <div className="col-span-1">
                <StateInput
                    country={country}
                    value={state}
                    onChange={(e) => {
                        setState(e.target.value);
                        setCity("");
                    }}
                />
            </div> */}

            {/* City */}
            {/* <div className="col-span-1">
                <CityInput
                    country={country}
                    state={state}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div> */}

            {/* Pincode */}
            {/* <div className="col-span-1">
                <PincodeInput value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </div> */}

            {/* Passwords side by side */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">

                {/* Password */}
                <div className="flex-1 relative">
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                        Password (optional)
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:border-blue-600 focus:ring-0 h-[50px] placeholder-gray-400 placeholder-italic pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                </div>

                {/* Re-enter Password */}
                <div className="flex-1 relative">
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                        Re-enter Password
                    </label>
                    <input
                        type={showRePassword ? "text" : "password"}
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Re-enter Password"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:border-blue-600 focus:ring-0 h-[50px] placeholder-gray-400 placeholder-italic pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                        onClick={() => setShowRePassword(!showRePassword)}
                    >
                        {showRePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                </div>




            </div>

            <div className="col-span-2">
                <CompanyInput value={company} onChange={(e) => setCompany(e.target.value)} />

            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row col-span-1 md:col-span-3 text-end w-full justify-end bg-grey-100">
                <button type="submit" className="btn w-64 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 h-[50px] transition-all duration-300" >
                    Register
                </button>
                <p className="mt-4 w-64 text-sm text-gray-500 text-center">
                    Already have an account?{" "} <a href="/login" className="text-indigo-500 hover:underline"> Login </a>
                </p>
            </div>
        </form>
    );
};

export default RegistrationForm;
