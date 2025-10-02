// 'use client';

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { FaLock } from "react-icons/fa";

// const API_BASE =
//     "https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a";
// const API_KEY = "579b464db66ec23bdd000001fb32a8e4a50f47956e1cb75ccdabfa2e";

// const CompanyPage = () => {
//     let { companyName, cin, country, state } = useParams();

//     const stateCode = state;
//     const router = useRouter();

//     const [companyData, setCompanyData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!companyName || !stateCode) return;

//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(API_BASE, {
//                     params: {
//                         "api-key": API_KEY,
//                         format: "json",
//                         limit: 5000,
//                         offset: 0,
//                         "filters[CompanyName]": decodeURIComponent(companyName.replace(/-/g, " ")),
//                         "filters[CompanyStateCode]": stateCode.toLowerCase(),
//                     },
//                 });
//                 console.log(API_BASE, {
//                     params: {
//                         "api-key": API_KEY,
//                         format: "json",
//                         limit: 5000,
//                         offset: 0,
//                         "filters[CompanyName]": decodeURIComponent(companyName.replace(/-/g, " ")),
//                         "filters[CompanyStateCode]": stateCode.toUpperCase(),
//                     },
//                 });
//                 setCompanyData(res.data.records?.[0] || null);
//             } catch (error) {
//                 console.log("❌ Error fetching company data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [companyName, stateCode]);


//     const handlePurchaseReport = () => {
//         if (!companyData) return;

//         const addressParts = companyData.Registered_Office_Address
//             ?.split(",")
//             .map(p => p.trim()) || [];

//         // Extract last part (Country & Postal)
//         let countryLabel = "";
//         let postalCode = "";
//         if (addressParts.length > 0) {
//             const lastPart = addressParts[addressParts.length - 1]; // "400710-India"
//             const splitLast = lastPart.split("-");
//             if (splitLast.length === 2) {
//                 postalCode = splitLast[0].trim();
//                 countryLabel = splitLast[1].trim();
//             } else {
//                 countryLabel = lastPart.trim();
//             }
//         }

//         const stateLabel = addressParts[addressParts.length - 3] || "";
//         const cityLabel = addressParts[addressParts.length - 4] || "";

//         const formData = {
//             companyName: companyData.CompanyName || "",
//             address: companyData.Registered_Office_Address || "",
//             city: cityLabel,
//             state: stateLabel,
//             country: {
//                 label: countryLabel,
//                 value: countryLabel.toLowerCase(),
//             },
//             postalCode: postalCode || "",
//             telephone: "",
//             website: "",
//             contactName: "",
//             contactEmail: "",
//             contactCountry: {
//                 label: countryLabel,
//                 value: countryLabel.toLowerCase(),
//             },
//             contactPhone: "",
//             contactCompany: "",
//             agreedToTerms: true,
//         };

//         // Save to localStorage
//         localStorage.setItem("gbr_form", JSON.stringify(formData));

//         // Navigate to order report page
//         router.push("/order-business-credit-report");
//     };





//     if (loading) return <p className="min-h-svh text-gray-900 text-center items-center" >Loading...</p>;
//     if (!companyData) return <p>No company found.</p>;

//     return (
//         <div className="max-w-6xl mx-auto flex flex-col pb-24 bg-gray-50 rounded-lg min-h-svh"  >

//             <div className="w-full rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">

//                 <div className="text-black text-md  font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto">
//                     Order Freshly Investigated Business Credit Report
//                 </div>

//                 <h2 className=" max-w-2xl mx-auto text-xl md:text-2xl font-bold mb-6 text-center">
//                     <span className="text-primary">{companyData.CompanyName}</span>
//                 </h2>
//                 <p className="text-gray-600 text-center max-w-2xl mx-auto">
//                     Trust in our reliable reports to gain valuable insights into potential partners, customers and vendors, ensuring a secure and thriving business future.
//                 </p>
//             </div>


//             {/* Company Details Grid */}
//             <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 ">
//                 <div className="mb-8"> <h1 className="text-xl font-bold text-gray-900">{companyData.CompanyName}</h1> </div>

//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 border-b border-gray-200 pb-2">
//                     Company Details
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                     {/* Left Column */}
//                     <div className="space-y-2 sm:space-y-3">
//                         {[
//                             ["CIN", companyData.CIN],
//                             ["State Code", companyData.CompanyStateCode],
//                             ["Status", companyData.CompanyStatus],
//                             ["Category", companyData.CompanyCategory],
//                             ["Sub Category", companyData.CompanySubCategory],
//                             ["Class", companyData.CompanyClass],
//                             ["ROC Code", companyData.CompanyROCcode],
//                             ["Listing Status", companyData.Listingstatus],
//                             ["NIC Code", companyData.nic_code],
//                         ].map(([label, value]) => (
//                             <div
//                                 key={label}
//                                 className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md "
//                             >
//                                 <span className="font-medium text-gray-400">{label}:</span>
//                                 <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">{value || "N/A"}</span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Right Column */}
//                     <div className="space-y-2 sm:space-y-3">
//                         {[
//                             ["Company Name", companyData.CompanyName],
//                             ["Incorporation Date", companyData.CompanyRegistrationdate_date],
//                             ["Address", companyData.Registered_Office_Address],
//                             ["Industrial Classification", companyData.CompanyIndustrialClassification],
//                             ["Indian/Foreign", companyData["CompanyIndian/Foreign Company"]],
//                             ["Paid-up Capital", companyData.PaidupCapital],
//                             ["Authorized Capital", companyData.AuthorizedCapital],
//                         ].map(([label, value]) => (
//                             <div
//                                 key={label}
//                                 className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md "
//                             >
//                                 <span className="font-medium text-gray-400">{label}:</span>
//                                 <span className="text-gray-900 sm:text-right mt-1 sm:mt-0 break-words">{value || "N/A"}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>

//             <div className="bg-white p-6 text-gray-800 space-y-4">
//                 <h2 className="text-xl font-semibold mb-2">Company Overview</h2>

//                 {/* First Paragraph */}
//                 <p className="leading-relaxed">
//                     <span className="font-medium">{companyData.CompanyName || "This company"}</span>,
//                     incorporated on{" "}
//                     <span className="font-medium">{companyData.CompanyRegistrationdate_date || "N/A"}</span>,
//                     is a{" "}
//                     <span className="font-medium">{companyData.CompanyCategory || "N/A"}</span>
//                     operating under the{" "}
//                     <span className="font-medium">{companyData.CompanySubCategory || "N/A"}</span> category.
//                     Legally registered as a{" "}
//                     <span className="font-medium">{companyData.CompanyClass || "N/A"}</span>,
//                     the company falls under the jurisdiction of the Registrar of Companies,{" "}
//                     <span className="font-medium">{companyData.CompanyROCcode || "N/A"}</span>.
//                     The official Corporate Identification Number (CIN) is{" "}
//                     <span className="font-medium">{companyData.CIN || "N/A"}</span>,
//                     and its current status is recorded as{" "}
//                     <span className="font-medium">{companyData.CompanyStatus || "N/A"}</span>.
//                     Established with compliance to Indian corporate laws, the organization has maintained
//                     its presence as a{" "}
//                     <span className="font-medium">{companyData.Listingstatus || "Unlisted"}</span> entity.
//                 </p>

//                 {/* Second Paragraph */}
//                 <p className="leading-relaxed">
//                     The company is engaged in{" "}
//                     <span className="font-medium">{companyData.CompanyIndustrialClassification || "N/A"}</span>,
//                     with its primary operations identified under NIC code{" "}
//                     <span className="font-medium">{companyData.nic_code || "N/A"}</span>.
//                     Its registered office is situated at{" "}
//                     <span className="font-medium">{companyData.Registered_Office_Address || "N/A"}</span>,
//                     located in{" "}
//                     <span className="font-medium">{companyData.CompanyStateCode || "N/A"}</span>.
//                     Structurally, the company is recognized as{" "}
//                     <span className="font-medium">{companyData["CompanyIndian/Foreign Company"] || "N/A"}</span>,
//                     with financial backing that includes an authorized capital of{" "}
//                     <span className="font-medium">₹{companyData.AuthorizedCapital || "N/A"}</span>
//                     and a paid-up capital of{" "}
//                     <span className="font-medium">₹{companyData.PaidupCapital || "N/A"}</span>.
//                     These financial details reflect the foundation upon which the company carries out its
//                     commercial and industrial activities.
//                 </p>
//             </div>



//             {/* Sticky Buy Report Bar */}
//             <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white p-4 flex justify-between items-center shadow-lg z-50">
//                 <div>
//                     <p className="font-medium">Order Freshly Investigated Business Credit Report
//                         {/* for */}
//                         {/* {companyData.CompanyName} */}
//                     </p>
//                 </div>
//                 <button onClick={handlePurchaseReport} className="cursor-pointer flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition">
//                     <FaLock />
//                     Purchase
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CompanyPage;


// src/app/(site)/[companyName]/[cin]/[country]/[state]/page.jsx
import ClientPurchaseButton from "@/utils/ClientPurchaseButton";
import { FaLock } from "react-icons/fa";

export const dynamic = "force-dynamic"; // Ensures SSR for dynamic content

const CompanyPage = async ({ params }) => {
    const { companyName, cin, country, state } = params;

    // Fetch company data server-side
    const API_BASE =
        "https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a";
    const API_KEY = "579b464db66ec23bdd000001fb32a8e4a50f47956e1cb75ccdabfa2e";

    let companyData = null;

    try {
        const res = await fetch(
            `${API_BASE}?api-key=${API_KEY}&format=json&limit=5000&offset=0&filters[CompanyName]=${decodeURIComponent(
                companyName.replace(/-/g, " ")
            )}&filters[CompanyStateCode]=${state.toLowerCase()}`,
            { cache: "no-store" } // dynamic fetch
        );
        const data = await res.json();
        companyData = data.records?.[0] || null;
    } catch (err) {
        console.error("Error fetching company data:", err);
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
                    partners, customers and vendors, ensuring a secure and thriving business
                    future.
                </p>
            </div>

            {/* Company Details & Overview */}
            {/* Company Details Grid */}
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 ">
                <div className="mb-8"> <h1 className="text-xl font-bold text-gray-900">{companyData.CompanyName}</h1> </div>

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
                                className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md "
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
                            ["Indian/Foreign", companyData["CompanyIndian/Foreign Company"]],
                            ["Paid-up Capital", companyData.PaidupCapital],
                            ["Authorized Capital", companyData.AuthorizedCapital],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-md "
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

                {/* First Paragraph */}
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

                {/* Second Paragraph */}
                <p className="leading-relaxed">
                    The company is engaged in{" "}
                    <span className="font-medium">{companyData.CompanyIndustrialClassification || "N/A"}</span>,
                    with its primary operations identified under NIC code{" "}
                    <span className="font-medium">{companyData.nic_code || "N/A"}</span>.
                    Its registered office is situated at{" "}
                    <span className="font-medium">{companyData.Registered_Office_Address || "N/A"}</span>,
                    located in{" "}
                    <span className="font-medium">{companyData.CompanyStateCode || "N/A"}</span>.
                    Structurally, the company is recognized as{" "}
                    <span className="font-medium">{companyData["CompanyIndian/Foreign Company"] || "N/A"}</span>,
                    with financial backing that includes an authorized capital of{" "}
                    <span className="font-medium">₹{companyData.AuthorizedCapital || "N/A"}</span>
                    and a paid-up capital of{" "}
                    <span className="font-medium">₹{companyData.PaidupCapital || "N/A"}</span>.
                    These financial details reflect the foundation upon which the company carries out its
                    commercial and industrial activities.
                </p>
            </div>
            {/* Sticky Purchase Button as Client Component */}
            <ClientPurchaseButton companyData={companyData} />
        </div>
    );
};

export default CompanyPage;

export async function generateMetadata({ params }) {
    const { companyName, state } = params;

    const API_BASE =
        "https://api.data.gov.in/resource/4dbe5667-7b6b-41d7-82af-211562424d9a";
    const API_KEY = "579b464db66ec23bdd000001fb32a8e4a50f47956e1cb75ccdabfa2e";

    let companyData = null;

    try {
        const res = await fetch(
            `${API_BASE}?api-key=${API_KEY}&format=json&limit=5000&offset=0&filters[CompanyName]=${decodeURIComponent(
                companyName.replace(/-/g, " ")
            )}&filters[CompanyStateCode]=${state.toLowerCase()}`,
            { cache: "no-store" }
        );

        const data = await res.json();
        companyData = data.records?.[0] || null;
    } catch (err) {
        console.error(err);
    }

    if (!companyData) {
        return {
            title: "Company Not Found",
            description: "The requested company could not be found.",
        };
    }

    return {
        title: `${companyData.CompanyName} | Business Credit Report`,
        description: `Check the detailed business credit report for ${companyData.CompanyName}, located in ${companyData.CompanyStateCode}. Verify CIN, status, category, and more.`,
        openGraph: {
            title: `${companyData.CompanyName} | Business Credit Report`,
            description: `Detailed business credit report for ${companyData.CompanyName}. Verify company details, CIN, status, category, and more.`,
            url: `https://www.globalbizreport.com/${companyName}/${companyData.CIN}/${companyData["CompanyIndian/Foreign Company"]}/${state}/order-credit-report`,
            siteName: "Global Business Reports",
            images: [
                {
                    url: "/logo.png", // You can use dynamic image per company later
                    width: 800,
                    height: 600,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${companyData.CompanyName} | Business Credit Report`,
            description: `Detailed business credit report for ${companyData.CompanyName}. Verify company details, CIN, status, category, and more.`,
            images: ["/logo.png"],
        },
    };
}

