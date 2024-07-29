import { Student } from "../../models/student.model";

export interface CreateCourseDTO {
  courseName: string;
  courseCode: string;
  courseMeetingLink?: string;
  courseInstructorId: string;
  courseStudents: [];
}

export interface StudentEnrollDTO {
  courseId: string;
  studentId: string;
}

export interface InstructorAssignDTO {
  courseId: string;
  instructorId: string;
}

export interface GetCourseDTO {
  courseId: string;
}
