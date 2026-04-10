'use client'

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/app/(site)/dashboard/DashboardContext";
import { apiUrl } from "@/api/api";
import { useAlert } from "@/context/AlertProvider";
import RequiredStar from "@/utils/RequiredStar";
import { LoginModalButton } from "@/utils/LoginModalButton";
import { FaBuilding, FaUser } from "react-icons/fa";
import RazorpayClaimCompany from "./payments/RazorpayClaimCompany";
import OtpVerificationDialog from "./OtpVerificationDialog";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CountryDropdown = dynamic(() => import('@/utils/CountryDropdown'), { ssr: false })
const PhoneInputWithCountry = dynamic(() => import('@/utils/PhoneFiled'), { ssr: false })



export default function ClaimyourcompanyForm() {

    const router = useRouter()
    const { user, setUser } = useDashboard();

    console.log(user);

    const { showAlert } = useAlert();

    const [step, setStep] = useState(1)
    const [order, setOrder] = useState(null)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [company, setCompany] = useState(null);
    const [showMore, setShowMore] = useState(false)

    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [otpEmail, setOtpEmail] = useState("");
    const [otp, setOtp] = useState("");

    const designationOptions = [
        {
            label: "Executive",
            options: [
                { value: "CEO / Founder", label: "CEO / Founder" },
                { value: "Managing Director", label: "Managing Director" },
                { value: "CFO", label: "CFO" },
                { value: "CTO / CIO", label: "CTO / CIO" }
            ]
        },
        {
            label: "Management",
            options: [
                { value: "General Manager", label: "General Manager" },
                { value: "Department Head", label: "Department Head" },
                { value: "Project Manager", label: "Project Manager" },
                { value: "Operations Manager", label: "Operations Manager" }
            ]
        },
        {
            label: "Legal & Finance",
            options: [
                { value: "Company Secretary", label: "Company Secretary" },
                { value: "Chartered Accountant", label: "Chartered Accountant" },
                { value: "Legal Counsel", label: "Legal Counsel" }
            ]
        },
        {
            label: "Technical/Professional",
            options: [
                { value: "Business Analyst", label: "Business Analyst" },
                { value: "Marketing Head", label: "Marketing Head" },
                { value: "Sales Lead", label: "Sales Lead" },
                { value: "Consultant", label: "Consultant" }
            ]
        },
        {
            label: "Other",
            options: [
                { value: "Proprietor", label: "Proprietor" },
                { value: "Partner", label: "Partner" },
                { value: "Other", label: "Other" }
            ]
        }
    ];

    useEffect(() => {
        const stored = sessionStorage.getItem("claim_company")
        if (stored) {
            setCompany(JSON.parse(stored));
        }
    }, [])

    const [formData, setFormData] = useState({
        companyName: "",
        address: "",
        contactName: "",
        contactEmail: "",
        designation: "",
        contactPhone: "",
        contactCountry: "",
        contactState: "",
        city: "",
        postalCode: "",
        companyGst: "",
        website: "",
        agreedToTerms: true
    })

    console.log(formData);

    /* ---------- PREFILL USER ---------- */

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                contactName: user.name || prev.contactName,
                contactEmail: user.email || prev.contactEmail,
                contactPhone: user.phone || prev.contactPhone,
                contactCountry: user.country || prev.contactCountry,
                contactState: user.state || prev.contactState,
                companyGst: user.gstin || prev.companyGst,
                // designation: user.designation || prev.designation

            }))
        }
    }, [user])

    /* ---------- STEP VALIDATION ---------- */

    const validateStep2 = () => {

        const required = [
            { key: "contactName", label: "Name" },
            { key: "contactEmail", label: "Email" },
            { key: "contactPhone", label: "Phone" },
            { key: "contactCountry", label: "Country" },
            { key: "contactState", label: "State" },
            { key: "city", label: "City" },
            { key: "designation", label: "Designation" },
            { key: "companyGst", label: "GST" },
            { key: "postalCode", label: "Zip Code" },
            { key: "agreedToTerms", label: "Accept our Terms and Policies" },

        ]

        for (const field of required) {
            if (!formData[field.key]) {
                showAlert(`${field.label} required`, "error")
                return
            }
        }

        handlePayment()
    }

    /* ---------- PAYMENT ---------- */

    const handlePayment = async (passedUser = null) => {
        try {

            let activeUser = passedUser || user;
            console.log(activeUser);
            const payload = {
                ...formData,
                companyName: company?.name,
                address: company?.address,
                city: company?.city,
                state: company?.state,
                country: company?.country
            }

            if (!activeUser) {

                const res = await apiUrl.post("/api/users/check-user", {
                    name: formData.contactName,
                    email: formData.contactEmail,
                    phone: formData.contactPhone,
                    company: company?.name,
                    designation: formData.designation,
                    country: formData.contactCountry?.label || formData.contactCountry,
                    state: formData.contactState?.label || formData.contactState,
                    city: formData.city || '',
                    website: formData.website || '',
                    gst: formData.companyGst || ""
                })

                if (res.data.exists) {
                    setShowLoginModal(true)
                    return
                }

                // ✅ OPEN OTP DIALOG
                setOtpEmail(formData.contactEmail);
                setOtpDialogOpen(true);
                return
                // activeUser = res.data.user
                // setUser(activeUser)
            }

            const orderRes = await apiUrl.post("/claim-company/create-order", {
                amount: 90000,
                userId: activeUser._id,
                companyName: company.companyname,
                cin: company.cin,
                address: company.registered_office_address,
                formData
            });

            setOrder(orderRes.data);
        } catch (err) {
            console.log(err);
            showAlert("Something went wrong", "error")
        }
    }

    /* ---------- INPUT HANDLER ---------- */

    const update = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const DesignationDropdown = ({ value, onChange, required = false }) => {
        // Helper to find the current option object based on the string value in formData
        const currentOption = designationOptions
            .flatMap(group => group.options)
            .find(opt => opt.value === value) || null;

        const customStyles = {
            control: (base, state) => ({
                ...base,
                minHeight: '2.8rem',
                borderRadius: '0.5rem',
                borderColor: state.isFocused ? '#94a3b8' : '#d1d5db', // slate-400 focus
                boxShadow: state.isFocused ? '0 0 0 2px rgba(148, 163, 184, 0.2)' : 'none',
                '&:hover': { borderColor: '#94a3b8' },
            }),
            placeholder: (base) => ({ ...base, fontSize: '14px', color: '#9ca3af' }),
            option: (base, state) => ({
                ...base,
                fontSize: '14px',
                backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#f1f5f9' : 'white',
                color: state.isSelected ? 'white' : '#1e293b',
            })
        };

        return (
            <div className="flex flex-col">
                <label className="label text-sm font-medium">
                    Designation {required && <span className="text-red-500">*</span>}
                </label>
                <Select
                    options={designationOptions}
                    value={currentOption}
                    onChange={(selected) => onChange(selected.value)}
                    placeholder="Select Designation"
                    styles={customStyles}
                    isSearchable={true}
                    classNamePrefix="react-select"
                />
            </div>
        );
    };

    return (

        <div className="bg-white rounded-2xl p-6">

            {/* ---------- STEPS ---------- */}

            <div className="flex border-b border-gray-200 mb-8">

                {/* Company Info Tab */}
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`flex btn-xs cursor-pointer items-center gap-2 px-5 py-3  transition rounded-t-lg
    ${step === 1
                            ? "bg-indigo-50 text-primary font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <FaBuilding size={18} />
                    Company Info
                </button>

                {/* User Info Tab */}
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={`flex btn-xs cursor-pointer items-center gap-2 px-5 py-3 transition rounded-t-lg
    ${step === 2
                            ? "bg-indigo-50 text-primary font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <FaUser size={18} />
                    User Info
                </button>

            </div>

            {/* ---------- STEP 1 ---------- */}

            {!company?.companyname ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Company Name Skeleton */}
                    <div className="col-span-full p-4 rounded-lg  bg-gray-50 animate-pulse">
                        <div className="h-3 w-32 bg-gray-300 rounded mb-2"></div>
                        <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                    </div>

                    {Array.from({ length: 1 }).map((_, i) => (
                        <div key={i} className="p-4 rounded-lg  bg-gray-50 animate-pulse">
                            <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        </div>
                    ))}

                    {/* Address Skeleton */}
                    <div className="col-span-full p-4 rounded-lg  bg-gray-50 animate-pulse">
                        <div className="h-3 w-40 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-300 rounded"></div>
                    </div>

                </div>
            ) : (

                step === 1 && company && (

                    <div className="space-y-6">

                        <div className="rounded-xl">

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">

                                {/* Company Name */}
                                <div className="p-2 rounded-lg bg-gray-50 col-span-full">
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                                        Company Name
                                    </p>
                                    <p className="font-medium text-gray-800 mt-1">
                                        {company?.companyname || "-"}
                                    </p>
                                </div>

                                {/* CIN */}
                                <div className="p-2 rounded-lg bg-gray-50">
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                                        CIN
                                    </p>
                                    <p className="font-medium text-gray-800 mt-1">
                                        {company?.cin || "-"}
                                    </p>
                                </div>

                                {/* Address */}
                                <div className="p-2 rounded-lg bg-gray-50 col-span-full">
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                                        Registered Address
                                    </p>
                                    <p className="font-medium text-gray-800 mt-1">
                                        {company?.registered_office_address || "-"}
                                    </p>
                                </div>

                                {/* EXTRA FIELDS */}

                                {showMore && (
                                    <>
                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Category
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companycategory || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Class
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companyclass || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Sub Category
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companysubcategory || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                ROC Code
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companyroccode || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Registration Date
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companyregistrationdate_date || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                State
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companystatecode || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Status
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.companystatus || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Listing Status
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.listingstatus || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Authorized Capital
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                ₹ {company?.authorizedcapital || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                Paid Up Capital
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                ₹ {company?.paidupcapital || "-"}
                                            </p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide">
                                                NIC Code
                                            </p>
                                            <p className="font-medium text-gray-800 mt-1">
                                                {company?.nic_code || "-"}
                                            </p>
                                        </div>
                                    </>
                                )}

                            </div>



                        </div>

                        {/* CONTINUE BUTTON */}

                        <div className="w-full flex justify-between p-2">

                            {/* VIEW MORE BUTTON */}

                            <p
                                className="text-sm cursor-pointer text-blue-600 font-medium"
                                onClick={() => setShowMore(!showMore)}
                            >
                                {showMore ? "View Less" : "View More"}
                            </p>


                            <button
                                className="btn btn-primary w-fit"
                                onClick={() => setStep(2)}
                            >
                                Continue
                            </button>
                        </div>

                    </div>

                )
            )}
            {/* ---------- STEP 2 ---------- */}

            {step === 2 && (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <Input
                        label="Name"
                        required
                        value={formData.contactName}
                        onChange={e => update("contactName", e.target.value)}
                    />

                    <Input
                        label="Email"
                        type="email"
                        required
                        value={formData.contactEmail}
                        disabled={user?.email}
                        onChange={e => update("contactEmail", e.target.value)}
                    />

                    <div>
                        <label className="label">Phone <RequiredStar /></label>

                        <PhoneInputWithCountry
                            value={formData.contactPhone}
                            onChange={(phone) => update("contactPhone", phone)}
                        />

                    </div>

                    {/* Inside step === 2 grid */}
                    <DesignationDropdown
                        value={formData.designation}
                        onChange={(val) => update("designation", val)} // Changed from e.target.value to val
                        required
                    />

                    <CountryDropdown
                        value={formData.contactCountry}
                        onChange={(country) => update("contactCountry", country)}
                        required
                    />

                    {(formData.contactCountry?.label || formData.contactCountry) === "India" && (

                        <Input
                            label="State"
                            value={formData.contactState}
                            onChange={e => update("contactState", e.target.value)}
                        />

                    )}

                    <Input
                        label="City"
                        required
                        value={formData.city}
                        onChange={e => update("city", e.target.value)}
                    />

                    <Input
                        label="Postal Code"
                        value={formData.postalCode}
                        onChange={e => update("postalCode", e.target.value)}
                    />

                    {(formData.contactCountry?.label || formData.contactCountry) === "India" && (

                        <Input
                            label="GST"
                            value={formData.companyGst}
                            onChange={e => update("companyGst", e.target.value)}
                            required
                        />
                    )}

                    <Input
                        label="Website"
                        value={formData.website}
                        onChange={e => update("website", e.target.value)}
                    />

                    {/* TERMS */}

                    <div className="col-span-full">

                        <label className="flex gap-2 text-sm">

                            <input
                                className="bg-gray-100"
                                type="checkbox"
                                checked={formData.agreedToTerms}
                                onChange={(e) => update("agreedToTerms", e.target.checked)}
                                required
                            />

                            <span>
                                I agree to Terms & Privacy Policy
                            </span>
                            <span className="text-red-500">*</span>
                        </label>

                    </div>

                    {/* ACTIONS */}

                    <div className="col-span-full flex justify-end gap-4">

                        <button
                            className="btn"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>

                        <button
                            className="btn btn-primary shadow-none border-none w-fit"
                            onClick={validateStep2}
                        >
                            Pay & Claim Now
                        </button>

                    </div>

                </div>

            )}

            {/* ---------- PAYMENT ---------- */}

            {order && (
                <RazorpayClaimCompany
                    order={order}
                    userData={formData}

                    onSuccess={async (payment) => {
                        try {

                            const res = await apiUrl.post("/claim-company/payment-verify", {
                                ...payment,
                                razorpay_order_id: order?.order.id
                            });

                            const paymentId = res.data.payment?.razorpayPaymentId;

                            if (!paymentId) {
                                showAlert("Payment verification failed", "error");
                                return;
                            }

                            showAlert("Payment successful!", "success");

                            // redirect after success with paymentId in query params
                            router.push(`/company-claim-success?id=${paymentId}`);

                        } catch (error) {

                            showAlert("Payment verification failed", "error");

                        }
                    }}

                    onFailure={async () => {

                        try {

                            await apiUrl.post("/claim-company/paymen-failed", {
                                razorpay_order_id: order?.order.id
                            });

                        } catch (err) {
                            console.log("Failure update error", err);
                        }

                        showAlert("Payment failed", "error");

                    }}

                    onCancel={async () => {

                        try {

                            await apiUrl.post("/claim-company/payment-failed", {
                                razorpay_order_id: order?.order.id
                            });

                        } catch (err) {
                            console.log("Cancel update error", err);
                        }

                        showAlert("Payment cancelled", "warning");

                    }}
                />
            )}

            <LoginModalButton
                btnDisplay="none"
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                btnTitle="Email already registered"
            />

            <OtpVerificationDialog
                open={otpDialogOpen}
                email={otpEmail}
                payload={{
                    name: formData.contactName,
                    phone: formData.contactPhone,
                    company: company?.name,
                    country: formData.contactCountry?.label || formData.contactCountry,
                    state: formData.contactState?.label || formData.contactState,
                    city: formData.city || '',
                    website: formData.website || '',
                    gst: formData.companyGst || "",
                    designation: formData.designation,

                }}
                onClose={() => setOtpDialogOpen(false)}
                onSuccess={(data) => {
                    const verifiedUser = data?.user;

                    // 1. Update state for the rest of the app
                    setUser(verifiedUser);

                    showAlert(`Otp verified Successfully, Continue your payment`, "success");

                    // 2. Pass the fresh user directly to the function
                    setTimeout(() => {
                        handlePayment(verifiedUser);
                    }, 2000);
                }}
            />

        </div>

    )

}

/* ---------- INPUT ---------- */

const Input = ({
    label,
    value,
    onChange,
    disabled = false,
    required = false,
    type = "text"
}) => (

    <div>

        <label className="label text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
        </label>

        <input
            disabled={disabled}
            type={type}
            value={value}
            placeholder={label}
            onChange={onChange}
            className="input border w-full border-gray-300  bg-white"
        />

    </div>

)