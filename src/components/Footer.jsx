// import React from 'react';
// import {
//     FaGlobeAmericas,
//     FaShieldAlt,
//     FaChartLine,
//     FaHandshake,
//     FaArrowRight,
//     FaCheckCircle
// } from 'react-icons/fa';

// const Footer = () => {


//     const navLinks = [
//         { name: 'Home', href: '/' },
//         { name: 'About', href: '/about' },
//         { name: 'Services', href: '/services' },
//         { name: 'Pricing', href: '/pricing' },
//         { name: 'Company Directory', href: '/company-directory/india' },
//         { name: 'Contact', href: '/contact' },
//     ];

//     const mainLinks = [
//         { name: 'Order Credit Report', href: '/order-business-credit-report' },
//         { name: 'View Sample Report', href: '/sample-reports' },
//     ];


//     return (
//         <footer className="bg-[#0f172a] text-slate-400 font-sans border-t border-slate-800 mt-20">

//             {/* 1. Metrics & Trust Bar - Responsive Grid */}
//             <div className="max-w-7xl mx-auto px-6 lg:px-8">
//                 <div className="relative">
//                     <div className="relative  md:absolute left-0 right-0 -top-6 md:-top-12 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 shadow-2xl">
//                         <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
//                             <FaGlobeAmericas className="text-indigo-400 text-3xl shrink-0" />
//                             <div>
//                                 <p className="text-white font-black text-xl">220+</p>
//                                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Countries Covered</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-4 border-b sm:border-b-0 lg:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
//                             <FaShieldAlt className="text-indigo-400 text-3xl shrink-0" />
//                             <div>
//                                 <p className="text-white font-black text-xl">20,000+</p>
//                                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Global Companies Trust GBR</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
//                             <FaChartLine className="text-indigo-400 text-3xl shrink-0" />
//                             <div>
//                                 <p className="text-white font-black text-xl">s</p>
//                                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Reports Delivered Worldwide</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <FaHandshake className="text-indigo-400 text-3xl shrink-0" />
//                             <div>
//                                 <p className="text-white font-black text-xl">Trusted By</p>
//                                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Banks & B2B Platforms</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
//                             <FaGlobeAmericas className="text-indigo-400 text-3xl shrink-0" />
//                             <div>
//                                 <p className="text-white font-black text-xl">220+</p>
//                                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">
//                                     Countries Covered
//                                 </p>
//                                 <p className="text-[9px] text-indigo-300/60 font-medium leading-tight mt-1">
//                                     Global Coverage Across Major Industries and Markets
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* 2. Main Content Container */}
//             <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-10 md:pt-32 lg:pt-32">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

//                     {/* About Section (Takes 4 columns) */}
//                     <div className="lg:col-span-4 space-y-6">
//                         <h2 className="text-white text-2xl font-extrabold tracking-tighter">
//                             About <span className="text-indigo-400">GlobalBizReport</span>
//                         </h2>
//                         <div className="space-y-4 text-sm leading-relaxed text-slate-400 text-justify md:text-left">
//                             <p>
//                                 <strong className="text-slate-200">GlobalBizReport (GBR Business Reports)</strong> is a leading global business intelligence and credit reporting platform that provides Business Credit Reports, Company Credit Reports, Business Information Reports, and Company Due-Diligence Reports on businesses across 220+ countries.
//                             </p>
//                             <p>
//                                 Trusted by 20,000+ companies worldwide, GlobalBizReport helps organizations verify companies, evaluate financial credibility, assess risk, and make informed business decisions when working with international partners, suppliers, buyers, distributors, and investment opportunities.
//                             </p>
//                         </div>
//                     </div>

//                     {/* Navigation Columns (Takes 4 columns split into two) */}
//                     <div className="lg:col-span-2 space-y-6">
//                         <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Quick Links</h4>
//                         <ul className="space-y-3 text-sm">
//                             {navLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <a
//                                         href={link.href}
//                                         className="hover:text-indigo-400 transition-all flex items-center gap-2 group"
//                                     >
//                                         <FaArrowRight className="text-[10px] text-indigo-500 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all shrink-0" />
//                                         <span className="truncate">{link.name}</span>
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div className="lg:col-span-2 space-y-6">
//                         <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Main Links</h4>
//                         <ul className="space-y-3 text-sm">
//                             {mainLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <a
//                                         href={link.href}
//                                         className="hover:text-indigo-400 transition-all flex items-center gap-2 group"
//                                     >
//                                         <FaArrowRight className="text-[10px] text-indigo-500 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all shrink-0" />
//                                         <span className="truncate">{link.name}</span>
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Services Column (Takes 4 columns) */}
//                     <div className="lg:col-span-4 space-y-6">
//                         <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Core Intelligence Services</h4>
//                         <ul className="space-y-3 text-sm">
//                             {[
//                                 "Business Credit Reports",
//                                 "International Company Credit Reports",
//                                 "Business Information Reports",
//                                 "Company Due-Diligence Reports",
//                                 "Company Verification & Background Checks",
//                                 "Supplier, Vendor & Buyer Risk Assessment",
//                                 "Overseas Company Reports"
//                             ].map((service) => (
//                                 <li key={service} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-default">
//                                     <FaCheckCircle className="text-indigo-500/50 text-[12px] shrink-0" />
//                                     {service}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 {/* 3. Detailed Description Section (Full Width) */}
//                 <div className="mt-16 pt-12 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12">
//                     <div className="lg:col-span-8 space-y-5 text-xs leading-relaxed text-slate-500 text-justify">
//                         <p>
//                             GBR specializes in delivering freshly investigated and comprehensive Business Information Reports and International Company Credit Reports that provide deep insights into company background, ownership structure, operational status, financial strength, creditworthiness, payment behavior, and potential risk indicators. These reports help organizations reduce credit risk, prevent fraud, strengthen compliance, and conduct reliable business due diligence.
//                         </p>
//                         <p>
//                             GlobalBizReport is a preferred Business Credit Reporting and Company Verification partner for Corporates, SMEs, B2B Marketplaces, Banks, Financial Institutions, Global Consulting Firms, Trade Organizations, and Market Research Companies worldwide that require trusted business intelligence before entering into commercial relationships or international trade agreements.
//                         </p>
//                         <p>
//                             Our reports are professionally researched and freshly investigated using verified local sources and global research networks, ensuring high accuracy, reliability, and actionable business intelligence to support critical business decisions.
//                         </p>
//                     </div>
//                     <div className="lg:col-span-4 space-y-4">
//                         <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50">
//                             <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-3">Online Ordering Platform</h4>
//                             <p className="text-[11px] leading-relaxed text-slate-400">
//                                 Through the GlobalBizReport online platform, businesses can easily order Business Credit Reports, International Company Reports, Business Verification Reports, and Company Due-Diligence Reports on any company worldwide, enabling organizations to verify business partners, evaluate suppliers and vendors, assess buyers, and conduct cross-border risk analysis with confidence.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 4. Closing Statement Section */}
//                 <div className="mt-12 p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-center">
//                     <p className="text-xs text-slate-400 leading-relaxed italic max-w-5xl mx-auto">
//                         GlobalBizReport empowers companies worldwide with trusted business intelligence, company verification insights, and international credit risk assessment tools — helping organizations build secure partnerships, mitigate financial risks, and grow confidently in global markets.
//                     </p>
//                 </div>
//             </div>

//             {/* 5. Bottom Compliance Section */}
//             <div className="bg-[#0a101f] border-t border-slate-800/50 py-10 px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">

//                     <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
//                         <a href="/terms" className="hover:text-indigo-400 transition-colors">Terms & Conditions</a>
//                         <a href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
//                         <a href="/refund-policy" className="hover:text-indigo-400 transition-colors">Cancellation & Refund</a>
//                         <a href="/shipping-policy" className="hover:text-indigo-400 transition-colors">Shipping & Delivery</a>
//                     </div>

//                     <div className="pt-6 text-[10px] border-t border-slate-800 w-full opacity-40 max-w-4xl mx-auto leading-loose uppercase tracking-widest">
//                         GlobalBizReport Provides Freshly Investigated Business Credibility Reports, Credit Reports, Due Diligence,
//                         and Background Checks across 220+ Countries Worldwide.
//                     </div>

//                     <div className="text-[11px] opacity-40">
//                         Copyright © 2026 <span className="text-white font-bold tracking-widest uppercase">GlobalBizReport.com</span>. All Rights Reserved.
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;


"use client";

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import {
    // ... same icons as before
    FaChevronDown,
    FaChevronUp,
    FaArrowRight,
    FaCheckCircle,
    FaGlobeAmericas,
    FaShieldAlt,
    FaChartLine,
    FaHandshake
} from 'react-icons/fa';

const Footer = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [year, setYear] = useState(2026);
    const [mounted, setMounted] = useState(false);

    // ELITE FIX: Create a reference to the detailed section
    const detailsRef = useRef(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
        setMounted(true);
    }, []);

    // ELITE FIX: Watch for expansion and scroll on mobile
    useEffect(() => {
        if (isExpanded && detailsRef.current) {
            // Wait slightly for the animation to start, then scroll
            setTimeout(() => {
                detailsRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [isExpanded]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Company Directory', href: '/company-directory/india' },
        { name: 'Contact', href: '/contact' },
    ];

    const mainLinks = [
        { name: 'Order Credit Report', href: '/order-business-credit-report' },
        { name: 'View Sample Report', href: '/sample-reports' },
    ];

    if (!mounted) return <footer className="bg-[#0f172a] h-96" />;

    return (
        <footer className="bg-[#0f172a] text-slate-400 font-sans border-t border-slate-800 mt-25">
            {/* 1. Metrics & Trust Bar - Responsive Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="relative">
                    <div className="relative  md:absolute left-0 right-0 -top-12 md:-top-12 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 shadow-2xl">
                        <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
                            <FaGlobeAmericas className="text-indigo-400 text-3xl shrink-0" />
                            <div>
                                <p className="text-white font-black text-xl">220+</p>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Countries Covered</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 border-b sm:border-b-0 lg:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
                            <FaShieldAlt className="text-indigo-400 text-3xl shrink-0" />
                            <div>
                                <p className="text-white font-black text-xl">20,000+</p>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Global Companies Trust GBR</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
                            <FaChartLine className="text-indigo-400 text-3xl shrink-0" />
                            <div>
                                <p className="text-white font-black text-xl">10,000+</p>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Reports Delivered Monthly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaHandshake className="text-indigo-400 text-3xl shrink-0" />
                            <div>
                                <p className="text-white font-black text-xl">Trusted By</p>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 leading-tight">Banks & B2B Platforms</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-4 sm:pb-0 last:border-0">
                            <FaGlobeAmericas className="text-indigo-400 text-3xl shrink-0" />
                            <div>
                                <p className="text-white font-black text-xl md:text-lg">Global Coverage</p>
                                <p className="text-[10px] md:text-[8px] uppercase tracking-widest font-bold text-slate-500 leading-tight">
                                    Global Coverage Across Major Industries and Markets
                                </p>
                                {/* <p className="text-[9px] text-indigo-300/60 font-medium leading-tight mt-1">
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Container */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-8 md:pt-32 lg:pt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* About Section */}
                    <div className="lg:col-span-full space-y-6">
                        <h2 className="text-white text-2xl font-extrabold tracking-tighter">
                            About <span className="text-indigo-400">GlobalBizReport</span>
                        </h2>
                        <div className="space-y-4 text-sm leading-relaxed text-slate-400">
                            <p>
                                <strong className="text-slate-200">GlobalBizReport (GBR Business Reports)</strong> is a <span className='font-bold text-gray-400'> leading global business intelligence and credit reporting platform</span>  that provides  <span className='font-bold text-gray-400'>Business Credit Reports, Company Credit Reports, Business Information Reports, and Company Due-Diligence Reports on businesses across 220+ countries </span> .
                            </p>
                            <p>
                                Trusted by <span className='font-bold text-gray-400'> 20,000+ companies worldwide</span>, GlobalBizReport helps organizations  <span className='font-bold text-gray-400'>  verify companies, evaluate financial credibility, assess risk, and make informed business decisions </span> when working with international partners, suppliers, buyers, distributors, and investment opportunities..{" "}
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="cursor-pointer text-indigo-400 font-bold hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
                                >
                                    {isExpanded ? 'Show Less' : 'Read More'}
                                    {isExpanded ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* 3. Detailed Description Section with REF */}
                    <div
                        ref={detailsRef}
                        className={`lg:col-span-full transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100 mt-5 pb-10' : 'max-h-0 opacity-0'
                            } overflow-hidden`}
                    >
                        {/* Grid Container */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                            {/* Left Side: Detailed Content (Spans 8 columns) */}
                            <div className="lg:col-span-8 space-y-5 text-sm leading-relaxed text-slate-500 text-justify">
                                <p>
                                    GBR specializes in delivering <span className='font-bold text-gray-400'> freshly investigated and comprehensive Business Information Reports and International Company Credit Reports </span>
                                    that provide deep insights into <span className='font-bold text-gray-400'> company background, ownership structure, operational status, financial strength, creditworthiness, payment behavior, and potential risk indicators</span>.
                                    These reports help organizations <span className='font-bold text-gray-400'> reduce credit risk, prevent fraud, strengthen compliance, and conduct reliable business due diligence</span>.
                                </p>

                                <p>
                                    GlobalBizReport is a <span className='font-bold text-gray-400'> preferred Business Credit Reporting and Company Verification partner </span>
                                    for <span className='font-bold text-gray-400'> Corporates, SMEs, B2B Marketplaces, Banks, Financial Institutions, Global Consulting Firms, Trade Organizations, and Market Research Companies worldwide </span>
                                    that require trusted business intelligence before entering into commercial relationships or international trade agreements.
                                </p>

                                <p>
                                    Our reports are <span className='font-bold text-gray-400'> professionally researched and freshly investigated using verified local sources and global research networks </span>,
                                    ensuring <span className='font-bold text-gray-400'> high accuracy, reliability, and actionable business intelligence </span> to support critical business decisions.
                                </p>
                            </div>

                            {/* Right Side: Online Ordering Platform Card (Spans 4 columns) */}
                            <div className="lg:col-span-4">
                                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                                    <h4 className="text-white text-[13px] font-bold uppercase tracking-widest mb-4">Online Ordering Platform</h4>
                                    <p className="text-[12px] leading-relaxed text-slate-400">
                                        Through the GlobalBizReport online platform, businesses can easily <span className='font-bold text-gray-400'> order Business Credit Reports, International Company Reports, Business Verification Reports, and Company Due-Diligence Reports on any company worldwide</span>,
                                        enabling organizations to <span className='font-bold text-gray-400'> verify business partners, evaluate suppliers and vendors, assess buyers, and conduct cross-border risk analysis with confidence.</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Navigation Columns (Takes 4 columns split into two) */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="hover:text-indigo-400 transition-all flex items-center gap-2 group"
                                    >
                                        <FaArrowRight className="text-[10px] text-indigo-500 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all shrink-0" />
                                        <span className="truncate">{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Main Links</h4>
                        <ul className="space-y-3 text-sm">
                            {mainLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="hover:text-indigo-400 transition-all flex items-center gap-2 group"
                                    >
                                        <FaArrowRight className="text-[10px] text-indigo-500 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all shrink-0" />
                                        <span className="truncate">{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column (Takes 4 columns) */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Core Intelligence Services</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                "Business Credit Reports",
                                "International Company Credit Reports",
                                "Business Information Reports",
                                "Company Due-Diligence Reports",
                                "Company Verification & Background Checks",
                                "Supplier, Vendor & Buyer Risk Assessment",
                                "Overseas Company Reports & Global Business Intelligence    "
                            ].map((service) => (
                                <li key={service} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-default">
                                    <FaCheckCircle className="text-indigo-500/50 text-[12px] shrink-0" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* 4. Closing Statement Section */}
                <div className="mt-12 p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-center">
                    <p className="text-xs text-slate-400 leading-relaxed max-w-5xl mx-auto">
                        <span className='font-bold'>   GlobalBizReport empowers companies worldwide with trusted business intelligence, company verification insights, and international credit risk assessment tools</span>  — helping organizations build secure partnerships, mitigate financial risks, and grow confidently in global markets.
                    </p>
                </div>
            </div>

            {/* 5. Bottom Compliance Section */}
            <div className="bg-[#0a101f] border-t border-slate-800/50 py-10 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
                        <a href="/terms" className="hover:text-indigo-400 transition-colors">Terms & Conditions</a>
                        <a href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
                        <a href="/refund-policy" className="hover:text-indigo-400 transition-colors">Cancellation & Refund</a>
                        <a href="/shipping-policy" className="hover:text-indigo-400 transition-colors">Shipping & Delivery</a>
                    </div>

                    <div className="pt-6 text-[10px] border-t border-slate-800 w-full opacity-40 max-w-4xl mx-auto leading-loose uppercase tracking-widest">
                        GlobalBizReport Provides Freshly Investigated Business Credibility Reports, Credit Reports, Due Diligence,
                        and Background Checks across 220+ Countries Worldwide.
                    </div>

                    <div className="text-[11px] opacity-40">
                        Copyright © 2026 <span className="text-white font-bold tracking-widest uppercase">GlobalBizReport.com</span>. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;