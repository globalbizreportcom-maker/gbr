'use client';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputWithCountry = ({ value, onChange, defaultCountry }) => {

    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        if (defaultCountry) {
            setCountryCode(defaultCountry.toLowerCase()); // e.g. "IN" → "in"
        } else {
            setCountryCode(''); // empty if not found
        }
    }, [defaultCountry]);

    return (
        <div>
            <PhoneInput
                key={countryCode} // ✅ Force re-render when country changes
                country={countryCode || ''}
                value={value || ''}
                onChange={onChange}
                inputStyle={{
                    width: '100%',
                    height: '40px',
                }}
                containerStyle={{ width: '100%' }}
                inputClass="bg-white"
                enableSearch
            />
        </div>
    );
};

export default PhoneInputWithCountry;
