import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../courses/coursesSlice";

type course = {
  course: Course;
  filteredMaterial: [
    {
      _id: string;
      description: string | null;
      fileName: string | null;
      filePath: string | null;
      fileType: string | null;
      fileSection: string | null;
      dueTime: Date | null;
      materialComments: string[];
      deliverTime: Date | null;
      studentAnswers: [];
    }
  ];
};

const selectedCourseInitialState: course = {
  filteredMaterial: [
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
      state.course.courseMaterial = action.payload;
      state.filteredMaterial = action.payload;
    },
    filterCourse: (state, action: PayloadAction<string>) => {
      const filtered = state.course.courseMaterial.filter((material) => {
        return material.fileSection === action.payload;
      });

      state.filteredMaterial.splice(0, state.filteredMaterial.length);

      filtered.forEach((e) => {
        state.filteredMaterial.push(e);
      });
    },
    resetFilter: (state) => {
      state.filteredMaterial = state.course.courseMaterial;
    },
  },
});
