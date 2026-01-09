"use client";
import { useEffect } from "react";

export default function ClientRedirectGuard() {
    useEffect(() => {
        const allowedDomains = [
            // 'localhost',
            'globalbizreport.com',
            'cloudinary.com'
        ];

        function isAllowed(url) {
            try {
                const u = new URL(url, window.location.origin);
                return allowedDomains.some(d => u.hostname.endsWith(d));
            } catch {
                return false;
            }
        }

        // Block unsafe window.open
        const originalOpen = window.open;
        window.open = function (url, ...args) {
            if (!url || !isAllowed(url)) {
                console.warn("Blocked window.open to", url);
                return null;
            }
            return originalOpen.call(this, url, ...args);
        };

        // Block string-based setTimeout redirects
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function (fn, delay, ...args) {
            if (typeof fn === "string" && fn.includes("location")) {
                console.warn("Blocked malicious timeout redirect:", fn);
                return;
            }
            return originalSetTimeout(fn, delay, ...args);
        };

        // Optional: detect navigation attempts
        window.addEventListener("beforeunload", () => {
            console.log("Navigation attempt detected:", window.location.href);
        });
    }, []);

    return null;
}
