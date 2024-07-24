import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  userId: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.error = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.userId = null;
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
