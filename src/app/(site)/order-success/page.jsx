"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Script from "next/script";

const OrderSuccessPage = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);
    const [confetti, setConfetti] = useState([]);

    // Event snippet for GBRPur-Jun25 conversion page 
    useEffect(() => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-734050468/_84tCO3-_s8aEKTxgt4C',
                'transaction_id': ''
            });
        }
    }, []);

    // ✅ Generate confetti only on the client
    useEffect(() => {
        const confettiArray = Array.from({ length: 20 }, () => ({
            left: `${Math.random() * 100}%`,
            color: [
                "#3b82f6",
                "#f59e0b",
                "#10b981",
                "#ef4444",
                "#8b5cf6",
            ][Math.floor(Math.random() * 5)],
            delay: `${Math.random() * 2}s`,
            duration: `${2 + Math.random() * 2}s`,
        }));
        setConfetti(confettiArray);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            router.replace("/dashboard"); // 👈 use replace instead of push
            return;
        }
        const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, router]);


    return (
        <div className="relative min-h-screen flex items-start justify-center bg-white px-4 mt-10 overflow-hidden">

            <Script
                id="gads-conversion-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            gtag('event', 'conversion', {
              'send_to': 'AW-734050468/_84tCO3-_s8aEKTxgt4C',
              'transaction_id': ''
            });
          `,
                }}
            />


            {/* 🎊 Confetti elements */}
            {confetti.map((c, i) => (
                <div
                    key={i}
                    className="absolute bottom-0 w-2 h-2 rounded-full opacity-80 confetti"
                    style={{
                        left: c.left,
                        backgroundColor: c.color,
                        animationDelay: c.delay,
                        animationDuration: c.duration,
                    }}
                />
            ))}

            {/* ✅ Success card */}
            <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center   fadeIn ">
                <div className="flex justify-center mb-5">
                    <div className="bg-green-100 p-4 rounded-full">
                        <FaCheckCircle className="text-green-600 w-12 h-12" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Placed Successfully
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for your purchase! <br />
                    Your order has been placed successfully. <br />
                    You’ll be redirected to your dashboard shortly.
                </p>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="btn btn-primary text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 w-full"
                >
                    Go to Dashboard
                </button>

                <p className="text-sm text-gray-500 mt-5 font-medium">
                    Redirecting in{" "}
                    <span className="text-blue-600 font-semibold">{countdown}</span> seconds...
                </p>
            </div>

            {/* 🧩 Internal CSS */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .fadeIn {
                    animation: fadeIn 0.6s ease-in-out;
                }

                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(720deg);
                        opacity: 0;
                    }
                }

                .confetti {
                    animation-name: confetti;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}

export default OrderSuccessPage;

// export const metadata = {
//     title: "order success | GBR",
//     description: "Learn more about Global Biz Report and our mission.",
//     keywords: ["GBR", "Global Biz Report", "About"],
//     openGraph: {
//         title: "order success",
//         description: "What we do at Global Biz Report.",
//         url: "https://globalbizreport.com/order-success",
//         siteName: "Global Biz Report",
//         type: "website",
//     },
// };