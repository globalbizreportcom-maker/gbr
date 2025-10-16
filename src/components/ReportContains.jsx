'use client';

import { useRouter } from "next/navigation";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const ReportContains = () => {

    const router = useRouter();

    return (
        <section className="py-10 px-2 bg-violet-50 ">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">

                {/* Left: Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src="https://images.pexels.com/photos/7693705/pexels-photo-7693705.jpeg" // Replace with your actual image path
                        alt="Business Check"
                        style={{ height: 400, objectFit: "cover" }}
                        className="rounded-xl shadow-md "
                    />
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-full max-w-xs font-bold text-primary mb-5">
                        WHAT REPORT CONTAINS
                    </h2>

                    <h2 className="text-2xl font-bold text-black mb-4">
                        Choose GBR for your Global Credit Reporting Needs and Save Maximum.
                    </h2>


                    <ul className="space-y-3 mb-6">
                        {[
                            "Business activities, products/services provided, trade marks.",
                            "Import and export data, main suppliers and clients",
                            "Complete registration data and the company's history",
                            "Creditworthiness, payment records or behaviours and credit recommendations"
                        ].map((point, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700">
                                <FaCheckCircle className="text-primary text-2xl" />
                                <span className="text-md text-zinc-500">{point}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary"
                        onClick={() => { router.push('/sample-reports') }}
                    >View Sample Report <FaArrowRight className=" text-sm font-thin" /></button>

                    {/* <button className="btn btn-dash text-black ml-2 hover:text-white">View Sample Report <FaArrowRight className=" text-sm font-thin" /></button> */}
                </div>
            </div>
        </section>
    );
};

export default ReportContains;
