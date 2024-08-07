import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../components/Redux/AuthSlice";
import { setCartItems } from "../../components/Redux/CartSlice";
import "./LoginPage.styles.css";
import "./LoginPageMediaQueries.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsersFromLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const users = keys
      .filter((key) => key.startsWith("user_"))
      .map((key) => JSON.parse(localStorage.getItem(key)));
    return users;
  };

  const findUser = (users) => {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const users = getUsersFromLocalStorage();
    const user = findUser(users);

    if (!user) {
      newErrors.credentials = "Either user not found or incorrect credentials";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const users = getUsersFromLocalStorage();
      const user = findUser(users);

      dispatch(handleLogin(user));

      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];
      dispatch(setCartItems({ userId: user.userId, items: storedCart }));

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
