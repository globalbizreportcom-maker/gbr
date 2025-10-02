'use client';
import { forwardRef } from "react";
import RequiredStar from "./RequiredStar";

const UsernameInput = forwardRef(({ value, onChange, placeholder = "Name" }, ref) => {
    return (
        <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-500">Name <RequiredStar /></label>
            <input
                ref={ref}
                type="text"
                value={value}
                required
                onChange={onChange}
                placeholder={placeholder}
                className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
            />
        </div>
    );
});

UsernameInput.displayName = "UsernameInput";
export default UsernameInput;
