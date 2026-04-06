'use client';
import { useEffect, useState } from "react";
import DarkTable from "../_components/table.component";
import "../globals.css";
import SideBar from "@/app/_components/sidebar.component";
import { getRequest } from "@/lib/api.service";

export default function PostPage() {
    const [posts, setPosts] = useState<[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const handlePostDetail = (id: number) => {
        window.location.href = `/post/${id}`;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");
            const res = await getRequest(
                'posts',
                token!,
                {
                    limit: 10,
                    offset: 0,
                }
            )
            const columnNames = res.length > 0 ? Object.keys(res[0]) : [];
            setColumns(columnNames);
            setPosts(res);
        }
        fetchPosts();
    }, [])

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
                    <DarkTable data={posts} columns={columns} handleMethod={handlePostDetail} />
                </div>
            </main>
        </div>
    );
}