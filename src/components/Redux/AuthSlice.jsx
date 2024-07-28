import { createSlice } from "@reduxjs/toolkit";
import { initializeCart, setCartItems, clearCart } from "./CartSlice";

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

      localStorage.setItem("Current_user", JSON.stringify(action.payload.user));
      localStorage.setItem("isLoggedIn", "true");
    },
    signupSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.error = null;

      localStorage.setItem("Current_user", JSON.stringify(action.payload.user));
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.userId = null;

      localStorage.removeItem("Current_user");
      localStorage.removeItem("isLoggedIn");
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    signupFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const handleLogin = (user) => (dispatch) => {
  dispatch(loginSuccess({ user: user, userId: user.userId }));
  dispatch(initializeCart({ userId: user.userId }));
};

export const handleSignup = (user) => (dispatch) => {
  dispatch(signupSuccess({ user: user, userId: user.userId }));
  dispatch(initializeCart({ userId: user.userId }));
};

export const handleLogout = (userId) => (dispatch) => {
  dispatch(logout());
  dispatch(clearCart({ userId }));
};

export const {
  loginSuccess,
  signupSuccess,
  logout,
  loginFailure,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
