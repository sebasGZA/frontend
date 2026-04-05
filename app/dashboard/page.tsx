'use client';
import { useRouter } from "next/navigation";
import "./styles.css";

export default function DashboardPage() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <h2>MyApp</h2>
                <nav className="dashboard-nav">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/users">Users</a>
                    <a href="/posts">Posts</a>
                    <a href="#" onClick={handleLogout}>Logout</a>
                </nav>
            </aside>

            {/* Main content */}
            <main className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>

                {/* Cards */}
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Users</h3>
                        <p>1,245</p>
                    </div>
                </div>
            </main>
        </div>
    );
}