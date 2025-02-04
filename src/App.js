import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import LoginPage from "./components/LoginPage";
import StudentApp from "./components/StudentPage";

import "./App.css";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA21YDEoofMvZWLMdskmwnqVKZIp4Lgp7I",
  authDomain: "fir-student-app-c53ad.firebaseapp.com",
  projectId: "fir-student-app-c53ad",
  storageBucket: "fir-student-app-c53ad.firebasestorage.app",
  messagingSenderId: "325801092116",
  appId: "1:325801092116:web:2621fc778fd39cad563301"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <StudentApp user={user} setUser={setUser} /> : <LoginPage setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
