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
    courseMaterial: [
      {
        _id: "",
        description: null,
        fileName: null,
        filePath: null,
        fileType: null,
        fileSection: null,
        dueTime: null,
        materialComments: [],
        deliverTime: null,
        studentAnswers: [],
      },
    ],
    icon: "",
    time: "",
    sessionDate: "",
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
    setMaterial: (state, action) => {
      state.course.courseMaterial.unshift(action.payload);
    },
  },
});
