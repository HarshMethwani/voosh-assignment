import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {SignUp} from "./components/SignUp";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Tasks from "./components/Tasks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Listen to authentication state changes
    onAuthStateChanged(auth, (user) => {  
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <NavBar  user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={user===null?<Login user = {user} setUser={setUser} />:<Navigate to="/tasks"/>} />
        <Route path="/signup" element={user===null?<SignUp user = {user} setUser={setUser}/>:<Navigate to="/tasks"/>} />
        <Route path="/tasks" element={user!==null?<Tasks user = {user}/>:<Navigate to="/login"/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
