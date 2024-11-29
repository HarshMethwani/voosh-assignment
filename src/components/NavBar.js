import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Profile from "./Profile";
import { logOut } from "../firebase";
import "../styles/Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Toggle profile dropdown

  const handleLogout = async () => {
    await logOut();
    setUser(null); // Reset user state
    navigate("/login");
    localStorage.removeItem("user"); 
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <nav className="navbar">
      <div className="logo">📅</div>
      <div className="nav-buttons">
        {user ? (
          <>
            {/* Avatar and Dropdown */}
            <div className="profile-container">
              <div onClick={toggleProfileDropdown} className="avatar-wrapper">
                <Avatar
                  name={user?.email} // Use user's email for initials
                 src={user?.avatar } // Use user's avatar URL if available
                  size="40"
                  round={true}
                />
              </div>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <p>{user.email}</p>
                  <Profile user={user} setUser={setUser} />
                </div>
              )}
            </div>

            {/* Logout Button */}
            <Link to="/" className="nav-buttons btn login-btn" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-buttons btn login-btn">
              Login
            </Link>
            <Link to="/signup" className="nav-buttons btn signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
