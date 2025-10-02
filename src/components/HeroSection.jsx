"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // Next.js 13 app dir

const Select = dynamic(() => import("react-select"), { ssr: false });

const HeroSection = () => {

    const router = useRouter();
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [menuPortalTarget, setMenuPortalTarget] = useState(null);
    const [error, setError] = useState(false); // selected state



    useEffect(() => {
        // Runs only on client, after component mounts
        setMenuPortalTarget(document.body);
    }, []);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://api.first.org/data/v1/countries");
                const json = await res.json();
                console.log(json);
                // json.data is an object keyed by 2-letter country codes
                const countryList = Object.entries(json.data).map(([code, info]) => ({
                    value: code,          // e.g. "US", "IN", etc
                    label: info.country,   // country name
                }));
                setCountries(countryList.sort((a, b) => a.label.localeCompare(b.label)));
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };

        fetchCountries();
    }, []);



    const handleSearch = () => {


        if (!countryCode && !companyName) {
            setError(true);
            return
        }

        if (countryCode && countryCode !== 'IN') {
            router.push('/order-business-credit-report');
            return;
        }

        const query = new URLSearchParams();
        if (countryCode) query.set("country", countryCode);
        if (companyName) query.set("company", companyName);

        router.push(`/search?${query.toString()}`);
    };


    return (
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 overflow-visible h-auto 2xl:h-150">
            {/* Background Image Layer */}
            <img
                src="https://img.freepik.com/free-photo/dusk-business-night-sea-architecture_1417-55.jpg"
                alt="Decorative"
                className="absolute top-0 left-0 w-screen h-[100%] object-cover opacity-15 pointer-events-none select-none z-0"
            />


            {/* Top Content */}
            <div className="w-full max-w-2xl mx-auto text-center mt-20 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
                    Order <span className="text-primary">Business Credit Report</span> for any Company Worldwide.
                </h1>

                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Verify your Business Partners, Vendors, Buyers, Suppliers and more with GBR Reports. Check details on company's reliability, credibility, financial data, credit rating & more.
                </p>
            </div>



            {/* Bottom: Search */}
            <div className="w-full max-w-4xl mx-auto mt-10 px-2 mb-20 relative z-10 overflow-visible">



                <div className="w-full mb-4 md:mb-0 md:flex md:gap-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // prevent page reload
                            handleSearch();
                        }}
                        className="w-full mb-4 md:mb-0 md:flex md:gap-4"
                    >
                        {/* State Selector */}
                        <div className="w-full md:w-48">
                            <Select
                                options={countries} // ✅ use country options
                                value={countries.find((opt) => opt.value === countryCode) || null}
                                onChange={(selected) => {
                                    setCountryCode(selected?.value || ""); // ✅ store selected country code
                                }}
                                placeholder="Select Country"
                                isClearable
                                className="w-full md:w-48 text-gray-800"
                                classNamePrefix="react-select"
                                menuPortalTarget={menuPortalTarget}
                                styles={{
                                    menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                                    control: (provided) => ({
                                        ...provided,
                                        borderRadius: "0.375rem",
                                        borderColor: "#d1d5db",
                                        padding: "0.2rem",
                                        minHeight: "2.5rem",
                                        boxShadow: "none",
                                        "&:hover": { borderColor: "#3b82f6" },
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        borderRadius: "0.375rem",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        overflow: "hidden",
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused ? "#f3f4f6" : "#ffffff",
                                        color: "#111827",
                                        cursor: "pointer",
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: "#6b7280",
                                    }),
                                }}
                            />
                        </div>


                        {/* Company Input */}
                        <input
                            type="text"
                            placeholder="Enter Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            // disabled={!countryCode}
                            className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 md:mt-0"
                        />

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            // disabled={!countryCode || !companyName}
                            className="cursor-pointer w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2  mt-4 md:mt-0"
                        >
                            Search
                        </button>
                    </form>

                </div>
                {error && (
                    <div className=" text-red-400 px-4 py-3 text-center w-full max-w-6xl rounded mb-4">
                        Kindly, fill either of the above fields to search!
                    </div>
                )}

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div
                        className="absolute left-0 right-0 z-[9999] bg-white border border-gray-300 rounded-md overflow-y-auto max-h-60 mt-2 shadow-lg"
                        style={{
                            width: "100%", // match parent width
                        }}
                    >
                        {suggestions.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setCompanyName(item.CompanyName || "");
                                    setSuggestions([]);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                            >
                                {item.CompanyName}
                            </div>
                        ))}
                    </div>
                )}


            </div>


        </div>
    );
};

export default HeroSection;
