"use client";
import { apiUrl } from "@/api/api";
import { useDashboard } from "@/app/(site)/dashboard/DashboardContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function HeaderMenu() {
    const { user, setUser } = useDashboard();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const mainNav = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/company-directory/india", label: "Company directory" },
        { href: "/services", label: "Services" },
        { href: "/pricing", label: "Pricing" },
        { href: "/contact", label: "Contact" },
    ];

    const renderLink = ({ href, label, vertical, onClick }) => (
        <Link
            href={href}
            onClick={onClick} // <-- add this
            className={`font-normal sm:font-semibold text-[16px] relative group ${vertical ? "block py-2" : ""}`}
        >
            <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-400 group-hover:after:w-full">
                {label}
            </span>
        </Link>
    );


    const handleLogout = async () => {
        await apiUrl.post("/user/logout");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setUser("");
        router.push("/");
    };

    // ---------------- Desktop UI ----------------
    const DesktopMenu = () => (
        <ul className="hidden md:flex menu menu-horizontal px-1 gap-1 items-center text-black">
            {user ? (
                <>
                    <li>{renderLink({ href: "/dashboard", label: "Dashboard" })}</li>
                    {mainNav.map((item) => (
                        <li key={item.href}>{renderLink(item)}</li>
                    ))}
                    <li className="ml-2 mr-2">
                        <button className="btn btn-primary">
                            <Link href="/order-business-credit-report">Order Business Credit Report</Link>
                        </button>
                    </li>
                    <li>
                        <div className="dropdown dropdown-hover dropdown-end">
                            <div
                                tabIndex={0}
                                className="flex items-center gap-1 text-black font-semibold p-2 cursor-pointer"
                            >
                                <FaUserCircle size={24} className="text-gray-700" />
                                {/* <span className="font-semibold">{user.name}</span> */}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-white text-black rounded-md z-10 w-56 p-2 shadow-lg border border-gray-200"
                            >
                                <li>
                                    <Link
                                        href="/dashboard/profile"
                                        className="hover:bg-gray-100 px-3 py-2 rounded-md"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/password"
                                        className="hover:bg-gray-100 px-3 py-2 rounded-md"
                                    >
                                        Password Settings
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="hover:bg-gray-100 px-3 py-2 rounded-md w-full text-left text-red-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </>
            ) : (
                <>
                    {mainNav.map((item) => (
                        <li key={item.href}>{renderLink(item)}</li>
                    ))}
                    <li>
                        <Link
                            href="/register"
                            className="link font-semibold text-[16px] text-blue-600 relative group underline"
                        >
                            Register
                        </Link>
                    </li>
                    <li className="ml-2 mr-2">
                        <button className="btn btn-primary">
                            <Link href="/order-business-credit-report">Order Business Credit Report</Link>
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-outline">
                            <Link href="/login">Log In</Link>
                        </button>
                    </li>
                </>
            )}
        </ul>
    );

    // ---------------- Mobile UI ----------------
    const MobileMenu = () => (
        <div className="md:hidden">
            <button
                className="text-gray-700 p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                <FaBars size={22} />
            </button>

            {mobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
                    <div className="absolute right-0 top-0 h-full w-full bg-white shadow-lg flex flex-col">
                        {/* Header row */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
                            <button
                                className="text-gray-700 font-bold"
                                onClick={() => setMobileOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <ul className="flex flex-col gap-2 text-black">
                                {user ? (
                                    <>
                                        <li>
                                            {renderLink({
                                                href: "/dashboard",
                                                label: "Dashboard",
                                                vertical: true,
                                                onClick: () => setMobileOpen(false), // close menu
                                            })}
                                        </li>
                                        {mainNav.map((item) => (
                                            <li key={item.href}>
                                                {renderLink({
                                                    ...item,
                                                    vertical: true,
                                                    onClick: () => setMobileOpen(false), // close menu
                                                })}
                                            </li>
                                        ))}
                                        <li className="mt-2">
                                            <Link href="/order-business-credit-report" onClick={() => setMobileOpen(false)}>
                                                Order Business Credit Report
                                            </Link>
                                        </li>
                                        <li className="pt-3 mt-3">
                                            <Link
                                                href="/dashboard/profile"
                                                className="block hover:bg-gray-100 px-3 py-2 rounded-md"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/dashboard/password"
                                                className="block hover:bg-gray-100 px-3 py-2 rounded-md"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                Password Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setMobileOpen(false);
                                                }}
                                                className="hover:bg-gray-100 px-3 py-2 rounded-md w-full text-left text-red-600"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {mainNav.map((item) => (
                                            <li key={item.href}>
                                                {renderLink({
                                                    ...item,
                                                    vertical: true,
                                                    onClick: () => setMobileOpen(false),
                                                })}
                                            </li>
                                        ))}
                                        <li>
                                            <Link
                                                href="/register"
                                                className="block font-semibold text-[16px] text-blue-600 underline py-2"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </li>
                                        <li className="mt-2 ">
                                            <Link href="/order-business-credit-report" onClick={() => setMobileOpen(false)}>
                                                Order Business Credit Report
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/login" onClick={() => setMobileOpen(false)}>
                                                Log In
                                            </Link>
                                        </li>
                                    </>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


    return (
        <>
            <DesktopMenu />
            <MobileMenu />
        </>
    );
}
