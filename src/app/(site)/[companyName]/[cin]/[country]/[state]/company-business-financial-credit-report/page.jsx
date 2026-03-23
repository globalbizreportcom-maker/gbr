import EditedCompany from "@/components/EditedCompany";
import SelfReportButton from "@/components/SelfReportButton";
import ClaimButton from "@/components/buttons/ClaimButton";
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
import { capitalizeWords } from "@/utils/capitalizeWords";
import Link from "next/link";
import { FaCheckCircle, FaFile, FaUserAlt } from "react-icons/fa";

export const dynamic = "force-dynamic";


export async function generateMetadata({ params }) {
    const { cin } = params;

    let companyData = null;
    let fetchError = null;

    try {
        const res = await fetch(
            `https://backend.globalbizreport.com/api/company-details?cin=${cin}`,
            { cache: "no-store" } // fresh data
        );
        const result = await res.json();

        if (!res.ok) {
            fetchError = `Failed to fetch company details: ${res.status}`;
        } else if (result.data) {

            const pg = result.data.postgres; // PostgreSQL company data
            companyData = pg;

        }

    } catch (err) {
        console.log("Error fetching company metadata:", err);
    }

    return {
        title: companyData
            ? `${companyData.companyname} | GBR`
            : "Company Report | GBR",
        description: companyData
            ? `Check ${companyData.companyname}'s financial profile and order a detailed company report.`
            : "Check company profile information and order a comprehensive company report.",
    };
}


const CompanyPage = async ({ params }) => {

    const { cin } = params; // no await

    let companyData = null;
    let editedCompany = null;
    let claimedCompany = null;
    let fetchError = null;

    console.log(claimedCompany);

    if (cin) {

        try {

            const res = await fetch(
                `https://backend.globalbizreport.com/api/company-details?cin=${cin}`,
                { cache: "no-store" }
            );

            const result = await res.json();

            if (!res.ok) {
                fetchError = `Failed to fetch company details: ${res.status}`;
            } else if (result.data) {

                const pg = result.data.postgres; // PostgreSQL company data

                companyData = pg;
                editedCompany = result.data.editedCompany
                claimedCompany = result.claimedCompany

            }
        } catch (err) {
            console.log("Error fetching company data:", err);
        }

        if (!companyData) {
            return (
                <>

                    <p className="text-center text-gray-600 py-10 mt-20 min-h-screen">
                        No company found.
                    </p>

                    <button>
                        Refresh the page to fetch the data/ Search the company again!
                    </button>
                </>
            );
        }

    }

    if (!cin) {
        return <p className="text-center"> Loading</p>
    }

    if (!companyData) {
        return <p className="text-center text-gray-600 py-10 mt-20">No company found.</p>;
    }

    if (claimedCompany) {
        return <EditedCompany govtData={companyData} editedValue={editedCompany} />
    } else {

        return (

            <div className="max-w-6xl mx-auto flex flex-col pb-24 bg-gray-50 rounded-lg min-h-svh">
                <div className="w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">
                    <div className="text-black text-md font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto">
                        Check Company Profile information
                    </div>
                    <h2 className="max-w-2xl mx-auto text-xl md:text-2xl font-bold mb-6 text-center">
                        <span className="text-primary">{companyData.companyname}</span>
                    </h2>
                    <div className="btn btn-primary px-6 py-3 text-base font-medium justify-center mx-auto flex items-center gap-2 w-fit">
                        <FaFile className="h-5 w-5" />
                        <ClientPurchaseButton
                            companyData={companyData}
                            label="Buy Full Company Due-Diligence Report"
                            bgColor="primary"
                            overlay={1}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-6 gap-y-5">
                    <div className="md:col-span-3">
                        {/* Company Details & Overview */}
                        <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
                            <div className="mb-8">
                                <h1 className="text-xl font-bold text-gray-900">{companyData.companyname}</h1>
                            </div>

                            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 border-b border-gray-200 pb-2">
                                Company Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {/* Left Column */}
                                <div className="space-y-2 sm:space-y-3">
                                    {[
                                        ["CIN", companyData.cin],
                                        ["State Code", companyData.companystatecode],
                                        ["Status", companyData.companystatus],
                                        ["Category", companyData.companycategory],
                                        ["Sub Category", companyData.companysubcategory],
                                        ["Class", companyData.companyclass],
                                        ["ROC Code", companyData.companyroccode],
                                        ["Listing Status", companyData.listingstatus],
                                        ["NIC Code", companyData.nic_code],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                                        >
                                            <span className="font-medium text-gray-400">{label}:</span>
                                            <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">
                                                {value || "N/A"}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Column */}
                                <div className="space-y-2 sm:space-y-3">
                                    {[
                                        ["Company Name", companyData.companyname],
                                        ["Incorporation Date", companyData.companyregistrationdate_date],
                                        ["Address", companyData.registered_office_address],
                                        ["Industrial Classification", companyData.companyindustrialclassification],
                                        ["Indian/Foreign", companyData['CompanyIndian/Foreign Company'] || 'Indian'],
                                        ["Paid-up Capital", companyData.paidupcapital],
                                        ["Authorized Capital", companyData.authorizedcapital],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className={`flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md ${label === "Address" ? "items-start" : ""
                                                }`}
                                        >
                                            <span className="font-medium text-gray-400">{label}:</span>
                                            <span
                                                className={`text-gray-900 mt-1 sm:mt-0 ${label === "Address" ? "break-words w-full sm:max-w-[70%]" : "sm:text-right break-words"
                                                    }`}
                                            >
                                                {value || "N/A"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Company Overview */}
                        <div className="bg-white p-6 text-gray-800 space-y-4">
                            <h2 className="text-xl font-semibold mb-2">Company Overview</h2>
                            <p className="leading-relaxed">
                                <span className="font-medium">{companyData.companyname}</span>,
                                incorporated on{" "}
                                <span className="font-medium">{companyData.companyregistrationdate_date}</span>,
                                is a <span className="font-medium">{companyData.companycategory}</span> operating under the{" "}
                                <span className="font-medium">{companyData.companysubcategory}</span> category. Legally registered as a{" "}
                                <span className="font-medium">{companyData.companyclass}</span>, the company falls under the jurisdiction of the
                                Registrar of Companies, <span className="font-medium">{companyData.companyroccode}</span>. The official Corporate
                                Identification Number (CIN) is <span className="font-medium">{companyData.cin}</span>, and its current status is
                                recorded as <span className="font-medium">{companyData.companystatus}</span>. Established with compliance to
                                Indian corporate laws, the organization has maintained its presence as a{" "}
                                <span className="font-medium">{companyData.listingstatus}</span> entity.
                            </p>

                            <p className="leading-relaxed break-words">
                                The company is engaged in <span className="font-medium">{companyData.companyindustrialclassification}</span>,
                                with its primary operations identified under NIC code <span className="font-medium">{companyData.nic_code}</span>.
                                Its registered office is situated at{" "}
                                <span className="font-medium break-words">{companyData.registered_office_address}</span>, located in{" "}
                                <span className="font-medium">{companyData.companystatecode}</span>. Structurally, the company is recognized as{" "}
                                <span className="font-medium">{companyData['CompanyIndian/Foreign Company'] || 'Indian'}</span>, with financial backing that includes an
                                authorized capital of <span className="font-medium">₹{companyData.authorizedcapital}</span> and a paid-up capital of{" "}
                                <span className="font-medium">₹{companyData.paidupcapital}</span>.
                            </p>

                            <div className="btn btn-primary px-6 py-3 z-11 text-base font-medium items-center gap-2 w-fit">
                                <FaFile className="h-5 w-5" />
                                <ClientPurchaseButton
                                    companyData={companyData}
                                    label="Buy a Company Due-Diligence Report"
                                    bgColor="primary"
                                    overlay={1}
                                />
                            </div>
                        </div>

                        {/* Self Report Section */}
                        <div className="flex flex-col items-left text-left p-5">
                            <h2 className="text-xl font-semibold text-black mb-2">What is Self Company Report?</h2>
                            <h2 className="text-base text-gray-800 mb-4">
                                You may want to get a clear understanding of your company’s financial strength, trust score, and potential risks with a detailed credit report. It shows how buyers, investors, and partners perceive your business, helping you identify weaknesses, improve credibility, and confidently present your company for better deals and long-term growth.
                            </h2>
                            <button className="btn btn-md btn-warning shadow-2xl rounded-md px-5 w-fit">
                                <SelfReportButton />
                            </button>
                        </div>
                    </div>

                    {/* Right Banners */}
                    <div className="md:col-span-1 flex flex-col items-center justify-start gap-6 p-2">

                        {/* Banner 3 */}
                        {/* <div
                            className="relative w-full rounded-xl overflow-hidden shadow-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                <p className="text-md font-semibold text-gray-300 leading-relaxed mb-4">
                                    Order a Comprehensive Business Information Report for detailed company insights
                                </p>

                                <ClaimButton company={companyData} />
                            </div>
                        </div> */}

                        {/* Banner 1 */}
                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                <p className="text-md font-semibold text-gray-300 leading-relaxed mb-4">
                                    Order a Comprehensive Business Information Report for detailed company insights
                                </p>
                                <div className="btn btn-primary px-6 py-3 text-base font-medium flex items-center gap-2">
                                    <FaFile className="h-5 w-5" />
                                    <ClientPurchaseButton companyData={companyData} label="Order Full Company Report" bgColor="primary" overlay={1} />
                                </div>
                            </div>
                        </div>

                        {/* Banner 2 */}
                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70"></div>
                            <div className="relative z-10 text-left p-5 flex flex-col items-start">
                                <p className="text-md font-semibold text-gray-300 leading-relaxed mb-4">
                                    Buy a Credit Report of your own company to boost credibility and trustworthiness.
                                </p>
                                <button className="btn btn-md btn-warning shadow-2xl rounded-md px-5 w-fit">
                                    <SelfReportButton label="Get Self Report" />
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* Bottom Fixed CTA */}
                    <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-between xl:justify-end items-center shadow-lg z-50">
                        <div className="bg-orange-500 rounded-md px-2 text-base font-medium flex items-center gap-2">
                            <FaFile className="h-5 w-5" />
                            <ClientPurchaseButton
                                companyData={companyData}
                                label="Order Business Credit Report For This Company."
                                bgColor="orange"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Info Section */}
                <div className="w-full px-4 py-8 bg-white space-y-6">
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-600 mt-1" />
                        <p className="text-gray-700 leading-relaxed text-base">
                            Check basic information about a company and order a Freshly Investigated Company Credit Report to get detailed and verified insights about the business.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-600 mt-1" />
                        <p className="text-gray-700 leading-relaxed text-base">
                            GBR provides a comprehensive Business Credibility Report on any company—your suppliers, buyers, potential partners, or competitors—helping you make smarter business decisions.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Empowering Your Decisions with Freshly Investigated Reports and Insights
                        </h3>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-600 mt-1" />
                        <p className="text-gray-700 leading-relaxed text-base">
                            Get business insights into your suppliers, buyers, vendors, and competitors. Receive accurate, verified data and actionable insights to drive smarter business decisions.
                        </p>
                    </div>
                </div>
            </div>
        );

    }
};

export default CompanyPage;