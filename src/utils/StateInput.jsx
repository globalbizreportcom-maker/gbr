'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });

const StateInput = ({ country, value, onChange }) => {
    const [states, setStates] = useState([]);

    useEffect(() => {
        if (country) {
            fetch("https://countriesnow.space/api/v0.1/countries/states", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ country }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.data?.states) {
                        const options = data.data.states.map((s) => ({
                            value: s.name,
                            label: s.name,
                        }));
                        setStates(options);
                    } else {
                        setStates([]);
                    }
                });
        } else {
            setStates([]);
        }
    }, [country]);

    return (
        <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-500">
                State
            </label>
            <Select
                options={states}
                value={states.find((opt) => opt.value === value) || null}
                onChange={(selected) =>
                    onChange({ target: { value: selected?.value || "" } })
                }
                placeholder={country ? "Select State" : "Select Country First"}
                // isDisabled={!country}
                className="text-black"
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: "50px",
                        borderColor: "#d1d5db", // Tailwind gray-300
                        boxShadow: "none",
                        "&:hover": { borderColor: "black" },
                    }),
                }}
            />
        </div>
    );
};

export default StateInput;
