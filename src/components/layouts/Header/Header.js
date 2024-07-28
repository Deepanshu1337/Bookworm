import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/AuthSlice";
import "./Header.styles.css";
import SearchIcon from "../../../assets/search_icon.svg";
import AccountIcon from "../../../assets/account.svg";
import CartIcon from "../../../assets/cart.png";
import "./HeaderMediaQuries.styles.css";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const CartItemsCount = useSelector((state) => state.cart.items.length);

  const handleLogin = () => {
    localStorage.setItem(
      "redirectPath",
      JSON.stringify(location.pathname + location.search)
    );
    navigate("/login");
  };

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("redirectPath");
    navigate("/");
  };

  const handleSignUp = () => {
    localStorage.setItem(
      "redirectPath",
      JSON.stringify(location.pathname + location.search)
    );
    navigate("/signup");
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
            placeholder="Search by Title, Author and Genre..."
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
                  <Link to="/cart" className="nav-links">
                    <img src={CartIcon} className="cart-icon" alt="cart icon" />
                    <span className="cart-item-count">{CartItemsCount}</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="nav-links">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="dropdown">
                <div className="dropdown-menu">
                  <img
                    src={AccountIcon}
                    className="account-icon"
                    alt="Account"
                  />
                  <button className="dropbtn">My Account</button>
                </div>

                <div className="dropdown-content">
                  <button onClick={handleLogin} className="button-login">
                    Login
                  </button>

                  <button
                    onClick={handleSignUp}
                    className="dropdown-link text-center"
                  >
                    New to Bookworm? Sign Up
                  </button>

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
