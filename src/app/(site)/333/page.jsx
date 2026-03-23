"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

    const [company, setCompany] = useState("");
    const [state, setState] = useState("");
    const [page, setPage] = useState(1);

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlCompany = searchParams.get("company") || "";
        const urlState = searchParams.get("state") || "";
        const urlPage = Number(searchParams.get("page")) || 1;

        setCompany(urlCompany);
        setState(urlState);
        setPage(urlPage);
    }, []);

    const updateURL = (newCompany, newState, newPage) => {
        const params = new URLSearchParams();

        if (newCompany) params.set("company", newCompany);
        if (newState) params.set("state", newState);
        if (newPage > 1) params.set("page", newPage);

        router.push(`/333?${params.toString()}`);
    };

    // 🔍 Fetch API
    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://backend.globalbizreport.com/search-companies?company=${encodeURIComponent(company.trim())}&state=${encodeURIComponent(state.trim())}&page=${page}&perPage=20`
            );
            const result = await res.json();

            setData(result.rows || []);
            setTotalPages(result.totalPages || 0);
            setTotalRows(result.totalRows || 0);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // ⏳ Debounce
    useEffect(() => {
        const delay = setTimeout(() => {
            if (company.trim() || state.trim()) {
                fetchCompanies();
            } else {
                setData([]);
                setTotalRows(0);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [company, state, page]);



    const handleSearch = () => {
        const trimmedCompany = company.trim();
        const trimmedState = state.trim();

        setPage(1);
        updateURL(trimmedCompany, trimmedState, 1);

        fetchCompanies();
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">

            {/* 🔍 Search Bar */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search company..."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="flex-1 p-3 rounded bg-gray-900 border border-gray-700 focus:outline-none"
                />

                <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-56 p-3 rounded bg-gray-900 border border-gray-700 focus:outline-none"
                >
                    <option value="">All States</option>
                    {STATES.map((s, i) => (
                        <option key={i} value={s}>
                            {s.toUpperCase()}
                        </option>
                    ))}
                </select>

                <button
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    onClick={handleSearch}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded font-medium"
                >
                    Search
                </button>
            </div>

            {/* 📊 Info */}
            <div className="mb-4 text-sm text-gray-400">
                {totalRows > 0 && (
                    <>
                        Showing {(page - 1) * 20 + 1} - {Math.min(page * 20, totalRows)} of {totalRows}
                    </>
                )}
            </div>

            {/* ⏳ Loading */}
            {loading && <p className="text-gray-400">Loading...</p>}

            {/* 📄 Results */}
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 border border-gray-800 rounded bg-gray-900 hover:bg-gray-800 transition"
                    >
                        <h2 className="text-lg font-semibold">{item.companyname}</h2>
                        <p className="text-sm text-gray-400">{item.cin}</p>

                        <div className="flex gap-4 mt-2 text-sm">
                            <span>{item.companystatecode}</span>
                            <span>{item.companystatus}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔢 Pagination */}
            {totalPages > 0 && (
                <div className="flex items-center justify-between mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => {
                            const newPage = page - 1;
                            setPage(newPage);
                            updateURL(company, state, newPage);
                        }}
                        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-sm text-gray-400">
                        Page {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => {
                            const newPage = page + 1;
                            setPage(newPage);
                            updateURL(company, state, newPage);
                        }}
                        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}