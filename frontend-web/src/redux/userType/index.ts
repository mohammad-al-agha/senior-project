import { userTypeSlice } from "./userTypeSlice";

export const { setAsStudent, setAsInstructor } = userTypeSlice.actions;
export const userTypeSliceName = userTypeSlice.name;

export default userTypeSlice.reducer;
