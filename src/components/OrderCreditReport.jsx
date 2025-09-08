'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const CountryDropdown = dynamic(() => import('@/utils/CountryDropdown'), {
    ssr: false,
});

const StateDropdown = dynamic(() => import('@/utils/StateDropdown'), {
    ssr: false,
});

const CityDropdown = dynamic(() => import('@/utils/CityDropdown'), {
    ssr: false,
});

const PhoneInputWithCountry = dynamic(() => import('@/utils/PhoneFiled'), {
    ssr: false,
});

const OrderCreditReport = () => {

    const router = useRouter();

    const [step, setStep] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        telephone: '',
        website: '',
        contactName: '',
        contactEmail: '',
        contactCountry: '',
        contactPhone: '',
        contactCompany: '',
        agreedToTerms: true,
    });

    useEffect(() => {
        const storedData = localStorage.getItem('gbr_form');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setFormData((prev) => ({ ...prev, ...parsedData }));
            } catch (error) {
                console.error('Failed to parse stored form data:', error);
            }
        }
    }, []);


    // form 1 Validation handler
    const handleNext = () => {
        const missingFields = [];

        if (!formData.companyName) missingFields.push('Company Name');
        if (!formData.address) missingFields.push('Address');
        if (!formData.country) missingFields.push('Country');
        if (!formData.city) missingFields.push('City');

        if (missingFields.length > 0) {
            setSnackbarMessage(`Please fill in: ${missingFields.join(', ')}`);
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
            return;
        }

        setStep(2);
    };

    const handlePreview = () => {
        const missingFields = [];

        if (!formData.contactName) missingFields.push('Your Name');
        if (!formData.contactEmail) missingFields.push('Your Email');
        if (!formData.contactCountry) missingFields.push('Your Country');
        if (!formData.contactPhone) missingFields.push('Your Phone');

        if (missingFields.length > 0) {
            setSnackbarMessage(`Please fill in: ${missingFields.join(', ')}`);
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
            return;
        }

        localStorage.setItem('gbr_form', JSON.stringify(formData)); // Save to localStorage
        router.push('/order-confirm'); // Navigate to next page

    };




    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">

            {step === 1 && (
                <>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-start mb-6 gap-2">
                        {/* Left: Step Indicator */}
                        <span className="text-sm font-medium text-primary md:text-base bg-blue-50 p-2 rounded-xl mr-5">
                            Step 1
                        </span>

                        {/* Right: Title + Subtitle */}
                        <div className="text-right md:text-left">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Company to be Verified
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Fill in the details of the company for which you want Business Credit Report.
                            </p>
                        </div>
                    </div>


                    <form className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-5">
                        <div className="md:col-span-6">
                            <Input
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="md:col-span-6">
                            <Input
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <CountryDropdown
                                value={formData.country}
                                onChange={(selected) => {
                                    setSelectedCountry(selected);
                                    setFormData({
                                        ...formData, country: selected
                                    });
                                }}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <StateDropdown
                                countryCode={selectedCountry?.value || selectedCountry}
                                value={formData.state}
                                onChange={(code) => {
                                    setSelectedState(code);
                                    setFormData({ ...formData, state: code });
                                }}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                            <PhoneInputWithCountry
                                value={formData.telephone}
                                onChange={(phone) =>
                                    setFormData({ ...formData, telephone: phone })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="Company Website (if available)"
                                name="website"
                                value={formData.website}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                            />
                        </div>
                    </form>



                    <div className="flex justify-end mt-10">
                        {showSnackbar && (
                            <h6 className="text-red-400 font-semibold px-4 py-2 duration-300">
                                {snackbarMessage}
                            </h6>
                        )}
                        <button
                            type="button"
                            onClick={() => handleNext()}
                            className="btn btn-primary px-8 py-2 text-sm font-medium"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}




            {step === 2 && (
                <>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-start mb-6 gap-2">
                        <span className="text-sm font-medium text-primary md:text-base bg-blue-50 p-2 rounded-xl mr-5">
                            Step 2
                        </span>

                        <div className="text-right md:text-left">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Your Contact Information
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Fill your details to get a Freshly Investigated Report
                            </p>
                        </div>
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Your Name"
                            name="contactName"
                            value={formData.contactName}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            required
                        />

                        <Input
                            label="Your Email (Credit report will be sent to this email)"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            required
                        />

                        <CountryDropdown
                            value={formData.contactCountry}
                            onChange={(selected) => {
                                setSelectedCountry(selected);
                                setFormData({ ...formData, contactCountry: selected });
                            }}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                            <PhoneInputWithCountry
                                value={formData.contactPhone}
                                onChange={(phone) =>
                                    setFormData({ ...formData, contactPhone: phone })
                                }
                            />
                        </div>

                        <Input
                            label="Your Company"
                            name="contactCompany"
                            value={formData.contactCompany}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                        />
                    </form>

                    <h3 className='text-base-100 mt-10 font-semibold' >User Agreement and Privacy Policy</h3>

                    <div className="mt-6 mb-5">
                        <label className="flex items-start gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={formData.agreedToTerms}
                                onChange={(e) =>
                                    setFormData({ ...formData, agreedToTerms: e.target.checked })
                                }
                                className="checkbox checkbox-primary mt-1"
                            />
                            <span className='mt-2'>
                                I have read and agreed to the <a href="/terms" className="text-primary underline">User Agreement</a> and <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> of GlobalBizReport.com
                            </span>
                        </label>
                    </div>

                    {showSnackbar && (
                        <h6 className="text-right text-red-400 font-semibold px-4 py-2 duration-300">
                            {snackbarMessage}
                        </h6>
                    )}

                    <div className="flex justify-between mt-8">
                        <button onClick={() => setStep(1)} className="btn btn-outline px-6">
                            Back
                        </button>

                        <button
                            className="btn btn-primary px-6"
                            onClick={() => handlePreview()}
                        >
                            Preview and Order
                        </button>
                    </div>
                </>
            )}

            {/* {step === 3 && (
                <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Preview Your Order</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><strong>Company Name:</strong> {formData.companyName}</p>
                        <p><strong>Address:</strong> {formData.address}</p>
                        <p><strong>City:</strong> {formData.city?.label}</p>
                        <p><strong>State:</strong> {formData.state?.label}</p>
                        <p><strong>Country:</strong> {formData.country?.label}</p>
                        <p><strong>Postal Code:</strong> {formData.postalCode}</p>
                        <p><strong>Telephone:</strong> {formData.telephone}</p>
                        <p><strong>Website:</strong> {formData.website}</p>
                        <p><strong>Contact Name:</strong> {formData.contactName}</p>
                        <p><strong>Contact Email:</strong> {formData.contactEmail}</p>
                        <p><strong>Contact Country:</strong> {formData.contactCountry?.label}</p>
                        <p><strong>Contact Phone:</strong> {formData.contactPhone}</p>
                        <p><strong>Contact Company Name:</strong> {formData.contactCompany}</p>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button onClick={() => setStep(2)} className="btn btn-outline px-6">
                            Back
                        </button>
                        <button
                            className="btn btn-primary px-6"
                            onClick={() => {
                                localStorage.setItem('gbr_form', JSON.stringify(formData)); // Save to localStorage
                                router.push('/order-confirm'); // Navigate to next page
                            }}
                        >
                            Preview and Order
                        </button>


                    </div>
                </>
            )} */}

        </div >

    );
};

const Input = ({ label, name, value, onChange, required = false }) => (
    <div>
        <label className="label text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type="text"
            name={name}
            value={value}
            placeholder={label}
            className="input border w-full bg-white border-gray-300"
            onChange={onChange}
        />
    </div>
);



export default OrderCreditReport;
