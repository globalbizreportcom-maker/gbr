import Head from "next/head";
import { FaUndoAlt, FaEnvelope } from "react-icons/fa";

export default function RefundPolicy() {
    return (
        <>
            <Head>
                <title>Refund Policy | Global Biz Report</title>
                <meta
                    name="description"
                    content="Read the refund and return policy for digital business credit reports at GlobalBizReport.com. Transparency and customer support guaranteed."
                />
                <meta
                    name="keywords"
                    content="GBR, Global Biz Report, Refund Policy, Return Policy, Digital Products"
                />
                <meta name="robots" content="index, follow" />
            </Head>

            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Title */}
                <div className="text-center mb-12">
                    <FaUndoAlt className="text-primary text-4xl mx-auto mb-3" />
                    <h1 className="text-3xl font-bold text-primary">Refund Policy</h1>
                    <p className="text-gray-600 mt-2 text-md max-w-4xl mx-auto">
                        At GlobalBizReport.com, we are committed to providing our customers with high-quality online business information reports. We understand that situations may arise where a refund or return is necessary. To ensure transparency and your confidence in buying reports from GlobalBizReport, we have outlined our Refund Policy for digital products below.
                    </p>
                </div>

                {/* Section 1 */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Refund Eligibility</h2>
                    <p className="text-gray-700 text-md mb-2">
                        We offer refunds under the following circumstances:
                    </p>
                    <ul className="text-gray-700 text-md list-disc pl-6 space-y-2">
                        <li>
                            <strong>Incorrect Report:</strong> If you receive an incorrect report that does not
                            match the company details provided by you, please contact our Customer Support team
                            within 7 days of purchase. We will promptly investigate the issue and, if warranted,
                            issue a full refund.
                        </li>
                        <li>
                            <strong>Technical Issues:</strong> If you encounter technical difficulties preventing
                            you from accessing the purchased report that was sent digitally via email, please
                            inform us within 7 days. If resolution is not possible, we will issue a refund.
                        </li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Requesting a Refund</h2>
                    <p className="text-gray-700 text-md mb-2">
                        To request a refund, please follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 text-gray-700 text-md space-y-2">
                        <li>
                            <strong>Contact Customer Support:</strong> Email us at{" "}
                            <span className="text-primary font-medium">support@globalbizreport.com</span> with:
                            <ul className="list-disc pl-6 mt-1">
                                <li>Your order number</li>
                                <li>The reason for the refund request</li>
                                <li>Any relevant information about the issue</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Verification:</strong> Our team will review your request and may request
                            further information to validate the claim.
                        </li>
                        <li>
                            <strong>Refund Processing:</strong> Upon approval, we will process your refund within{" "}
                            <span className="font-medium">10 business days</span> to your original payment method.
                        </li>
                    </ol>
                </section>

                {/* Section 3 */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Non-Eligible Refunds</h2>
                    <p className="text-gray-700 text-md mb-2">
                        We do <strong>not</strong> provide refunds in the following cases:
                    </p>
                    <ul className="text-gray-700 text-md list-disc pl-6 space-y-2">
                        <li>A change of mind or if you no longer need the report</li>
                        <li>Failure to contact us within 7 days of purchase</li>
                        <li>Violation of our terms of use or licensing agreements</li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Contact Us</h2>
                    <div className="flex items-center gap-2 text-primary font-medium text-md mb-1">
                        <FaEnvelope />
                        support@globalbizreport.com
                    </div>
                    <p className="text-gray-700 text-md">
                        If you need any help regarding our Refund & Returns Policy, don’t hesitate to reach out.
                        We’re here to assist you and ensure your satisfaction.
                    </p>
                </section>

                {/* Disclaimer */}
                <section className="text-center text-xs text-gray-500 border-t pt-6 mt-10">
                    GlobalBizReport.com reserves the right to modify this policy at any time without prior
                    notice. Please review this page periodically for any updates.
                    <p className="mt-3 text-gray-600 font-medium">
                        Thank you for choosing GlobalBizReport.com.
                    </p>
                </section>
            </div>
        </>
    );
}
