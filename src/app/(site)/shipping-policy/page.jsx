import { FaEnvelope, FaClock, FaFileAlt, FaTruck, FaCheckCircle } from "react-icons/fa";

export default function ShippingDeliveryPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="mx-auto text-2xl border-0 bg-violet-100 p-2 text-center rounded-md w-[300px] font-bold text-primary mb-5">
                    Shipping & Delivery
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-md">
                    Learn how and when your Business Credit Reports are delivered from GlobalBizReport.com
                </p>
            </div>

            {/* Mode of Shipping */}
            <section className="mb-12 bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-primary mb-4 text-lg font-semibold">
                    <FaTruck />
                    <span className="text-2xl">Mode of Shipping</span>
                </div>
                <p className="text-gray-700 text-md leading-relaxed mb-4">
                    At <strong>GlobalBizReport.com</strong>, we are committed to providing our customers with
                    freshly investigated high-quality online business information reports.
                </p>
                <p className="text-blue-500 text-md leading-relaxed">
                    The final report is a <strong>digital goods product</strong>. We do not perform physical
                    shipment of reports. All final business information reports will be sent directly to your
                    email address.
                </p>
            </section>

            {/* Delivery Time */}
            <section className="mb-12 bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-primary mb-4 text-lg font-semibold">
                    <FaClock />
                    <span className="text-2xl">Delivery Time</span>
                </div>
                <p className="text-gray-700 text-md leading-relaxed mb-4">
                    You will receive a <strong>freshly investigated business information report</strong> of
                    the requested company digitally on your email within{" "}
                    <strong>3–8 business days</strong> for most companies worldwide.
                </p>
                <p className="text-blue-500 text-md leading-relaxed mb-4">
                    The final report is a <strong>digital goods product</strong>. We do not perform physical
                    shipment of reports. All final business information reports will be sent directly to your
                    email address.
                </p>
                <p className="text-gray-700 text-md leading-relaxed">
                    Our reports provide <strong>in-depth insights</strong> into a company's creditworthiness
                    and financial health, helping you build trusted partnerships and make informed decisions.
                </p>
                <div className="mt-4 text-md bg-yellow-50 p-2 text-gray-500 border-l-4 border-yellow-400 pl-4 italic">
                    * Please note that the contents of the report like financial statements etc. are subject to availability depending on the local government policies and corporate information disclosure of the subject/country.
                </div>
            </section>

            {/* Contact Support */}
            <section className="mb-12 bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-primary mb-4 text-lg font-semibold">
                    <FaEnvelope />
                    <span className="text-2xl">Contact Us</span>
                </div>
                <p className="text-gray-700 text-md leading-relaxed mb-2">
                    If you have any questions or need further assistance regarding our delivery of online reports (digital products), please do not hesitate to reach out to our Customer Support team at
                </p>
                <p className="text-md font-medium text-primary">support@globalbizreport.com</p>
                <p className="text-gray-600 text-md mt-2">We’re here to ensure your satisfaction.</p>


            </section>

            {/* Disclaimer */}
            <section className="text-gray-600 text-md text-center mt-12 px-4">
                <FaFileAlt className="text-primary mx-auto text-2xl mb-2" />
                <p>
                    <strong>GlobalBizReport.com</strong> reserves the right to modify this policy at any time
                    without prior notice. Please review this page periodically for updates.
                </p>
                <p className="mt-4 font-semibold text-green-700">
                    Thank you for choosing GlobalBizReport.com.
                </p>
                <p>Your trust in our services is greatly appreciated.</p>
            </section>
        </div>
    );
}


export const metadata = {
    title: "Shipping and Delivery | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "Shipping and Delivery",
        description: "What we do at Global Biz Report.",
        url: "https://globalbizreport.com/shipping-policy",
        siteName: "Global Biz Report",
        type: "website",
    },
};
