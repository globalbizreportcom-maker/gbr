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
import { useRouter } from "next/navigation";

const RegistrationForm = () => {

    const router = useRouter();
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
            name: username,
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
            const res = await apiUrl.post("/register/form-submit",
                formData
            );
            if (res.data.success) {
                alert("Registration successful!");
                router.push('/dashboard');
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Server error, please try again later");
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

            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 w-full">

                {/* Password */}
                <div className="flex-1 relative w-full">
                    <label className="block text-sm font-medium mb-1 text-gray-600">Password (optional)</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:border-blue-600 focus:ring-0 h-12 pr-10 placeholder-gray-400 placeholder-italic"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                </div>

                {/* Re-enter Password */}
                <div className="flex-1 relative w-full">
                    <label className="block text-sm font-medium mb-1 text-gray-600">Re-enter Password</label>
                    <input
                        type={showRePassword ? "text" : "password"}
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Re-enter Password"
                        className="input input-bordered w-full bg-white border border-gray-300 focus:border-blue-600 focus:ring-0 h-12 pr-10 placeholder-gray-400 placeholder-italic"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowRePassword(!showRePassword)}
                    >
                        {showRePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                </div>
            </div>

            {/* Company */}
            <div className="col-span-1 md:col-span-2 w-full">
                <CompanyInput value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row col-span-1 md:col-span-3 w-full justify-end gap-2">
                <button
                    type="submit"
                    className="btn w-full md:w-64 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 h-12 transition-all duration-300"
                >
                    Register
                </button>
                <p
                    className="mt-4 text-sm text-gray-500 text-center md:text-right w-full md:w-auto cursor-pointer"
                    onClick={() => router.push("/login")}
                >
                    Already have an account?{" "}
                    <span className="text-indigo-500 hover:underline">Login</span>
                </p>
            </div>
        </form>


    );
};

export default RegistrationForm;
