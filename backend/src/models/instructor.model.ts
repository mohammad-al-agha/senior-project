import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  instructorName: {
    type: String,
    required: true,
  },
  instructorEmail: {
    type: String,
    required: true,
  },
  instructorPassword: {
    type: String,
    required: true,
  },
  instructorCourses: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: "Course",
    default: [],
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export { Instructor };
