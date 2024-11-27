const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authMiddleware = require("./middleware/authMiddleware");



dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Add routes
app.use("/api/auth", authRoutes); // Auth routes (login, register)
app.use("/api/teacher", teacherRoutes); // Teacher routes (attendance)
app.use("/api/user", userRoutes); // User routes (student profile)
app.use("/api/admin", authMiddleware, adminRoutes); // Protecting admin routes with the middleware

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

module.exports = app;
