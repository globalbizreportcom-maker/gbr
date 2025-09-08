'use client';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputWithCountry = ({ value, onChange }) => {
    return (
        <div>
            {/* <label className="label text-sm font-medium text-gray-700">Phone*</label> */}
            <PhoneInput
                country={'in'}
                value={value}
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
