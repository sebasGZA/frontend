'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

import SideBar from "@/app/_components/sidebar.component";
import { getRequest, patchRequest } from "@/lib/api.service";

export default function PostEditPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [post, setPost] = useState({
        title: "",
        content: "",
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!post.title || !post.content) {
            showToast.warning("Please fill in all fields");
            return;
        }
        const token = localStorage.getItem("token");
        const res = await patchRequest(`/posts/${id}`, token!, post);
        if (res?.id) {
            showToast.success("Post updated successfully");
            router.push("/post");
        } else {
            showToast.error("Failed to update post");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchPostById = async () => {
            const res = await getRequest(`/posts/${id}`, token!);
            if (res?.id) {
                setPost({
                    title: res.title,
                    content: res.content,
                });
            }
        }
        fetchPostById();
    }, [id]);

    return (
        <div className="dashboard">
            <SideBar />
            <main className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1>Edit Post</h1>
                </div>

                <div className="dashboard-header">
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            className="input"
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={post.title}
                            onChange={handleOnChange}
                        />
                        <textarea
                            className="input"
                            placeholder="Content"
                            name="content"
                            value={post.content}
                            onChange={handleOnChange}
                        ></textarea>
                        <button
                            className="button-edit"
                            type="submit"
                        >
                            Edit
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}