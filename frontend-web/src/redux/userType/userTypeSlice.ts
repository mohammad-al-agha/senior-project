import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userType: "Student" | "Instructor";
};

const initialUserTypeState: UserState = {
  userType: "Student",
};

export const userTypeSlice = createSlice({
  name: "userType",
  initialState: initialUserTypeState,
  reducers: {
    setAsStudent: (state) => {
      state.userType = "Student";
    },
    setAsInstructor: (state) => {
      state.userType = "Instructor";
    },
  },
});
