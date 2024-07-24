import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../components/Redux/AuthSlice";
import { setCartItems } from "../../components/Redux/CartSlice";
import "./LoginPage.styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsersFromLocalStorage = () => {
    return Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
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
      newErrors.credentials = "Invalid email or password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const users = getUsersFromLocalStorage();
      const user = findUser(users);

      dispatch(loginSuccess({ user: user, userId: user.userId }));
      
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];
      dispatch(setCartItems(storedCart));

      const redirectPath =
        JSON.parse(localStorage.getItem("redirectPath")) || "/";

      if (redirectPath === "/login") {
        navigate("/");
        return;
      }
        
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
