'use client'

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaTrash, FaSearch, FaChevronUp, FaChevronDown, FaRedo } from "react-icons/fa";
import { apiUrl } from "@/api/api";
import Link from 'next/link';

const CompanyDirectory = () => {
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
    const [firstLoad, setFirstLoad] = useState(true);

    const fetchCompanies = async (
        pageNumber = 1,
        companyVal = company,
        appliedFilters = filters,
        signal
    ) => {
        try {
            setLoading(true);

            const params = {
                company: companyVal || undefined,
                page: pageNumber,
                ...appliedFilters
            };

            const res = await apiUrl.get("/user/companies-dir", { params, signal });
            const data = res.data || {};

            const rows = Array.isArray(data.rows) ? data.rows : [];
            const totalPages = Number(data.totalPages || Math.ceil((data.totalResults || rows.length) / 20)) || 1;
            const currentPage = Number(data.page || pageNumber) || 1;

            setResults(rows);
            setTotalPages(totalPages);
            setPage(currentPage);
            setLoading(false);

            resultsRef.current?.scrollIntoView({ behavior: "smooth" });

        } catch (err) {
            if (axios.isCancel(err)) return;
            setResults([]);
            setTotalPages(1);
            setPage(1);
        } finally {
            setLoading(false);
            setFirstLoad(false);
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
            delete newFilters[filterType];
        } else {
            newFilters[filterType] = value;
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
    }, []);

    // ----------------- Fetch on page / filter change -----------------
    useEffect(() => {
        if (!initialized) return;
        const controller = new AbortController();
        fetchCompanies(page, company, filters, controller.signal);
        return () => controller.abort();
    }, [initialized, company, page, filters]);

    // Clean function to guarantee perfect Google indexing
    function cleanUrlSegment(text) {
        if (!text) return "na";
        return text
            .toString()
            .replace(/\s+/g, "-")           // Spaces to hyphens
            .replace(/&/g, "AND")           // Convert raw '&' cleanly to 'AND'
            .replace(/[^a-zA-Z0-9\-]/g, "") // Strip brackets, dots, etc.
            .toLowerCase();                 // Force lowercase
    }

    // Dynamic path generation helper for clean SEO URLs
    const getCompanyPath = (c) => {
        const companyname = cleanUrlSegment(c.companyname);
        const cin = c.cin || "na";
        const country = cleanUrlSegment(c.CompanyIndian?.["Foreign Company"] || c["CompanyIndian/Foreign Company"] || 'india');
        const stateCode = cleanUrlSegment(c.companystatecode);

        return `/${companyname}/${cin}/${country}/${stateCode}/company-business-financial-credit-report`;
    };

    const [openSection, setOpenSection] = useState(null);
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman & Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];

    const industries = [
        "Agriculture and Allied Activities", "Business Services",
        "Community, personal and Social Services", "Construction",
        "Electricity, Gas and Water companies", "Finance", "Insurance",
        "Manufacturing (Food stuffs)", "Manufacturing (Leather and products thereof)",
        "Manufacturing (Machinery and Equipments)",
        "Manufacturing (Metals and Chemicals, and products thereof)",
        "Manufacturing (Others)",
        "Manufacturing (Paper and Paper products, Publishing, printing and reproduction of recorded media)",
        "Manufacturing (Textiles)", "Manufacturing (Wood Products)",
        "Mining and Quarrying", "Others", "Real Estate and Renting",
        "Trading", "Transport, storage and Communications"
    ];

    const companyTypes = ["One Person Company", "Private", "Public"];

    const statuses = [
        "Active", "Amalgamated", "Converted to LLP", "Dissolved",
        "Dissolved (Liquidated)", "Dissolved under section 54",
        "Dissolved under section 59(8)", "Dormant under section 455",
        "Inactive", "Inactive for e-filing", "Not available for efiling",
        "Strike Off", "Strike Off-AwaitingPublication", "Unclassified",
        "Under CIRP", "Under Liquidation", "Under process of striking off", "Vanished"
    ];

    const getVisiblePages = (count) => {
        const currentChunk = Math.floor((page - 1) / count);
        const start = currentChunk * count;
        return Array.from(
            { length: Math.min(count, totalPages - start) },
            (_, i) => start + i + 1
        );
    };

    const renderPagination = (visibleCount, extraClasses = "") => {
        // Helper function to build the valid target query strings dynamically
        const createPageUrl = (pageNumber) => {
            const params = new URLSearchParams({ ...filters });
            if (company) params.set("company", company);
            params.set("page", pageNumber.toString());
            return `?${params.toString()}`;
        };

        return (
            <div className={`flex flex-wrap justify-center items-center gap-2 ${extraClasses}`}>

                {/* 1. First Page Link */}
                <Link
                    href={createPageUrl(1)}
                    aria-disabled={page === 1}
                    tabIndex={page === 1 ? -1 : 0}
                    className={`btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition flex items-center justify-center px-2 py-1.5
                    ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={(e) => {
                        if (page === 1) return e.preventDefault();
                        e.preventDefault();
                        handleSearch(1);
                    }}
                >
                    <FaAngleDoubleLeft />
                </Link>

                {/* 2. Step Backward Link */}
                <Link
                    href={createPageUrl(Math.max(1, page - visibleCount))}
                    aria-disabled={page === 1}
                    tabIndex={page === 1 ? -1 : 0}
                    className={`btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition flex items-center justify-center px-2 py-1.5
                    ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={(e) => {
                        if (page === 1) return e.preventDefault();
                        e.preventDefault();
                        handleSearch(Math.max(1, page - visibleCount));
                    }}
                >
                    <FaAngleLeft />
                </Link>

                {/* 3. Numerical Chunk Page Links */}
                {getVisiblePages(visibleCount).map((p) => (
                    <Link
                        key={p}
                        href={createPageUrl(p)}
                        className={`cursor-pointer px-3 py-1 rounded-md border transition text-sm font-medium block
                        ${p === page
                                ? "bg-indigo-500 text-white border-indigo-500 pointer-events-none"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSearch(p);
                        }}
                    >
                        {p}
                    </Link>
                ))}

                {/* 4. Step Forward Link */}
                <Link
                    href={createPageUrl(Math.min(totalPages, page + visibleCount))}
                    aria-disabled={page === totalPages}
                    tabIndex={page === totalPages ? -1 : 0}
                    className={`btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition flex items-center justify-center px-2 py-1.5
                    ${page === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={(e) => {
                        if (page === totalPages) return e.preventDefault();
                        e.preventDefault();
                        handleSearch(Math.min(totalPages, page + visibleCount));
                    }}
                >
                    <FaAngleRight />
                </Link>

                {/* 5. Last Page Link */}
                <Link
                    href={createPageUrl(totalPages)}
                    aria-disabled={page === totalPages}
                    tabIndex={page === totalPages ? -1 : 0}
                    className={`btn shadow-none btn-sm rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition flex items-center justify-center px-2 py-1.5
                    ${page === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={(e) => {
                        if (page === totalPages) return e.preventDefault();
                        e.preventDefault();
                        handleSearch(totalPages);
                    }}
                >
                    <FaAngleDoubleRight />
                </Link>

                {/* Metadata Text Context Area */}
                <div className="flex justify-center md:justify-between items-center text-sm text-gray-600 w-full mt-4 flex-wrap gap-2 py-6">
                    {(() => {
                        const limit = 20;
                        const totalResults = totalPages * limit;
                        const start = (page - 1) * limit + 1;
                        const end = Math.min(page * limit, totalResults);

                        return (
                            <>
                                <p className="text-center">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-900">
                                        {start}–{end}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-900">
                                        {totalResults.toLocaleString()}
                                    </span>{" "}
                                    results
                                </p>
                                <span className="flex md:hidden"> |</span>

                                <p className="text-xs text-gray-500">
                                    Page{" "}
                                    <span className="font-semibold text-gray-700">{page}</span> of{" "}
                                    <span className="font-semibold text-gray-700">{totalPages}</span>
                                </p>
                            </>
                        );
                    })()}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            {/* Header + Search */}
            <div className="flex flex-col items-center gap-6 p-8 mb-6 bg-gradient-to-br from-blue-100 via-white to-orange-100 rounded-xl">
                <div className="text-center">
                    <h1 className="text-md md:text-lg font-bold mb-2 text-center max-w-2xl mx-auto text-black">
                        <span className="text-primary">Browse the list of all Indian companies - <span className="text-black">Companies Incorporated in India</span></span>
                    </h1>
                    <p className="text-sm text-gray-500 mb-1">
                        Browse Companies by Location & Activity
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
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

                <div className="py-2 w-full max-w-3xl">
                    <h2 className="font-medium text-md text-gray-800">Search by Alphabet</h2>
                    <div className="flex overflow-x-auto gap-2 py-2">
                        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => {

                            // 1. Build out the path query parameters so the browser & Google can see them
                            const params = new URLSearchParams({ ...filters });
                            if (company) params.set("company", company);

                            if (filters["alphabet"] === letter) {
                                params.delete("alphabet"); // Simulate toggle off scenario
                            } else {
                                params.set("alphabet", letter); // Simulate toggle on scenario
                            }
                            params.set("page", "1"); // Always drop back to first page chunk on structural filters

                            const targetUrl = `?${params.toString()}`;

                            return (
                                <Link
                                    key={letter}
                                    href={targetUrl}
                                    className={`px-3 py-1 rounded-md text-sm border border-gray-300 font-medium transition cursor-pointer block whitespace-nowrap
                        ${filters["alphabet"] === letter
                                            ? "bg-indigo-500 text-white border-indigo-500 hover:text-white"
                                            : "text-primary hover:text-indigo-800 hover:bg-gray-100"
                                        }`}
                                    onClick={(e) => {
                                        // 2. Stop default Link routing so your state handler takes full control
                                        e.preventDefault();
                                        handleFilterClick("alphabet", letter);
                                    }}
                                >
                                    {letter}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

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
                        {/* desktop view */}
                        <div className="hidden md:flex flex-col gap-6" ref={resultsRef}>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">Company Name</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">Address</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/5">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {results.map((c, idx) => {
                                            const path = getCompanyPath(c);
                                            return (
                                                <tr key={idx} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 text-sm text-gray-800 align-top w-2/5">
                                                        {/* ✅ Refactored to semantic Next.js Link */}
                                                        <Link
                                                            href={path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-700 font-semibold hover:underline block"
                                                            onClick={() => console.log(c)}
                                                        >
                                                            {c.companyname}
                                                        </Link>
                                                        <div className="text-gray-500 mt-1">
                                                            CIN: {c.cin}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 align-top w-1/5">
                                                        <div className="font-medium">{c.companystatus}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 w-2/5">
                                                        {c.registered_office_address}
                                                    </td>
                                                    <td className="px-4 py-3 text-center align-middle w-1/5">
                                                        {/* ✅ Refactored to HTML-valid Anchor wrapped button styling */}
                                                        <Link
                                                            href={path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 py-2 rounded-md px-2 bg-indigo-500 text-white text-xs font-semibold hover:bg-black hover:shadow-md transition-all duration-300"
                                                            onClick={() => console.log(c)}
                                                        >
                                                            View <FaArrowRight className="text-white" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* mobile view */}
                        <div className="flex flex-col gap-4 md:hidden mt-2" ref={resultsRef}>
                            {results.map((c, idx) => {
                                const path = getCompanyPath(c);
                                return (
                                    <div
                                        key={idx}
                                        className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 hover:bg-gray-50 transition"
                                    >
                                        <div>
                                            {/* ✅ Refactored Mobile Title Link */}
                                            <Link
                                                href={path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-700 font-semibold text-base hover:underline block"
                                                onClick={() => console.log(c)}
                                            >
                                                {c.companyname}
                                            </Link>
                                        </div>

                                        <div
                                            className={`text-xs font-semibold px-3 py-1 rounded-full w-fit self-end sm:self-auto
                                            ${c.companystatus?.toLowerCase() === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'}
                                        `}
                                        >
                                            {c.companystatus}
                                        </div>

                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold text-gray-800">CIN:</span> {c.cin}
                                        </p>

                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold text-gray-800">Address:</span> {c.registered_office_address}
                                        </p>

                                        <div className="flex justify-end mt-2">
                                            {/* ✅ Refactored Mobile Action Button Link */}
                                            <Link
                                                href={path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 py-1.5 px-3 bg-indigo-500 text-white text-xs font-semibold rounded-md hover:bg-black hover:shadow-md transition-all"
                                                onClick={() => console.log(c)}
                                            >
                                                View <FaArrowRight className="text-white text-xs" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 py-6">
                            <div className="block sm:hidden">{renderPagination(5)}</div>
                            <div className="hidden sm:block">{renderPagination(20)}</div>
                        </div>
                    </>
                )
            }

            {/* No Results Fallback */}
            {
                !loading && !firstLoad && results.length < 1 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <FaSearch className="text-4xl mb-3 text-gray-300" />
                        <p className="text-lg text-gray-400 font-medium mb-6">
                            No results found for this search!
                        </p>
                        <button
                            onClick={() => window.location.href = '/company-directory/india'}
                            className="flex btn btn-outline shadow-none items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                            <FaRedo className="text-sm" />
                            Try Again
                        </button>
                    </div>
                )
            }

            {/* Filter Section (Static) */}
            <div className="bg-gray-50 p-6 rounded-xl mb-15 ">
                <div className="py-8">
                    <h2 className="font-medium text-xl text-gray-800 mb-2">Search by Alphabet</h2>
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

                <h3 className="font-semibold text-xl text-gray-900 mb-4">Filter Companies By:</h3>

                {Object.keys(filters).length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {Object.entries(filters).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center gap-1 bg-indigo-50 text-indigo-900 px-3 py-1 rounded-sm text-sm "
                            >
                                <span className="whitespace-nowrap">
                                    {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                                </span>
                                <button
                                    onClick={() => handleFilterClick(key, value)}
                                    className="text-indigo-600 hover:text-indigo-800 ml-1"
                                >
                                    <FaTrash className="w-3 h-3 cursor-pointer" />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={clearAllFilters}
                            className="btn text-xs btn-xs border-none ml-2 shadow-none bg-red-100 text-red-700 rounded-sm hover:bg-red-200 transition hover:shadow-md flex items-center gap-1"
                        >
                            <FaTrash className="w-3 h-3" /> Clear Filters
                        </button>
                    </div>
                )}

                <div>
                    {/* Desktop Grid */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-800 mb-3">State</h4>
                            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                {states.map((state) => (
                                    <button
                                        key={state}
                                        onClick={() => handleFilterClick("state", state)}
                                        className="py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                    >
                                        {state}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-800 mb-3">Industry Type</h4>
                            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                {industries.map((industry) => (
                                    <button
                                        key={industry}
                                        onClick={() => handleFilterClick("industry", industry)}
                                        className=" py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                    >
                                        {industry}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-800 mb-3">Company Type</h4>
                            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                {companyTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleFilterClick("companyType", type)}
                                        className=" py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-800 mb-3">Status</h4>
                            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleFilterClick("status", status)}
                                        className=" py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Accordion */}
                    <div className="block md:hidden">
                        {[
                            { title: "State", items: states, key: "state" },
                            { title: "Industry Type", items: industries, key: "industry" },
                            { title: "Company Type", items: companyTypes, key: "companyType" },
                            { title: "Status", items: statuses, key: "status" },
                        ].map((section) => (
                            <div key={section.key} className="border-b border-gray-200">
                                <button
                                    className="w-full flex justify-between items-center py-3 text-gray-800 font-medium text-base"
                                    onClick={() => toggleSection(section.key)}
                                >
                                    {section.title}
                                    {openSection === section.key ? (
                                        <FaChevronUp className="text-gray-600" />
                                    ) : (
                                        <FaChevronDown className="text-gray-600" />
                                    )}
                                </button>

                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openSection === section.key ? "max-h-64" : "max-h-0"}`}
                                >
                                    <div className="flex flex-col gap-2 mt-1 pb-2 overflow-y-auto max-h-52">
                                        {section.items.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleFilterClick(section.key, item)}
                                                className="px-3 py-1 rounded text-sm text-black hover:text-indigo-600 hover:bg-gray-100 transition cursor-pointer text-left"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CompanyDirectory;