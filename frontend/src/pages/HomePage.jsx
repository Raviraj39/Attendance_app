import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Attendance System</h1>
                <p className="text-lg text-gray-600 mb-6">Manage your attendance easily</p>
                <div className="space-x-4">
                    <Link to="/login">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
