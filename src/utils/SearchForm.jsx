'use client'

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { apiUrl } from "@/api/api";
import { Country, State, City } from 'country-state-city';
import ClientPurchaseButton from "./ClientPurchaseButton";
import { FaBuilding, FaGlobe, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";


const Select = dynamic(() => import("react-select"), { ssr: false });


const STATES = [
    "andaman and nicobar islands",
    "andhra pradesh",
    "arunachal pradesh",
    "assam",
    "bihar",
    "chandigarh",
    "dadra & nagar haveli",
    "daman and diu",
    "delhi",
    "goa",
    "gujarat",
    "haryana",
    "himachal pradesh",
    "jammu & kashmir",
    "jharkhand",
    "karnataka",
    "kerala",
    "ladakh",
    "lakshadweep",
    "madhya pradesh",
    "maharashtra",
    "manipur",
    "meghalaya",
    "mizoram",
    "nagaland",
    "orissa",
    "pondicherry",
    "punjab",
    "rajasthan",
    "sikkim",
    "tamil nadu",
    "telangana",
    "tripura",
    "uttar pradesh",
    "uttarakhand",
    "west bengal"
];



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
            const countryOptions = Country.getAllCountries().map((c) => ({
                value: c.isoCode,
                label: c.name,
                countryObj: c,
            }));

            setCountries(countryOptions);


        } catch (err) {
            console.error("Error fetching countries:", err);
        }
    };

    const fetchStates = () => {
        if (normalize(selectedCountry?.value) !== "in") {
            setStates([]);
            setSelectedState(null);
            return;
        }

        // Get states of India using CSC
        const indiaStates = State.getStatesOfCountry("IN");

        if (indiaStates?.length) {
            const formattedStates = indiaStates.map(s => ({
                value: s.name,
                label: s.name
            }));
            setStates(formattedStates);
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
            const res = await apiUrl.get(`/search-companies`, { params, signal });
            setResults(res.data.rows);
            setTotalPages(res.data.totalPages);
            setPage(res.data.page);
            setLoading(false);
        } catch (err) {
            if (axios.isCancel(err)) return;
            console.log("Error fetching companies:", err);
        } finally {
            setLoading(false);
        }
    };


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

        const companyname = encodeURIComponent(company.companyname.replace(/\s+/g, "-"));
        const cin = encodeURIComponent(company.cin);
        const country = encodeURIComponent(
            ((company["CompanyIndian/Foreign Company"] || "india")
                // .toLowerCase().slice(0, -1)
            )
        );
        const stateCode = encodeURIComponent(
            (company.CompanyStateCode?.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()) || "na"
        );

        // ✅ Open in new tab
        const url = `http://localhost:3000/${companyname}/${cin}/${country}/${stateCode}/company-business-financial-credit-report`;
        window.open(url, "_blank"); // _blank opens in a new tab
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
    }, [initialized, page]);

    // }, [initialized, company, selectedCountry, selectedState, page]);


    // ------------------- JSX -------------------
    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            {/* Header + Inputs */}
            <div className="flex flex-col items-center gap-6 p-8 mb-6 bg-gradient-to-br from-blue-100 via-white to-orange-100 rounded-xl">
                <div className="text-center">
                    <h2 className=" text-md md:text-3xl font-bold mb-2 text-center max-w-2xl mx-auto text-black">
                        <span className="text-primary">Business Credit Reports</span> - Company Search
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mb-2">
                        Enter the company name and optionally select a country to narrow down your search.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
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

                    {selectedCountry?.value === 'IN' && (
                        <div className="flex-1 min-w-[200px]">
                            <Select
                                options={STATES.map((s) => ({
                                    value: s,
                                    label: s.replace(/\b\w/g, (c) => c.toUpperCase())
                                }))}
                                value={selectedState}
                                onChange={(selected) => setSelectedState(selected)} placeholder="Select State"
                                className="text-black"
                            />
                        </div>
                    )}

                    <button
                        onClick={() => {
                            handleSearch(1);
                        }}
                        className="btn btn-primary text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>

                <p className="text-xs text-orange-600 mb-1">
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

            {!loading && results.length > 0 &&

                <>

                    {/* Pagination */}
                    <div className="flex gap-2 mt-4 text-black items-center w-full  justify-end">
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

                    <div className="flex flex-col lg:flex-row gap-6" ref={resultsRef}>

                        {/* // Left: Table for md+ screens  */}
                        <div className="w-full lg:w-4/4 mx-auto">
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
                                                        <div className="font-bold">{c.companyname}</div>
                                                        <div className="font-medium text-gray-500">{c.cin}</div>

                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 align-top">
                                                        <div className="break-words max-w-xs capitalize">
                                                            <span className="font-medium " >State:</span> {c.companystatecode}
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-2">
                                                            <span className="font-medium">Status:</span>

                                                            <span
                                                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        ${c.companystatus?.toLowerCase() === "active"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-red-100 text-red-600"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`w-2 h-2 rounded-full
            ${c.companystatus?.toLowerCase() === "active"
                                                                            ? "bg-green-500"
                                                                            : "bg-red-500"
                                                                        }`}
                                                                ></span>

                                                                {c.companystatus}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center align-middle">

                                                        <div className="flex flex-col items-center gap-2">

                                                            {/* View Button */}
                                                            <button
                                                                className="cursor-pointer border w-fit flex items-center gap-1 py-2 rounded-md px-2 text-indigo-500 text-xs font-semibold  hover:border-1  transition-all duration-300 justify-between"
                                                                onClick={() => handleClick(c)}
                                                            >
                                                                View Details<FaArrowRight className="text-indigo-500" />
                                                            </button>

                                                            {/* New Button */}
                                                            <ClientPurchaseButton companyData={c} label='Buy Report' bgColor='indigo' />


                                                        </div>

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
                                    <div key={idx} className="p-4 bg-gray-100  rounded-lg ">
                                        <div className="font-bold text-gray-800">{c.companyname}</div>
                                        <div className="text-gray-600 text-sm mt-1 line-clamp-2 capitalize">
                                            State: {c.companystatecode}
                                        </div>
                                        <div className="text-gray-700 text-sm mt-2 space-y-1">
                                            <div>
                                                <span className="font-medium">Status:</span> {c.companystatus}
                                            </div>
                                        </div>
                                        <div className="flex flex-row w-full gap-2 mt-3 justify-end">
                                            <button
                                                className="cursor-pointer flex items-center gap-1 py-2 rounded-md px-2 bg-indigo-500 text-white text-xs font-semibold hover:bg-black hover:shadow-md transition-all duration-300"
                                                onClick={() => handleClick(c)}
                                            >
                                                View Details <FaArrowRight className="text-white" />
                                            </button>
                                            <ClientPurchaseButton companyData={c} label='Buy Report' bgColor='orange' btnSize='xs' />

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

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
            }

            {!loading && results && results.length < 1 &&


                <div className="max-w-lg mx-auto p-6   rounded-lg min-h-[50vh]">
                    <div className="flex items-center justify-start mb-4">
                        <FaExclamationTriangle className="text-gray-300 h-6 w-6 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-500">No Company Found</h2>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 text-start">
                        We couldn’t find any company matching your search criteria:
                    </p>

                    <div className="space-y-3 bg-white p-4 rounded-md ">
                        <div className="flex items-center gap-2">
                            <FaBuilding className="text-gray-400" />
                            <span className="font-medium text-gray-700">Company:</span>
                            <span className="text-gray-600">{company || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaGlobe className="text-gray-400" />
                            <span className="font-medium text-gray-700">Country:</span>
                            <span className="text-gray-600">{selectedCountry?.label || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <span className="font-medium text-gray-700">State:</span>
                            <span className="text-gray-600">{selectedState?.label || "—"}</span>
                        </div>
                    </div>

                    <p className="text-gray-400 mt-4 text-sm text-center">
                        Try adjusting your search or use different parameters to find the company.
                    </p>
                </div>
            }


        </div>
    );
}
