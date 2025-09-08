export default function AdminLogin() {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://img.freepik.com/free-photo/happy-businessman-shaking-hands-with-female-colleague-congratulating-her-excellent-job-she-did_637285-1083.jpg')" }}
        >
            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-white/50 z-0" />

            <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Admin Login
                    </h1>
                    <p className="text-gray-700 text-base sm:text-lg">
                        Welcome back! Please login to your admin account to manage dashboards, services and more.
                    </p>
                </div>

                {/* Login Card */}
                <div className="w-full max-w-md bg-white rounded-xl p-8 ">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login to Admin Panel</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
