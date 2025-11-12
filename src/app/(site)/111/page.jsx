"use client";
import Image from "next/image";

export default function Home() {
    return (
        <main className="font-sans text-gray-800 max-w-7xl mx-auto">
            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-50 py-24 rounded-2xl">
                {/* Decorative background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                </div>

                <div className="relative container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
                    {/* ===== Text Section ===== */}
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Empowering <span className="text-indigo-600">Global Business</span> Decisions
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Global Biz Report delivers <span className="font-semibold text-gray-800">verified business credit reports</span>
                            and <span className="font-semibold text-gray-800">company due diligence</span> services across
                            <span className="text-indigo-600 font-medium"> 220+ countries</span> — helping you make confident,
                            risk-free global partnerships.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                            <a
                                href="/order"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-md font-semibold transition-transform transform hover:scale-105 shadow-sm"
                            >
                                Get a Business Report
                            </a>
                            <a
                                href="#services"
                                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-md font-semibold transition-transform transform hover:scale-105"
                            >
                                Explore Services
                            </a>
                        </div>
                    </div>

                    {/* ===== Image Section ===== */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative">
                            <img
                                src="https://cdn.pixabay.com/photo/2021/03/29/12/16/stairs-6133971_640.jpg"
                                alt="Global Business Intelligence"
                                width={600}
                                height={400}
                                className="w-full max-w-lg rounded-2xl shadow-xl object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-semibold">
                                Trusted by 10,000+ Companiesss
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ===== STATS ===== */}
            <section className="bg-white py-16 rounded-2xl">
                <div className="container mx-auto px-6 grid md:grid-cols-4 text-center gap-6">
                    {[
                        { value: "220+", label: "Countries Covered" },
                        { value: "10K+", label: "Companies Verified" },
                        { value: "48h", label: "Average Turnaround" },
                        { value: "24/7", label: "Support Available" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <h3 className="text-3xl font-bold text-indigo-600">{stat.value}</h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-20 bg-gray-50 rounded-2xl">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Our Services
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Business Credit Reports",
                                desc: "Comprehensive credit risk assessment, payment history, financial standing, and company overview.",
                                img: "https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_640.jpg",
                            },
                            {
                                title: "Due Diligence Investigations",
                                desc: "Background checks and ownership insights for safer partnerships and investor validation.",
                                img: "https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_640.jpg",
                            },
                            {
                                title: "Global Company Database",
                                desc: "Instantly verify businesses from 220+ countries with up-to-date registration and compliance data.",
                                img: "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_640.jpg",
                            },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition text-center"
                            >
                                <img
                                    src={s.img}
                                    alt={s.title}
                                    className="rounded-xl mb-6 mx-auto h-48 w-full object-cover"
                                />
                                <h3 className="text-xl font-semibold mb-3 text-indigo-700">
                                    {s.title}
                                </h3>
                                <p className="text-gray-600">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section id="why" className="py-20 bg-white rounded-2xl">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10">
                        Why Choose Global Biz Report?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left max-w-6xl mx-auto">
                        {[
                            {
                                title: "Accurate & Verified Data",
                                desc: "All reports are freshly investigated and validated by professionals worldwide.",
                            },
                            {
                                title: "Fast Turnaround",
                                desc: "Get your business report within 1–3 business days — no waiting for weeks.",
                            },
                            {
                                title: "Global Reach",
                                desc: "Data coverage in 220+ countries ensures your global expansion remains risk-free.",
                            },
                            {
                                title: "Dedicated Support",
                                desc: "Round-the-clock expert assistance ensures a seamless experience.",
                            },
                        ].map((f, i) => (
                            <div key={i} className="p-6 border border-gray-200 rounded-xl hover:shadow-md bg-gray-50">
                                <h3 className="font-semibold text-lg mb-2 text-indigo-600">
                                    {f.title}
                                </h3>
                                <p className="text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PRICING ===== */}
            <section id="pricing" className="py-20 bg-gray-50 rounded-2xl">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        Transparent Global Pricing
                    </h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        Get verified business credit reports worldwide — region-based pricing in{" "}
                        <span className="font-semibold text-blue-700">USD</span> and{" "}
                        <span className="font-semibold text-blue-700">INR</span> for full transparency.
                    </p>

                    {/* Responsive Table (No Overflow) */}
                    <div className="w-full bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
                        <div className="hidden md:block">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold">Country / Region</th>
                                        <th className="py-4 px-6 font-semibold text-right">Price (USD)</th>
                                        <th className="py-4 px-6 font-semibold text-right">Price (INR)</th>
                                        <th className="py-4 px-6 font-semibold text-right">GST (18%)</th>
                                        <th className="py-4 px-6 font-semibold text-right">Total (INR)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {[
                                        { country: "USA", usd: "USD 69", inr: "₹6000", gst: "₹1080", total: "₹7080" },
                                        { country: "Canada", usd: "USD 69", inr: "₹6000", gst: "₹1080", total: "₹7080" },
                                        { country: "India", usd: "USD 49", inr: "₹4000", gst: "₹720", total: "₹4720" },
                                        { country: "China", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                                        { country: "Asia (excluding India & China)", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                                        { country: "Europe", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                                        { country: "Middle East", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                                        { country: "Australia & New Zealand", usd: "USD 89", inr: "₹7500", gst: "₹1350", total: "₹8850" },
                                        { country: "Africa", usd: "USD 89", inr: "₹7000", gst: "₹1260", total: "₹8260" },
                                        { country: "Oceania", usd: "USD 89", inr: "₹7500", gst: "₹1350", total: "₹8850" },
                                        { country: "Latin America", usd: "USD 99", inr: "₹8000", gst: "₹1440", total: "₹9440" },
                                        { country: "Other Countries", usd: "USD 99", inr: "₹8000", gst: "₹1440", total: "₹9440" },
                                    ].map((row, i) => (
                                        <tr
                                            key={i}
                                            className={`transition ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                                        >
                                            <td className="py-4 px-6 font-medium">{row.country}</td>
                                            <td className="py-4 px-6 text-right text-blue-700 font-semibold">{row.usd}</td>
                                            <td className="py-4 px-6 text-right">{row.inr}</td>
                                            <td className="py-4 px-6 text-right">{row.gst}</td>
                                            <td className="py-4 px-6 text-right font-semibold text-blue-700">{row.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile stacked view (auto layout, no horizontal scroll) */}
                        <div className="block md:hidden divide-y divide-gray-200">
                            {[
                                { country: "USA", usd: "USD 69", inr: "₹6000", gst: "₹1080", total: "₹7080" },
                                { country: "Canada", usd: "USD 69", inr: "₹6000", gst: "₹1080", total: "₹7080" },
                                { country: "India", usd: "USD 49", inr: "₹4000", gst: "₹720", total: "₹4720" },
                                { country: "China", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                                { country: "Europe", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                                { country: "Middle East", usd: "USD 79", inr: "₹6500", gst: "₹1170", total: "₹7670" },
                            ].map((row, i) => (
                                <div key={i} className="p-4 text-left hover:bg-blue-50 transition">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{row.country}</h3>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Price (USD)</span>
                                        <span className="font-medium text-blue-700">{row.usd}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Price (INR)</span>
                                        <span>{row.inr}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>GST (18%)</span>
                                        <span>{row.gst}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-800">
                                        <span>Total (INR)</span>
                                        <span className="font-semibold text-blue-700">{row.total}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <a
                            href="/order"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-md font-semibold shadow-md transition-transform transform hover:scale-105"
                        >
                            Order a Business Report
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="py-20 bg-white rounded-2xl">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        What Our Clients Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Michael Smith",
                                role: "Procurement Head, Zenith Logistics",
                                quote:
                                    "Global Biz Report helped us verify suppliers from multiple countries efficiently — data accuracy is top-notch.",
                                img: "https://cdn.pixabay.com/photo/2024/12/18/03/22/businessman-9274257_640.png",
                            },
                            {
                                name: "Priya Mehta",
                                role: "CEO, TechNova Pvt. Ltd.",
                                quote:
                                    "Their reports gave us confidence to expand internationally. Reliable and quick service!",
                                img: "https://cdn.pixabay.com/photo/2024/05/26/11/40/business-8788640_640.jpg",
                            },
                            {
                                name: "John Carter",
                                role: "Financial Analyst, CapitalTrust",
                                quote:
                                    "The due diligence reports were extremely detailed. Excellent turnaround and support.",
                                img: "https://cdn.pixabay.com/photo/2024/05/26/11/40/business-8788627_640.jpg",
                            },
                        ].map((t, i) => (
                            <div
                                key={i}
                                className="p-8 bg-gray-50 border border-gray-200 rounded-2xl hover:shadow-sm transition"
                            >
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                                />
                                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                                <h4 className="font-semibold text-lg">{t.name}</h4>
                                <p className="text-sm text-gray-500">{t.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="bg-gray-600 text-white py-20 text-center rounded-2xl mt-20 mb-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Start Your Business Verification Today
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Protect your business with accurate, verified global intelligence. Order your
                        company report in just minutes.
                    </p>
                    <a
                        href="/order-business-credit-report"
                        className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-md hover:bg-gray-100 transition"
                    >
                        Order Now
                    </a>
                </div>
            </section>


        </main>
    );
}
