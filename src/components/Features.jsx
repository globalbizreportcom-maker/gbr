import {
    FaGlobe,
    FaFileAlt,
    FaDollarSign,
    FaChartLine,
} from "react-icons/fa";

const featureList = [
    {
        icon: <FaFileAlt />,
        title: "Biggest Global Reach",
        desc: "With coverage in 220+ countries, our platform offers comprehensive credit reports for companies worldwide, enabling you to conduct business in diverse markets and seize global opportunities.",
    },
    {
        icon: <FaChartLine />,
        title: "Accurate and Up-to-Date Information",
        desc: "Our expert team meticulously investigates and delivers fresh and reliable credit reports, providing you with the most recent data necessary for making well-informed business decisions.",
    },
    {
        icon: <FaGlobe />,
        title: "Tailored Solutions",
        desc: "Whether you need a single report or a comprehensive analysis of multiple companies, our flexible solutions can be customized to meet your specific requirements. We offer a range of packages suitable for businesses of all sizes and industries.",
    },
    {
        icon: <FaDollarSign />,
        title: "Effortless Ordering Process",
        desc: "Our user-friendly platform offers a seamless and efficient ordering process. Simply provide the necessary details, select the companies you need reports on, and receive the reports directly to your inbox.",
    },
    {
        icon: <FaChartLine />,
        title: "Enhanced Risk Management",
        desc: "Our credit reports offer insights into a company's financial health, payment history and creditworthiness, enabling you to effectively manage risks, make informed decisions and protect your business interests.",
    },
    {
        icon: <FaGlobe />,
        title: "Best Support & Customer Service",
        desc: "We take pride in delivering exceptional customer service. Our dedicated support team is available to assist you at every stage of the process, ensuring a smooth and hassle-free experience.",
    },

];

const Features = () => {
    return (
        <section className="py-16 bg-zinc-100 text-gray-800">
            <div className="max-w-5xl mx-auto px-4 text-center w-full">

                <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-full max-w-xs font-bold text-primary mb-10 mx-auto">
                    Features
                </h2>

                <h6 className="text-3xl md:text-4xl font-bold mb-10 ">
                    The Simplest Way to Order Business Information Reports for Companies in 220+ Countries
                </h6>

                <div className=" grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                    {featureList.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-white shadow-xs p-6 hover:shadow-xs transition rounded-lg hover:bg-primary group"
                        >
                            <div className="text-primary text-3xl mb-4 group-hover:text-white ">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-white">{feature.title}</h3>
                            <p className="text-sm text-zinc-500 group-hover:text-white">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
