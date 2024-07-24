// src/redux/reducers/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    signupFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  loginSuccess,
  signupSuccess,
  logout,
  loginFailure,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
