import React from 'react';
import Link from 'next/link';
import { cleanUrlSegment } from '@/utils/slugify';
import { ChevronRight, Landmark, Map, Database, ArrowRight } from "lucide-react";

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman & Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function DirectoryPage() {
    const unionTerritoriesList = [
        "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman & Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];

    const regularStates = states.filter(state => !unionTerritoriesList.includes(state));
    const unionTerritories = states.filter(state => unionTerritoriesList.includes(state));

    return (
        <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb Context for Search Engines */}
                <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2 tracking-wide">
                    <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-700 font-semibold">Directory</span>
                </nav>

                {/* Main Hero Header */}
                <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 hidden lg:block">
                        <Database className="w-40 h-40" />
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-4 uppercase tracking-wider">
                            Corporate Registry Index
                        </div>
                        <h1 className="text-xl font-extrabold text-gray-900  mb-2">
                            Indian Corporate Registry Directory
                        </h1>
                        <p className="text-sm text-gray-600 ">
                            Explore comprehensive business datasets, registration trackings, capital valuations, and official profiles classified cleanly across all states and regional jurisdictions.
                        </p>
                    </div>
                </div>

                {/* Section 1: 28 Indian States */}
                <section className="mb-14">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Map className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-wide">States</h2>
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{regularStates.length} Available</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {regularStates.map((state) => {
                            const stateSlug = cleanUrlSegment(state);
                            return (
                                <Link
                                    key={state}
                                    href={`/directory/${stateSlug}`}
                                    className="group p-4 bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 hover:scale-[1.01] transition-all duration-200 flex items-center justify-between"
                                >
                                    <span className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors text-sm sm:text-base pr-2">
                                        {state}
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors flex-shrink-0">
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Section 2: Union Territories */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-wide">Union Territories</h2>
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{unionTerritories.length} Available</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {unionTerritories.map((ut) => {
                            const utSlug = cleanUrlSegment(ut);
                            return (
                                <Link
                                    key={ut}
                                    href={`/directory/${utSlug}`}
                                    className="group p-4 bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-400 hover:scale-[1.01] transition-all duration-200 flex items-center justify-between"
                                >
                                    <span className="text-gray-800 font-semibold group-hover:text-indigo-600 transition-colors text-sm sm:text-base pr-2">
                                        {ut}
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 flex items-center justify-center transition-colors flex-shrink-0">
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Strategic SEO Footer Context Block */}
                <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm group">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-50 text-gray-400 rounded-xl group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors hidden sm:block">
                            <Database className="w-5 h-5" />
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 leading-relaxed space-y-2">
                            <span className="font-bold text-gray-700 text-sm tracking-wide block mb-1">Data Architecture Notice</span>
                            <p>
                                This unified corporate index connects search engine crawlers and users to millions of registered organizations operating under the structural governance of the Ministry of Corporate Affairs (MCA), Government of India. Navigation links utilize strict server-side static pagination mapping matrices to verify index data freshness parameters.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}