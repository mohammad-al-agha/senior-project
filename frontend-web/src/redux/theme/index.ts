import { themeSlice } from "./themeSlice";

export const { switchToDark, switchToLight } = themeSlice.actions;
export const themeSliceName = themeSlice.name;

export default themeSlice.reducer;
