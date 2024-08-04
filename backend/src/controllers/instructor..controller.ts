import { Request, Response } from "express";
import { Instructor } from "../models/instructor.model";
import { AddCommentForTarget } from "./dtos/instructor.dto";
import { Course } from "../models/course.model";
import { Student } from "../models/student.model";

//get courses

export const getInstructorCourses = async (req: Request, res: Response) => {
  try {
    const instructor = await Instructor.findById(req.instructor.id).populate(
      "instructorCourses"
    );

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
