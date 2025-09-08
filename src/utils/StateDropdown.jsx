'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { State } from 'country-state-city';

const StateDropdown = ({ countryCode, value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (countryCode) {
            const stateOptions = State.getStatesOfCountry(countryCode).map((s) => ({
                value: s.isoCode,
                label: s.name,
            }));
            setOptions(stateOptions);
        }
    }, [countryCode]);

    useEffect(() => {
        setSelected(value || null); // initialize selected when prop changes
    }, [value]);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        if (typeof onChange === 'function') {
            onChange(selectedOption); // send full selected state object
        }
    };

    return (
        <div>
            <label className="label text-sm font-medium text-gray-700">State / Province</label>
            <Select
                options={options}
                value={selected}
                onChange={handleChange}
                placeholder="Select State"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: '#d1d5db',
                        fontSize: '0.875rem',
                    }),
                }}
            />
        </div>
    );
};


export default StateDropdown;
