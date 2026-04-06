import { postRequest } from "@/lib/api.service";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function SideBar() {
    const router = useRouter();
    const handleDashboardClick = () => {
        router.push("/dashboard");
    }
    const handleUSersClick = () => router.push("/user");
    const handlePostsClick = () => router.push("/post");
    

    const handleLogout = async () => {
        await postRequest("/auth/logout");
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <aside className="dashboard-sidebar">
            <h2>MyApp</h2>
            <nav className="dashboard-nav">
                <a href="#" onClick={handleDashboardClick}>Dashboard</a>
                <a href="#" onClick={handleUSersClick}>Users</a>
                <a href="#" onClick={handlePostsClick}>Posts</a>
                <a href="#" onClick={handleLogout}>Logout</a>
            </nav>
        </aside>
    )
}