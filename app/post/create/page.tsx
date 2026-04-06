'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify"
;
import SideBar from "@/app/_components/sidebar.component";
import { postRequest } from "@/lib/api.service";
import "../../globals.css";

export default function PostCreatePage() {
    const router = useRouter();

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
        const res = await postRequest('/posts', token!, post);
        if (res?.id) {
            showToast.success("Post created successfully");
            router.push("/post");
        } else {
            showToast.error("Failed to create post");
        }
    }
    return (
        <div className="dashboard">
            <SideBar />
            <main className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1>Create Post</h1>
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
                            className="button"
                            type="submit"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}