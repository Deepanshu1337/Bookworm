import React from 'react';
import './BookCard.styles.css';

const BookCard = ({ title, author, price }) => {
  return (
    <div className="book-card">
     
      <div className="book-info">
         <img src="../../../assests/jungle-book.jpg" alt={title} className="book-cover" />
        <h3>{title}</h3>
        <p>{author}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default BookCard;
