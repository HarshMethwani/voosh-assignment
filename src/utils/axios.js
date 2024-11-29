import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update to your backend's base URL
});

// Add request interceptor to include Authorization header
API.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      config.headers.Authorization = `Bearer ${token}`; // Include the token in headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;