// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // your Laravel backend URL
  withCredentials: true,            // REQUIRED for Sanctum to send cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;