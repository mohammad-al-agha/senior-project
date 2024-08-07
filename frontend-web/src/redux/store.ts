import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { themeSliceName } from "./theme";
import userTypeReducer, { userTypeSliceName } from "./userType";
import logger from "redux-logger";
import CoursesSliceReducer, { CoursesSliceName } from "./courses";
import SelectedCourseReducer, { SelectedCourseSliceName } from "./course";

export const store = configureStore({
  reducer: {
    [themeSliceName]: themeReducer,
    [userTypeSliceName]: userTypeReducer,
    [CoursesSliceName]: CoursesSliceReducer,
    [SelectedCourseSliceName]: SelectedCourseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
