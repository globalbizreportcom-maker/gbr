
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";

export const dynamic = "force-dynamic";

// export async function generateMetadata({ params }) {
//     const { companyName } = params;
//     const decodedName = decodeURIComponent(companyName.replace(/-/g, " "));

//     return {
//         title: `${decodedName} | Business Credit Report`,
//         description: `Get a detailed business credit report and insights for ${decodedName}. Build trust and make informed business decisions.`,
//     };
// }

const CompanyPage = async ({ params }) => {
    const { companyName, cin, state } = await params; // ✅ works in server component

    let companyData = null;

    try {
        // const res = await fetch(
        //     `https://backend.globalbizreport.com/api/company-details?query=${decodeURIComponent(
        //         companyName.replace(/-/g, " ")
        //     )}&state=${state}&cin=${cin}`,
        //     { cache: "no-store" }
        // );

        const cleanedState = state
            ?.replace(/[^a-zA-Z0-9\s]/g, " ") || ""; // trim any extra spaces

        const res = await fetch(
            `https://backend.globalbizreport.com/api/company-details?query=${decodeURIComponent(
                companyName.replace(/-/g, " ")
            )}&state=${encodeURIComponent(cleanedState)}&cin=${cin}`,
            { cache: "no-store" }
        );

        const data = await res.json();
        companyData = data[0] || null;
    } catch (err) {
        console.log("Error fetching company data:", err);
    }

    if (!companyData) {
        return <p className="text-center mt-20">No company found.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col pb-24 bg-gray-50 rounded-lg min-h-svh">
            <div className="w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">
                <div className="text-black text-md font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto">
                    Order Freshly Investigated Business Credit Report
                </div>
                <h2 className="max-w-2xl mx-auto text-xl md:text-2xl font-bold mb-6 text-center">
                    <span className="text-primary">{companyData.CompanyName}</span>
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Trust in our reliable reports to gain valuable insights into potential
                    partners, customers, and vendors, ensuring a secure and thriving business
                    future.
                </p>
            </div>

            {/* Company Details & Overview */}
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 ">
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-900">{companyData.CompanyName}</h1>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 border-b border-gray-200 pb-2">
                    Company Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Left Column */}
                    <div className="space-y-2 sm:space-y-3">
                        {[
                            ["CIN", companyData.CIN],
                            ["State Code", companyData.CompanyStateCode],
                            ["Status", companyData.CompanyStatus],
                            ["Category", companyData.CompanyCategory],
                            ["Sub Category", companyData.CompanySubCategory],
                            ["Class", companyData.CompanyClass],
                            ["ROC Code", companyData.CompanyROCcode],
                            ["Listing Status", companyData.Listingstatus],
                            ["NIC Code", companyData.nic_code],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                            >
                                <span className="font-medium text-gray-400">{label}:</span>
                                <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">{value || "N/A"}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2 sm:space-y-3">
                        {[
                            ["Company Name", companyData.CompanyName],
                            ["Incorporation Date", companyData.CompanyRegistrationdate_date],
                            ["Address", companyData.Registered_Office_Address],
                            ["Industrial Classification", companyData.CompanyIndustrialClassification],
                            ["Indian/Foreign", companyData.CompanyIndian?.["Foreign Company"] || companyData["CompanyIndian/Foreign Company"]],
                            ["Paid-up Capital", companyData.PaidupCapital],
                            ["Authorized Capital", companyData.AuthorizedCapital],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                            >
                                <span className="font-medium text-gray-400">{label}:</span>
                                <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">{value || "N/A"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 text-gray-800 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Company Overview</h2>

                <p className="leading-relaxed">
                    <span className="font-medium">{companyData.CompanyName || "This company"}</span>,
                    incorporated on{" "}
                    <span className="font-medium">{companyData.CompanyRegistrationdate_date || "N/A"}</span>,
                    is a{" "}
                    <span className="font-medium">{companyData.CompanyCategory || "N/A"}</span>
                    operating under the{" "}
                    <span className="font-medium">{companyData.CompanySubCategory || "N/A"}</span> category.
                    Legally registered as a{" "}
                    <span className="font-medium">{companyData.CompanyClass || "N/A"}</span>,
                    the company falls under the jurisdiction of the Registrar of Companies,{" "}
                    <span className="font-medium">{companyData.CompanyROCcode || "N/A"}</span>.
                    The official Corporate Identification Number (CIN) is{" "}
                    <span className="font-medium">{companyData.CIN || "N/A"}</span>,
                    and its current status is recorded as{" "}
                    <span className="font-medium">{companyData.CompanyStatus || "N/A"}</span>.
                    Established with compliance to Indian corporate laws, the organization has maintained
                    its presence as a{" "}
                    <span className="font-medium">{companyData.Listingstatus || "Unlisted"}</span> entity.
                </p>

                <p className="leading-relaxed break-words">
                    The company is engaged in{" "}
                    <span className="font-medium">{companyData.CompanyIndustrialClassification || "N/A"}</span>,
                    with its primary operations identified under NIC code{" "}
                    <span className="font-medium">{companyData.nic_code || "N/A"}</span>.
                    Its registered office is situated at{" "}
                    <span className="font-medium">{companyData.Registered_Office_Address || "N/A"}</span>,
                    located in{" "}
                    <span className="font-medium">{companyData.CompanyStateCode || "N/A"}</span>.
                    Structurally, the company is recognized as{" "}
                    <span className="font-medium">{companyData.CompanyIndian?.["Foreign Company"] || companyData["CompanyIndian/Foreign Company"] || "N/A"}</span>,
                    with financial backing that includes an authorized capital of{" "}
                    <span className="font-medium">₹{companyData.AuthorizedCapital || "N/A"}</span>
                    and a paid-up capital of{" "}
                    <span className="font-medium">₹{companyData.PaidupCapital || "N/A"}</span>.
                </p>
            </div>

            <ClientPurchaseButton companyData={companyData} />
        </div>
    );
};

export default CompanyPage;
