"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../globals.css";

import SideBar from "@/app/_components/sidebar.component";
import { getRequest } from "@/lib/api.service";

interface PostDetail {
    id: string;
    title: string;
    content: string;
    userName: string;
}
export default function DetailPage() {
    const params = useParams();
    const { id } = params;
    const [postDetail, setPostDetail] = useState<PostDetail>({
        id: "",
        title: "",
        content: "",
        userName: "",
    });

    useEffect(() => {
        const getPostDetailById = async () => {
            const token = localStorage.getItem("token")
            const res = await getRequest(
                `posts/${id}`,
                token!,
            )
            setPostDetail(res);
        }
        getPostDetailById();

    }, [id]);

    return (
        <div className="dashboard">
            <SideBar />

            <main className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Post Detail</h1>
                </div>
                <div>
                    <p>Post ID: {postDetail.id}</p>
                    <p>Title: {postDetail.title}</p>
                    <p>Content: {postDetail.content}</p>
                    <p>user: {postDetail.userName}</p>
                </div>
            </main>
        </div>
    );
}