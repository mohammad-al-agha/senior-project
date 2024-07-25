import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  courseMeetingLink: {
    type: String,
  },
  courseInstructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  courseStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
