import mongoose, { Schema, Types } from "mongoose";

export type StudentDoc = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  studentCourses: Types.ObjectId[];
  studentTargets: StudentTargetDoc[];
};

export type StudentTargetDoc = {
  _id: Types.ObjectId;
  courseId: Types.ObjectId;
  target: string;
  instructorComments: string[];
};

const StudentTarget = new mongoose.Schema<StudentTargetDoc>({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  instructorComments: [
    {
      type: String,
      default: [],
    },
  ],
});

const studentSchema = new mongoose.Schema<StudentDoc>({
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
  studentCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],
  studentTargets: {
    type: [StudentTarget],
    default: [],
  },
});

const Student = mongoose.model("Student", studentSchema);

export { Student };
