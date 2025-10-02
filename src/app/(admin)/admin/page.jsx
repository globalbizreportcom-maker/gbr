import AdminLoginForm from "@/adminUtils/AdminLoginForm";

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 relative">
            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
                        Admin Panel
                    </h1>
                    <p className="text-gray-200 text-base sm:text-lg drop-shadow-sm">
                        Access your dashboard, manage users, services, and analytics seamlessly.
                    </p>
                </div>

                {/* Login Form (Client Component) */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="p-10 w-full max-w-md">
                        <AdminLoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
