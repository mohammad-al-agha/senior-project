import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { themeSliceName } from "./theme";
import userTypeReducer, { userTypeSliceName } from "./userType";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    [themeSliceName]: themeReducer,
    [userTypeSliceName]: userTypeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
