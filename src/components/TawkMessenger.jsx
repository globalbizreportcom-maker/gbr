"use client";

import { useEffect } from "react";

export default function TawkMessenger() {
    useEffect(() => {
        // 1. Avoid duplicate injection
        if (document.getElementById("tawk-script")) return;

        // 2. Setup global API
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // 3. Create script element
        const s1 = document.createElement("script");
        s1.id = "tawk-script";
        s1.async = true;
        s1.src = "https://embed.tawk.to/5d23319f22d70e36c2a4ad4a/1jkkngboe";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");

        const s0 = document.getElementsByTagName("script")[0];
        s0.parentNode.insertBefore(s1, s0);

        // 4. Cleanup on unmount (Optional but elite for SPA)
        return () => {
            const script = document.getElementById("tawk-script");
            if (script) script.remove();
            if (window.Tawk_API && window.Tawk_API.hideWidget) {
                window.Tawk_API.hideWidget();
            }
        };
    }, []);

    return null; // This component doesn't render HTML, just manages the script
}