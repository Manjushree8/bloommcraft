// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//  Request interceptor: attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bc_token"); // FIXED key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", {
      status: err.response?.status,
      data: err.response?.data,
      headers: err.response?.headers,
    });
    return Promise.reject(err);
  }
);

export default api;
