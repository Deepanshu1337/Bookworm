import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BookCard from "../../components/layouts/BookCard/BookCard";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const BookDataHandler = ({ query, maxResults }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const finalURL = `${BASE_URL}?q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}`;

    const fetchData = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(finalURL);
        setBooks(response.data.items || []);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, maxResults]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Function to extract and format book data
  const extractBookData = (book) => {
    const { saleInfo, volumeInfo } = book;

    const coverImage =
      volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194";
    const price = saleInfo.retailPrice
      ? Math.floor(saleInfo.retailPrice.amount)
      : Math.floor(Math.random() * (500 - 300 + 1)) + 300;

    const title = getTitle(volumeInfo);
    const authors = getAuthors(volumeInfo);

    return {
      coverImage,
      title,
      authors,
      price,
    };
  };

  function getTitle(volumeInfo) {
    const titles = volumeInfo.subtitle || volumeInfo.title;
    const titlesArray = titles.split(/,|\(/);
    const titleStr = titlesArray[0].trim().slice(0, 15);
    return titleStr.split("/")[0].trim();
  }

  function getAuthors(volumeInfo) {
    const authors = volumeInfo.authors || [];
    if (authors.length === 0) return "Unknown author";
    return authors.length > 1 ? `${authors[0]}, ...` : authors.join(", ");
  }

  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((book) => {
          const bookData = extractBookData(book);
          return (
            <BookCard
              key={book.id}
              coverImage={bookData.coverImage}
              title={bookData.title}
              authors={bookData.authors}
              price={bookData.price}
            />
          );
        })
      ) : (
        <p>No books found for "{query}".</p>
      )}
    </div>
  );
};

BookDataHandler.propTypes = {
  query: PropTypes.string.isRequired,
  maxResults: PropTypes.number.isRequired,
};

export default BookDataHandler;
