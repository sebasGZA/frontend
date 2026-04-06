'use client';
import { useEffect, useState } from "react";
import "../globals.css";
import SideBar from "@/app/_components/sidebar.component";
import { getRequest } from "@/lib/api.service";

export default function PostPage() {
    const [posts, setPosts] = useState<[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    const handleEditPost = (id: number) => {
        window.location.href = `/post/${id}/edit`;
    }

    const handleDeletePost = (id: number) => {
        // Implementation for deleting a post
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
                    <button onClick={() => window.location.href = '/post/create'}>Create</button>
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
                                        <button onClick={() => handleEditPost(row.id)}>Edit</button>
                                        <button onClick={() => handleDeletePost(row.id)}>Delete</button>
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