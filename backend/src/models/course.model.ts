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
  sessionDate: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  courseMaterial: [
    {
      type: {
        description: String || null,
        fileName: String || null,
        filePath: String || null,
        fileType: String || null,
        fileSection: String || null,
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
