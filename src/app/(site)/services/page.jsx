import Subscription from "@/components/Subscription";
import Link from "next/link";
import { FaChartBar, FaCheckCircle, FaFileAlt, FaGlobe, FaHeadset, FaSearch, } from "react-icons/fa";
import {
    FaClock,
    FaDollarSign,
    FaLaptop,
    FaClipboardList,
} from "react-icons/fa";



const ServicesPage = () => {

    return (
        <section className="py-16 px-1 bg-zinc-50  text-gray-800">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3">

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center max-w-2xl mx-auto">
                    <span className="text-primary">Business Credit Reports</span>You Can Trust
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Trust in our reliable reports to gain valuable insights into potential partners, customers and vendors ensuring a secure and thriving business future.
                </p>
            </div>

            <section className="py-16 bg-white text-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="mx-auto text-md border-0 bg-violet-100 p-2 text-center rounded-md w-[200px] font-bold text-primary mb-5">
                            OUR SERVICES
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold mb-6 text-center max-w-2xl mx-auto">
                            We Provide Comprehensive Business Credit Reports
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            "Business Credit Report",
                            "Company Due-Diligence Report",
                            "SMB Credit Reports",
                            "Business Credit Worthiness Report",
                            "Company Verification Report",
                            "Business Assessment Report",
                            "Overseas Company Reports",
                            "Credit Rating of a Company",
                        ].map((service, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-200 rounded-md bg-grey-50 p-4 text-center border-l-4 border-l-primary "
                            >
                                <h4 className="font-medium text-md md:text-lg">{service}</h4>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-12">

                        <p className="mx-auto max-w-4xl text-center mt-10 text-gray-500">
                            Our reports provide in-depth insights into a company's creditworthiness and financial health, helping you build trusted partnerships and make informed business choices.
                        </p>
                        <div className="text-center mt-10">
                            <Link href="/order-business-credit-report">
                                <button className="btn btn-primary mx-auto">
                                    Order Business Credit Report
                                </button>
                            </Link>
                        </div>

                    </div>

                </div>
            </section>

            <section className="py-8 bg-white text-gray-800">


                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

                    {/* Right: Image */}
                    <div className="w-full">
                        <img
                            src="https://images.pexels.com/photos/7688335/pexels-photo-7688335.jpeg" // Replace with your actual image path
                            alt="Business Reports Illustration"
                            className="w-full object-cover max-w-md mx-auto rounded-2xl h-[400px]"
                        />
                    </div>

                    {/* Left: Text & Icons */}
                    <div>
                        <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-[200px] font-bold text-primary mb-5">
                            OUR SERVICES
                        </h2>
                        <h5 className="text-3xl md:text-2xl font-bold mb-4">
                            Simplified Platform for all your Business Credit Reporting Needs
                        </h5>

                        <div className="space-y-6 mt-10">
                            {/* Item 1 */}
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-2xl">
                                    <FaChartBar />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Dashboard</h4>
                                    <p className="text-sm text-gray-700">
                                        All-in-one personalised dashboard with reports, invoices & customer support.
                                    </p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-2xl">
                                    <FaFileAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Business Report</h4>
                                    <p className="text-sm text-gray-700">
                                        Access your freshly investigated credit reports from anywhere in the world.
                                    </p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-start gap-4">
                                <div className="text-primary text-2xl">
                                    <FaHeadset />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Customer Support</h4>
                                    <p className="text-sm text-gray-700">
                                        Best-in-class customer support to help you on priority.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-16 bg-white text-gray-800">
                <div className="max-w-6xl mx-auto px-4">

                    <h2 className=" mx-auto text-md border-0 bg-violet-100 p-2 text-center rounded-md w-[200px] font-bold text-primary mb-5">
                        Global Partner
                    </h2>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center max-w-2xl mx-auto">
                        Choose GBR as your Global Credit Reporting Partner and Save Maximum
                    </h2>
                    <p className="mx-auto w-full max-w-md bg-primary text-white font-semibold text-center text-base sm:text-lg px-4 py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 mb-10">
                        <FaSearch className="text-white text-lg" />
                        What you find in the Business Reports?
                    </p>


                    {/* Grid List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {[
                            "Complete registration data and the company's history.",
                            "Office address, telephone and fax numbers, email, website addresses, etc.",
                            "Business activities, products/services provided and trade marks.",
                            "Import and export data, main suppliers and clients.",
                            "Information about the shareholders and administration.",
                            "Data on subsidiaries and affiliated companies.",
                            "Last year balance sheet and profit and loss account - wherever possible.",
                            "Negative information, legal claims, market reputation, etc.",
                            "Creditworthiness, payment records or behaviours and credit recommendations.",
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 bg-zinc-50 border border-gray-200 rounded-xl p-4"
                            >
                                <FaCheckCircle className="text-primary text-lg mt-1 shrink-0" />
                                <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-md p-4 flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 8V6h2v2H9zm0 2h2v4H9v-4z" clipRule="evenodd" />
                </svg>
                <p>
                    <strong>Note:</strong> Please note that the contents of the report like financial statements etc. are subject to availability depending on the local government policies and corporate information disclosure of the subject/country.
                </p>
            </div>

            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-primary mb-4">
                        Why to Order Credit Reports from GBR?
                    </h2>
                    <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
                        GBR Credit Reports give you a complete picture of a company’s
                        reliability, verification data, financial health, credit rating,
                        director details, and more — helping you make smarter, safer business
                        decisions.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <FaSearch />,
                                title: "Freshly Investigated Reports",
                                description:
                                    "Our reports are based on the latest research and investigations, providing you with up-to-date and reliable information on any company worldwide.",
                            },
                            {
                                icon: <FaGlobe />,
                                title: "Order Credit Reports Worldwide",
                                description:
                                    "We provide credit reports for companies worldwide, enabling you to make informed decisions regardless of their location.",
                            },
                            {
                                icon: <FaClock />,
                                title: "Quick Delivery Time",
                                description:
                                    "We prioritize speed—most credit reports are delivered within 2 to 3 business days from the time of order.",
                            },
                            {
                                icon: <FaDollarSign />,
                                title: "Cost-effective Reports",
                                description:
                                    "Our pricing is budget-friendly and flexible, offering cost-effective credit reports without compromising on quality.",
                            },
                            {
                                icon: <FaGlobe />,
                                title: "Worldwide Coverage",
                                description:
                                    "We offer credit reports in over 220 countries, ensuring that your business decisions are well-supported globally.",
                            },
                            {
                                icon: <FaLaptop />,
                                title: "Easy Online Ordering",
                                description:
                                    "Easily order reports using our intuitive and streamlined online platform — no hassle, no confusion.",
                            },
                            {
                                icon: <FaClipboardList />,
                                title: "Unparalleled Report Quality",
                                description:
                                    "Our credit reports are deeply detailed and meticulously verified, ensuring you receive top-quality insights.",
                            },
                            {
                                icon: <FaFileAlt />,
                                title: "Tailored Reports",
                                description:
                                    "Need something specific? GBR offers custom-tailored reports focused on areas most relevant to your needs.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-zinc-50 border border-gray-200 rounded-xl p-6"
                            >
                                <div className="text-primary text-2xl mb-3">{item.icon}</div>
                                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-500 text-md">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Subscription />

        </section>
    )
}

export default ServicesPage;

export const metadata = {
    title: "Services | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "Services GBR",
        description: "What we do at Global Biz Report.",
        url: "https://yourdomain.com/about",
        siteName: "Global Biz Report",
        type: "website",
    },
};
