import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
}

const initialState = {
  token: "",
  user: {} as IUser | null | undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminVerification: (state, action) => {
      state.token = action.payload.token;
    },
    adminLogin: (state, action) => {
      state.user = action.payload.user;
    },
    loggedOut: (state) => {
      state.token = "";
      state.user = {} as IUser;
    },
  },
});

export const { adminVerification, adminLogin, loggedOut } = authSlice.actions;

export default authSlice.reducer;
