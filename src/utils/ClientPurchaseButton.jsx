// src/app/(site)/[companyName]/[cin]/[country]/[state]/ClientPurchaseButton.jsx
"use client";

import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

const ClientPurchaseButton = ({ companyData }) => {
    const router = useRouter();

    const handlePurchaseReport = () => {
        if (!companyData) return;

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

        const stateLabel = addressParts[addressParts.length - 3] || "";
        const cityLabel = addressParts[addressParts.length - 4] || "";

        const formData = {
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
                label: countryLabel,
                value: countryLabel.toLowerCase(),
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
        <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-between items-center shadow-lg z-50">
            <div>
                <p className="font-medium">
                    Order Freshly Investigated Business Credit Report
                </p>
            </div>
            <button
                onClick={handlePurchaseReport}
                className="cursor-pointer flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
                <FaLock />
                Purchase
            </button>
        </div>
    );
};

export default ClientPurchaseButton;
