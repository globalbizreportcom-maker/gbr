"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import { adminUrl } from "@/api/api";

const AdminAuth = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/admin") {
            setLoading(false);
            return;
        }

        const fetchAdmin = async () => {
            try {
                const res = await adminUrl.post("/protected");
                setAdmin(res.data.admin);
            } catch (err) {
                console.log(err);
                router.push("/admin"); // redirect if not authenticated
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [pathname, router]);

    if (!pathname && loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            </div>
        );

    // Render login page directly
    if (pathname === "/admin") return <>{children}</>;

    return (
        <div className="flex min-h-screen">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {admin && <AdminHeader admin={admin} />}
                <main className="flex-1 bg-gray-100 p-6">{admin ? children : null}</main>
            </div>
        </div>
    );
}

export default AdminAuth;