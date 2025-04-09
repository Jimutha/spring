import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setRole, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );
      const role =
        username === "admin"
          ? "ADMIN"
          : username === "seller"
          ? "SELLER"
          : "BUYER"; // Simulate role
      setRole(role);
      setUserId(1); // Simulate user ID
      navigate(`/${role.toLowerCase()}`);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Sign Up</a> |{" "}
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default Login;
