const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add a new teacher
const addTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingTeacher = await User.findOne({ email });
        if (existingTeacher) return res.status(400).json({ error: "Teacher already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new User({
            name,
            email,
            password: hashedPassword,
            role: "Teacher",
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all users (students and teachers)
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Disable or enable user login (deactivate account)
const changeUserStatus = async (req, res) => {
    try {
        const { userId, status } = req.body; // status can be 'active' or 'inactive'

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.status = status; // Set the status to 'inactive' or 'active'
        await user.save();

        res.status(200).json({ message: `User status changed to ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Change admin password
const changeAdminPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const admin = await User.findById(req.admin.id); // req.admin.id will come from JWT auth middleware

        if (!admin || admin.role !== "Admin") return res.status(403).json({ error: "Unauthorized" });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTeacher, getUsers, changeUserStatus, changeAdminPassword };
