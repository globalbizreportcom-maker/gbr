"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed cursor-pointer bottom-30 right-6 z-9 p-3 rounded-full bg-primary text-white shadow-lg transition-opacity ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            aria-label="Scroll to top"
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;
