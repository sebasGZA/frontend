import { postRequest } from "@/lib/api.service";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function SideBar() {
    const router = useRouter();
    const handleLogout = async () => {
        await postRequest("/auth/logout");
        router.push("/login");
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