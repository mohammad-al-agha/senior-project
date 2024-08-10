import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userType: "student" | "instructor" | null;
  userName: string;
  userEmail: string;
};

const initialUserTypeState: UserState = {
  userType: null,
  userEmail: "",
  userName: "",
};

export const userTypeSlice = createSlice({
  name: "user",
  initialState: initialUserTypeState,
  reducers: {
    setAsStudent: (state, action) => {
      state.userType = "student";
      state.userEmail = action.payload.email;
      state.userName = action.payload.name;
    },
    setAsInstructor: (state, action) => {
      state.userType = "instructor";
      state.userEmail = action.payload.email;
      state.userName = action.payload.name;
    },
  },
});
