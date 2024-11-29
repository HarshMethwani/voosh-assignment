import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebase';
const Navbar = ({user,setUser}) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
      await logOut();
      setUser(null); 
      navigate('/login');
      };
  return (
    <nav className="navbar">
      <div className="logo">📅</div>
      <div className="nav-buttons">
        {user !== null ? ( // If user is logged in, show Logout button
          <Link to= '/' className="nav-buttons btn login-btn" onClick={handleLogout}>Logout</Link>
        ) : ( // If user is not logged in, show Login and Sign Up buttons
          <>
          <Link to= '/login' className="nav-buttons btn login-btn" >Login</Link>
          <Link to= '/signup' className="nav-buttons btn signup-btn" >Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
