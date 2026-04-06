'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { postRequest } from "@/lib/api.service";
import { showToast } from "nextjs-toast-notify";

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
      showToast.warning("Please fill in all fields");
      return;
    }

    const response = await postRequest("/auth/login", credentials);
    if (response?.token) {
      router.push("/dashboard");
      localStorage.setItem("token", response.token);
    } else {
      showToast.error("Failed to login");
    }
  }

  const handleRegister = () => router.push("/register");

  return (
    <div className="container">
      <h3 className="title">Sign in to your account</h3>

      <form className="form" onSubmit={handleOnSubmit}>
        <input
          type="email"
          placeholder="email"
          className="input"
          name="email"
          onChange={(e) => handleOnChange(e)}
        />

        <input
          type="password"
          placeholder="password"
          className="input"
          name="password"
          onChange={(e) => handleOnChange(e)}
        />

        <button className="button" type="submit">Sign in</button>
      </form>
      <button className="button" type="button" onClick={handleRegister}>Sign up</button>
    </div>
  );
}