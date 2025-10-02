
export default function DashboardLayout({ children }) {

    return (
        <div className="min-h-screen flex">
            {/* Main content (like <Outlet />) */}
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
    );
}
