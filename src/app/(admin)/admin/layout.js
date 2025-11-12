import { AlertProvider } from "@/context/AlertProvider";
import "./globals.css";
import AdminAuth from "@/adminUtils/AdminAuth";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body className="text-gray-900">
                <AdminAuth>
                    <AlertProvider>
                        {children}
                    </AlertProvider>
                </AdminAuth>
            </body>
        </html>
    );
}
