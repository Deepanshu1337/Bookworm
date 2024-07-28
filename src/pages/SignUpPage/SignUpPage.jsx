import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSignup } from "../../components/Redux/AuthSlice";
import { setCartItems } from "../../components/Redux/CartSlice";
import { v4 as uuidv4 } from "uuid";
import "./SignupPage.styles.css";
import "./SignupMediaQuries.styles.css";

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
      const userId = uuidv4();
      const userData = { userId, firstName, lastName, email, phone, password };

      localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
      localStorage.setItem(`cart_${userId}`, JSON.stringify([]));

      dispatch(handleSignup({ user: userData, userId }));
      dispatch(setCartItems([]));

      let redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        redirectPath = JSON.parse(redirectPath);
        localStorage.removeItem("redirectPath");

        if (redirectPath !== "/login" && redirectPath !== "/signup") {
          navigate(redirectPath);
          return;
        }
      }

      navigate("/");
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
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <div className="input-error">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="name-input signup-input"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="signup-error">{errors.firstName}</p>
              )}
            </div>
            <div className="input-error">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="name-input signup-input"
              />
              {errors.lastName && (
                <p className="signup-error">{errors.lastName}</p>
              )}
            </div>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="signup-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="signup-error">{errors.email}</p>}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            className="signup-input"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="signup-error">{errors.phone}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="signup-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="signup-error">{errors.password}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="signup-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="signup-error">{errors.confirmPassword}</p>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
