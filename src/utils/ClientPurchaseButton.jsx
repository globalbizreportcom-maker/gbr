// src/app/(site)/[companyName]/[cin]/[country]/[state]/ClientPurchaseButton.jsx
"use client";

import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

const ClientPurchaseButton = ({ companyData, label, bgColor = 'orange', overlay = 99999 }) => {
    const router = useRouter();

    const handlePurchaseReport = () => {
        if (!companyData) return;

        sessionStorage.removeItem('credit_report');

        const addressParts = companyData.Registered_Office_Address
            ?.split(",")
            .map(p => p.trim()) || [];

        // Extract last part (Country & Postal)
        let countryLabel = "";
        let postalCode = "";
        if (addressParts.length > 0) {
            const lastPart = addressParts[addressParts.length - 1]; // "400710-India"
            const splitLast = lastPart.split("-");
            if (splitLast.length === 2) {
                postalCode = splitLast[0].trim();
                countryLabel = splitLast[1].trim();
            } else {
                countryLabel = lastPart.trim();
            }
        }

        const stateLabel = companyData?.CompanyStateCode
            ? companyData.CompanyStateCode.charAt(0).toUpperCase() + companyData.CompanyStateCode.slice(1).toLowerCase()
            : "";
        const cityLabel = addressParts[addressParts.length - 4] || "";

        const formData = {
            companyType: 'other_company' || '',
            companyName: companyData.CompanyName || "",
            address: companyData.Registered_Office_Address || "",
            city: cityLabel,
            state: stateLabel,
            country: {
                label: countryLabel,
                value: countryLabel.toLowerCase(),
            },
            postalCode: postalCode || "",
            telephone: "",
            website: "",
            contactName: "",
            contactEmail: "",
            contactCountry: {
                label: '',
                value: '',
                // label: countryLabel,
                // value: countryLabel.toLowerCase(),
            },
            contactPhone: "",
            contactCompany: "",
            agreedToTerms: true,
        };


        // Save to localStorage
        localStorage.setItem("gbr_form", JSON.stringify(formData));

        // Navigate to order report page
        router.push("/order-business-credit-report");
    };

    return (
        <button
            onClick={handlePurchaseReport}
            className={`z-${overlay} cursor-pointer flex items-center text-md md:text-md gap-2 bg-${bgColor}-500 px-4 py-2 rounded-lg hover:bg-${bgColor}-600 transition shadow-lg`}
        >
            {/* <FaLock /> */}
            {label}
        </button>
    );
};

export default ClientPurchaseButton;
