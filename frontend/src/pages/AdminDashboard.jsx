import React, { useState, useEffect } from "react";
import axios from "../services/authService"; // Custom API service
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    // Fetch Users (students and teachers)
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/admin/users");
            setUsers(response.data);
        } catch (error) {
            toast.error("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Toggle User Status (Active/Inactive)
    const toggleUserStatus = async (userId, status) => {
        try {
            await axios.put("/admin/change-status", { userId, status });
            toast.success("User status updated.");
            fetchUsers(); // Refresh user list
        } catch (error) {
            toast.error("Failed to update user status.");
        }
    };

    // Add a New Teacher
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/admin/add-teacher", newTeacher);
            toast.success("New teacher added successfully.");
            fetchUsers(); // Refresh the user list
            setNewTeacher({ name: "", email: "", password: "" }); // Reset form
        } catch (error) {
            toast.error("Failed to add teacher.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

            <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Teacher</h3>
                <form onSubmit={handleAddTeacher}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Teacher's Name"
                        value={newTeacher.name}
                        onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Teacher's Email"
                        value={newTeacher.email}
                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Teacher's Password"
                        value={newTeacher.password}
                        onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                        className="w-full p-3 mb-6 border border-gray-300 rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Add Teacher
                    </button>
                </form>
            </div>

            {/* User List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Users</h3>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Role</th>
                                <th className="py-2 px-4 border">Status</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                    <td className="py-2 px-4 border">{user.role}</td>
                                    <td className="py-2 px-4 border">{user.status}</td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() =>
                                                toggleUserStatus(
                                                    user._id,
                                                    user.status === "active" ? "inactive" : "active"
                                                )
                                            }
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        >
                                            {user.status === "active" ? "Deactivate" : "Activate"}
                                        </button>
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

export default AdminDashboard;
