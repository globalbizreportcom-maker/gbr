"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaArrowRight, FaLock } from "react-icons/fa";
import LoginModalButton from "./LoginModalButton";

const Select = dynamic(() => import("react-select"), { ssr: false });

const API_BASE =
    "https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a";
const API_KEY = "579b464db66ec23bdd000001fb32a8e4a50f47956e1cb75ccdabfa2e";
const PER_PAGE = 10;

export default function SearchForm({ initialCountry = "", initialCompany = "" }) {
    const router = useRouter();
    const [countryCode, setcountryCode] = useState(initialCountry);
    const [companyQuery, setCompanyQuery] = useState(initialCompany);

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // track if API has more data
    const [offset, setOffset] = useState(0);  // track API offset

    const normalize = (str) => str?.trim().toLowerCase();

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://api.first.org/data/v1/countries");
                const json = await res.json();

                const countryList = Object.entries(json.data).map(([code, info]) => ({
                    value: code.toLowerCase(),
                    label: info.country,
                }));

                setCountries(countryList.sort((a, b) => a.label.localeCompare(b.label)));
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };

        fetchCountries();
    }, []);


    useEffect(() => {
        setcountryCode(initialCountry ? initialCountry.toLowerCase() : "");
        setCompanyQuery(initialCompany);
        if (initialCountry || initialCompany) {
            fetchResults(initialCountry.toLowerCase(), initialCompany);
        }
    }, [initialCountry, initialCompany, router.asPath]);



    // Initial fetch (reset offset)

    const fetchResults = async (country, company) => {
        setLoading(true);
        try {
            let matched = [];
            let offset = 0;
            let keepFetching = true;

            // ✅ CASE 1: Company present → keyword match (ignore country)
            if (company) {
                while (keepFetching) {
                    const res = await axios.get(API_BASE, {
                        params: {
                            "api-key": API_KEY,
                            format: "json",
                            limit: 5000,
                            offset,
                        },
                    });

                    const batch = res.data.records || [];
                    if (!batch.length) break;

                    let filtered = batch.filter(c =>
                        normalize(c.CompanyName).includes(normalize(company))
                    );

                    matched.push(...filtered);

                    if (matched.length > 0 || batch.length < 5000) {
                        keepFetching = false;
                    } else {
                        offset += 5000;
                    }
                }

                setResults(matched);
                setOffset(offset + 5000);
                setHasMore(matched.length > 0);
                setPage(1);
                return;
            }

            // ✅ CASE 2: Only country → fetch all for that country
            if (country) {
                const res = await axios.get(API_BASE, {
                    params: {
                        "api-key": API_KEY,
                        format: "json",
                        limit: 5000,
                        offset,
                        // "filters[CompanycountryCode]": country.toUpperCase(),
                    },
                });

                let batch = res.data.records || [];
                setResults(batch);
                setOffset(5000);
                setHasMore(batch.length === 5000);
                setPage(1);
                return;
            }

            // ✅ CASE 3: Neither → clear results
            setResults([]);
            setHasMore(false);

        } catch (err) {
            console.error(err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };


    // const fetchResults = async (country, company) => {

    //     setLoading(true);
    //     try {


    //         let matched = [];
    //         let offset = 0;
    //         let keepFetching = true;

    //         // CASE 1: country + Company → use both
    //         if (country && company) {

    //             console.log(1);
    //             const res = await axios.get(API_BASE, {
    //                 params: {
    //                     "api-key": API_KEY,
    //                     format: "json",
    //                     limit: 5000,
    //                     offset,
    //                     "filters[CompanycountryCode]": country.toLowerCase(),
    //                     "filters[CompanyName]": company, // 👈 direct exact search
    //                 },
    //             });

    //             let batch = res.data.records || [];

    //             if (batch.length > 0) {
    //                 // ✅ Exact match results found
    //                 setResults(batch);
    //                 setOffset(5000);
    //                 setHasMore(batch.length === 5000);
    //                 setPage(1);
    //                 return;
    //             }

    //             //  No exact match → fallback to keyword match
    //             const fallbackRes = await axios.get(API_BASE, {
    //                 params: {
    //                     "api-key": API_KEY,
    //                     format: "json",
    //                     limit: 5000,
    //                     offset,
    //                     "filters[CompanycountryCode]": country.toLowerCase(), // keep country filter
    //                 },
    //             });

    //             let fallbackBatch = fallbackRes.data.records || [];
    //             const matched = fallbackBatch.filter(c =>
    //                 normalize(c.CompanyName).includes(normalize(company))
    //             );

    //             setResults(matched);
    //             setOffset(5000);
    //             setHasMore(fallbackBatch.length === 5000);
    //             setPage(1);
    //             return;
    //         }

    //         // CASE 2: Only country (no company) → fetch all in that country
    //         if (country && !company) {
    //             console.log(2);

    //             const res = await axios.get(API_BASE, {
    //                 params: {
    //                     "api-key": API_KEY,
    //                     format: "json",
    //                     limit: 5000,
    //                     offset,
    //                     "filters[CompanycountryCode]": country.toLowerCase(),
    //                 },
    //             });

    //             let batch = res.data.records || [];
    //             setResults(batch);
    //             setOffset(5000);
    //             setHasMore(batch.length === 5000);
    //             setPage(1);
    //             return;
    //         }

    //         // CASE 3: Only Company (no country) → recursive batch fetch across all
    //         if (!country && company) {
    //             console.log(3);

    //             matched = [];
    //             offset = 0;

    //             while (keepFetching) {
    //                 const res = await axios.get(API_BASE, {
    //                     params: {
    //                         "api-key": API_KEY,
    //                         format: "json",
    //                         limit: 5000,
    //                         offset,
    //                     },
    //                 });

    //                 const batch = res.data.records || [];
    //                 if (!batch.length) break;

    //                 // First try exact/substring match
    //                 let filtered = batch.filter(c =>
    //                     normalize(c.CompanyName).includes(normalize(company))
    //                 );

    //                 matched.push(...filtered);

    //                 if (matched.length > 0) {
    //                     // ✅ Found match → stop
    //                     keepFetching = false;
    //                 } else if (batch.length < 5000) {
    //                     // ✅ No exact match in all batches → fallback to fuzzy keyword search
    //                     let keywordFiltered = batch.filter(c =>
    //                         normalize(c.CompanyName).split(" ").some(word =>
    //                             word.startsWith(normalize(company)) ||
    //                             word.includes(normalize(company))
    //                         )
    //                     );
    //                     matched.push(...keywordFiltered);
    //                     keepFetching = false;
    //                 } else {
    //                     // Continue to next batch
    //                     offset += 5000;
    //                 }
    //             }

    //             setResults(matched);
    //             setOffset(offset + 5000);
    //             setHasMore(matched.length > 0);
    //             setPage(1);
    //             return;
    //         }

    //     } catch (err) {
    //         console.error(err);
    //         setResults([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // Load next batch when needed
    const fetchNextBatch = async (country, company) => {
        if (!hasMore) return; // nothing more
        setLoading(true);
        try {
            let res = await axios.get(API_BASE, {
                params: {
                    "api-key": API_KEY,
                    format: "json",
                    limit: 5000,
                    offset,
                    ...(country && { "filters[CompanycountryCode]": country.toLowerCase() }),
                },
            });

            const batch = res.data.records || [];
            const filtered = company
                ? batch.filter(c =>
                    normalize(c.CompanyName).includes(normalize(company))
                )
                : batch;

            setResults(prev => [...prev, ...filtered]);
            setOffset(offset + 5000);
            setHasMore(batch.length === 5000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = () => {
        if (countryCode && countryCode !== 'in' || countryCode !== 'IN') {
            router.push('/order-business-credit-report');
            return;
        }

        const params = new URLSearchParams();
        if (countryCode) params.set("country", countryCode);
        if (companyQuery) params.set("company", companyQuery);
        router.push(`/search?${params.toString()}`);

        fetchResults(countryCode || null, companyQuery || null);
    };

    const handleClick = (company) => {
        const companyName = encodeURIComponent(company.CompanyName.replace(/\s+/g, "-"));
        const cin = encodeURIComponent(company.CIN);
        let country = company["CompanyIndian/Foreign Company"]?.toLowerCase() || "";
        country = country.slice(0, -1); // removes last character
        country = encodeURIComponent(country);
        const stateCode = encodeURIComponent(company.CompanyStateCode?.toLowerCase() || "na");

        router.push(`/${companyName}/${cin}/${country}/${stateCode}/order-credit-report`);
    };

    const paginatedResults = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-col items-center gap-6 p-8 mb-6 bg-gradient-to-br from-blue-100 via-white to-orange-100 rounded-xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6 text-center max-w-2xl mx-auto text-black">
                        <span className="text-primary">Business Credit Reports</span>{" - "}Company Search
                    </h2>
                    {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Search for a Company
                    </h2> */}
                    <p className="text-sm text-gray-500 mb-6">
                        Enter the company name and optionally select a country
                        to narrow down your search.
                    </p>
                </div>

                {/* Inputs */}
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
                    <Select
                        options={countries} // ✅ use fetched countries
                        value={countries.find(opt => opt.value === countryCode) || null}
                        onChange={(selected) => setcountryCode(selected?.value || "")}
                        placeholder="Select Country"
                        isClearable
                        className="w-full md:w-48 text-gray-800"
                        classNamePrefix="react-select"
                    />


                    <input
                        type="text"
                        placeholder="Search Company..."
                        value={companyQuery}
                        onChange={(e) => setCompanyQuery(e.target.value)}
                        className="w-full md:w-120 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white "
                    />

                    <button
                        onClick={handleSearch}
                        className="cursor-pointer px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 shadow-md transition"
                    >
                        Search
                    </button>
                </div>

                <div className="text-yellow-700 text-sm max-w-6xl mx-auto text-center">
                    For faster data search, please enter the full company name.
                </div>


            </div>


            {loading && <iframe src="https://lottie.host/embed/e0b7e72c-fc33-47e7-9013-943f692f3d3d/2O62BcGfI4.lottie"></iframe>}

            {!loading && paginatedResults.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left: Table for md+ screens */}
                    <div className="w-full lg:w-3/4">
                        {/* Table: md+ */}
                        <div className="hidden md:block w-full">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">Company Details</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-2/5">Information</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-1/5">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {paginatedResults.map((c, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3 text-sm text-gray-800 align-top max-w-sm">
                                                    <div className="font-bold">{c.CompanyName}</div>
                                                    {/* <div className="text-gray-600 text-sm mt-1 line-clamp-2 ">
                                                        Address: {c.Registered_Office_Address}
                                                    </div> */}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 space-y-1 align-top">
                                                    {/* <div><span className="font-medium">CIN No.:</span> {c.CIN}</div>
                                                    <div><span className="font-medium">Registration Date:</span> {c.CompanyRegistrationdate_date}</div>
                                                    <div><span className="font-medium">Sub Category:</span> {c.CompanySubCategory}</div> */}
                                                    <div><span className="font-medium">Address:</span> {c.Registered_Office_Address}</div>
                                                    <div><span className="font-medium">Status:</span> {c.CompanyStatus}</div>
                                                    {/* <div><span className="font-medium">Category:</span> {c.CompanyCategory}</div>
                                                    <div><span className="font-medium">Country:</span> {c["CompanyIndian/Foreign Company"]}</div> */}
                                                </td>
                                                <td className="px-4 py-3 text-center align-middle">
                                                    <button className="cursor-pointer flex items-center gap-1  py-2 rounded-md px-2 bg-indigo-500 text-white text-xs font-semibold hover:bg-black hover:shadow-md transition-all duration-300" onClick={() => handleClick(c)}
                                                    >
                                                        View <FaArrowRight className="text-white" />
                                                    </button>
                                                    {/* <div className="flex flex-col gap-2 justify-center items-center h-full">
                                                        <button className="cursor-pointer flex items-center gap-1  py-2 rounded-md px-2 bg-orange-500 text-white text-xs font-semibold hover:bg-black hover:shadow-md transition-all duration-300">
                                                            <FaLock className="text-white" />
                                                            Buy Report
                                                        </button>

                                                        // <LoginModalButton />
                                                    </div> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Cards: sm screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden w-full">
                            {paginatedResults.map((c, idx) => (
                                <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-bold text-gray-800">{c.CompanyName}</div>
                                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">Address: {c.Registered_Office_Address}</div>

                                    <div className="text-gray-700 text-sm mt-2 space-y-1">
                                        {/* <div><span className="font-medium">CIN No.:</span> {c.CIN}</div>
                                        <div><span className="font-medium">Registration Date:</span> {c.CompanyRegistrationdate_date}</div>
                                        <div><span className="font-medium">Sub Category:</span> {c.CompanySubCategory}</div> */}
                                        <div><span className="font-medium">Status:</span> {c.CompanyStatus}</div>
                                        {/* <div><span className="font-medium">Category:</span> {c.CompanyCategory}</div> */}
                                        {/* <div><span className="font-medium">Country:</span> {c["CompanyIndian/Foreign Company"]}</div> */}
                                    </div>

                                    <div className="flex flex-row w-full gap-2 mt-3 justify-end">
                                        {/* <button className="cursor-pointer px-3 py-1.5 rounded-md bg-[#4838c9ed] text-white text-xs font-medium hover:bg-indigo-700 transition w-auto">
        Buy Report
    </button>
    <LoginModalButton /> */}
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
                    <div className="w-full lg:w-1/4 flex flex-col gap-4">
                        <div className="p-4 bg-gray-100 border rounded-lg ">
                            <h3 className="font-semibold text-gray-800 mb-2">Ad / Promotion</h3>
                            <p className="text-sm text-gray-600">
                                Promote your business here or display relevant content.
                            </p>
                        </div>

                        <div className="p-4 bg-gray-100 border rounded-lg ">
                            <h3 className="font-semibold text-gray-800 mb-2">Tip</h3>
                            <p className="text-sm text-gray-600">
                                Search using company name or country to quickly find corporate records.
                            </p>
                        </div>
                    </div>
                </div>
            )}



            {!loading && results.length === 0 && countryCode && companyQuery && (
                <p className="text-center text-red-500">No companies found.</p>
            )}

            {/* Pagination */}
            {results.length > PER_PAGE && (
                <div className="flex justify-center gap-4 mt-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 text-black">{page}</span>
                    <button
                        disabled={!hasMore && page * PER_PAGE >= results.length}
                        onClick={async () => {
                            const nextPageStart = page * PER_PAGE;
                            if (nextPageStart >= results.length && hasMore) {
                                // ✅ need to fetch next batch
                                await fetchNextBatch(countryCode, companyQuery);
                            }
                            setPage(p => p + 1);
                        }}
                        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
