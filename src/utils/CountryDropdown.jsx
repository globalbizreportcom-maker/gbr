// 'use client';
// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import { Country } from 'country-state-city';

// const CountryDropdown = ({ value, onChange, }) => {


//     const [options, setOptions] = useState([]);
//     const [selected, setSelected] = useState(null);

//     useEffect(() => {
//         const countryOptions = Country.getAllCountries().map((c) => ({
//             value: c.isoCode,
//             label: c.name,
//             countryObj: c,
//         }));
//         setOptions(countryOptions);
//     }, [onChange]);

//     const handleChange = (selectedOption) => {
//         setSelected(selectedOption);
//         if (typeof onChange === 'function') {
//             onChange(selectedOption); // send full object
//         }
//     };


//     return (
//         <div>
//             <label className="label text-sm font-medium text-gray-700">Country</label>
//             <Select
//                 options={options}
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="Select Country"
//                 styles={{
//                     control: (base) => ({
//                         ...base,
//                         borderColor: '#d1d5db',
//                         fontSize: '0.875rem',
//                     }),
//                 }}
//                 required
//             />
//         </div>
//     );
// };

// export default CountryDropdown;

'use client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Country } from 'country-state-city';

const CountryDropdown = ({ value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const countryOptions = Country.getAllCountries().map((c) => ({
            value: c.isoCode,
            label: c.name,
            countryObj: c,
        }));
        setOptions(countryOptions);

        // Preselect if value is a string (country name)
        if (value && typeof value === 'string') {
            const matched = countryOptions.find((opt) => opt.label.toLowerCase() === value.toLowerCase());
            if (matched) setSelected(matched);
        } else if (value && value.value) {
            setSelected(value); // full object
        }
    }, [value]);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        if (typeof onChange === 'function') {
            onChange(selectedOption); // send full object
        }
    };

    return (
        <div>
            <label className="label text-sm font-medium text-gray-700">Country</label>
            <Select
                options={options}
                value={selected}
                onChange={handleChange}
                placeholder="Select Country"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: '#d1d5db',
                        fontSize: '0.875rem',
                    }),
                }}
                required
            />
        </div>
    );
};

export default CountryDropdown;
