'use client'

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaTrash } from "react-icons/fa";

export default function CompanyDirectory() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resultsRef = useRef(null);

    const [company, setCompany] = useState("");
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // ----------------- Fetch Companies -----------------
    const fetchCompanies = async (pageNumber = 1, companyVal = company, appliedFilters = filters, signal) => {
        try {
            setLoading(true);
            const params = {
                company: companyVal,
                page: pageNumber,
                perPage: 20,
                ...appliedFilters
            };
            const res = await axios.get("https://backend.globalbizreport.com/api/companies-directory", { params, signal });
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

    // ----------------- Handle Search -----------------
    const handleSearch = (pageNumber = 1) => {
        const params = new URLSearchParams({ ...filters });
        if (company) params.set("company", company);
        params.set("page", pageNumber);
        router.push(`?${params.toString()}`);
        fetchCompanies(pageNumber, company, filters);
    };

    // ----------------- Handle Filter -----------------
    const handleFilterClick = (filterType, value) => {
        const newFilters = { ...filters };
        if (filters[filterType] === value) {
            delete newFilters[filterType]; // toggle off
        } else {
            newFilters[filterType] = value; // toggle on
        }
        setFilters(newFilters);

        const params = new URLSearchParams({ ...newFilters });
        if (company) params.set("company", company);
        params.set("page", 1);
        router.push(`?${params.toString()}`);

        fetchCompanies(1, company, newFilters);
    };

    // ----------------- Clear All Filters -----------------
    const clearAllFilters = () => {
        setFilters({});
        setCompany("");
        router.push(`?page=1`);
        fetchCompanies(1, "", {});
    };

    // ----------------- Restore from URL -----------------
    useEffect(() => {
        if (initialized) return;

        const companyParam = searchParams.get("company") || "";
        const pageParam = parseInt(searchParams.get("page") || "1", 10);

        const restoredFilters = {};
        ["alphabet", "state", "industry", "companyType", "status"].forEach(f => {
            const val = searchParams.get(f);
            if (val) restoredFilters[f] = val;
        });

        setCompany(companyParam);
        setFilters(restoredFilters);
        setPage(pageParam);
        setInitialized(true);
    }, [searchParams]);

    // ----------------- Fetch on page / filter change -----------------
    useEffect(() => {
        if (!initialized) return;
        const controller = new AbortController();
        fetchCompanies(page, company, filters, controller.signal);
        return () => controller.abort();
    }, [initialized, company, page, filters]);

    // ----------------- Optional: handle row click -----------------
    const handleClick = (company) => {
        console.log("Clicked company:", company);
        // You can navigate to a details page if needed
    };

    // ------------------- JSX -------------------
    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            {/* Header + Search */}
            <div className="flex flex-col items-center gap-6 p-8 mb-6 bg-gradient-to-br from-blue-100 via-white to-orange-100 rounded-xl">
                <div className="text-center">
                    <h2 className="text-md font-bold mb-2 text-center max-w-2xl mx-auto text-black">
                        <span className="text-primary">Browse the list of all Indian companies - <span className="text-black">Companies Incorporated in India
                        </span>
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Browse Companies by Location & Activity

                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4 w-full max-w-3xl">
                    <input
                        type="text"
                        placeholder="Search company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="border rounded-md p-2 flex-1 border-gray-300 text-black"
                    />
                    <button
                        onClick={() => handleSearch(1)}
                        className="btn btn-primary text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Loading */}
            {
                loading && (
                    <div className="flex justify-center items-center h-40">
                        <iframe
                            src="https://lottie.host/embed/e0b7e72c-fc33-47e7-9013-943f692f3d3d/2O62BcGfI4.lottie"
                            className="w-32 h-32"
                        ></iframe>
                    </div>
                )
            }

            {/* Results Table */}
            {
                !loading && results.length > 0 && (
                    <>
                        <div className="flex flex-col gap-6" ref={resultsRef}>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">
                                                Company Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">
                                                CIN
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">
                                                Address
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {results.map((c, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3 text-sm text-gray-800 align-top w-2/5">
                                                    <div className="text-blue-700 font-semibold cursor-pointer" onClick={() => handleClick(c)}>
                                                        {c.CompanyName}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 align-top w-1/5">
                                                    <div className="text-blue-700 cursor-pointer" onClick={() => handleClick(c)}>
                                                        {c.CIN}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 align-top w-1/5">
                                                    <div className="font-medium">{c.CompanyStatus}</div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 w-2/5">
                                                    {c.Registered_Office_Address}
                                                </td>
                                                <td className="px-4 py-3 text-center align-middle w-1/5">
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

                        {/* Pagination */}
                        <div className="flex flex-wrap justify-center items-center gap-2 mt-6 py-6">
                            {/* First page */}
                            <button
                                onClick={() => handleSearch(1)}
                                disabled={page === 1}
                                className="btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <FaAngleDoubleLeft />
                            </button>

                            {/* Skip 20 pages backward */}
                            <button
                                onClick={() => handleSearch(Math.max(1, page - 20))}
                                disabled={page === 1}
                                className="btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <FaAngleLeft />
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .slice(Math.floor((page - 1) / 20) * 20, Math.floor((page - 1) / 20) * 20 + 20)
                                .map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => handleSearch(p)}
                                        className={`cursor-pointer px-3 py-1 rounded-md border transition
          ${p === page
                                                ? "bg-indigo-500 text-white border-indigo-500"
                                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}

                            {/* Skip 20 pages forward */}
                            <button
                                onClick={() => handleSearch(Math.min(totalPages, page + 20))}
                                disabled={page === totalPages}
                                className="btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <FaAngleRight />
                            </button>

                            {/* Last page */}
                            <button
                                onClick={() => handleSearch(totalPages)}
                                disabled={page === totalPages}
                                className="btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <FaAngleDoubleRight />
                            </button>
                        </div>

                    </>
                )
            }


            {/* Filter Section (Static) */}
            <div className="bg-gray-50 p-6 rounded-xl mt-6 shadow-sm">
                <h3 className="font-semibold text-xl text-gray-900 mb-4">Filter Companies By:</h3>

                {/* Selected Filters + Clear All */}
                {Object.keys(filters).length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {Object.entries(filters).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center gap-1 bg-indigo-50 text-indigo-900 px-3 py-1 rounded-sm text-sm "
                            >
                                <span className="whitespace-nowrap">{`
                                ${key.charAt(0).toUpperCase()
                                    + key.slice(1)}:
                                 ${value}
                                 `}</span>
                                <button
                                    onClick={() => handleFilterClick(key, value)}
                                    className="text-indigo-600 hover:text-indigo-800 ml-1"
                                >
                                    <FaTrash className="w-3 h-3 cursor-pointer" />
                                </button>
                            </div>
                        ))}

                        {/* Clear All Filters */}
                        <button
                            onClick={clearAllFilters}
                            className="btn text-xs btn-xs border-none  ml-2 shadow-none bg-red-100 text-red-700 rounded-sm hover:bg-red-200 transition  hover:shadow-md flex items-center gap-1"
                        >
                            <FaTrash className="w-3 h-3" /> Clear Filters
                        </button>
                    </div>
                )}


                <div className="py-8">
                    <h4 className="font-medium text-gray-800 mb-2">Search by Alphabet</h4>

                    <div className="flex overflow-x-auto gap-2 py-2">
                        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                            <button
                                key={letter}
                                className="px-3 py-1 rounded-md text-sm border border-gray-300 font-medium text-primary hover:text-indigo-800 hover:bg-gray-100 transition cursor-pointer"
                                onClick={() => handleFilterClick("alphabet", letter)}
                            >
                                {letter}
                            </button>
                        ))}

                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* States */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">State</h4>
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {[
                                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                                "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                                "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                                "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                                "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                                "Uttar Pradesh", "Uttarakhand", "West Bengal",
                                "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman & Diu",
                                "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
                            ].map((state) => (
                                <button
                                    key={state}
                                    onClick={() => handleFilterClick("state", state)}
                                    className="px-3 py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                >
                                    {state}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Industry Types */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Industry Type</h4>
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {[
                                "Agriculture and Allied Activities",
                                "Business Services",
                                "Community, personal and Social Services",
                                "Construction",
                                "Electricity, Gas and Water companies",
                                "Finance",
                                "Insurance",
                                "Manufacturing (Food stuffs)",
                                "Manufacturing (Leather and products thereof)",
                                "Manufacturing (Machinery and Equipments)",
                                "Manufacturing (Metals and Chemicals, and products thereof)",
                                "Manufacturing (Others)",
                                "Manufacturing (Paper and Paper products, Publishing, printing and reproduction of recorded media)",
                                "Manufacturing (Textiles)",
                                "Manufacturing (Wood Products)",
                                "Mining and Quarrying",
                                "Others",
                                "Real Estate and Renting",
                                "Trading",
                                "Transport, storage and Communications"
                            ].map((industry) => (
                                <button
                                    key={industry}
                                    className="px-3 py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                    onClick={() => handleFilterClick("industry", industry)}
                                >
                                    {industry}
                                </button>

                            ))}
                        </div>
                    </div>


                    {/* Company Types */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Company Type</h4>
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {["Company limited by guarantee", "Company limited by shares", "Unlimited company"
                            ].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleFilterClick("companyType", type)}
                                    className="px-3 py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">Status</h4>
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {[
                                "Active",
                                "Amalgamated",
                                "Converted to LLP",
                                "Dissolved",
                                "Dissolved (Liquidated)",
                                "Dissolved under section 54",
                                "Dissolved under section 59(8)",
                                "Dormant under section 455",
                                "Inactive",
                                "Inactive for e-filing",
                                "Not available for efiling",
                                "Strike Off",
                                "Strike Off-AwaitingPublication",
                                "Unclassified",
                                "Under CIRP",
                                "Under Liquidation",
                                "Under process of striking off",
                                "Vanished"
                            ].map((status) => (
                                <button
                                    key={status}
                                    className="px-3 py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                    onClick={() => handleFilterClick("status", status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>




        </div >
    );
}
