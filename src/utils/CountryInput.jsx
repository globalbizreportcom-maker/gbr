'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import RequiredStar from "./RequiredStar";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { Country } from "country-state-city";

const CountryInput = ({ value, onChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {

        const countryOptions = Country.getAllCountries().map((c) => ({
            value: c.isoCode, // use ISO code
            label: c.name,
            countryObj: c,    // keep full country object if needed
        }));
        setCountries(countryOptions);

    }, []);

    return (
        <div className="mb-5 w-full">
            <label className="block text-sm font-medium mb-1 text-gray-500">
                Country <RequiredStar />
            </label>
            <Select
                required
                options={countries}
                value={countries.find((opt) => opt.label === value) || null}
                onChange={(selected) =>
                    onChange({ target: { value: selected || "" } })
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
