import BackButton from "@/components/BackButton";

export default function DashboardLayout({ children }) {

    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 bg-gray-50">
                {/* Back button aligned to the right */}
                <div className="flex justify-end mb-4 max-w-5xl  mx-auto">
                    <BackButton />
                </div>

                {children}
            </main>
        </div>
    );
}
