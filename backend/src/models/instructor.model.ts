import mongoose, { Document, Types } from "mongoose";

export type InstructorDoc = {
  _id: Types.ObjectId;
  instructorName: string;
  instructorEmail: string;
  instructorPassword: string;
  instructorCourses: Types.ObjectId[];
};

const instructorSchema = new mongoose.Schema<InstructorDoc>({
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
