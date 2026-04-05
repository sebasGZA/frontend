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

  const handleOnSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting credentials:", credentials);
    // Here you would typically send the credentials to your backend for authentication
  }

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
    </div>
  );
}