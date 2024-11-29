import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

export const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const user = await signInWithEmail(email, password);
      setUser(user);
      localStorage.setItem("token", user.accessToken); 
      toast.success("Logged in successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Error signing in with email.");
      console.error(error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      localStorage.setItem("token", user.accessToken); // Store token in localStorage
      toast.success("Logged in with Google successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Error signing in with Google.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-box">
        <form onSubmit={handleEmailLogin}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="form-input"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
        <button className="google-btn" onClick={handleLoginWithGoogle}>
          Login with Google
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
