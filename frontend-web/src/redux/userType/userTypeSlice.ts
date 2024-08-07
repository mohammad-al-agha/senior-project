import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userType: "student" | "instructor";
};

const initialUserTypeState: UserState = {
  userType: "student",
};

export const userTypeSlice = createSlice({
  name: "user",
  initialState: initialUserTypeState,
  reducers: {
    setAsStudent: (state) => {
      state.userType = "student";
    },
    setAsInstructor: (state) => {
      state.userType = "instructor";
    },
  },
});
