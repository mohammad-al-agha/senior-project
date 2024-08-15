import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Course = {
  _id: string;
  courseCode: string;
  courseInstructor: {
    name: string;
    email: string;
  };
  sessionDate: string;
  time: string;
  icon: string;
  courseMaterial: [
    {
      id: string;
      fileName: string;
      filePath: string;
      fileType: string;
      fileSection: string;
      dueTime: Date | null;
      materialComments: string[];
      _id: string;
      deliverTime: Date | null;
      studentAnswers: [];
    }
  ];
  courseMeetingLink: string;
  courseName: string;
  courseStudents: [
    {
      email: string;
      name: string;
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
