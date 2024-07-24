import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../components/Redux/AuthSlice"; // Import actions
import { Link } from "react-router-dom";
import "./LoginPage.styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    console.log("validating login");
    const newErrors = {};
    const userData = JSON.parse(localStorage.getItem("user")) || {};

    console.log("userData :", userData); 
    console.log(userData.email == email, userData.password == password);

    if (userData.email !== email || userData.password !== password) {
      newErrors.credentials = "Invalid email or password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  

    if (validateForm()) {
      console.log("login validated successfully");
      // Log in the user and redirect
      dispatch(loginSuccess({ email, password })); // Assuming this action will handle login
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath);
    }
  };

  return (
    <div className="login-page">
      <div className="login-text">
        <h1>Welcome Back to Bookworm</h1>
        <p>
          Log in to continue exploring our extensive collection of books and
          personalized recommendations.
        </p>
      </div>
      <div className="login-form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.credentials && <p className="error">{errors.credentials}</p>}
          <button type="submit">Log In</button>
        </form>

        <span className="forgot-password">Forgotten password?</span>
        <hr className="divider" />
        <Link to="/signup">
          <button className="sign-up-button">Create new account</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
