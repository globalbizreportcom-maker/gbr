// app/search/page.jsx
import SearchForm from "@/utils/SearchForm";
import { FaSearch, FaMapMarkerAlt, FaDatabase } from "react-icons/fa";

export default async function SearchPage({ searchParams }) {


    // SSR: get initial values from query
    const params = await searchParams;

    const initialCountry = params?.country || "";
    const initialCompany = params?.company || "";

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-6 md:px-12 lg:px-20">

            {/* Search Form Section */}
            <div className="max-w-7xl mx-auto  rounded-2xl">
                <SearchForm
                    initialCountry={initialCountry}
                    initialCompany={initialCompany}
                />
            </div>

            {/* Info Section */}
            <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Verified Data
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Access company data directly from trusted registries
                        and official sources for reliable insights.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        State-wide Coverage
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Search across all Indian states and union territories
                        to find businesses of all scales.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Smart Filters
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Use keywords or state filters to refine your results
                        and get faster access to relevant companies.
                    </p>
                </div>
            </div>
        </div>
    );
}
