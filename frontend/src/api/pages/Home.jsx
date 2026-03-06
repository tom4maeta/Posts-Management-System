import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await api.get("/sanctum/csrf-cookie"); // ensure CSRF
        const res = await api.get("/api/posts");
        setPosts(res.data.posts);
      } catch (err) {
        navigate("/login"); // redirect if unauthenticated
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/api/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Post Management</h1>
        <div className="flex gap-3 w-full md:w-auto">
          <Link
            to="/create-new-post"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow w-full md:w-auto text-center font-medium"
          >
            + Create New Post
          </Link>
          <button
            onClick={async () => {
              await api.post("/api/logout");
              navigate("/login");
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow w-full md:w-auto text-center font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-green-100 text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-3 text-center w-12 font-semibold">#</th>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Author</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No posts yet. Click "Create New Post" to add one!
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <tr key={post.id} className="border-b">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3">{post.title}</td>
                  <td className="p-3">{post.author}</td>
                  <td className="p-3">{post.category}</td>
                  <td className="p-3">{post.status}</td>
                  <td className="p-3">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}