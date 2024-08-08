import mongoose, { Document, Types } from "mongoose";

export type InstructorDoc = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  instructorCourses: Types.ObjectId[];
};

const instructorSchema = new mongoose.Schema<InstructorDoc>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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
