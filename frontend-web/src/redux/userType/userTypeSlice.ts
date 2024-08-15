import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userType: "student" | "instructor" | null;
  userName: string;
  userEmail: string;
  imgUrl: string;
};

const initialUserTypeState: UserState = {
  userType: null,
  userEmail: "",
  userName: "",
  imgUrl: "",
};

export const userTypeSlice = createSlice({
  name: "user",
  initialState: initialUserTypeState,
  reducers: {
    setAsStudent: (state, action) => {
      state.userType = "student";
      state.userEmail = action.payload.email;
      state.userName = action.payload.name;
      state.imgUrl = action.payload.imgUrl;
    },
    setAsInstructor: (state, action) => {
      state.userType = "instructor";
      state.userEmail = action.payload.email;
      state.imgUrl = action.payload.imgUrl;
    },
  },
});
