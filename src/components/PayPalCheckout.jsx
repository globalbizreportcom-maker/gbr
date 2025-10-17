"use client";

import { apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useRef, useEffect, useState } from "react";

export default function PayPalCheckout({ amount = "1.00", userId }) {

    const router = useRouter();
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
                        // alert("Payment successful!");
                        router.push('/order-success')
                    },
                    onCancel: async function (data) {
                        // User cancelled the PayPal payment
                        await apiUrl.post("/api/payment/cancellation", {
                            userId: formData.userId,
                            orderId: data.orderID,       // ✅ use data.orderID
                            data,
                        });
                    },
                    onError: console.log,
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
                src={`https://www.paypal.com/sdk/js?client-id=AbYmo3fDOLo929hTcfuSF5OAsTXMmvUiLalzVeXkqtWNVNlbaBP6erqJfy4bw1zP0MgBRoKhWUJ4LA6-&currency=USD`}
                strategy="afterInteractive"
            />
        </>
    );
}
