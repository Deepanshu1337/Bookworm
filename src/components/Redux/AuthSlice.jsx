import { createSlice } from "@reduxjs/toolkit";
import { setCartItems, clearCart } from "./CartSlice"; // Import actions from cartSlice

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

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isLoggedIn", "true");
    },
    signupSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.error = null;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.user = null;
      state.userId = null;

      // Clear from localStorage
      localStorage.removeItem("user");
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

// Thunk action to handle login and retrieve cart items
export const handleLogin = (user) => (dispatch) => {
  dispatch(loginSuccess({ user: user, userId: user.userId }));
  const storedCart =
    JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];
  dispatch(setCartItems(storedCart));
};

// Thunk action to handle logout and clear cart items
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
