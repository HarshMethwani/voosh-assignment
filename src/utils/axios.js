import axios from "axios";

const API = axios.create({
  baseURL: "https://voosh-assignment-1-mi7o.onrender.com/api", 
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
