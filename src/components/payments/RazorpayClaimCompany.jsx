import { useRef, useEffect } from "react";

const loadRazorpayScript = () =>
    new Promise((resolve) => {
        if (typeof window === "undefined") return resolve(false);

        if (document.getElementById("razorpay-js")) return resolve(true);

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.id = "razorpay-js";

        script.onload = () => {
            console.log("Razorpay SDK loaded");
            resolve(true);
        };
        script.onerror = () => {
            console.error("Razorpay SDK failed to load");
            resolve(false);
        };

        document.body.appendChild(script);
    });

const RazorpayClaimCompany = ({ order, formData, onSuccess, onFailure, onCancel }) => {
    const rzpOpened = useRef(false); // track if popup already opened

    useEffect(() => {
        if (!order || rzpOpened.current) return;

        const initRazorpay = async () => {
            const loaded = await loadRazorpayScript();
            if (!loaded) return alert("Razorpay SDK failed to load");

            if (!window.Razorpay) {
                const checkRzp = () =>
                    new Promise((res) => {
                        const interval = setInterval(() => {
                            if (window.Razorpay) {
                                clearInterval(interval);
                                res(true);
                            }
                        }, 50);
                    });
                await checkRzp();
            }

            const razorpayOrder = order.order || order;
            const key = order.key;

            const options = {
                key,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                order_id: razorpayOrder.id,
                name: "Global Biz Report",
                description: "Company Claim Payment",
                image: "https://www.globalbizreport.com/images/gbr_favicon.jpg",
                handler: (response) => onSuccess?.(response),
                prefill: {
                    name: formData?.contactName,
                    email: formData?.contactEmail,
                    contact: formData?.contactPhone,
                },
                theme: { color: "#2563eb" },
                modal: {
                    ondismiss: () => {
                        rzpOpened.current = false; // allow reopening next time
                        onCancel?.();
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", (res) => {
                rzpOpened.current = false;
                onFailure?.(res.error);
            });

            rzp.open();
            rzpOpened.current = true;
        };

        initRazorpay();
    }, [order]);

    return null;
};

export default RazorpayClaimCompany;