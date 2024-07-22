// src/components/layout/BookCard.js
import React from "react";
import PropTypes from "prop-types";
import "./BookCard.styles.css";
import Cart from "../../../assets/cart.png"

const BookCard = ({ coverImage, title, authors, price }) => {
  return (
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-details">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{authors}</p>
        <p className="book-price"> &#8377; {price}</p>
      </div>
      <div className="book-buttons">
      <button className="details-button btn">Details</button>
      <button className="cart-button btn">
        <img src={Cart}></img>
      </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BookCard;
