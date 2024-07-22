import React from "react";
import "./BookCard.styles.css"
import CartIcon from "../../../assets/cart.png";

const BookCard = ({ title, authors, coverImage, price }) => {
  return (
   
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-details">
        <h3>{title}</h3>
        <p>{authors}</p>
        <p>{price}</p>
      </div>
      
      <div className="btn-grp">
        <button className="details-btn btn">Details</button>
        <button className="cart-btn btn">
          Add To <img src={CartIcon} alt="Add to Cart" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
