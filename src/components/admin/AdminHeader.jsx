'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { FaChevronDown, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { adminUrl } from '@/api/api';

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
                        <Link
                            key={idx}
                            href={item.href}
                            onClick={() => {
                                if (onItemClick) onItemClick(); // ✅ closes drawer on click
                            }}
                            className="hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};



const AdminHeader = () => {

    const router = useRouter();
    const path = usePathname();
    const hideHeader = path === '/admin';

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await adminUrl.post("/logout", {}, { withCredentials: true });
            router.push("/admin"); // redirect to login
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const items = [
        { label: "Settings", href: "/products/analytics" },
        { label: "Log Out", onClick: handleLogout },
    ];

    const navLinks = [
        { href: "/admin/dashboard", label: "Home", color: 'black' },
        { href: "/admin/users", label: "Users", color: 'black' },
        { href: "/admin/abandon-checkout", label: "Abandon Checkout", color: 'black' },
        { href: "/admin/order-request/all", label: "Orders", color: 'black' },
        { href: "/admin/payments", label: "Payments", color: 'black' },
        { href: "/admin/inbox", label: "Inbox", color: 'black' },
        { href: "/admin/search", label: "Search Company", color: 'black' },
        { href: "/admin", label: "Log Out", isButton: false, color: 'red-600' },
    ];

    return (
        <>
            <header className={`bg-white sticky top-0 z-50 shadow-xs ${hideHeader ? 'hidden' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
                    <Link href="/admin/dashboard" className="text-md font-bold text-blue-900">
                        Admin Panel
                    </Link>

                    <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">

                        <Link href="/admin/abandon-checkout" className="hover:text-primary">Abandon Checkout</Link>
                        <Link href="/admin/order-request/all" className="hover:text-primary">Order Requests</Link>
                        <Link href="/admin/inbox" className="hover:text-primary">Inbox</Link>
                        <Link href="/admin/payments" className="hover:text-primary">payments</Link>
                        <Link href="/admin/search" className="hover:text-primary">Company Search</Link>

                        <div className="relative group">
                            <button className="cursor-pointer flex items-center gap-1 hover:text-primary">
                                Visitors
                                <FaChevronDown className="h-3 w-3 mt-1" />
                            </button>
                            <div className="absolute top-3 right-1 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[300px] grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "Log In", href: "/admin/login" },
                                        { label: "Payment Visitors", href: "/admin/payment-visitors" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary cursor-pointer">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* <div className="relative group">
                            <button className=" cursor-pointer flex items-center gap-1 hover:text-primary">
                                Visitors
                                <FaChevronDown className="h-3 w-3 mt-1" />
                            </button>
                            <div className="absolute top-3 right-1 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[300px] grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "CRM Suite", href: "/products/crm" },
                                        { label: "Analytics", href: "/products/analytics" },
                                        { label: "AI Tools", href: "/products/ai-tools" },
                                        { label: "Security", href: "/products/security" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary cursor-pointer">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <button className=" cursor-pointer flex items-center gap-1 hover:text-primary">
                                Reports
                                <FaChevronDown className="h-3 w-3 mt-1" />
                            </button>
                            <div className="absolute top-3 right-1 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[300px] grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    {[
                                        { label: "CRM Suite", href: "/products/crm" },
                                        { label: "Analytics", href: "/products/analytics" },
                                        { label: "AI Tools", href: "/products/ai-tools" },
                                        { label: "Security", href: "/products/security" },
                                    ].map((item, idx) => (
                                        <Link key={idx} href={item.href} className="hover:text-primary cursor-pointer">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="relative group">
                            <button className=" cursor-pointer flex items-center gap-1 hover:text-primary">
                                Account  <FaUser className="h-3 w-3" />
                            </button>
                            <div className="absolute top-2 right-1 mt-2 hidden group-hover:block z-50">
                                <div className="bg-white shadow-lg rounded-md p-6 min-w-[200px] grid grid-cols-1 gap-4 text-sm text-gray-700">
                                    {items.map((item, idx) => (
                                        item.href ? (
                                            <Link key={idx} href={item.href} className="hover:text-primary cursor-pointer">
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <button
                                                key={idx}
                                                onClick={item.onClick}
                                                className="text-left hover:text-primary cursor-pointer"
                                            >
                                                {item.label}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div> */}

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
                className={`fixed top-0 left-0 w-[100%] bg-white overflow-auto h-full z-50 shadow-xl p-5 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Menu</span>
                    <button onClick={() => setDrawerOpen(false)} className="text-lg">
                        <FaTimes />
                    </button>
                </div>

                <div className="flex flex-col gap-2">


                    {/* {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className='py-2'
                            role={link.isButton ? "button" : undefined}
                            onClick={() => setDrawerOpen(false)} // ✅ move here
                        >
                            <span className={`text-${link.color}`}>{link.label}</span>
                        </Link>
                    ))} */}


                    {/* <CollapseMenu
                        label="Account"
                        items={[
                            { label: "Settings", href: "/products/crm" },
                            { label: "Analytics", href: "/products/analytics" },
                        ]}
                    /> */}

                    <Link href="/admin/dashboard" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Home</span>
                    </Link>

                    <Link href="/admin/users" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Users</span>
                    </Link>

                    <Link href="/admin/abandon-checkout" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Abandon Checkout</span>
                    </Link>

                    <Link href="/admin/order-request/all" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Orders</span>
                    </Link>

                    <Link href="/admin/payments" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Payments</span>
                    </Link>

                    <Link href="/admin/inbox" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Inbox</span>
                    </Link>

                    <Link href="/admin/search" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-black">Search Company</span>
                    </Link>


                    <CollapseMenu
                        label="Visitors"
                        items={[
                            { label: "Visitors", href: "/admin/payment-visitors" },
                        ]}
                        onItemClick={() => setDrawerOpen(false)} // ✅ close drawer on click
                    />



                    <Link href="/admin" className="py-2" onClick={() => setDrawerOpen(false)}>
                        <span className="text-red-600">Log Out</span>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default AdminHeader;
