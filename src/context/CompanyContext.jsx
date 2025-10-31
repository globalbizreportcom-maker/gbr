'use client';

import { createContext, useContext, useState, useEffect } from "react";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([
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

    // Load from localStorage on first mount
    useEffect(() => {
        const storedData = localStorage.getItem("gbr_form");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);

                if (parsed?.companies && Array.isArray(parsed.companies) && parsed.companies.length > 0) {
                    setCompanies(parsed.companies.map(c => ({
                        companyName: c.companyName || "",
                        address: c.address || "",
                        city: c.city || "",
                        state: c.state || "",
                        country: c.country || "",
                        postalCode: c.postalCode || "",
                        telephone: c.telephone || "",
                        website: c.website || "",
                    })));
                } else if (parsed?.companyName) {
                    setCompanies([{
                        companyName: parsed.companyName || "",
                        address: parsed.address || "",
                        city: parsed.city || "",
                        state: parsed.state || "",
                        country: parsed.country || "",
                        postalCode: parsed.postalCode || "",
                        telephone: parsed.telephone || "",
                        website: parsed.website || "",
                    }]);
                }
            } catch (err) {
                console.log("Failed to parse localStorage companies", err);
            }
        }
    }, []);


    // Save to localStorage whenever companies change
    useEffect(() => {
        localStorage.setItem("gbr_form", JSON.stringify({ companies }));
    }, [companies]);

    return (
        <CompanyContext.Provider value={{ companies, setCompanies }}>
            {children}
        </CompanyContext.Provider>
    );
};

// Custom hook for easy usage
export const useCompany = () => useContext(CompanyContext);
