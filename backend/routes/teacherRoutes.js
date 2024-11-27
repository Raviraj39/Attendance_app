const express = require("express");
const { getClassAttendance } = require("../controllers/attendanceController");

const router = express.Router();

// Teacher view class attendance (paginated)
router.get("/attendance/:teacherId", getClassAttendance);

module.exports = router;
