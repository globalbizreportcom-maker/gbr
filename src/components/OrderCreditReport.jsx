'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/app/(site)/dashboard/DashboardContext';
import { LoginModalButton } from '@/utils/LoginModalButton';
import { apiUrl } from '@/api/api';
import RequiredStar from '@/utils/RequiredStar';
import { useAlert } from '@/context/AlertProvider';
// import { useCompany } from '@/context/CompanyContext';

const CountryDropdown = dynamic(() => import('@/utils/CountryDropdown'), {
    ssr: false,
});


const PhoneInputWithCountry = dynamic(() => import('@/utils/PhoneFiled'), {
    ssr: false,
});

const OrderCreditReport = () => {


    const router = useRouter();
    const { user, setUser } = useDashboard();
    const { showAlert } = useAlert();
    const step2ref = useRef(null);
    const step1ref = useRef(null);

    const [step, setStep] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false); // NEW

    const [formData, setFormData] = useState(() => {
        // lazy initializer → runs only once

        if (typeof window !== "undefined") {

            const isDirect = sessionStorage.getItem('credit_report') === 'direct';
            if (!isDirect) {
                const stored = localStorage.getItem("gbr_form");
                if (stored) {
                    try {
                        const parsed = JSON.parse(stored);
                        return {
                            ...parsed,
                            agreedToTerms: parsed.agreedToTerms ?? true, // ✅ fallback to true
                        };
                    } catch (err) {
                        console.error("Failed to parse localStorage:", err);
                    }
                }
            }


        }
        return {
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
            companyGst: '',
            optionalEmail: '',
            agreedToTerms: true,
        };
    });


    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                contactName: user.name || prev.contactName,
                contactEmail: user.email || prev.contactEmail,
                contactCountry: user.country || prev.contactCountry,
                contactPhone: user.phone || prev.contactPhone,
                contactCompany: user.company || prev.contactCompany,
            }));
        }
    }, [user?._id]);





    // const { companies, setCompanies } = useCompany();



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

        // Scroll to Step 2 header
        setTimeout(() => {
            step2ref.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50); // small delay to ensure Step 2 is rendered

    };

    const handlePreview = async () => {

        const formatMissingFields = (fields) => {
            if (fields.length === 1) return fields[0];
            const last = fields.pop();
            return `${fields.join(", ")} and ${last}`;
        };

        // Usage
        const missingFields = [];
        if (!formData.contactName) missingFields.push("Name");
        if (!formData.contactEmail) missingFields.push("Email");
        if (!formData.contactCountry) missingFields.push("Country");
        if (!formData.contactPhone) missingFields.push("Phone");
        if (!formData.agreedToTerms) missingFields.push("Privacy Policy");

        if (missingFields.length > 0) {
            setSnackbarMessage(`Please provide your ${formatMissingFields(missingFields)}.`);
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
            return;
        }


        try {
            let activeUser = user;

            // 🔹 Step 1: If user is not logged in → check or create
            if (!activeUser) {
                const res = await apiUrl.post("/api/users/check-or-create", {
                    name: formData.contactName,
                    email: formData.contactEmail,
                    country: formData.contactCountry?.label || formData.contactCountry || "",
                    phone: formData.contactPhone,
                    company: formData.contactCompany,
                    gst: formData.companyGst || '',
                });

                // Existing user → show login modal & stop here
                if (res.data.exists) {
                    setSnackbarMessage(res.data.message);
                    setShowSnackbar(true);
                    setTimeout(() => setShowSnackbar(false), 3000);
                    setShowLoginModal(true);
                    return;
                }

                // Newly created user
                activeUser = res.data.user;

                setUser(res.data.user);
            }

            // 🔹 Step 2: Ensure userId exists before continuing
            if (!activeUser?._id) {
                console.error("❌ Missing user ID:", activeUser);
                setSnackbarMessage("Error identifying user. Please try again.");
                setShowSnackbar(true);
                setTimeout(() => setShowSnackbar(false), 3000);
                return;
            }

            // 🔹 Step 3: Prepare payload
            const payload = {
                ...formData,
                userId: activeUser._id,
                country: formData.contactCountry?.label || formData.contactCountry || "",
            };

            // 🔹 Step 4: Avoid duplicate payment submission
            if (!sessionStorage.getItem("visitor_payment_submitted")) {
                await apiUrl.post("/visitors/payments", payload, {
                    headers: { "Content-Type": "application/json" },
                });
                sessionStorage.setItem("visitor_payment_submitted", "true");
            }

            // 🔹 Step 5: Save form data & navigate
            localStorage.setItem("gbr_form", JSON.stringify(formData));
            router.push("/order-confirm");
        } catch (error) {
            // console.log(" Error in handlePreview:", error.response?.data || error.message);
            setSnackbarMessage("Something went wrong. Please try again.");
            setShowSnackbar(true);
            setTimeout(() => setShowSnackbar(false), 3000);
        }
    };




    return (
        <div className="bg-white rounded-2xl p-8 ">

            {step === 1 && (
                <>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-start mb-6 gap-2" ref={step1ref}>
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
                                value={formData.companyName || ''}
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
                                value={formData.address || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <CountryDropdown
                                value={formData.country || ''}
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
                                value={formData.state || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="City"
                                name="city"
                                value={formData.city || ''}
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
                                value={formData.postalCode || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, [e.target.name]: e.target.value })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                            <PhoneInputWithCountry
                                defaultCountry={formData.country?.value || ''} // string code
                                value={formData.telephone || ''}
                                onChange={(phone) =>
                                    setFormData({ ...formData, telephone: phone })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="Company Website (if available)"
                                name="website"
                                value={formData.website || ''}
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
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-start mb-6 gap-2" ref={step2ref}>
                        <span className="text-sm font-medium text-primary md:text-base bg-blue-50 p-2 rounded-xl mr-5">
                            Step 2
                        </span>

                        <div className="text-right md:text-left">
                            <h3 className="text-xl font-semibold text-gray-800" >
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
                            value={formData.contactName || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            required
                        />

                        <Input
                            label="Your Email (Report will be sent to this email)"
                            name="contactEmail"
                            type='email'
                            value={user?.email || formData.contactEmail || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFormData({ ...formData, [e.target.name]: value });

                                // Basic Email Validation
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (value && !emailRegex.test(value)) {
                                    showAlert("Please enter a valid email address", "warning");
                                }
                            }}
                            disable={user?.email}
                            required={!user?.email}
                        />


                        <CountryDropdown
                            value={formData.contactCountry || ''}
                            onChange={(selected) => {
                                setSelectedCountry(selected);
                                setFormData({ ...formData, contactCountry: selected });
                            }}
                            required={true}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Phone <RequiredStar /></label>
                            <PhoneInputWithCountry
                                key={formData.contactCountry?.value || 'default'}  // 🧩 forces re-render
                                defaultCountry={formData.contactCountry?.value?.toLowerCase() || ''}
                                value={formData.contactPhone || ''}
                                onChange={(phone) =>
                                    setFormData({ ...formData, contactPhone: phone })
                                }
                            />
                        </div>

                        <Input
                            label="Your Company"
                            name="contactCompany"
                            value={formData.contactCompany || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                        />

                        <Input
                            autoComplete="gst"
                            label="Gst"
                            name="companyGst"
                            type='text'
                            id="companyGstField"
                            value={formData.companyGst || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            className={formData.contactCompany ? 'block' : 'hidden'} // show only if company exists

                        />


                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-400">Optional Email: (Report will be send to this email too)</label>
                            <Input
                                name="optionalEmail"
                                value={formData.optionalEmail || ''}
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
                        <button onClick={() => {
                            setStep(1);
                            setTimeout(() => {
                                step1ref.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 50);
                        }}
                            className="btn btn-outline px-6"
                        >
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

const Input = ({ label, name, value, onChange, required = false, disable = false, autoComplete = "on", className = "", type = 'text' }) => (
    <div className={className}>

        <label className="label text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            autoComplete={autoComplete}
            type={type}
            name={name}
            value={value}
            placeholder={label}
            className="input border w-full bg-white border-gray-300 "
            onChange={onChange}
            disabled={disable}
            required={required}
        />
    </div>
);



export default OrderCreditReport;
