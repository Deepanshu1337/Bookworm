import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BookCard from "../../components/layouts/BookCard/BookCard";
import { tailspin } from "ldrs";
tailspin.register();

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

  if (loading)
    return (
      <div className="loader-container">
        <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
        ;
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map((book) => {
          const bookData = ExtractBookData(book);
          return (
            <BookCard
              key={bookData.eTag}
              coverImage={bookData.coverImage}
              title={bookData.title}
              authors={bookData.authors}
              price={bookData.price}
              bookId={bookData.bookId}
              bookDesc={bookData.description}
              totalAuthors={bookData.totalAuthors}
              categories={bookData.categories}
            />
          );
        })
      ) : (
        <h1>No books found for "{query}".</h1>
      )}
    </div>
  );
};

// *******************Extracting book data**********************************
export function ExtractBookData(book) {
  const { saleInfo, volumeInfo } = book;

  const title = getTitle(volumeInfo);
  const authors = getAuthors(volumeInfo);
  const totalAuthors = geTotalAuthors(volumeInfo);
  const bookId = getBookId(book);
  const coverImage = getCoverImage(volumeInfo);
  const price = getPrice(saleInfo);
  const description = getDescription(volumeInfo);
  const pageCount = getPageCount(volumeInfo);
  const eTag = getETag(book);
  const categories = getCategories(volumeInfo);

  return {
    coverImage,
    title,
    authors,
    price,
    bookId,
    description,
    pageCount,
    eTag,
    totalAuthors,
    categories,
  };
}

// *************************** functions to get eTag, title, author, id, cover image, price, description, and count ****************
function getTitle(volumeInfo) {
  if (!volumeInfo) return "No title available";
  const titles =
    volumeInfo.subtitle || volumeInfo.title || "No title available";
  const titlesArray = titles.split(/,|\(/);
  const titleStr = titlesArray[0].trim().slice(0, 15);
  return titleStr.split("/")[0].trim();
}

function getAuthors(volumeInfo) {
  const authors = volumeInfo.authors || [];
  if (authors.length === 0) return "Unknown author";
  const firstAuthor = authors[0];
  if (typeof firstAuthor === "string" && firstAuthor.includes(",")) {
    return firstAuthor.split(",")[0].trim();
  }
  return firstAuthor;
}

function geTotalAuthors(volumeInfo) {
  const authors = volumeInfo.authors || [];
  if (authors.length === 0) return "Unknown author";
  return authors;
}

function getBookId(book) {
  return book.id ? book.id : "Error";
}

function getCoverImage(volumeInfo) {
  return (
    volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194"
  );
}

function getPrice(saleInfo) {
  return saleInfo.retailPrice
    ? Math.floor(saleInfo.retailPrice.amount)
    : Math.floor(Math.random() * (500 - 300 + 1)) + 300;
}

function getDescription(volumeInfo) {
  return volumeInfo.description
    ? volumeInfo.description
    : "No description available";
}
function getPageCount(volumeInfo) {
  return volumeInfo.pageCount ? volumeInfo.pageCount : "Unknown";
}
function getCategories(volumeInfo) {
  return volumeInfo.categories ? volumeInfo.categories : "Unknown";
}

function getETag(book) {
  return book.etag ? book.etag : "";
}

// *******************************************************************************************************************

BookDataHandler.propTypes = {
  query: PropTypes.string.isRequired,
  maxResults: PropTypes.number.isRequired,
};

export default BookDataHandler;
