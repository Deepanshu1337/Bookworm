import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.styles.css";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Query:", query);
    // Reset form fields
    setName("");
    setEmail("");
    setQuery("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="right-footer">
          <div className="footer-about">
            <h2>About Us</h2>
            <p>
              We provide the best services to help you achieve your goals.
              Connect with us through our social media channels and stay
              updated.
            </p>
          </div>

          <div className="footer-social">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <Link to="#">
                <img src="facebook-icon.png" alt="Facebook" />
              </Link>
              <Link to="#">
                <img src="twitter-icon.png" alt="Twitter" />
              </Link>
              <Link to="#">
                <img src="instagram-icon.png" alt="Instagram" />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="query">Query:</label>
              <textarea id="query" value={query} onChange={handleQueryChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>



      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
