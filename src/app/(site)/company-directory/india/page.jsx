import { Suspense } from "react";
import CompanyDirectory from "@/components/CompanyDirectory";

export const metadata = {
    title: "Company Directory | Global Biz Report",
    description: "Browse all Indian companies by state, industry, and type.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <CompanyDirectory />
        </Suspense>
    );
}
