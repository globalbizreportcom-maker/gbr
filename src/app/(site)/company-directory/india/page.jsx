// app/(site)/company-directory/page.js
import CompanyDirectory from "@/components/CompanyDirectory";

// ✅ Static metadata
export const metadata = {
    title: "Company Directory | Global Biz Report",
    description: "Browse all Indian companies by state, industry, and type.",
};

export default function Page() {
    return <CompanyDirectory />;
}
