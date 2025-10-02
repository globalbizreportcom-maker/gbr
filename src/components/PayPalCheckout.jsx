"use client";

import { apiUrl } from "@/api/api";
import Script from "next/script";
import { useRef, useEffect, useState } from "react";

export default function PayPalCheckout({ amount = "1.00", userId }) {
    const [formData, setFormData] = useState(null);
    const userIdRef = useRef(userId);

    useEffect(() => {
        userIdRef.current = userId; // always keep latest userId
    }, [userId]);

    useEffect(() => {
        const storedData = localStorage.getItem("gbr_form");
        if (storedData) setFormData(JSON.parse(storedData));
    }, []);

    useEffect(() => {
        if (!formData) return;

        const renderPayPalButtons = () => {
            if (window.paypal && !document.getElementById("paypal-btn-rendered")) {
                window.paypal.Buttons({
                    createOrder: async () => {
                        const res = await apiUrl.post("/api/payment/create-paypal-order", {
                            amount,
                            userId: userIdRef.current,
                            formData,
                        });
                        return res.data.orderId;
                    },
                    onApprove: async (data) => {
                        await apiUrl.post("/api/payment/capture-paypal", { orderId: data.orderID });
                        alert("Payment successful!");
                    },
                    onError: console.error,
                }).render("#paypal-button-container");

                document.getElementById("paypal-button-container")?.setAttribute("id", "paypal-btn-rendered");
            }
        };

        const interval = setInterval(() => {
            if (window.paypal) {
                renderPayPalButtons();
                clearInterval(interval);
            }
        }, 100);
    }, [formData, amount]);

    return (
        <>
            <div id="paypal-button-container"></div>
            <Script
                src={`https://www.paypal.com/sdk/js?client-id=AXE0e0T-WVhYAxm7bKHdfiufchoL27auBeQ5PgJQ8UzmExYoesadzdcBxet-A3l2l1_m8V3CLLijAll9&currency=USD`}
                strategy="afterInteractive"
            />
        </>
    );
}
