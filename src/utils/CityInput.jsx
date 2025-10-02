'use client';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-select
const Select = dynamic(() => import("react-select"), { ssr: false });

const CityInput = ({ country, state, value, onChange }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (country && state) {
            fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ country, state }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.data) {
                        const options = data.data.map((c) => ({
                            value: c,
                            label: c,
                        }));
                        setCities(options);
                    }
                })
                .catch((err) => console.error("Error fetching cities:", err));
        }
    }, [country, state]);

    return (
        <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-500">
                City
            </label>
            <Select
                options={cities}
                value={cities.find((opt) => opt.value === value) || null}
                onChange={(selected) =>
                    onChange({ target: { value: selected?.value || "" } })
                }
                placeholder="Select City"
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                menuPosition="fixed"
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: "50px",
                        borderColor: "#d1d5db",
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
                        backgroundColor: state.isFocused ? "#f3f4f6" : "white",
                        color: "black",
                        cursor: "pointer",
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "black",
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#6b7280",
                    }),
                }}
            />
        </div>
    );
};

export default CityInput;
