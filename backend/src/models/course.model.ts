import mongoose, { Types } from "mongoose";

export type CourseModelDoc = {
  _id: Types.ObjectId;
  courseName: string;
  courseCode: string;
  courseMeetingLink: string;
  courseInstructor: Types.ObjectId;
  courseStudents: Types.ObjectId[];
  sessionDate: string;
  time: string;
  icon: string;
  courseMaterial: CourseMaterialDoc[];
};

export interface CourseMaterialDoc {
  id: string;
  description: string | null;
  fileName: string | null;
  filePath: string | null;
  fileType: string | null;
  fileSection: string | null;
  deliverTime: number;
  dueTime: Date;
  materialComments: any[];
  studentAnswers: any[];
}

// export interface MaterialCommentsDoc {
//   _id: Types.ObjectId;
//   userId: string;
//   message: string;
// }

// export interface StudentAnswerssDoc {
//   _id: Types.ObjectId;
//   studentId: Types.ObjectId;
//   submittedFile: string;
//   submissionTime: Date;
// }

const courseSchema = new mongoose.Schema<CourseModelDoc>({
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
        materialComments: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student" || "Instructor",
            },
            message: String,
          },
        ],
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
