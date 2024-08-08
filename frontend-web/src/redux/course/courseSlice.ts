import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../courses/coursesSlice";

type course = {
  course: Course;
};

const selectedCourseInitialState: course = {
  course: {
    _id: "",
    courseCode: "",
    courseInstructor: {
      email: "",
      name: "",
    },
    courseMaterial: [],
    courseMeetingLink: "",
    courseName: "",
    courseStudents: [{ email: "", name: "" }],
  },
};

export const CourseSlice = createSlice({
  name: "selectedCourse",
  initialState: selectedCourseInitialState,
  reducers: {
    setCurrentCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});
