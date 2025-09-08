'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const CollapseMenu = ({ label, items }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center py-3 font-medium text-left text-gray-800"
            >
                {label}
                <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="pl-4 pb-3 flex flex-col gap-2 text-gray-600 text-sm">
                    {items.map((item, idx) => (
                        <Link key={idx} href={item.href} className="hover:text-primary">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const AdminHeader = () => {



    const path = usePathname();
    const hideHeader = path === '/admin';

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <header className={`bg-white sticky top-0 z-50 shadow-xs ${hideHeader ? 'hidden' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
                    <Link href="/admin" className="text-xl font-bold text-gray-900">
                        Admin
                    </Link>

                    <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
                        <div className="relative group">
                            <button className="cursor-pointer flex items-center gap-1 hover:text-primary">
                                Users
                                <FaChevronDown className="h-3 w-3" />
                            </button>
                            <div className="absolute top-3 right-5 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[300px] grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "Consulting", href: "/services/consulting" },
                                        { label: "Development", href: "/services/development" },
                                        { label: "Design", href: "/services/design" },
                                        { label: "SEO", href: "/services/seo" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <button className=" cursor-pointer flex items-center gap-1 hover:text-primary">
                                Visitors
                                <FaChevronDown className="h-3 w-3" />
                            </button>
                            <div className="absolute top-3 right-5 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[300px] grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "CRM Suite", href: "/products/crm" },
                                        { label: "Analytics", href: "/products/analytics" },
                                        { label: "AI Tools", href: "/products/ai-tools" },
                                        { label: "Security", href: "/products/security" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <button className=" cursor-pointer flex items-center gap-1 hover:text-primary">
                                Reports
                                <FaChevronDown className="h-3 w-3" />
                            </button>
                            <div className="absolute top-3 right-5 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[300px] grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "CRM Suite", href: "/products/crm" },
                                        { label: "Analytics", href: "/products/analytics" },
                                        { label: "AI Tools", href: "/products/ai-tools" },
                                        { label: "Security", href: "/products/security" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href="/contact" className="hover:text-primary">Contact</Link>

                        <div className="relative group">
                            <button className=" cursor-pointer flex items-center gap-1 hover:text-primary">
                                Account  <FaUser className="h-3 w-3" />
                                {/* <FaChevronDown className="h-3 w-3" /> */}
                            </button>
                            <div className="absolute top-2 right-1 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[200px] grid grid-cols-1 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "Settings", href: "/products/analytics" },
                                        { label: "Log Out", href: "/products/crm" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </nav>

                    {/* Mobile menu toggle */}
                    <button onClick={() => setDrawerOpen(true)} className="md:hidden text-xl">
                        <FaBars />
                    </button>
                </div>
            </header>

            {/* Drawer */}
            <div
                className={`fixed inset-0 bg-white bg-opacity-50 z-40 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setDrawerOpen(false)}
            />
            <div
                className={`fixed top-0 left-0 w-72 bg-white overflow-auto h-full z-50 shadow-xl p-5 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Menu</span>
                    <button onClick={() => setDrawerOpen(false)} className="text-lg">
                        <FaTimes />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <CollapseMenu
                        label="Services"
                        items={[
                            { label: "Consulting", href: "/services/consulting" },
                            { label: "Development", href: "/services/development" },
                            { label: "Design", href: "/services/design" },
                            { label: "SEO", href: "/services/seo" },
                        ]}
                    />

                    <CollapseMenu
                        label="Products"
                        items={[
                            { label: "CRM Suite", href: "/products/crm" },
                            { label: "Analytics", href: "/products/analytics" },
                            { label: "AI Tools", href: "/products/ai-tools" },
                            { label: "Security", href: "/products/security" },
                        ]}
                    />

                    <CollapseMenu
                        label="Account"
                        items={[
                            { label: "Settings", href: "/products/crm" },
                            { label: "Analytics", href: "/products/analytics" },
                        ]}
                    />

                    <Link href="/admin" role='button' className="btn btn-soft py-2 hover:text-primary">Log Out</Link>
                </div>
            </div>
        </>
    );
};

export default AdminHeader;
