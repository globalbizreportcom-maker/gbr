'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { State } from "country-state-city";
import RequiredStar from "./RequiredStar";

const StateInput = ({ country, value, onChange }) => {


    const [states, setStates] = useState([]);

    useEffect(() => {
        if (country.value) {
            const stateOptions = State.getStatesOfCountry(country.value).map((s) => ({
                value: s.isoCode,
                label: s.name,
            }));
            setStates(stateOptions);

        } else {
            setStates([]);
        }
    }, [country]);

    return (
        <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-500">
                State {country.label === 'India' && <RequiredStar />}
            </label>
            <Select
                options={states}
                value={states.find((opt) => opt.label === value) || null}
                onChange={(selected) =>
                    onChange({ target: { value: selected || "" } })
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
