import { Request, Response } from "express";
import { Student } from "../models/student.model";
import { GetCoursesDTO } from "./dtos/instructor.dto";
import { GetProgressDTO, SetTargetsDTO } from "./dtos/student.dto";
import { Course } from "../models/course.model";

// get courses
export const getStudentCourses = async (
  req: Request<{}, {}, GetCoursesDTO>,
  res: Response
) => {
  const { id } = req.body;

  const student = await Student.findById(id).populate("studentCourses");

  console.log(student);

  if (!student) {
    return res.status(404).json({ message: "student not found" });
  }

  res.json(student.studentCourses);
};

// set course targets

export const setTargets = async (
  req: Request<{}, {}, SetTargetsDTO>,
  res: Response
) => {
  const { courseId, studentId, target } = req.body;

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
      oneCourse.target = target;
    }
  });

  await student.save();

  return res.json(student.studentTargets);
};

// view progress

export const getProgress = async (
  req: Request<{}, {}, GetProgressDTO>,
  res: Response
) => {
  const { studentId } = req.body;

  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  return res.json(student.studentTargets);
};
