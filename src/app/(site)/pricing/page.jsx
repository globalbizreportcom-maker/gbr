import PricingTable from "@/components/PricingTable";
import Subscription from "@/components/Subscription";
import { FaGlobe, FaMailBulk, FaMoneyBill, FaMoneyCheckAlt } from "react-icons/fa";


const Pricing = () => {

    return (
        <section className="py-14 px-1 bg-white text-gray-800">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3">


                <div className="bg-primary text-md text-white font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto uppercase">
                    Pricing
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    <span className="text-primary">Pricing</span>    for GBR Business Information Report
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Freshly Investigated Business Information Report
                </p>
            </div>

            <div className="max-w-6xl mx-auto">

                <section className="py-16 px-4 bg-white text-gray-800">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Left Column */}
                        <div className=" p-6 rounded-xl border border-blue-100">
                            <h2 className="text-2xl md:text-2xl font-bold text-black mb-4">
                                Business Credit Reports in 220+ Countries
                            </h2>

                            <ul className="list-disc text-md list-inside space-y-2 text-gray-500">
                                <li>
                                    GlobalBizReport is one of the most trusted business services platforms providing freshly Investigated and comprehensive Business Information Reports to Corporates, SMEs, B2B Marketplaces, Financial Institutes, Global Consultancy & Market Research companies worldwide.
                                </li>
                                <br />
                                <li>
                                    GBR is one of leading provider of Business Credibility Reports, Company Information Reports, Company Due-Diligence reports, Company Assessment Reports in over 220+ countries Worldwide.
                                </li>
                            </ul>
                        </div>

                        {/* Right Column */}
                        <div className=" p-6 rounded-xl border border-blue-100">
                            <h2 className="text-2xl md:text-2xl font-bold text-black mb-4">
                                Choose GBR as your Credit Reporting PARTNER and Save MAXIMUM Countries
                            </h2>

                            <ul className="list-disc text-md list-inside space-y-2 text-gray-500">
                                <li>GBR Business Information Report gives you full picture of company’s reliability and verification data, credit worthiness check, financial health, registration data, credit rating score, Directors Info, Risk assessment details, details on any Negative information and much more.</li>
                                <br />
                                <li>Verify your Business Partners, Vendors, Buyers, Suppliers, Clients with GBR Reports.</li>
                            </ul>
                        </div>

                    </div>
                </section>

                <PricingTable />

                <div className="mt-12 max-w-6xl mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">

                        {/* Card Item */}
                        <div className="bg-white shadow-xs transition rounded-xl p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl pt-1">
                                    <FaMoneyCheckAlt />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Pricing</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Pricing of the credit report varies based on the country of the company to be verified and you will find the pricing for the required Credit Report on submission of the order form.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Time */}
                        <div className="bg-white shadow-xs  transition rounded-xl p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl pt-1">
                                    <FaMailBulk />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Delivery Time</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        You will receive freshly investigated credit report digitally on your email within the expected delivery time of 1–3 business days.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Global Coverage */}
                        <div className="bg-white shadow-xs transition rounded-xl p-6 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-3xl pt-1">
                                    <FaGlobe />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Global Coverage</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        GBR provides Comprehensive Business Credit Reports in 220+ Countries that are also called as International Company Credit Reports, Business Information Report, Business Credit Rating Report, Company Credit Report, Company Due-diligence Reports etc.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* newsletter */}
                <Subscription />
            </div>
        </section>
    );
};

export default Pricing;

export const metadata = {
    title: "Pricing | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "Pricing GBR",
        description: "What we do at Global Biz Report.",
        url: "https://www.globalbizreport.com/pricing",
        siteName: "Global Biz Report",
        type: "website",
    },
};

