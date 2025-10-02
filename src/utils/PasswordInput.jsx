'use client';
import { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = forwardRef(({ value, onChange, placeholder = "Password" }, ref) => {
    const [show, setShow] = useState(false);

    return (
        <div className=" mb-10">
            <label className="block text-sm font-medium mb-1 text-gray-500">Password</label>
            <div className="relative w-full">
                <input
                    ref={ref}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                />
                <span
                    className="absolute right-3 top-4 cursor-pointer text-gray-500"
                    onClick={() => setShow(!show)}
                >
                    {show ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
