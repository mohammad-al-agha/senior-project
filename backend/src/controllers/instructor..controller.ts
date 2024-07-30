import { Request, Response } from "express";
import { Instructor } from "../models/instructor.model";
import { AddCommentForTarget, GetCoursesDTO } from "./dtos/instructor.dto";
import { Course } from "../models/course.model";
import { Student } from "../models/student.model";

//get courses
export const getInstructorCourses = async (
  req: Request<{}, {}, GetCoursesDTO>,
  res: Response
) => {
  const { id } = req.body;

  const instructor = await Instructor.findById(id).populate("InstructorCorses");

  console.log(instructor);

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }

  res.json(instructor.instructorCourses);
};

// add comments on the student's progress

export const addCommentOnTargets = async (
  req: Request<{}, {}, AddCommentForTarget>,
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

//upload course data
//view meetings calendar (calendly)?
//attendance sheet
