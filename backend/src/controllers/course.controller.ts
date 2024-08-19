import { Request, Response } from "express";
import { Course } from "../models/course.model";
import {
  CreateCourseDTO,
  DownloadFileDTO,
  GetCourseDTO,
  InstructorAssignDTO,
  SendMessageDTO,
  StudentEnrollDTO,
} from "./dtos/course.dto";
import { Instructor } from "../models/instructor.model";
import { Student } from "../models/student.model";
import fs from "fs";

//add course

export const addCourse = async (
  req: Request<{}, {}, CreateCourseDTO>,
  res: Response
) => {
  const {
    courseCode,
    courseName,
    courseStudents,
    courseInstructor,
    courseMeetingLink,
  } = req.body;

  const course = new Course({
    courseName: courseName,
    courseCode: courseCode,
    courseMeetingLink: courseMeetingLink,
    courseInstructor: courseInstructor,
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

  if (course.courseInstructor) {
    return res.json({
      message: "There is already an instructor to this course",
    });
  }

  const instructor = await Instructor.findById(instructorId);

  if (!instructor) {
    return res.status(404).json({ message: "instructor not found" });
  }

  let assignedCheck: boolean = false;

  try {
    assignedCheck = course.courseInstructor === instructor._id;
  } catch (error) {
    console.log(error);
  }

  if (assignedCheck) {
    return res
      .status(400)
      .json({ message: "Instructor is already assigned to this course" });
  }

  course.courseInstructor = instructor._id;

  instructor.instructorCourses.push(course._id);

  await course.save();
  await instructor.save();

  res.json({
    course: course,
    instructor: instructor,
  });
};

//get course

export const getCourse = async (
  req: Request<{}, {}, {}, GetCourseDTO>,
  res: Response
) => {
  const { courseId } = req.query;

  const course = await Course.findById(courseId).populate({
    path: "courseInstructor courseStudents",
    select: "name email -_id",
  });

  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }

  return res.json(course);
};

export const downloadFile = (
  req: Request<{}, {}, DownloadFileDTO>,
  res: Response
) => {
  const { fileName, filePath, fileType } = req.body;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const fileStream = fs.createReadStream(filePath);

  const mimeType = fileType;

  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  fileStream.pipe(res);
};

//send comments
export const sendComments = async (
  req: Request<{}, {}, SendMessageDTO>,
  res: Response
) => {
  const { courseId, materialId, message, userId, userType } = req.body;

  if (!message) {
    return res.json({ message: "No Message is sent" });
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return res.json({ message: "Course Not Found" });
  }

  if (userType === "Student" || "student") {
    const user = Student.findById(userId);
  } else {
    const user = Instructor.findById(userId);
  }

  const material = course.courseMaterial.find((m) => m.id === materialId);

  console.log(material);

  if (!material) {
    return res.json({ message: "No Material Found" });
  }

  const newMessage = {
    userId: userId,
    message: message,
  };

  material.materialComments.push(newMessage);

  await course.save();

  res.json(course.courseMaterial);
};
