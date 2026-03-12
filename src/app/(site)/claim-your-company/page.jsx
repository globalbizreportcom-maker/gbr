import ClaimyourCompanyClient from "@/components/ClaimyourCompanyClient";


export const metadata = {
    title: "Claim Your Company | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "Claim Your Company",
        description: "What we do at Global Biz Report.",
        url: "https://www.globalbizreport.com/order-business-credit-report",
        siteName: "Global Biz Report",
        type: "website",
    },
};

export default function ClaimyourCompany() {
    return <ClaimyourCompanyClient />
}
