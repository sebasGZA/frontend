'use client';
import { useParams } from "next/navigation";

export default function PostEditPage() {
    const params = useParams();
    const { id } = params;
    return (
        <div>
            <h1>Post Edit {id}</h1>
        </div>
    )
}