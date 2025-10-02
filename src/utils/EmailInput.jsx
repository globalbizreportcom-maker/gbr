'use client';
import { forwardRef } from "react";
import RequiredStar from "./RequiredStar";

const EmailInput = forwardRef(({ value, onChange, placeholder = "Email" }, ref) => {
    return (

        <div className=" mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-500">Email Address <RequiredStar /></label>
            <input
                required
                ref={ref}
                type="email"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px] placeholder-gray-400 placeholder-italic"
            />
        </div>
    );
});

EmailInput.displayName = "EmailInput";
export default EmailInput;
