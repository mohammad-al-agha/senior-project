import { Request, Response } from "express";
import { Course } from "../models/course.model";
import {
  CreateCourseDTO,
  GetCourseDTO,
  InstructorAssignDTO,
  StudentEnrollDTO,
} from "./dtos/course.dto";
import { Instructor } from "../models/instructor.model";
import { Student } from "../models/student.model";

//add course

export const addCourse = async (
  req: Request<{}, {}, CreateCourseDTO>,
  res: Response
) => {
  const {
    courseCode,
    courseName,
    courseStudents,
    courseInstructorId,
    courseMeetingLink,
  } = req.body;

  const course = new Course({
    courseName: courseName,
    courseCode: courseCode,
    courseMeetingLink: courseMeetingLink,
    courseInstructorId: courseInstructorId,
    courseStudents: courseStudents,
  });

  course.save();

  return res.json(course);
};

//student enroll

export const studentEnroll = async (
  req: Request<{}, {}, StudentEnrollDTO>,
  res: Response
) => {
  const { courseId, studentId } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  let enrolledCheck: boolean = true;

  try {
    enrolledCheck = course.courseStudents.includes(student._id);
  } catch (error) {
    console.log(error);
  }

  if (enrolledCheck) {
    return res
      .status(400)
      .json({ message: "Student is already enrolled in this class" });
  }

  course.courseStudents.push(student._id);

  student.studentCourses.push(course._id);

  await course.save();
  await student.save();

  res.json({
    course: course,
    student: student,
  });
};

//intructor assign

export const instructorAssign = async (
  req: Request<{}, {}, InstructorAssignDTO>,
  res: Response
) => {
  const { courseId, instructorId } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const instructor = await Instructor.findById(instructorId);

  if (!instructor) {
    return res.status(404).json({ message: "instructor not found" });
  }

  course.courseInstructorId = instructor._id;

  instructor.instructorCourses.push(course._id);

  await course.save();
  await instructor.save();

  res.json({
    course: course.populate("courseinstructors"),
    instructor: instructor.populate("instructorCourses"),
  });
};

//get course

export const getCourse = async (
  req: Request<{}, {}, {}, GetCourseDTO>,
  res: Response
) => {
  const { courseId } = req.query;

  const course = await Course.findById(courseId)
    .populate({
      path: "courseInstructorId",
      select: "instructorName instructorEmail -_id",
    })
    .populate({
      path: "courseStudents",
      select: "studentName studentEmail -_id",
    });

  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }

  return res.json(course);
};
