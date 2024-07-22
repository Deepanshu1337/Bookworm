import React from 'react';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.styles.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  return (
    <div className="bookdetailspage">
      <h1>Book Details</h1>
      <p>Details for book with ID: {id}</p>
    </div>
  );
};

export default BookDetailsPage;
