const Attendance = require("../models/Attendance");

// Controller to get attendance for a specific teacher's students
const getClassAttendance = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const attendanceRecords = await Attendance.find({ teacher: teacherId }).populate("student", "name email");
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch attendance", error: error.message });
    }
};

module.exports = { getClassAttendance };
