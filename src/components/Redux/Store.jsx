import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loginSuccess } from "./AuthSlice";
import cartReducer, { initializeCart } from "./CartSlice";

// Function to get the initial authentication state from localStorage
const getInitialAuthState = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    isLoggedIn,
    user,
    userId: user ? user.userId : null,
    error: null,
  };
};

const initialAuthState = getInitialAuthState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState: {
    auth: initialAuthState,
  },
});

// Dispatch loginSuccess and initializeCart if user is already logged in
if (initialAuthState.isLoggedIn && initialAuthState.user) {
  store.dispatch(
    loginSuccess({
      user: initialAuthState.user,
      userId: initialAuthState.user.userId,
    })
  );
  store.dispatch(initializeCart({ userId: initialAuthState.user.userId }));
}

export default store;
