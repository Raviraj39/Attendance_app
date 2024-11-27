const User = require("../models/User");

// View Student Profile (for Teachers)

const getStudentProfile = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ error: "Student not found" });

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getStudentProfile };
