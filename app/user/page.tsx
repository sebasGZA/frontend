'use client';
import { useEffect, useState } from "react";
import DarkTable from "../_components/table.component";
import "../globals.css";
import SideBar from "@/app/_components/sidebar.component";
import { getRequest } from "@/lib/api.service";

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState<string[]>([]);
    const handleUserDetail = (id: number) => {
        window.location.href = `/user/${id}`;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            const res = await getRequest(
                'users/saved',
                token!,
                {
                    limit: 10,
                    offset: 0,
                }
            )
            const columnNames = res.length > 0 ? Object.keys(res[0]) : [];
            setColumns(columnNames);
            setUsers(res);
        }
        fetchUsers();
    }, [])

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <SideBar />

            {/* Main content */}
            <main className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1>Users</h1>
                </div>

                {/* List */}
                <div>
                    <DarkTable data={users} columns={columns} handleMethod={handleUserDetail} />
                </div>
            </main>
        </div>
    );
}