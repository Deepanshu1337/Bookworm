import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/AuthSlice"; // Import actions
import "./Header.styles.css";
import SearchIcon from "../../../assets/search_icon.svg";
import AccountIcon from "../../../assets/account.svg";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    localStorage.setItem("redirectPath", location.pathname); // Store the current path
    navigate("/login"); // Navigate to login page
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to home or any page after logout
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/books?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="container flex justify-between align-center">
        <Link to="/" className="logo">
          Book<span className="text-primary">worm</span>
        </Link>

        <div className="search-bar">
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={SearchIcon} className="search-button-icon" alt="Search" />
          </button>
        </div>

        <nav className="nav">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/" className="nav-links">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="nav-links">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="nav-links">
                    Cart
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-links">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="dropdown">
                <img src={AccountIcon} className="account-icon" alt="Account" />
                <button className="dropbtn">My Account</button>
                <div className="dropdown-content">
                  <button onClick={handleLogin} className="button-login">
                    Login
                  </button>
                  <Link to="/signup" className="dropdown-link text-center">
                    New to Bookworm? Sign Up
                  </Link>
                  <hr />
                  <Link to="/change-password" className="password">
                    Change Password
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
