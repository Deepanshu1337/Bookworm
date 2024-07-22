import React from "react";
import DataFetcher from "../DataFetcher/DataFetcher";
import DataExtractor from "../DataFetcher/DataExtractor";

const TrendingBooks = () => {
 
  return (
    <DataFetcher query={"marvel,harry"} maxResults={5}>
      {(books) => (
        <div
          className="trending-books-container"
          style={{ textAlign: "center" }}
        >
          <h1>Books that you may like</h1>
          <div className="book-list">
            {books.map((book) => (
              <DataExtractor key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </DataFetcher>
  );
};

export default TrendingBooks;
