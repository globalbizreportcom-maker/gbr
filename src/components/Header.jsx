import Link from 'next/link'

const Header = () => {
    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar bg-white shadow-xs">
                    <div className="flex-1">
                        <Link className="btn btn-base text-xl" href='/'>GBR</Link>
                    </div>
                    <div className="hidden md:flex flex-none">
                        <ul className="menu menu-horizontal px-1 text-black gap-1">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/about", label: "About" },
                                { href: "/contact", label: "Contact" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="font-semibold relative group">
                                        <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-400 group-hover:after:w-full">
                                            {label}
                                        </span>
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <div className="dropdown dropdown-hover dropdown-end">
                                    <div tabIndex={0} role="button" className="text-black font-semibold px-2">
                                        Info
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-white text-black rounded-md z-10 w-56 p-2 shadow-lg border border-gray-200">
                                        <li><a className="hover:bg-gray-100 px-3 py-2 rounded-md">Item 1</a></li>
                                        <li><a className="hover:bg-gray-100 px-3 py-2 rounded-md">Item 2</a></li>
                                        <li><a className="hover:bg-gray-100 px-3 py-2 rounded-md">Item 3</a></li>
                                        <li><a className="hover:bg-gray-100 px-3 py-2 rounded-md">Item 4</a></li>
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <button className="btn btn-primary">Log In</button>
                            </li>
                        </ul>

                    </div>
                    {/* Hamburger Icon for Mobile */}
                    <div className="md:hidden">
                        <label htmlFor="my-drawer" className="btn btn-ghost btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>

            {/* Drawer Side */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 min-h-full bg-white text-black relative">

                    {/* Close Icon */}
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-sm btn-ghost btn-circle absolute right-4 top-4 z-10"
                    >
                        ✕
                    </label>

                    {/* Logo */}
                    <div className="mb-5 pl-1">
                        <a className="btn btn-ghost text-sm">GBR</a>
                    </div>

                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact</a></li>
                    <li>
                        <details>
                            <summary>Dropdown</summary>
                            <ul>
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><button className="btn btn-primary mt-4">Log In</button></li>
                </ul>
            </div>

        </div>
    );
};

export default Header;
