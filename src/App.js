import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Tasks from "./components/Tasks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import API from "./utils/axios";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email } = firebaseUser;
        const token = await firebaseUser.getIdToken();
  
        try {
          const response = await API.get(`/tasks/avatar/${uid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const avatar = response.data.avatar || null;
  
          const newUser = { uid, email, avatar, token };
          setUser(newUser);
  
          localStorage.setItem("user", JSON.stringify(newUser)); // Save user state
        } catch (error) {
          console.error("Error fetching user avatar:", error);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, []);
  

  return (
    <Router>
      <NavBar user = {user} setUser={setUser}/>
      <Routes>
        <Route
          path="/login"
          element={user === null ? <Login user={user} setUser={setUser} /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/signup"
          element={user === null ? <SignUp user={user} setUser={setUser} /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/tasks"
          element={user !== null ? <Tasks user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
