import React, { useState, useEffect } from "react";
import axios from "../services/authService";
import { toast } from "react-toastify";

const StudentDashboard = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selfie, setSelfie] = useState(null);

    const fetchAttendanceHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/attendance/history", { params: { page: 1, limit: 10 } });
            setAttendanceHistory(response.data);
        } catch (error) {
            toast.error("Failed to fetch attendance history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendanceHistory();
    }, []);

    const markAttendance = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("time", new Date().toLocaleTimeString());
        if (selfie) {
            formData.append("selfie", selfie);
        }

        try {
            const response = await axios.post("/attendance/mark", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(response.data.message);
            fetchAttendanceHistory();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to mark attendance.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Dashboard</h2>

            <form onSubmit={markAttendance} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Upload Selfie</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelfie(e.target.files[0])}
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Mark Attendance
                </button>
            </form>

            <div className="mt-6 w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance History</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Time</th>
                                <th className="py-2 px-4 border">Selfie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceHistory.map((record) => (
                                <tr key={record._id}>
                                    <td className="py-2 px-4 border">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border">{record.time}</td>
                                    <td className="py-2 px-4 border">
                                        <img src={record.selfie} alt="Selfie" className="w-12 h-12 rounded-full" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
