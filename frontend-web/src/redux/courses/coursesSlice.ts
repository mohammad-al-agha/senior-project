import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Course = {
  _id: string;
  courseCode: string;
  courseInstructor: {
    name: string;
    email: string;
  };
  courseMaterial: string[];
  courseMeetingLink: string;
  courseName: string;
  courseStudents: [
    {
      name: string;
      email: string;
    }
  ];
};

type CoursesSliceState = {
  courses: Course[];
};

const CoursesInitailState: CoursesSliceState = {
  courses: [],
};

const CoursesSlice = createSlice({
  name: "course",
  initialState: CoursesInitailState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export default CoursesSlice;
