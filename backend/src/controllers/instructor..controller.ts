import { Request, Response } from "express";
import { Instructor, InstructorDoc } from "../models/instructor.model";
import {
  AddCommentForTargetDTO,
  PostMaterialDTO,
  SendAnnouncementDTO,
} from "./dtos/instructor.dto";
import { Course, CourseMaterialDoc } from "../models/course.model";
import { Student } from "../models/student.model";
import { Req } from "../core/types/requestType";
import { Types } from "mongoose";

//get courses

export const getInstructorCourses = async (
  req: Req<InstructorDoc>,
  res: Response
) => {
  try {
    const instructor = await Instructor.findById(req.user!._id).populate({
      path: "instructorCourses",
      populate: {
        path: "courseInstructor courseStudents",
        select: "name email -_id",
      },
    });

    if (!instructor) {
      return res.json({ message: "instructor not found" });
    }

    return res.json(instructor.instructorCourses);
  } catch (error) {
    console.log(error);
  }
};

// add comments on the student's progress

export const addCommentOnTargets = async (
  req: Request<{}, {}, AddCommentForTargetDTO>,
  res: Response
) => {
  const { courseId, studentId, comment } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }

  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  const courseIndex = student.studentCourses.indexOf(course._id);

  if (courseIndex != -1) {
    return res.status(409).json("The Student is not enrolled in this course");
  }

  student.studentTargets.forEach((oneCourse) => {
    if (oneCourse._id == course._id) {
      oneCourse.instructorComments.push(comment);
    }
  });

  student.save();

  return res.json(student.studentTargets);
};

//send announcement

export const sendAnnouncement = async (
  req: Request<{}, {}, SendAnnouncementDTO>,
  res: Response
) => {
  const { courseId, message } = req.body;

  if (!message) {
    return res.json({ message: "No Message is Sent" });
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return res.json({ message: "Course Not Found" });
  }

  const announcement: CourseMaterialDoc = {
    id: "",
    description: message,
    fileSection: "Announcement",
    materialComments: ([] = []),
    fileName: null,
    filePath: null,
    fileType: null,
    dueTime: null,
    deliverTime: Date.now(),
    studentAnswers: ([] = []),
  };

  course.courseMaterial.unshift(announcement);

  await course.save();
  res.json(course.courseMaterial);
};

// upload course data
export const uploadMaterial = async (
  req: Request<{}, {}, {}, PostMaterialDTO>,
  res: Response
) => {
  const { courseId, dueTime, fileSection, description } = req.query;
  const f = req.files;
  const course = await Course.findById(courseId);

  if (!course) {
    return res.json({ message: "Course Not Found" });
  }

  const parsedDueTime = dueTime ? new Date(dueTime) : null;

  if (Array.isArray(req.files)) {
    req.files.forEach((f) => {
      const courseFile: CourseMaterialDoc = createCourseFile(
        f,
        fileSection,
        parsedDueTime,
        description
      );
      course.courseMaterial.unshift(courseFile);
    });
  }

  await course.save();
  return res.json(course.courseMaterial);
};

//This function is not an endpoint, it is just a helper for the upper function for a cleaner code
const createCourseFile = (
  file: Express.Multer.File,
  fileSection: string | null,
  date: Date,
  description: string
) => ({
  id: "",
  description: description || "",
  fileName: file.filename || "",
  filePath: file.path || "",
  fileType: file.mimetype || "",
  fileSection: fileSection || "Quiz",
  dueTime: date || new Date(),
  deliverTime: Date.now(),
  materialComments: ([] = []),
  studentAnswers: ([] = []),
});

//view meetings calendar (calendly)? https://calendly.com/event_types/user/me
//attendance sheet
