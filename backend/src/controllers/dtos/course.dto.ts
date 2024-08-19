export interface CreateCourseDTO {
  courseName: string;
  courseCode: string;
  courseMeetingLink?: string;
  courseInstructor: string;
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

export interface DownloadFileDTO {
  filePath: string;
  fileName: string;
  fileType: string;
}

export interface SendMessageDTO {
  courseId: string;
  materialId: string;
  message: string;
  userType: string;
  userId: string;
}
