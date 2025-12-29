
import { Suspense } from "react";
import OrderSuccessPage from "@/components/OrderSuccessPage";

export const metadata = {
    title: "Order Success | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "order success",
        description: "What we do at Global Biz Report.",
        url: "https://globalbizreport.com/order-success",
        siteName: "Global Biz Report",
        type: "website",
    },
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <OrderSuccessPage />
        </Suspense>
    )
}
