import "../globals.css";

export default function SideBar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return (
        <aside className="dashboard-sidebar">
            <h2>MyApp</h2>
            <nav className="dashboard-nav">
                <a href="/dashboard">Dashboard</a>
                <a href="/user">Users</a>
                <a href="/post">Posts</a>
                <a href="#" onClick={handleLogout}>Logout</a>
            </nav>
        </aside>
    )
}