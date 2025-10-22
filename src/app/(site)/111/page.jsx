"use client";

import { useEffect, useState } from "react";

export default function PayPalCheckout({ amount = "1.00" }) {
    const [paypalLoaded, setPaypalLoaded] = useState(false);

    useEffect(() => {
        // Dynamically load PayPal script
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AbYmo3fDOLo929hTcfuSF5OAsTXMmvUiLalzVeXkqtWNVNlbaBP6erqJfy4bw1zP0MgBRoKhWUJ4LA6-&currency=USD`;
        script.addEventListener("load", () => setPaypalLoaded(true));
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (!paypalLoaded || !window.paypal) return;

        window.paypal.Buttons({
            createOrder: async () => {
                const res = await fetch("https://backend.globalbizreport.com/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount }),
                });
                const data = await res.json();
                return data.id; // return order ID to PayPal
            },
            onApprove: async (data) => {
                const res = await fetch("https://backend.globalbizreport.com/capture-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: data.orderID }),
                });
                const captureData = await res.json();
                console.log("Payment captured:", captureData);
                alert("Payment successful! Check console for details.");
            },
            onCancel: () => alert("Payment cancelled"),
            onError: (err) => console.error(err),
        }).render("#paypal-button-container");
    }, [paypalLoaded, amount]);

    return <div id="paypal-button-container"></div>;
}
