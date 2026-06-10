'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export default function ConfidenceBuilderSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    // Expanded with diverse B2B events: Purchases, Searches, and Scale Milestones
    const activities = [
        "Business Credit Report purchased for an enterprise in London, UK (2m ago)",
        "Anonymous search: Financial risk profile evaluated for a Taiwan-based Corp (5m ago)",
        "Global Registry Sync: Company data indexed across 220+ countries worldwide (14m ago)",
        "Comprehensive Credit Report purchased for a Berlin-based GmbH (42m ago)",
        "Platform Milestone: 20,000+ business credit reports successfully delivered globally (1h ago)",
        "Anonymous search: Commercial credit history analyzed for a New York LLC (2h ago)",
        "Business Credit Report purchased for a manufacturer in Tokyo, Japan (4h ago)",
        "Singapore ACRA corporate registry financials refreshed in local index (1d ago)",
        "Business Credit Report purchased for a supply chain entity in Sydney, Pty Ltd (1d ago)",
        "Anonymous search: Anti-money laundering (AML) check run on a Toronto Inc (1d ago)"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Trigger fade out
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
                setFade(true); // Trigger fade in
            }, 500); // Match Tailwind's duration-500
        }, 5500); // Rotates every 5.5 seconds for a dynamic feel

        return () => clearInterval(interval);
    }, [activities.length]);

    return (
        <div className="w-full bg-gray-200 border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm text-slate-800 relative z-10">

            {/* Top Row: Clean, Spaced Trust Badges */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 text-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
                        <Activity className="w-5 h-5 text-green-600 flex-shrink-0" />

                    </span>
                    <h1 className='text-xs md:text-sm'>
                        Live Updates
                    </h1>
                </div>

                <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <h1 className='text-xs md:text-sm'>
                        Secure & Confidential
                    </h1>
                </div>
            </div>

            {/* Bottom Row: Dedicated, Wide Live Feed Area */}
            <div className="mt-4 bg-slate-50 border border-slate-200/60 rounded-lg p-3 flex items-center gap-3">
                {/* Live Pulsing Indicator */}
                <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>

                {/* Ticker Content */}
                <div className="flex items-center gap-2 text-xs text-slate-600 w-full overflow-hidden">
                    <span
                        className={`font-medium transition-opacity duration-500  md:line-clamp-1 ${fade ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {activities[currentIndex]}
                    </span>
                </div>
            </div>

        </div>
    );
}