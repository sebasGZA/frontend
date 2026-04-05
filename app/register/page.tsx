'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { postRequest } from "@/lib/api.service";

export default function RegisterPage() {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !credentials.name ||
            !credentials.email ||
            !credentials.password ||
            !credentials.confirmPassword
        ) {
            alert("Please fill in all fields");
            return;
        }

        if (credentials.password !== credentials.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const response = await postRequest("/auth/register", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
        });
        
        if (response?.token) {
            localStorage.setItem("token", response.token);
            router.push("/dashboard");
        } else {
            alert("Failed to register");
        }
    }

    return (
        <div className="login-container">
            <h3 className="login-title">Sign up for an account</h3>

            <form className="login-form" onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="login-input"
                    name="name"
                    onChange={(e) => handleOnChange(e)}
                />
                <input
                    type="email"
                    placeholder="email"
                    className="login-input"
                    name="email"
                    onChange={(e) => handleOnChange(e)}
                />

                <input
                    type="password"
                    placeholder="password"
                    className="login-input"
                    name="password"
                    onChange={(e) => handleOnChange(e)}
                />

                <input
                    type="password"
                    placeholder="confirm password"
                    className="login-input"
                    name="confirmPassword"
                    onChange={(e) => handleOnChange(e)}
                />

                <button className="login-button" type="submit">Sign up</button>
            </form>

            <button className="login-button" type="button" onClick={() => router.push("/")}>
                Already have an account? Sign in
            </button>

        </div>
    );
}