import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "BUYER",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/auth/signup", user);
    navigate("/");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="ADMIN">Admin</option>
          <option value="SELLER">Seller</option>
          <option value="BUYER">Buyer</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
