
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { FaFile } from "react-icons/fa";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    const { companyName, cin, state, country } = params; // include country if in URL

    let companyData = null;
    try {
        const cleanedState = state?.replace(/[^a-zA-Z0-9\s]/g, " ") || "";

        const res = await fetch(
            `https://backend.globalbizreport.com/api/company-details?query=${decodeURIComponent(
                companyName.replace(/-/g, " ")
            )}&state=${encodeURIComponent(cleanedState)}&cin=${cin}`,
            { cache: "no-store" }
        );

        const data = await res.json();
        companyData = data[0] || null;
    } catch (err) {
        console.log("Error fetching company data for metadata:", err);
    }

    const companyDisplayName = companyData
        ? capitalizeWords(companyData.CompanyName)
        : "Company";

    // Build dynamic URL
    const safeCompanyName = encodeURIComponent(
        companyData?.CompanyName?.trim().replace(/\s+/g, "-") || "unknown"
    );
    const safeCin = encodeURIComponent(companyData?.CIN || "na");
    const safeState = encodeURIComponent(
        (companyData?.CompanyStateCode || "na").trim().toLowerCase().replace(/\s+/g, "-")
    );
    const safeCountry = encodeURIComponent(
        (companyData?.CompanyIndian?.["Foreign Company"] ||
            companyData?.["CompanyIndian/Foreign Company"] ||
            "na").trim().toLowerCase()
    );

    const url = `https://www.globalbizreport.com/${safeCompanyName}/${safeCin}/${safeCountry}/${safeState}/company-business-financial-credit-report`;

    return {
        title: `${companyDisplayName} - Business Credit Report`,
        description: `Get reliable business insights, credit info for ${companyDisplayName}.`,
        keywords: ["GBR", "Global Biz Report", companyDisplayName],
        openGraph: {
            title: `${companyDisplayName} - Business Credit Report`,
            description: `Get reliable business insights, credit info for ${companyDisplayName}.`,
            url,
            siteName: "Global Biz Report",
            type: "website",
        },
    };
}




const CompanyPage = async ({ params }) => {

    const { companyName, cin, state } = await params; // ✅ works in server component

    let companyData = null;

    try {

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
                {/* <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Trust in our reliable reports to gain valuable insights into potential
                    partners, customers, and vendors, ensuring a secure and thriving business
                    future.
                </p> */}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-6 gap-y-5">

                {/* <div className="md:col-span-3 overflow-y-auto max-h-[70vh]"> */}


                <div className="md:col-span-3">

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
                                        className={`flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md ${label === "Address" ? "items-start" : ""
                                            }`}
                                    >
                                        <span className="font-medium text-gray-400">{label}:</span>
                                        <span className={`text-gray-900 mt-1 sm:mt-0 ${label === "Address" ? "break-words w-full sm:max-w-[70%]" : "sm:text-right break-words"}`}>
                                            {value || "N/A"}
                                        </span>
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
                            {" "}operating under the{" "}
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
                            <span className="font-medium break-words">{companyData.Registered_Office_Address || "N/A"}</span>,
                            located in{" "}
                            <span className="font-medium">{companyData.CompanyStateCode || "N/A"}</span>.
                            Structurally, the company is recognized as{" "}
                            <span className="font-medium">{companyData.CompanyIndian?.["Foreign Company"] || companyData["CompanyIndian/Foreign Company"] || "N/A"}</span>,
                            with financial backing that includes an authorized capital of{" "}
                            <span className="font-medium">₹{companyData.AuthorizedCapital || "N/A"}</span>
                            {" "} and a paid-up capital of{" "}
                            <span className="font-medium">₹{companyData.PaidupCapital || "N/A"}</span>.
                        </p>

                        <div
                            className="btn btn-primary px-6 py-3 z-11 text-base font-medium hidden md:flex items-center gap-2 w-fit"
                        >
                            <FaFile className="h-5 w-5" />
                            <ClientPurchaseButton companyData={companyData} label='Buy Report' bgColor='primary' overlay={1} />
                        </div>
                    </div>
                </div>
                {/* </div> */}


                <div className="md:col-span-1 flex flex-col items-center justify-start gap-4 p-6 bg-white text-center">

                    {/* Icon */}
                    <div className="text-primary text-6xl">
                        <FaFile className="text-gray-300" />
                    </div>

                    {/* Text */}
                    <p className="text-3xl font-semibold text-gray-400">
                        Buy a Credit Report to find out more about this business.
                    </p>

                    {/* Button */}
                    <div
                        className="btn btn-primary px-6 py-3 text-base font-medium  flex items-center gap-2 w-fit"
                    >
                        <FaFile className="h-5 w-5" />
                        <ClientPurchaseButton companyData={companyData} label='Buy Report' bgColor='primary' overlay={1} />
                    </div>
                </div>



            </div>

            <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-between xl:justify-end  items-center shadow-lg z-50">
                <div
                    className="bg-orange-500 rounded-md px-2 text-base font-medium flex items-center gap-2"
                >
                    <FaFile className="h-5 w-5" />
                    <ClientPurchaseButton companyData={companyData} label='Order Freshly Investigated Business Credit Report' bgColor='orange' />
                </div>

            </div>

        </div>
    );
};

export default CompanyPage;

