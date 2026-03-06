import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../axios";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    try {
      await api.get("/sanctum/csrf-cookie");
      const res = await api.post("/api/login",{email,password});
      setUser(res.data.user);
      navigate("/");
    } catch(err){
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-semibold transition">Login</button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account? <Link to="/register" className="text-green-600 font-medium">Register</Link>
        </p>
      </form>
    </div>
  );
}