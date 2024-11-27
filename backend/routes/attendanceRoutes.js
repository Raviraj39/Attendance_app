const express = require("express");
const { markAttendance, getAttendanceHistory } = require("../controllers/attendanceController");

const router = express.Router();

// Route to mark attendance
router.post("/mark", markAttendance);

// Route to get attendance history for a student
router.get("/history/:studentId", getAttendanceHistory);


const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory to save selfies
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Route to mark attendance with selfie upload
router.post("/mark", upload.single("selfie"), (req, res) => {
    req.body.selfie = req.file.path; // Add selfie path to request body
    markAttendance(req, res);
});

module.exports = router;
