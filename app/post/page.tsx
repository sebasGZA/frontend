'use client';
import "../globals.css";
import SideBar from "@/app/_components/sidebar.component";

export default function PostPage() {
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SideBar />

            {/* Main content */}
            <main className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1>Posts</h1>
                </div>

                {/* List */}
                <div>

                </div>
            </main>
        </div>
    );
}