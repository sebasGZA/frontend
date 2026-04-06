'use client';
import { useEffect, useState } from "react";
import "../globals.css";
import SideBar from "@/app/_components/sidebar.component";
import { deleteRequest, getRequest } from "@/lib/api.service";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";

export default function PostPage() {
    const router = useRouter()
    const [posts, setPosts] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    const handleEditPost = (id: number) => {
        router.push(`/post/${id}/edit`);
    }

    const handlePostDetail = (id: number) => {
        window.location.href = `/post/${id}`;
    }

    const handleDeletePost = async (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            const token = localStorage.getItem("token");
            const res = await deleteRequest(`posts/${id}`, token!);
            if (res) {
                showToast.success("Post deleted successfully");
                window.location.reload();
            } else {
                showToast.error("Failed to delete post");
            }
        }
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

                <div className="dashboard-header">
                    <button className="button" onClick={() => window.location.href = '/post/create'}>Create</button>
                </div>

                {/* List */}
                <div>
                    <table className="dark-table">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={String(col)}
                                    >
                                        {col}
                                    </th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((row: any) => (
                                <tr
                                    key={row.id}
                                >
                                    {columns.map((col) => (
                                        <td key={String(col)}>
                                            {col === 'isActive' ? (row[col] ? 'Yes' : 'No') : row[col]}
                                        </td>
                                    ))}
                                    <td>
                                        <button
                                            className="button-view-actions"
                                            onClick={() => handlePostDetail(row.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="button-edit-actions"
                                            onClick={() => handleEditPost(row.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="button-delete-actions"
                                            onClick={() => handleDeletePost(row.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}