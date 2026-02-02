"use client";
import { useEffect, useState } from "react";

export default function Page() {
    const [msg, setMsg] = useState("Waiting 5 seconds…");

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Attempting malicious redirect after 5s");

            // BLOCKED by  your guard
            window.open("https://malicious-site.com");
            setTimeout("window.location.href='https://malicious-site.com'", 1000);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <h1 className="text-2xl font-bold">{msg}</h1>
        </div>
    );
}
