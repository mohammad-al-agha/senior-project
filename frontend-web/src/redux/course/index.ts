import { CourseSlice } from "./courseSlice";

export const { setCurrentCourse, setMaterial, filterCourse, resetFilter } =
  CourseSlice.actions;

export const SelectedCourseSliceName = CourseSlice.name;

export default CourseSlice.reducer;
