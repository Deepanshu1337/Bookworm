import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.css';
import SearchIcon from "../../../assets/search_icon.svg"
import AccountIcon from "../../../assets/account.svg"
import RightArrow from "../../../assets/right-arrow.svg"
import DownArrow from "../../../assets/down arrow.png"


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="container flex justify-between align-center">
          <Link to="/" className='logo' >
            Book<span className='text-primary'>worm</span>
          </Link>
        

        <div className="search-bar">
          <input type="text"  className='search-bar-input' placeholder="Search for books..." />
          <button className='search-button'> <img src={SearchIcon} className='search-button-icon'></img> </button>
        </div>

        <nav className="nav">
          <ul>
           
            {isLoggedIn ? (
              <>
               <li><Link to="/"  className='nav-links'>Home</Link></li>
                <li><Link to="/orders" className='nav-links' >Orders</Link></li>
                <li><Link to="/cart"  className='nav-links'>Cart</Link></li>
                <li><button onClick={handleLogout} className='nav-links'>Logout</button></li>
              </>
            ) : (
              <li className="dropdown">
                 <img src={AccountIcon} className='account-icon'></img>
                <button className="dropbtn" >My Account</button>
      
                <div className="dropdown-content">
                  <button onClick={handleLogin} className='button-login '>Login</button>
                  <Link className='dropdown-link text-center'>New to Bookworm? Sign Up</Link>
                  <hr/>
                  <Link className='password'>Change Password</Link>
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
