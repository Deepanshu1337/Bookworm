// src/components/NewArrivals/NewArrivals.js
import React from 'react';
import DataFetcher from '../DataFetcher/DataFetcher';
import DataExtractor from '../DataFetcher/DataExtractor';


const NewArrivals = () => (
  <DataFetcher query="new_arrivals">
    {(books) => (
      <div className="new-arrivals-container">
        <h1>New Arrivals</h1>
        <div className="book-list">
          {books.map((book) => (
            <DataExtractor key={book.id} book={book} />
          ))}
        </div>
      </div>
    )}
  </DataFetcher>
);

export default NewArrivals;
