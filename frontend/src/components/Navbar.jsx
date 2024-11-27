import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login"; // Redirect to login after logout
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/student/dashboard">Student Dashboard</Link>
            <Link to="/teacher/dashboard">Teacher Dashboard</Link>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <button onClick={logout}>Logout</button>
        </nav>
    );
};

export default Navbar;
