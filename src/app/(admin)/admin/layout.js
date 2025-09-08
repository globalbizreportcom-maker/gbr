import AdminHeader from '@/components/admin/AdminHeader';
import "./globals.css";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body className="text-gray-900">
                <AdminHeader />
                <main >{children}</main>
            </body>
        </html >
    );
}
