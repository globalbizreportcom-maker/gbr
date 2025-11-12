
'use client';

import { apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAlert } from "@/context/AlertProvider";
import { useDashboard } from "@/app/(site)/dashboard/DashboardContext";

export default function PayPalCheckout({ amount = "1.00", userId, }) {


    const { showAlert } = useAlert();

    const { user } = useDashboard();

    const router = useRouter();
    const formDataRef = useRef(null); // stable ref for formData
    const [loaded, setLoaded] = useState(false); // trigger re-render once loaded

    // Load formData from localStorage **once**
    useEffect(() => {

        const storedData = localStorage.getItem("gbr_form");
        if (storedData) {
            formDataRef.current = JSON.parse(storedData);
            setLoaded(true); // triggers render
        }
    }, []);



    // Prevent rendering if formData is not ready
    if (!loaded || !formDataRef.current) return null;

    const formData = formDataRef.current;
    console.log(formData);
    const paypalKey = `paypal-${amount}-${userId}-${formData?.currency || ""}-${formData?.companyName || ""}`;


    return (
        <>
            {!loaded && <p>Loading...</p>}

            <PayPalScriptProvider
                key={paypalKey}
                options={{
                    "client-id": 'AbYmo3fDOLo929hTcfuSF5OAsTXMmvUiLalzVeXkqtWNVNlbaBP6erqJfy4bw1zP0MgBRoKhWUJ4LA6-',
                    currency: "USD",
                }}
                deferLoading={false}
            >

                <PayPalButtons
                    style={{ layout: "vertical" }}
                    forceReRender={[amount, userId || user?._id, formData]}
                    createOrder={async () => {
                        const res = await apiUrl.post("/api/payment/create-paypal-order", {
                            amount: Number(amount).toFixed(2),
                            userId,
                            formData,
                        });
                        return res.data.orderId;
                    }}
                    onApprove={async (data) => {
                        try {
                            const res = await apiUrl.post("/api/payment/capture-paypal", {
                                orderId: data.orderID,
                            });
                            showAlert(`Payment successful`, "success");
                            router.push("/order-success");
                        } catch (err) {
                            showAlert(`Payment failed. Please try again`, "error");
                        }
                    }}
                    onCancel={async (data) => {
                        await apiUrl.post("/api/payment/cancellation", {
                            userId: formData.userId || userId || user?._id || "",
                            orderId: data.orderID,
                            data,
                        });
                        showAlert(`Payment Cancelled`, "error");
                    }}
                    onError={(err) => {
                        console.log(err);
                        showAlert(`Something went wrong with PayPal payment`, "error");

                    }}
                />
            </PayPalScriptProvider>

        </>
    );
}

