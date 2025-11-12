


import HeaderMenu from '@/utils/HeaderMenu';
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
                                className="object-contain w-[140px] h-[50px] sm:w-[180px] sm:h-[60px] lg:w-[180px] lg:h-[50px] xl:w-[200px] xl:h-[50px]"
                                priority  // optional: loads faster
                            />
                        </Link>
                    </div>


                    <HeaderMenu />

                </div>
            </div>


        </div>
    );
};

export default Header;
