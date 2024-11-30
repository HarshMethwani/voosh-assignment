import axios from "axios";

const API = axios.create({
  baseURL: "https://ec2-3-110-195-114.ap-south-1.compute.amazonaws.com/api", 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,// Update to your backend's base URL
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
