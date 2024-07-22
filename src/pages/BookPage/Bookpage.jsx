import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookDataHandler from "../../components/DataFetcher/BookDataHandler";
import "./BookPage.styles.css";
import Footer from "../../components/layouts/Footer/Footer";

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
    <>
      <div className="book-page">
        <h1>Books</h1>
        <BookDataHandler query={query} maxResults={40} />
      </div>
      <Footer/>
    </>
  );
};

export default BookPage;