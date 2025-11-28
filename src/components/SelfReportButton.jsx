"use client"; // only this small component needs client

import Link from "next/link";
import { FaBuilding, FaChartLine } from "react-icons/fa";

const SelfReportButton = ({ label = 'Get a Self-Company Report', icon }) => {
    const Icon = icon || FaChartLine;

    return (
        <Link
            href="/order-business-credit-report"
            onClick={() => {
                if (typeof window !== "undefined") {
                    sessionStorage.setItem("credit_report", "direct");
                }
            }}
            className="flex items-center gap-2"
        >
            <Icon /> {label}
        </Link>
    );
};

export default SelfReportButton;
