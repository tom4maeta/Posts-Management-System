import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../axios";

export default function Register({ setUser }){
  const navigate = useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [password_confirmation,setPasswordConfirmation]=useState("");
  const [error,setError]=useState("");

  const handleRegister=async e=>{
    e.preventDefault();
    setError("");
    try{
      await api.get("/sanctum/csrf-cookie");
      const res = await api.post("/api/register",{name,email,password,password_confirmation});
      setUser(res.data.user);
      navigate("/");
    }catch(err){
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        <input type="password" placeholder="Confirm Password" value={password_confirmation} onChange={e=>setPasswordConfirmation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none" required />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-semibold transition">Register</button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account? <Link to="/login" className="text-green-600 font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
}