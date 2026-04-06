'use client';
import { useEffect, useState } from "react";
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
                                    onClick={() => handlePostDetail(row.id)}
                                    key={row.id}
                                >
                                    {columns.map((col) => (
                                        <td key={String(col)}>
                                            {col === 'isActive' ? (row[col] ? 'Yes' : 'No') : row[col]}
                                        </td>
                                    ))}
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
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