import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../courses/coursesSlice";

const selectedCourseInitialState = {
  _id: "",
  courseName: "",
  courseCode: "",
  courseInstructor: {
    email: "",
    name: "",
  },
  courseMaterial: [],
  courseMeetingLink: "",
  courseStudents: [
    {
      email: "",
      name: "",
    },
  ],
} as Course;

export const CourseSlice = createSlice({
  name: "selectedCourse",
  initialState: selectedCourseInitialState,
  reducers: {
    setCurrentCourse: (state, action) => {
      state._id = action.payload._id;
      state.courseCode = action.payload.courseCode;
      state.courseInstructor.email =
        action.payload.courseInstructorId.instructorEmail;
      state.courseInstructor.name =
        action.payload.courseInstructorId.instructorName;
      state.courseMaterial = action.payload.courseMaterial;
      state.courseMeetingLink = action.payload.courseMeetingLink;
      state.courseName = action.payload.courseName;
      state.courseStudents = action.payload.courseStudents;
    },
  },
});
