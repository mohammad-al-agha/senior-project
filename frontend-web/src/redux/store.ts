import { configureStore } from "@reduxjs/toolkit";
import themeReducer, { themeSliceName } from "./theme";

export const store = configureStore({
  reducer: {
    [themeSliceName]: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
