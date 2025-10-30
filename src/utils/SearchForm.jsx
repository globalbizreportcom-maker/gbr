'use client'

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { apiUrl } from "@/api/api";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CompanySearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resultsRef = useRef(null);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [company, setCompany] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const normalize = (str) => str?.toLowerCase().trim();

    // ------------------- Helper Functions -------------------
    const fetchCountries = async () => {
        try {
            const res = await fetch("https://countriesnow.space/api/v0.1/countries");
            const json = await res.json();
            const options = json.data.map(c => ({
                value: c.iso2.toLowerCase(),
                label: c.country
            }));
            setCountries(options);
        } catch (err) {
            console.error("Error fetching countries:", err);
        }
    };

    const fetchStates = async () => {
        if (normalize(selectedCountry?.value) !== "in") {
            setStates([]);
            setSelectedState(null);
            return;
        }
        try {
            const res = await fetch("https://countriesnow.space/api/v0.1/countries/states");
            const json = await res.json();
            const india = json.data.find(c => normalize(c.name) === "india");
            if (india?.states?.length) {
                const formattedStates = india.states.map(s => ({
                    value: s.name,
                    label: s.name
                }));
                setStates(formattedStates);
            }
        } catch (err) {
            console.error("Error fetching states:", err);
        }
    };

    const fetchCompanies = async (
        pageNumber = 1,
        companyVal = company,
        countryVal = selectedCountry?.label || "",
        stateVal = selectedState?.label || "",
        signal
    ) => {
        try {
            setLoading(true);
            const params = { company: companyVal, country: countryVal, state: stateVal || "", page: pageNumber, perPage: 20 };
            const res = await apiUrl.get(`/api/companies`, { params, signal });
            setResults(res.data.rows);
            setTotalPages(res.data.totalPages);
            setPage(res.data.page);
        } catch (err) {
            if (axios.isCancel(err)) return;
            console.error("Error fetching companies:", err);
        } finally {
            setLoading(false);
        }
    };

    // const handleSearch = (pageNumber = 1) => {
    //     if (selectedCountry?.label !== "India") {
    //         console.log("Navigating to order-business-credit-report...");
    //         router.push('/order-business-credit-report');
    //         return
    //     }


    //     const params = new URLSearchParams();
    //     if (company) params.set("company", company);
    //     if (selectedCountry) params.set("country", selectedCountry.label);
    //     if (selectedCountry?.label === "India" && selectedState) {
    //         params.set("state", selectedState.label);
    //     }
    //     params.set("page", pageNumber);

    //     router.push(`?${params.toString()}`);
    //     setPage(pageNumber); // triggers fetch

    //     fetchCompanies(pageNumber)
    // };


    const handleSearch = (pageNumber = 1) => {
        // ✅ Only redirect if a country is selected AND it is not India
        if (selectedCountry && selectedCountry.label !== "India") {
            console.log("Navigating to order-business-credit-report...");
            router.push('/order-business-credit-report');
            return;
        }

        // Prepare URL params
        const params = new URLSearchParams();
        if (company) params.set("company", company);
        if (selectedCountry) params.set("country", selectedCountry.label);
        if (selectedCountry?.label === "India" && selectedState) {
            params.set("state", selectedState.label);
        }
        params.set("page", pageNumber);

        // Update route and trigger fetch
        router.push(`?${params.toString()}`);
        setPage(pageNumber);
        fetchCompanies(pageNumber);
    };


    const handleClick = (company) => {
        const companyName = encodeURIComponent(company.CompanyName.replace(/\s+/g, "-"));
        const cin = encodeURIComponent(company.CIN);

        let country =
            company.CompanyIndian?.["Foreign Company"]?.toLowerCase() ||
            company["CompanyIndian/Foreign Company"]?.toLowerCase() ||
            "";
        country = encodeURIComponent(country.slice(0, -1));
        const stateCode = encodeURIComponent(
            (company.CompanyStateCode?.toLowerCase().replace(/\s+/g, "_")) || "na"
        );

        // const stateCode = encodeURIComponent(company.CompanyStateCode?.toLowerCase() || "na");
        router.push(`/${companyName}/${cin}/${country}/${stateCode}/company-business-financial-credit-report`);
    };

    // ------------------- useEffect Hooks in Correct Order -------------------

    // 1️⃣ Fetch countries once
    useEffect(() => {
        fetchCountries();
    }, []);

    // 2️⃣ Restore from URL after countries load
    useEffect(() => {
        if (initialized || !countries.length) return;

        const companyParam = searchParams.get("company") || "";
        const countryParam = searchParams.get("country") || "";
        const pageParam = parseInt(searchParams.get("page") || "1", 10);

        setCompany(companyParam);
        setPage(pageParam);

        if (countryParam) {
            const country = countries.find(c => normalize(c.label) === normalize(countryParam));
            if (country) setSelectedCountry(country);
        }

        setInitialized(true);
    }, [countries, searchParams]);

    // 3️⃣ Fetch states when country changes
    useEffect(() => {
        if (!selectedCountry) return;
        fetchStates();
    }, [selectedCountry]);

    // 4️⃣ Restore state selection after states load
    useEffect(() => {
        if (!selectedCountry || !states.length) return;

        const stateParam = searchParams.get("state") || "";
        if (normalize(selectedCountry.value) === "in" && stateParam) {
            const state = states.find(s => normalize(s.label) === normalize(stateParam));
            if (state) setSelectedState(state);
        }
    }, [selectedCountry, states, searchParams]);

    // 5️⃣ Fetch companies once after initialization or params change
    useEffect(() => {
        if (!initialized) return;
        const controller = new AbortController();
        fetchCompanies(page, company, selectedCountry?.label, selectedState?.label, controller.signal);
        return () => controller.abort();
    }, [initialized, company, selectedCountry, selectedState, page]);

    // ------------------- JSX -------------------
    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            {/* Header + Inputs */}
            <div className="flex flex-col items-center gap-6 p-8 mb-6 bg-gradient-to-br from-blue-100 via-white to-orange-100 rounded-xl">
                <div className="text-center">
                    <h2 className=" text-lg md:text-3xl font-bold mb-6 text-center max-w-2xl mx-auto text-black">
                        <span className="text-primary">Business Credit Reports</span> - Company Search
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Enter the company name and optionally select a country to narrow down your search.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="border p-2 flex-1 border-gray-300 text-black"
                    />

                    <div className="flex-1 min-w-[200px]">
                        <Select
                            options={countries}
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            placeholder="Select Country"
                            className="text-black"
                        />
                    </div>

                    {states.length > 0 && (
                        <div className="flex-1 min-w-[200px]">
                            <Select
                                options={states}
                                value={selectedState}
                                onChange={setSelectedState}
                                placeholder="Select State"
                                className="text-black"
                            />
                        </div>
                    )}

                    <button
                        onClick={() => handleSearch(1)}
                        className="btn btn-primary text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>

                <p className="text-sm text-orange-600 mb-6">
                    Tip: For faster search, select the state (e.g., Goa) and at least 3 letters of the company name or keyword.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center h-40">
                    <iframe
                        src="https://lottie.host/embed/e0b7e72c-fc33-47e7-9013-943f692f3d3d/2O62BcGfI4.lottie"
                        className="w-32 h-32"
                    ></iframe>
                </div>
            )}

            {!loading && results.length > 0 && (
                <>
                    <div className="flex flex-col lg:flex-row gap-6" ref={resultsRef}>

                        {/* Left: Table for md+ screens */}
                        <div className="w-full lg:w-4/4">
                            <div className="hidden md:block w-full">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">
                                                    Company Details
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">
                                                    Information
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-1/5">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {results.map((c, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 text-sm text-gray-800 align-top max-w-sm">
                                                        <div className="font-bold">{c.CompanyName}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 align-top">
                                                        <div className="break-words max-w-xs">
                                                            <span className="font-medium">Address:</span> {c.Registered_Office_Address}
                                                        </div>
                                                        <div className="mt-1">
                                                            <span className="font-medium">Status:</span> {c.CompanyStatus}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center align-middle">
                                                        <button
                                                            className="cursor-pointer flex items-center gap-1 py-2 rounded-md px-2 bg-indigo-500 text-white text-xs font-semibold hover:bg-black hover:shadow-md transition-all duration-300"
                                                            onClick={() => handleClick(c)}
                                                        >
                                                            View <FaArrowRight className="text-white" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Cards: sm screens */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden w-full">
                                {results.map((c, idx) => (
                                    <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <div className="font-bold text-gray-800">{c.CompanyName}</div>
                                        <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                                            Address: {c.Registered_Office_Address}
                                        </div>
                                        <div className="text-gray-700 text-sm mt-2 space-y-1">
                                            <div>
                                                <span className="font-medium">Status:</span> {c.CompanyStatus}
                                            </div>
                                        </div>
                                        <div className="flex flex-row w-full gap-2 mt-3 justify-end">
                                            <button
                                                className="cursor-pointer flex items-center gap-1 py-2 rounded-md px-2 bg-indigo-500 text-white text-xs font-semibold hover:bg-black hover:shadow-md transition-all duration-300"
                                                onClick={() => handleClick(c)}
                                            >
                                                View <FaArrowRight className="text-white" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Ads / Tips */}
                        {/* <div className="w-full lg:w-1/4 flex flex-col gap-4">
                            <div className="p-4 bg-gray-100  rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Ad / Promotion</h3>
                                <p className="text-sm text-gray-600">
                                    Promote your business here or display relevant content.
                                </p>
                            </div>

                            <div className="p-4 bg-gray-100 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Tip</h3>
                                <p className="text-sm text-gray-600">
                                    Search using company name or country to quickly find corporate records.
                                </p>
                            </div>
                        </div> */}
                    </div>

                    {/* Pagination */}
                    <div className="flex gap-2 mt-4 text-black items-center w-full  justify-center">
                        <button
                            onClick={() => page > 1 && handleSearch(page - 1)}
                            disabled={page === 1}
                            className="cursor-pointer px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="px-3 py-1">{page} / {totalPages}</span>
                        <button
                            onClick={() => page < totalPages && handleSearch(page + 1)}
                            disabled={page === totalPages}
                            className="cursor-pointer px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
