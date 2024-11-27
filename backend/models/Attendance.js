const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    time: { type: String, required: true },
    selfie: { type: String, required: true }, // URL/path to the uploaded selfie image
});

module.exports = mongoose.model("Attendance", attendanceSchema);
