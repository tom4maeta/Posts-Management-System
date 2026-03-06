import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    status: "Draft",
    content: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/posts", form);
      navigate("/"); // redirect to Home
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create New Post</h1>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow w-full md:w-auto text-center font-medium"
        >
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-4xl mx-auto">
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Enter title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Author</label>
            <input name="author" value={form.author} onChange={handleChange} placeholder="Enter author"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="Enter category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none">
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows="8"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
              placeholder="Write your post content here..."></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition">
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}