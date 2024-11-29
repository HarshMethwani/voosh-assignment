import React, { useState } from "react";
import { signUpWithEmail, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUp.css";

export const SignUp = ({ setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await signUpWithEmail(email, password);
      toast.success("Sign-up successful!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Error signing up.");
      console.error(error);
    }
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      toast.success("Sign-up with Google successful!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Error signing up with Google.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
          <button type="submit" className="form-btn">
            Signup
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <button onClick={handleGoogleSignUp} className="google-btn">
          Signup with Google
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
