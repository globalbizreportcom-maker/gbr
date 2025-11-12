'use client';
import { forwardRef } from "react";
import RequiredStar from "./RequiredStar";

const GstInput = forwardRef(({ value, onChange, placeholder = "Gst" }, ref) => {
    return (

        <div className=" mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-500">Gst </label>
            <input
                ref={ref}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px] placeholder-gray-400 placeholder-italic"
            />
        </div>
    );
});

GstInput.displayName = "GstInput";
export default GstInput;
