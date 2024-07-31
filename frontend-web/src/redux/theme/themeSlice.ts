import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "../../core/types/themeTypes";

type ThemeState = {
  currentTheme: ThemeType;
};

const themeInitialState: ThemeState = {
  currentTheme: ThemeType.light,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    switchToDark: (state) => {
      state.currentTheme = ThemeType.dark;
    },
    switchToLight: (state) => {
      state.currentTheme = ThemeType.light;
    },
  },
});
