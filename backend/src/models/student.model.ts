import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentPassword: {
    type: String,
    required: true,
  },
  studentCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  studentTargets: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      target: {
        type: String,
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
