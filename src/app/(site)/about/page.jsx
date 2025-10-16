import Subscription from "@/components/Subscription";
import { FaCheckCircle, FaFileAlt, FaGlobe, FaHeadset, FaSearch, FaShieldAlt, FaTools } from "react-icons/fa";

const AboutPage = () => {
    return (
        <section className="py-14 px-1 bg-zinc-50  text-gray-800">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3">

                <div className="bg-primary text-md text-white font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto uppercase">
                    About Us
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center max-w-2xl mx-auto">
                    Worldwide Business Credit Reports at   <span className="text-primary">Cost-Effective Price</span>
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    GlobalBizReport (GBR) is a preferred Business Credit Reporting Partner for leading Corporates, SMEs, B2B Marketplaces, Banks & Financial Institutes, Global Consultancy & Market Research companies worldwide.
                </p>
            </div>

            <div className="max-w-6xl mx-auto py-16 px-4  text-gray-800">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Image */}
                    <div className="w-full">
                        <img
                            src="https://images.pexels.com/photos/7550286/pexels-photo-7550286.jpeg"
                            alt="About Global Biz Report"
                            className="w-full h-[350px] object-cover rounded-xl"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="w-full">
                        <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-[200px] font-bold text-primary mb-5">
                            WHO WE ARE ?
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            About Global Biz Report
                        </h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            We are a leading provider of business credit reports and information solutions. With a strong focus on accuracy, reliability and comprehensive insights, we have established ourselves as a trusted resource for businesses worldwide. Our mission is to empower businesses with the knowledge they need to make informed decisions, mitigate risks and drive success.
                        </p>

                        {/* Bullet Points */}
                        <ul className="space-y-4 text-sm text-gray-700">
                            {[
                                "In-depth expertise in business credit reporting across 220+ Countries.",
                                "Understanding of the complexities and dynamics of the global marketplace.",
                                "Extensive knowledge in analyzing financial data, market trends and sector-specific factors.",
                                "Served clients across diverse sectors including manufacturing, finance, technology, healthcare and more.",
                            ].map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-primary mt-1" />
                                    <span className="leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            <div className="max-w-6xl mx-auto py-16 px-4  text-gray-800">
                <div className="max-w-6xl mx-auto">

                    <h2 className="mx-auto text-md border-0 bg-violet-100 p-2 text-center rounded-md w-[200px] font-bold text-primary mb-5">
                        WHY GBR ?
                    </h2>

                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className=" max-w-4xl mx-auto text-3xl md:text-4xl font-semibold mb-4 text-primary">
                            Your Trusted Source for Comprehensive Business Information and Credit Reporting.
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover why businesses across the globe rely on Global Biz Report for accurate, easy-to-read, and freshly investigated credit insights.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <FaShieldAlt />,
                                title: "Trusted Brand",
                                description:
                                    "Global Biz Report is a trusted brand delivering reliable and comprehensive credit reports to businesses worldwide.",
                            },
                            {
                                icon: <FaSearch />,
                                title: "Freshly Investigated Reports",
                                description:
                                    "Our team conducts thorough, up-to-date investigations to provide accurate and trustworthy data.",
                            },
                            {
                                icon: <FaGlobe />,
                                title: "Global Coverage",
                                description:
                                    "With partners in 200+ countries, we offer insights into businesses from all over the world.",
                            },
                            {
                                icon: <FaFileAlt />,
                                title: "Easy-to-Read Reports",
                                description:
                                    "Designed with clarity in mind, our reports are easy to navigate and understand for smarter decision-making.",
                            },
                            {
                                icon: <FaTools />,
                                title: "One-Stop Platform",
                                description:
                                    "A simple and seamless interface makes ordering and accessing credit reports hassle-free.",
                            },
                            {
                                icon: <FaHeadset />,
                                title: "Dedicated Support",
                                description:
                                    "Our team is here to help — from order placement to after-sales queries, we ensure smooth and friendly support.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:bg-primary hover:text-white group"
                            >
                                <div className="text-primary text-2xl mb-3 group-hover:text-white">
                                    {item.icon}
                                </div>
                                <h4 className="text-lg font-semibold mb-2 group-hover:text-white">
                                    {item.title}
                                </h4>
                                <p className="text-gray-700 text-sm group-hover:text-white">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>


                </div>

                <section className="py-20 text-gray-800">

                    <h2 className="mx-auto text-md border-0 bg-violet-100 p-2 text-center rounded-md w-[400px] font-bold text-primary mb-5">
                        BUSINESS CREDIT REPORTS
                    </h2>

                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className=" max-w-4xl mx-auto text-3xl md:text-4xl font-semibold mb-4 text-primary">
                            Verify Your Business Partners, Vendors, Buyers, Suppliers and More
                        </h2>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

                        {/* Right: Content */}

                        <div className="space-y-4 text-sm">
                            {[
                                "Today's global economy and ease of doing business across the globe has thrown open a plethora of business opportunities in the Manufacturing and Service sector. With newer opportunities, comes newer challenges by the way of competition and newer risks by the way of reliability of business partners.",
                                "Offering attractive credit terms may increase your competitiveness, but will also expose you to higher credit risks. Several factors influence your decision to partner with a company when you want to expand your company. To minimise the risk and turn it into a positive business advantage, assessing and monitoring the credibility has become a global necessity.",
                                "Getting to know the fact behind the claims made by your potential partner / business trader is the key to make the right decision. At GLOBAL BIZ REPORTS we help you make the right call by providing the latest updates about a company's background vis a vis its physical and financial strength.",
                                "We understand the need for accurate and reliable information by providing Business Information Reports (or Credit Reports as they are popularly known).",
                                "An unparalleled network and the best knowledge management systems in use allow us to collate information from a myriad of sources and compile the most comprehensive business information reports, which are sure to be your trustworthy tools in mitigating trade risks.",
                            ].map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-primary text-lg shrink-0 mt-1 mr-2" />
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {point}
                                    </p>
                                </div>


                            ))}
                        </div>

                        {/* Left: Image */}
                        <div className="w-full h-full">
                            <div className="w-full">
                                <img
                                    src="https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg"
                                    alt="About Global Biz Report"
                                    className="w-full h-[500px] object-cover rounded-xl"
                                />
                            </div>
                        </div>

                    </div>
                </section>
            </div>




            <Subscription />

        </section>
    )
}

export default AboutPage;

export const metadata = {
    title: "About Us | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "About GBR",
        description: "What we do at Global Biz Report.",
        url: "https://yourdomain.com/about",
        siteName: "Global Biz Report",
        type: "website",
    },
};
