'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import RequiredStar from "./RequiredStar";
const Select = dynamic(() => import("react-select"), { ssr: false });

const CountryInput = ({ value, onChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries")
            .then((res) => res.json())
            .then((data) => {
                if (data?.data) {
                    const options = data.data.map((c) => ({
                        value: c.country,
                        label: c.country,
                    }));
                    setCountries(options);
                }
            })
            .catch((err) => console.error("Error fetching countries:", err));
    }, []);

    return (
        <div className="mb-5 w-full">
            <label className="block text-sm font-medium mb-1 text-gray-500">
                Country <RequiredStar />
            </label>
            <Select
                required
                options={countries}
                value={countries.find((opt) => opt.value === value) || null}
                onChange={(selected) =>
                    onChange({ target: { value: selected?.value || "" } })
                }
                placeholder="Select Country"
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                menuPosition="fixed"
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: "50px",
                        borderColor: "#d1d5db", // Tailwind gray-300
                        boxShadow: "none",
                        "&:hover": { borderColor: "black" },
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "white",
                        color: "black",
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#f3f4f6" : "white", // Tailwind gray-100
                        color: "black",
                        cursor: "pointer",
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "black",
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#6b7280", // Tailwind gray-500
                    }),
                }}
            />
        </div>
    );
};

export default CountryInput;
