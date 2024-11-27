const express = require("express");
const { getStudentProfile } = require("../controllers/userController");

const router = express.Router();

// Route for getting student profile by teacher
router.get("/profile/:studentId", getStudentProfile);

module.exports = router;
