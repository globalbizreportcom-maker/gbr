'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Hide back button on dashboard page
    if (pathname === '/dashboard') return null;

    return (
        <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
        >
            <FaArrowLeft />
            <span>Back</span>
        </button>
    );
}
