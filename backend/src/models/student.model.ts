import mongoose, { Schema, Types } from "mongoose";

export type StudentDoc = {
  _id: Types.ObjectId;
  studentName: string;
  studentEmail: string;
  studentPassword: string;
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
