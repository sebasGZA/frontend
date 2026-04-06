"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../globals.css";

import SideBar from "@/app/_components/sidebar.component";
import { getRequest } from "@/lib/api.service";

interface UserDetail {
    id: string;
    name: string;
    email: string;
}
export default function DetailPage() {
    const params = useParams();
    const { id } = params;
    const [userDetail, setUserDetail] = useState<UserDetail>({
        id: "",
        name: "",
        email: "",
    });

    useEffect(() => {
        const getUserDetailById = async () => {
            const token = localStorage.getItem("token")
            const res = await getRequest(
                `users/saved/${id}`,
                token!,
            )
            setUserDetail(res);
        }
        getUserDetailById();

    }, [id]);

    return (
        <div className="dashboard">
            <SideBar />

            <main className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Users Detail</h1>
                </div>
                <div>
                    <p>User ID: {userDetail.id}</p>
                    <p>Name: {userDetail.name}</p>
                    <p>Email: {userDetail.email}</p>
                </div>
            </main>
        </div>
    );
}