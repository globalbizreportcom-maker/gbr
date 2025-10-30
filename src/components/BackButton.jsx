'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
    const router = useRouter();

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
