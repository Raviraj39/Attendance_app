const express = require("express");
const {
    addTeacher,
    getUsers,
    changeUserStatus,
    changeAdminPassword,
} = require("../controllers/adminController");

const router = express.Router();

// Add a new teacher
router.post("/add-teacher", addTeacher);

// Get all users (students and teachers)
router.get("/users", getUsers);

// Change user status (active/inactive)
router.put("/change-status", changeUserStatus);

// Change admin password
router.put("/change-password", changeAdminPassword);

module.exports = router;
