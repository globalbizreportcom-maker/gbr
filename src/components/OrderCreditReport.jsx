'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/app/(site)/dashboard/DashboardContext';
import { LoginModalButton } from '@/utils/LoginModalButton';
import { apiUrl } from '@/api/api';
import { useCompany } from '@/context/CompanyContext';

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
    const { user } = useDashboard();

    const [step, setStep] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false); // NEW

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
        optionalEmail: '',
        agreedToTerms: true,
    });

    useEffect(() => {
        // if (!user) {
        const storedData = localStorage.getItem('gbr_form');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setFormData((prev) => ({ ...prev, ...parsedData }));
            } catch (error) {
                console.error('Failed to parse stored form data:', error);
            }
        }
        // }
    }, []);

    useEffect(() => {
        // If user exists, populate formData with user info
        if (user) {
            setFormData((prev) => ({
                ...prev,
                contactName: user.name || '',
                contactEmail: user.email || '',
                contactCountry: user.country || '',
                contactPhone: user.phone || '',
                contactCompany: user.company || '',
            }));
        }
    }, [user?._id]);


    const { companies, setCompanies } = useCompany();

    const handleCompanyChange = (index, field, value) => {
        setCompanies((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddCompany = () => {
        setCompanies((prev) => [
            ...prev,
            {
                companyName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                telephone: "",
                website: "",
            },
        ]);
    };

    const handleDeleteCompany = (idx) => {
        const updatedCompanies = companies.filter((_, index) => index !== idx);
        setCompanies(updatedCompanies);
    };



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

    const handlePreview = async () => {
        const missingFields = [];

        if (!formData.contactName) missingFields.push("Fill your Name");
        if (!formData.contactEmail) missingFields.push("Fill your Email");
        if (!formData.contactCountry) missingFields.push("Fill your Country");
        if (!formData.contactPhone) missingFields.push("Fill your Phone");
        if (!formData.agreedToTerms) missingFields.push("Agree to privacy policy");

        if (missingFields.length > 0) {
            setSnackbarMessage(`Kindly: ${missingFields.join(", ")}`);
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
            return;
        }

        if (!user) {
            try {
                // 🔹 Call backend to check or create user
                const res = await apiUrl.post("/api/users/check-or-create", {
                    name: formData.contactName,
                    email: formData.contactEmail,
                    country: formData.contactCountry,
                    phone: formData.contactPhone,
                    company: formData.contactCompany,
                });

                if (res.data.exists) {
                    // user already exists → show login modal
                    setSnackbarMessage(res.data.message);
                    setShowSnackbar(true);
                    setTimeout(() => setShowSnackbar(false), 3000);
                    setShowLoginModal(true);
                    return;
                }

                // user created → save form data and navigate
                localStorage.setItem("gbr_form", JSON.stringify(formData));
                router.push("/order-confirm");

            } catch (error) {
                setSnackbarMessage("Something went wrong. Please try again.");
                setShowSnackbar(true);
                setTimeout(() => setShowSnackbar(false), 3000);
            }
        }

        // user created → save form data and navigate
        localStorage.setItem("gbr_form", JSON.stringify(formData));
        router.push("/order-confirm");


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


                    {/* <div>
                        {companies.map((company, idx) => (
                            <div key={idx} className="pb-6 mb-6">
                                <h3 className="font-semibold text-gray-700 mb-4">Company {idx + 1}</h3>

                                {companies.length > 1 && idx !== 0 && (
                                    <div className="flex justify-end mt-4">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteCompany(idx)}
                                            className="btn btn-outline btn-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                                <form className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-5">

                                    <div className="md:col-span-6">
                                        <Input
                                            label="Company Name"
                                            name="companyName"
                                            value={company.companyName}
                                            onChange={(e) =>
                                                handleCompanyChange(idx, "companyName", e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-6">
                                        <Input
                                            label="Address"
                                            name="address"
                                            value={company.address}
                                            onChange={(e) =>
                                                handleCompanyChange(idx, "address", e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <CountryDropdown
                                            value={company.country}
                                            onChange={(selected) =>
                                                handleCompanyChange(idx, "country", selected)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Input
                                            label="State"
                                            name="state"
                                            value={company.state}
                                            onChange={(e) =>
                                                handleCompanyChange(idx, "state", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Input
                                            label="City"
                                            name="city"
                                            value={company.city}
                                            onChange={(e) =>
                                                handleCompanyChange(idx, "city", e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Input
                                            label="Postal Code"
                                            name="postalCode"
                                            value={company.postalCode}
                                            onChange={(e) =>
                                                handleCompanyChange(idx, "postalCode", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                                        <PhoneInputWithCountry
                                            value={company.telephone}
                                            onChange={(phone) =>
                                                handleCompanyChange(idx, "telephone", phone)
                                            }
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Input
                                            label="Company Website (if available)"
                                            name="website"
                                            value={company.website}
                                            onChange={(e) =>
                                                handleCompanyChange(idx, "website", e.target.value)
                                            }
                                        />
                                    </div>

                                </form>
                            </div>
                        ))}


                    </div> */}


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
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
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
                            <div className="bg-grey-500 text-red-600 px-4 py-3 text-end text-sm font-medium">
                                {snackbarMessage}
                            </div>
                        )}
                        {/* <button
                            type="button"
                            onClick={handleAddCompany}
                            className="btn btn-outline mr-1"
                        >
                            + Add More Company
                        </button> */}

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
                            label="Your Email (Report will be sent to this email)"
                            name="contactEmail"
                            value={user?.email || formData.contactEmail}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            disable={user?.email}
                            required={!user?.email}
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

                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-400">Optional Email: (Report will be send to this email too)</label>
                            <Input
                                name="optionalEmail"
                                value={formData.optionalEmail}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                            />
                        </div>


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
                        <div className="bg-grey-500 text-red-600 px-4 py-3 text-end text-sm font-medium">
                            {snackbarMessage}
                        </div>
                    )}

                    <LoginModalButton
                        btnTitle="E-mail already registered. Confirm to continue"
                        btnDisplay="none"
                        open={showLoginModal}
                        onClose={() => setShowLoginModal(false)}
                    />

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


        </div >

    );
};

const Input = ({ label, name, value, onChange, required = false, disable = false }) => (
    <div>
        <label className="label text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type="text"
            name={name}
            value={value}
            placeholder={label}
            className="input border w-full bg-white border-gray-300 "
            onChange={onChange}
            disabled={disable}

        />
    </div>
);



export default OrderCreditReport;
