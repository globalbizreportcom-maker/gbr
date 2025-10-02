'use client';
import { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = forwardRef(({ value, onChange }, ref) => {
    return (
        <div className="mb-5 w-full" ref={ref} >
            <label className="block text-sm font-medium mb-1 text-gray-500">
                Phone Number
            </label>
            <PhoneInput
                required
                country={"in"} // default country
                value={value}
                onChange={onChange}
                inputStyle={{
                    width: '100%',
                    height: '50px',
                    paddingLeft: "48px",
                }}
                containerStyle={{ width: '100%' }}
                // inputClass="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                containerClass="w-full text-black"
                dropdownStyle={{ backgroundColor: "white", color: "grey", zIndex: 9999 }}

            />
        </div>
    );
});

PhoneNumberInput.displayName = "PhoneNumberInput";
export default PhoneNumberInput;
