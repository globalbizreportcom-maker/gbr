import "./globals.css";
import AdminAuth from "@/adminUtils/AdminAuth";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body className="text-gray-900">
                <AdminAuth>{children}</AdminAuth>
            </body>
        </html>
    );
}
