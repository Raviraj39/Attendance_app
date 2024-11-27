import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
    // Check if the user is logged in by looking for a token in localStorage
    const isLoggedIn = localStorage.getItem("token");

    return (
        <Router>
            {/* Conditionally render Navbar based on login state */}
            {isLoggedIn && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
