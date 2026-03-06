import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./api/pages/Home";
import Create from "./api/pages/Create";
import Login from "./api/pages/Login";
import Register from "./api/pages/Register";
import { useEffect, useState } from "react";
import api from "./axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/sanctum/csrf-cookie"); // fetch CSRF
        const res = await api.get("/api/user");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      {user && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/create-new-post" element={<Create />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;