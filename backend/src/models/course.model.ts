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
  courseStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: [],
    },
  ],
  date: {
    type: String,
    default: "",
  },
  courseMaterial: [
    {
      type: {
        fileName: String,
        filePath: String,
        fileType: String,
        fileSection: String,
        deliverTime: { type: Date, default: Date.now },
        dueTime: { type: Date, default: Date.now },
        materialComments: { type: [String], default: [] },
        studentAnswers: [
          {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
            submittedFile: String,
            submissionTime: { type: Date },
          },
        ],
        default: [],
      },
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

export { Course };
