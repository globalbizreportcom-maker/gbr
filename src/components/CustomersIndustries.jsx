import Link from "next/link";
import { FaBuilding, FaIndustry, FaHandshake, FaUniversity, FaGlobe, FaChartBar } from "react-icons/fa";

const industries = [
    {
        icon: <FaBuilding className="text-primary text-xl" />,
        title: "Corporates",
        description: "We help corporates make better decisions about supplier relationships.",
    },
    {
        icon: <FaIndustry className="text-primary text-xl" />,
        title: "SMEs",
        description: "We help SMEs protect themselves from bad debts.",
    },
    {
        icon: <FaHandshake className="text-primary text-xl" />,
        title: "B2B Marketplaces",
        description: "We provide B2B marketplaces with reliable decision-making data.",
    },
    {
        icon: <FaUniversity className="text-primary text-xl" />,
        title: "Financial Institutes",
        description: "We help financial institutes assess borrower creditworthiness.",
    },
    {
        icon: <FaGlobe className="text-primary text-xl" />,
        title: "Global Consultancy",
        description: "We support consultancies with due-diligence reports.",
    },
    {
        icon: <FaChartBar className="text-primary text-xl" />,
        title: "Market Research",
        description: "We offer insights into the financial health of target markets.",
    },
];

const CustomersIndustries = () => {
    return (
        <section className="py-20 bg-zinc-100  text-gray-800">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row gap-16 items-center">



                {/* Right Content */}
                <div className="w-full">
                    <div className="mb-4 text-center lg:text-left">

                        <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-full max-w-xs font-bold text-primary mb-5 mx-auto">
                            Customers & Industries
                        </h2>
                        <h2 className="text-3xl text-center md:text-4xl font-bold mt-4 leading-tight">
                            Choose <span className="text-primary">GBR</span>  for ease, trust and reliable reports.
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                        {industries.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 transition"
                            >
                                <div className="flex items-start gap-8 p-2"  >
                                    <div>
                                        <h3 className="font-semibold text-md mb-3">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/order-business-credit-report">
                            <button className="btn btn-primary mx-auto">
                                Order Business Credit Report
                            </button>
                        </Link>
                        {/* <button className="btn btn-primary">Order Report</button> */}
                        {/* <button className="btn btn-outline btn-primary">Enquiry Now</button> */}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CustomersIndustries;
