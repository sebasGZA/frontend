'use client';
import { useState } from "react";

export default function LoginPage() {
  
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

  const handleOnSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Submitting credentials:", credentials);
    // Here you would typically send the credentials to your backend for authentication
  }

  return (
    <div className="login-container">
      <h3 className="login-title">Sign in to your account</h3>

      <input
        type="email"
        placeholder="email"
        className="login-input"
        name="email"
        onChange={handleOnChange}
      />

      <input
        type="password"
        placeholder="password"
        className="login-input"
        name="password"
        onChange={handleOnChange}
      />

      <button className="login-button" onSubmit={handleOnSubmit}>Sign in</button>
    </div>
  );
}