import React from "react";
import "./BookCard.styles.css";

const BookCard = ({ title, authors, coverImage, price }) => {
  return (
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{authors}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default BookCard;
