import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataFetcher from "../../components/DataFetcher/DataFetcher";
import DataExtractor from "../../components/DataFetcher/DataExtractor";
import "./BookPage.styles.css";

const BookPage = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query") || "";
    console.log("Extracted query:", searchQuery); // Log extracted query
    setQuery(searchQuery);
  }, [location.search]);

  // Ensure that DataFetcher is only rendered if query is set
  if (!query) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-page">
      <h1>Books</h1>
      <DataFetcher query={query} maxResults={40}>
        {(books) => (
          <div className="book-list">
            {books.length > 0 ? (
              books.map((book) => <DataExtractor key={book.id} book={book} />)
            ) : (
              <p>No books found for "{query}".</p>
            )}
          </div>
        )}
      </DataFetcher>
    </div>
  );
};

export default BookPage;
