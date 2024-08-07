import CoursesSlice from "./coursesSlice";

export const { setCourses } = CoursesSlice.actions;
export const CoursesSliceName = CoursesSlice.name;

export default CoursesSlice.reducer;
