// src/components/BestSellers/BestSellers.js
import React from 'react';
import DataFetcher from '../DataFetcher/DataFetcher';
import DataExtractor from '../DataFetcher/DataExtractor';


const BestSeller = () => (
  <DataFetcher query="best_sellers">
    {(books) => (
      <div className="best-sellers-container">
        <h1>Best Sellers</h1>
        <div className="book-list">
          {books.map((book) => (
            <DataExtractor key={book.id} book={book} />
          ))}
        </div>
      </div>
    )}
  </DataFetcher>
);

export default BestSeller;
