'use client';

import React, { useState } from 'react';
import {
    FaCheckCircle, FaChevronRight, FaDownload, FaGlobeAmericas,
    FaLock, FaShieldAlt, FaStar, FaArrowRight
} from 'react-icons/fa';
import { FiBarChart2, FiLayers, FiTrendingUp } from 'react-icons/fi';

import { FaChartLine, FaDatabase, FaUsers, FaCogs } from 'react-icons/fa';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const ReportMarketplace = () => {
    const [selectedCountry, setSelectedCountry] = useState('India');

    const reports = {
        'India': { price: '499', growth: '7.2%', risk: 'Low-Moderate', pages: 28 },
        'Brazil': { price: '399', growth: '2.9%', risk: 'Moderate', pages: 24 },
        'Vietnam': { price: '299', growth: '6.5%', risk: 'Low', pages: 30 },
        'Nigeria': { price: '349', growth: '3.1%', risk: 'High', pages: 22 },
    };

    const currentReport = reports[selectedCountry];

    return (
        <div className="bg-[#fcfcfd] min-h-screen font-sans text-slate-900">

            {/* 2-Column Hero Section */}
            <header className="px-8 py-6 md:py-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

                    {/* Left: Copy & Value Prop */}
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            Q2 2026 Updates Live
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
                            Institutional <span className="text-blue-600">Sovereign</span> Intelligence.
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                            Skip the guesswork. Access professional-grade market risk assessments and PESTLE analyses used by Fortune 500 analysts.
                        </p>

                        <div className="flex items-center space-x-4 mb-8">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <div className="flex text-yellow-400 text-xs">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <p className="text-slate-500 font-medium">Trusted by 12,000+ Analysts</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Conversion Card */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-[40px] blur-2xl opacity-50"></div>
                        <div className="relative bg-white border border-slate-200 p-4 rounded-[32px] shadow-2xl shadow-blue-900/5">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Market Selector</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-slate-700">Target Country</label>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-lg font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    >
                                        {Object.keys(reports).map(name => <option key={name}>{name}</option>)}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-500 mb-1">Projected Growth</p>
                                        <p className="text-xl font-bold text-green-600">{currentReport.growth}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-500 mb-1">Risk Rating</p>
                                        <p className="text-xl font-bold text-slate-800">{currentReport.risk}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold">Report Price</p>
                                            <p className="text-4xl font-black">${currentReport.price}</p>
                                        </div>
                                        <p className="text-sm text-slate-400">{currentReport.pages} Page PDF + CSV</p>
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-200 flex items-center justify-center">
                                        Download Now <FaArrowRight className="ml-3 w-5 h-5" />
                                    </button>

                                    <div className="mt-4 flex items-center justify-center space-x-4 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                                        <span className="flex items-center"><FaLock className="mr-1" /> Secure SSL</span>
                                        <span className="flex items-center"><FaShieldAlt className="mr-1" /> Money Back</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Social Proof / Logo Cloud */}
            <div className="border-y border-slate-100 bg-white/50 py-8">
                <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center gap-12 opacity-40 grayscale">
                    <span className="font-bold text-xl italic">WORLD BANK</span>
                    <span className="font-bold text-xl italic">IMF</span>
                    <span className="font-bold text-xl italic">REUTERS</span>
                    <span className="font-bold text-xl italic">BLOOMBERG</span>
                </div>
            </div>

            {/* Strategy-Focused Marketing Section */}
            <section className="px-8 py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">What's inside every brief?</h2>
                    <p className="text-slate-500">A look at our proprietary 5-pillar research methodology.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <FiBarChart2 />, title: 'Macroeconomic Arrays', desc: '10-year historical and 5-year projected GDP, inflation, and unemployment data.' },
                        { icon: <FiLayers />, title: 'PESTLE Matrix', desc: 'Detailed analysis of Political, Economic, Social, Technological, Legal, and Environmental risks.' },
                        { icon: <FiTrendingUp />, title: 'FDI Heatmaps', desc: 'Identifying which sectors are attracting the most foreign direct investment.' }
                    ].map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* 2. USE CASES / SEGMENTATION */}
            <section className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Decision Makers</h2>
                    <p className="text-slate-500 text-lg">Actionable intelligence tailored for three core strategic functions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Market Entry",
                            icon: <FaChartLine />,
                            desc: "Evaluate regulatory hurdles and consumer purchasing power before capital allocation."
                        },
                        {
                            title: "Supply Chain",
                            icon: <FaDatabase />,
                            desc: "Monitor political stability and infrastructure health to prevent logistical bottlenecks."
                        },
                        {
                            title: "Due Diligence",
                            icon: <FaUsers />,
                            desc: "Independent risk scores for M&A and Private Equity sovereign exposure analysis."
                        }
                    ].map((use, i) => (
                        <div key={i} className="group p-10 rounded-[32px] bg-white border border-slate-200 hover:border-blue-500 transition-all cursor-default shadow-sm hover:shadow-xl">
                            <div className="text-3xl text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                {use.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-4">{use.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{use.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. VALUE COMPARISON TABLE */}
            <section className="max-w-7xl mx-auto px-8 py-10">
                <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100">
                    <h2 className="text-3xl font-bold text-center mb-12">Institutional Quality, Fraction of the Cost</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-blue-200">
                                    <th className="py-4 font-bold text-slate-500">Feature</th>
                                    <th className="py-4 font-bold text-blue-600">GlobalBiz Report</th>
                                    <th className="py-4 font-bold text-slate-400">Boutique Agency</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-b border-blue-100/50">
                                    <td className="py-5 font-medium italic text-slate-500 underline decoration-blue-200">Delivery Time</td>
                                    <td className="py-5 font-bold">Instant Download</td>
                                    <td className="py-5">4–6 Weeks</td>
                                </tr>
                                <tr className="border-b border-blue-100/50">
                                    <td className="py-5 font-medium italic text-slate-500 underline decoration-blue-200">Recency</td>
                                    <td className="py-5 font-bold">Live Weekly Updates</td>
                                    <td className="py-5">Annual Static File</td>
                                </tr>
                                <tr className="border-b border-blue-100/50">
                                    <td className="py-5 font-medium italic text-slate-500 underline decoration-blue-200">Excel Appendix</td>
                                    <td className="py-5 font-bold text-green-600 font-bold"><FiCheck className="inline mr-1" /> Included</td>
                                    <td className="py-5">Extra Charge</td>
                                </tr>
                                <tr>
                                    <td className="py-5 font-bold text-xl">Investment</td>
                                    <td className="py-5 text-3xl font-black text-blue-600">$499</td>
                                    <td className="py-5 text-xl text-slate-400 font-bold">$15,000+</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 4. PROCUREMENT FAQ */}
            <section className="max-w-3xl mx-auto px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Procurement & Licensing</h2>
                </div>
                <div className="space-y-6">
                    {[
                        { q: "How do I receive the report?", a: "Immediately following checkout, you will receive a secure download link via email containing the PDF report and Excel data folder." },
                        { q: "Do you provide VAT invoices?", a: "Yes. Our Stripe-powered checkout generates automated tax-compliant invoices for corporate reimbursement." },
                        { q: "Can I share this with my team?", a: "Each purchase includes a 'Departmental License', allowing you to share the file with up to 10 internal colleagues." }
                    ].map((faq, i) => (
                        <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA BOX */}
            <section className="max-w-7xl mx-auto px-8 mb-20">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-12 text-center text-white shadow-2xl">
                    <h2 className="text-4xl font-extrabold mb-6">Ready to derisk your global strategy?</h2>
                    <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">Join the world's leading analysts. Get instant access to sovereign intelligence today.</p>
                    <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-black hover:bg-slate-50 transition transform hover:scale-105 shadow-xl inline-flex items-center">
                        Get Started Now <FiArrowRight className="ml-3" />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default ReportMarketplace;