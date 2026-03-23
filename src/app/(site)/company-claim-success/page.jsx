import { Suspense } from "react";
import CompanyClaimSuccess from "@/components/ClaimSuccessRedirection";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CompanyClaimSuccess />
        </Suspense>
    );
}