// src/components/TrendingBooks/TrendingBooks.js
import React from 'react';
import DataFetcher from '../DataFetcher/DataFetcher';
import DataExtractor from '../DataFetcher/DataExtractor';


const TrendingBooks = () => (
  <DataFetcher query="trending" >
    {(books) => (
      <div className="trending-books-container" style={{textAlign :"center"}}>
        <h1>Trending Books</h1>
        <div className="book-list">
          {books.map((book) => (
            <DataExtractor key={book.id} book={book} />
          ))}
        </div>
      </div>
    )}
  </DataFetcher>
);

export default TrendingBooks;
