'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { postRequest } from "@/lib/api.service";

export default function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert("Please fill in all fields");
      return;
    }

    const response = await postRequest("/auth/login", credentials);
    if (response?.token) {
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } else {
      alert("Failed to login");
    }
  }

  const handleRegister = () => router.push("/register");

  return (
    <div className="login-container">
      <h3 className="login-title">Sign in to your account</h3>

      <form className="login-form" onSubmit={handleOnSubmit}>
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

        <button className="login-button" type="submit">Sign in</button>
      </form>
      <button className="login-button" type="button" onClick={handleRegister}>Sign up</button>
    </div>
  );
}