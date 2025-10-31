// app/(site)/email-checkout/page.js
"use client";
import EmailCheckout from "@/components/EmailCheckout";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function EmailCheckoutPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center text-gray-600">
                    <p>Loading checkout...</p>
                </div>
            }
        >
            <EmailCheckout />
        </Suspense>
    );
}
