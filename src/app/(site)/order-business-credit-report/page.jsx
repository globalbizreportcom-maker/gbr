import OrderCreditReportClient from "@/components/OrderCreditReportClient";
import React from "react";

export const metadata = {
    title: "order business credit report | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "order business credit report",
        description: "What we do at Global Biz Report.",
        url: "https://www.globalbizreport.com/order-business-credit-report",
        siteName: "Global Biz Report",
        type: "website",
    },
};

export default function OrderCreditReportPage() {
    return <OrderCreditReportClient />;
}
