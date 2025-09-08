'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { City } from 'country-state-city';

const CityDropdown = ({ countryCode, stateCode, value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (countryCode && stateCode) {
            const cityOptions = City.getCitiesOfState(countryCode, stateCode).map((city) => ({
                value: city.name,
                label: city.name,
            }));
            setOptions(cityOptions);
        } else {
            setOptions([]);
        }
    }, [countryCode, stateCode]);

    useEffect(() => {
        setSelected(value || null);
    }, [value]);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        console.log(selectedOption);

        if (typeof onChange === 'function') {
            onChange(selectedOption); // pass full city object
        }
    };


    return (
        <div>
            <label className="label text-sm font-medium text-gray-700">City</label>
            <Select
                options={options}
                value={selected}
                onChange={handleChange}
                placeholder="Select City"
                // isDisabled={!countryCode || !stateCode}
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

export default CityDropdown;
