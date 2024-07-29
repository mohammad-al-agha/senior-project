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
  courseInstructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  courseStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: [],
    },
  ],
  courseMaterial: [
    {
      type: {
        fileName: String,
        filePath: String,
        fileType: String,
        fileSection: String,
        materialComments: [String],
      },
    },
  ],
  default: [],
});

const Course = mongoose.model("Course", courseSchema);

export { Course };
