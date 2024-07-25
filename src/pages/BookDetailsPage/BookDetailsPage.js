// src/components/BookDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ExtractBookData } from "../../components/DataFetcher/BookDataHandler";
import CartIcon from "../../assets/cart.png";
import "./BookDetailsPage.styles.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../components/Redux/CartSlice";
import { tailspin } from 'ldrs'

tailspin.register()

// Default values shown


const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) {
        setError("No book ID provided.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/${bookId}`);
        const bookData = ExtractBookData(response.data);
        setBook(bookData);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToCart = () => {
    if (isLoggedIn && userId) {
      const bookDetails = {
        bookId,
        name: title,
        price,
        coverImage,
        quantity: 1,
        userId,
      };
      dispatch(addItem(bookDetails));
    } else {
      alert("Please login first");
    }
  };

  if (loading) return (
    <div className="loader-container">
      <l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
    </div>
  );
  if (error) return <div>{error}</div>;
  if (!book) return <div className="error">No book found.</div>;

  const { coverImage, title, authors, price, description, pageCount } = book;

  function convertHtmlToText(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const plainTextDescription = convertHtmlToText(description);

  return (
    <section className="detail-section-container">
      <div className="container">
        <div className="flex-container">
          <div className="book-img-container">
            <img
              src={coverImage || "https://via.placeholder.com/128x194"}
              alt={title || "Book cover"}
            />
          </div>
          <div className="book-detail-container">
            <h2>{title || "No title available"}</h2>
            <p>
              by:{" "}
              <span className="book-author">{authors || "Unknown author"}</span>
            </p>
            <p className="book-description">
              {plainTextDescription || "No description available."}
            </p>
            <p>
              <b>Book Length:</b> {pageCount || "Not available"} pages
            </p>
            <h3>
              <b>Price:</b> &#8377;{price || "Price not available"}
            </h3>
            <button className="detail-cart-btn btn" onClick={handleAddToCart}>
              Add To <img src={CartIcon} alt="Add to Cart" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
