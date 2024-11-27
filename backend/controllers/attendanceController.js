const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Mark Attendance
const markAttendance = async (req, res) => {
    try {
        const { studentId, time, selfie } = req.body;

        // Verify student exists
        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ error: "Student not found" });

        // Create attendance record
        const attendance = new Attendance({ student: studentId, time, selfie });
        await attendance.save();

        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 

// View Attendance History
const getAttendanceHistory = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const history = await Attendance.find({ student: studentId })
            .sort({ date: -1 }) // Descending order
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { markAttendance, getAttendanceHistory };
