'use client';
import "../globals.css";
import SideBar from "@/app/_components/sidebar.component";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SideBar />

            {/* Main content */}
            <main className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>
            </main>
        </div>
    );
}