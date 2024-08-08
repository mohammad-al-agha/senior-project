import { Request, Response } from "express";
import { Student, StudentDoc } from "../models/student.model";
import { SetTargetsDTO } from "./dtos/student.dto";
import { Course } from "../models/course.model";
import { Req } from "../core/types/requestType";

// get courses

export const getStudentCourses = async (
  req: Req<StudentDoc>,
  res: Response
) => {
  try {
    const student = await Student.findById(req.user!._id).populate({
      path: "studentCourses",
      populate: {
        path: "courseInstructor courseStudents",
        select: "name email  -_id",
      },
    });
    // .populate({ path: "courseInstructor courseStudents" });

    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    res.json(student.studentCourses);
  } catch (error) {
    console.log(error);
  }
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

export const getProgress = async (req: Req<StudentDoc>, res: Response) => {
  const student = await Student.findById(req.user!._id);

  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }

  return res.json(student.studentTargets);
};
