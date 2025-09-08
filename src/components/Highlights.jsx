import { FaGlobe, FaSearch, FaChartLine, FaBuilding } from "react-icons/fa";

export const Highlights = () => {
    const items = [
        {
            text: "Get Credit Report of any Company Worldwide",
            icon: <FaGlobe className="text-primary text-3xl" />,
        },
        {
            text: "Freshly Investigated Reports with detailed Company Investigation",
            icon: <FaSearch className="text-primary text-3xl" />,
        },
        {
            text: "100% Worldwide coverage in 220+ Countries at Lowest Prices",
            icon: <FaChartLine className="text-primary text-3xl" />,
        },
        {
            text: "Get Self-Assessment Report for your own Company to build your credibility",
            icon: <FaBuilding className="text-primary text-3xl" />,
        },
    ];

    return (
        <section className="bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-100 rounded-xl p-6 transition-all duration-300 "
                        >
                            <div className="flex flex-col items-start gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    {item.icon}
                                </div>
                                <p className="text-gray-800 text-base font-medium leading-snug">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
