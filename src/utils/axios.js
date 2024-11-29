import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

// Add Authorization header for Firebase token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Store your Firebase token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
