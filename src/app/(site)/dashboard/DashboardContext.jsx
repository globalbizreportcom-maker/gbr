"use client";

import { apiUrl } from "@/api/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiUrl.get("/user/protected");
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    return (
        <DashboardContext.Provider value={{ user, setUser, loading }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) throw new Error("useDashboard must be used inside DashboardProvider");
    return context;
};
