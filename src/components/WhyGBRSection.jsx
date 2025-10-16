import { FaChartBar, FaClock, FaGlobe, FaMoneyBillWave } from "react-icons/fa";

const WhyGBRSection = () => {
    const features = [
        {
            icon: <FaChartBar className="text-primary text-2xl" />,
            title: "Freshly Investigated Reports",
            description:
                "Our reports are based on the latest research and investigations, providing you with up-to-date and reliable information on any company worldwide.",
        },
        {
            icon: <FaGlobe className="text-primary text-2xl" />,
            title: "Order Credit Reports Worldwide",
            description:
                "We provide credit reports for any company in the world, helping you make informed decisions about business partners across borders.",
        },
        {
            icon: <FaClock className="text-primary text-2xl" />,
            title: "Quick Delivery Time",
            description:
                "Time is money. Most credit reports are delivered within 2 to 3 days of your order.",
        },
        {
            icon: <FaMoneyBillWave className="text-primary text-2xl" />,
            title: "Cost-effective Reports",
            description:
                "Our pricing is flexible and affordable, ensuring you get valuable insights without overspending.",
        },
    ];

    return (
        <section className="py-16 bg-zinc-100 text-gray-800">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-full max-w-xs font-bold text-primary mb-5 mx-auto">
                    Why GBR ?
                </h2>
                <h3 className="text-center text-3xl md:text-4xl font-bold mb-10">
                    Why Choose GBR for Credit Reports?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">


                    {/* Left - Feature blocks */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-md border border-gray-100"
                            >
                                <div className="mb-3">{feature.icon}</div>
                                <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right - Image block */}
                    <div className="md:col-span-2 rounded-xl">
                        <img
                            src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
                            alt="Credit Report"
                            className="w-full h-[300px] sm:h-[500px] sm:object-contain md:object-cover rounded-xl"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyGBRSection;
