


import HeaderMenu from '@/utils/HeaderMenu';
import Image from 'next/image';
import Link from 'next/link'

const Header = () => {

    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar bg-white ">

                    {/* <div className=""> */}
                    <Link href="/" className="inline-block flex-1 ">
                        <Image
                            src="/images/gbr_logo_2.0.jpeg" // Path relative to the public directory
                            alt="GBR Logo"
                            width={120}
                            height={10}
                            className="object-cover w-[140px] h-[50px] sm:w-[180px] sm:h-[60px] lg:w-[180px] lg:h-[50px] xl:w-[130px] xl:h-[50px]"
                            priority  // optional: loads faster
                        />
                    </Link>
                    {/* </div> */}


                    <HeaderMenu />

                </div>
            </div>


        </div>
    );
};

export default Header;
