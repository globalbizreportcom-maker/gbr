

import OrderConfirmContent from '@/components/OrderConfirmContent';
import React from 'react';

const highlights = [
    "100% Freshly Investigated Reports",
    "Trusted by 20,000+ Global Companies",
    "Advanced Company Rating System",
    "Detailed Report with Comprehensive Insights",
    "Make Informed Decisions and Mitigate Risks",
];

const HighlightsGrid = ({ className = "" }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 ${className}`}>
        {highlights.map((text, idx) => (
            <div
                key={idx}
                className="border border-gray-200 rounded-md bg-gray-50 p-3 text-center border-l-4 border-l-primary"
            >
                <h4 className="text-xs font-small">{text}</h4>
            </div>
        ))}
    </div>
);

const OrderConfirm = () => {
    return (
        <section className="max-w-6xl mx-auto">
            <section className="py-8 px-4 bg-white text-gray-800">

                {/* Top Highlights (hidden on xs) */}
                <HighlightsGrid className="hidden sm:grid" />

                {/* Checkout Section */}
                <OrderConfirmContent />

                {/* Bottom Highlights */}
                <HighlightsGrid className="grid sm:hidden" />

            </section>
        </section>
    );
};

export default OrderConfirm;

export const metadata = {
    title: "Order Confirm | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "order confirm",
        description: "What we do at Global Biz Report.",
        url: "https://globalbizreport.com/order-confirm",
        siteName: "Global Biz Report",
        type: "website",
    },
};