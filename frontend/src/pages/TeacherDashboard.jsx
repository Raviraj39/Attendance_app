import React, { useState, useEffect } from "react";
import axios from "../services/authService"; // Custom API service
import { toast } from "react-toastify";

const TeacherDashboard = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filters, setFilters] = useState({ studentName: "", date: "" });
    const [loading, setLoading] = useState(false);

    // Fetch Attendance for Teacher
    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/teacher/attendance", { params: filters });
            setAttendanceData(response.data);
        } catch (error) {
            toast.error("Failed to fetch attendance records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Teacher Dashboard</h2>
            {/* Filters */}
            <div className="flex space-x-4 mb-6">
                <input
                    type="text"
                    name="studentName"
                    placeholder="Search by student name"
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-md w-80"
                />
                <input
                    type="date"
                    name="date"
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-md w-80"
                />
                <button
                    onClick={fetchAttendance}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance Records</h3>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Student</th>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Time</th>
                                <th className="py-2 px-4 border">Selfie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((record) => (
                                <tr key={record._id}>
                                    <td className="py-2 px-4 border">{record.student.name}</td>
                                    <td className="py-2 px-4 border">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border">{record.time}</td>
                                    <td className="py-2 px-4 border">
                                        <img src={record.selfie} alt="Selfie" className="w-12 h-12 rounded-full" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TeacherDashboard;
