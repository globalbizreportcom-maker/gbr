"use client";
import { useDashboard } from "../DashboardContext";

export default function DownloadsPage() {
    const { user } = useDashboard();

    return (
        <div>
            <h1 className="text-md font-bold">Downloads</h1>
            <p className="text-gray-600">Hello {user.name}, here are your downloads.</p>
        </div>
    );
}
