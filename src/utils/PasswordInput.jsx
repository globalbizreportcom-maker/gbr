'use client';
import { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = forwardRef(({ value, onChange, placeholder = "Password" }, ref) => {
    const [show, setShow] = useState(false);

    return (
        <div className="mb-10">
            <label className="block text-sm font-medium mb-1 text-gray-500">Password</label>
            <div className="relative w-full">
                <input
                    ref={ref}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px] pr-12 placeholder-gray-400 placeholder-italic"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 z-10"
                    tabIndex={-1} // 👈 prevents focus stealing
                >
                    {show ? <FaEyeSlash size={18} className="cursor-pointer" /> : <FaEye size={18} className="cursor-pointer" />}
                </button>
            </div>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
