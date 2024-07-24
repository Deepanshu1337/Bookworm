import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupSuccess, loginSuccess } from "../../components/Redux/AuthSlice";
import { setCartItems } from "../../components/Redux/CartSlice";
import { v4 as uuidv4 } from "uuid";
import "./SignupPage.styles.css";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/;

    if (!nameRegex.test(firstName)) newErrors.firstName = "Invalid first name";
    if (!nameRegex.test(lastName)) newErrors.lastName = "Invalid last name";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!phoneRegex.test(phone)) newErrors.phone = "Invalid phone number";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const userId = uuidv4(); // Generate a unique user ID
      const userData = { userId, firstName, lastName, email, phone, password };

      // Save user data to localStorage
      localStorage.setItem(userId, JSON.stringify(userData));

      // Initialize an empty cart for the new user
      localStorage.setItem(`cart_${userId}`, JSON.stringify([]));

      // Dispatch Redux actions
      dispatch(signupSuccess({ user: userData, userId }));
      dispatch(setCartItems([])); // Initialize cart in Redux

      // Log in the user
      dispatch(loginSuccess({ user: userData, userId }));

      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-text">
        <h1>Join Bookworm</h1>
        <p>
          Sign up to explore our extensive collection of books and enjoy
          personalized recommendations.
        </p>
      </div>
      <div className="signup-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-error">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="input-error">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="name-input"
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="name-input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
