// src/components/AuthForm/AuthForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  signupSuccess,
  loginFailure,
  signupFailure,
} from "../../redux/reducers/authSlice";
import "./AuthForm.styles.css";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  const validateName = (name) => /^[A-Za-z][A-Za-z\s]*$/.test(name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "signup") {
      if (!validateName(firstName) || !validateName(lastName)) {
        setError(
          "Names must not start with a number and should only contain letters."
        );
        return;
      }

      if (!validateEmail(email)) {
        setError("Invalid email address.");
        return;
      }

      if (!validatePhoneNumber(phoneNumber)) {
        setError("Invalid phone number.");
        return;
      }

      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long, include uppercase, lowercase, and a number."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // Simulate signup process
      const userData = { firstName, lastName, email, phoneNumber, password };
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(signupSuccess(userData));
    } else if (type === "login") {
      const storedUser = JSON.parse(localStorage.getItem(firstName));
      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        dispatch(loginSuccess(storedUser));
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{type === "signup" ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {type === "signup" && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {type === "signup" && (
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit">{type === "signup" ? "Sign Up" : "Login"}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
