import Image from 'next/image';
import Link from 'next/link'

const Header = () => {

    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar bg-white">

                    <div className="flex-1">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/logo-01.png" // Path relative to the public directory
                                alt="GBR Logo"
                                width={120}
                                height={10}
                                className="object-contain w-[140px] h-[50px] sm:w-[180px] sm:h-[60px] lg:w-[180px] lg:h-[50px] xl:w-[200px] xl:h-[70px]"
                                priority  // optional: loads faster
                            />
                        </Link>
                    </div>


                    <div className="hidden md:flex flex-none">
                        <ul className="menu menu-horizontal px-1 text-black gap-1">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/about", label: "About" },
                                { href: "/services", label: "Services" },
                                { href: "/pricing", label: "Pricing" },
                                { href: "/contact", label: "Contact" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="font-semibold text-[16px]  relative group">
                                        <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-400 group-hover:after:w-full">
                                            {label}
                                        </span>
                                    </Link>
                                </li>
                            ))}

                            {/* <li>
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
                            </li> */}

                            <li className='ml-2 mr-2'>
                                <button
                                    className="btn btn-primary"
                                >
                                    <Link href='/order-business-credit-report'>
                                        Order Business Credit Report
                                    </Link>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn btn-outline"
                                >
                                    <Link href='/login'>
                                        Log In
                                    </Link>
                                </button>
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
            <div className="drawer-side z-50 h-screen overflow-y-auto">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-full min-h-full bg-white text-black relative ">



                    <div className="relative flex items-center justify-between px-2 py-2 mb-6">

                        {/* Logo */}
                        <div className="text-2xl font-semibold">
                            <Link href='/'>
                                <Image
                                    src="/images/logo-01.png" // Path relative to the public directory
                                    alt="GBR Logo"
                                    width={120}
                                    height={10}
                                    className="object-contain w-[140px] h-[50px] sm:w-[180px] sm:h-[60px] md:w-[200px] md:h-[70px]"
                                    priority  // optional: loads faster
                                />

                            </Link>
                        </div>

                        {/* Close Icon */}
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-md btn-ghost btn-circle text-2xl"
                        >
                            ✕
                        </label>

                    </div>


                    {[
                        { href: "/", label: "Home" },
                        { href: "/about", label: "About" },
                        { href: "/services", label: "Services" },
                        { href: "/pricing", label: "Pricing" },
                        { href: "/contact", label: "Contact" },
                    ].map(({ href, label }) => (
                        <li key={href} >
                            <a href={href} className=" text-lg relative group">
                                <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-400 group-hover:after:w-full">
                                    {label}
                                </span>
                            </a>
                        </li>
                    ))}

                    <li className=" text-lg ">
                        <details>
                            <summary>Dropdown</summary>
                            <ul>
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </details>
                    </li>


                    <div className="absolute bottom-4 left-0 w-full px-4">
                        <div className="flex flex-row gap-1 items-center justify-center">
                            <button className="btn btn-primary font-bold text-lg" >
                                <a href='/order-business-credit-report'>
                                    Order Business Credit Report
                                </a>
                            </button>
                            <button className="btn btn-outline font-semibold text-lg">
                                <a href='/login'>
                                    Login
                                </a>
                            </button>
                        </div>
                    </div>

                </ul>
            </div>

        </div>
    );
};

export default Header;
