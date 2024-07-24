import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ExtractBookData } from "../../components/DataFetcher/BookDataHandler";
import CartIcon from "../../assets/cart.png";
import "./BookDetailsPage.styles.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../components/Redux/CartSlice";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("No book ID provided.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
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
  }, [id]);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      if (book) {
        dispatch(addItem(book));
        navigate("/cart");
      }
    } else {
      alert("Please login first");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No book found.</div>;

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
              by :
              <span className="book-author">{authors || "Unknown author"}</span>
            </p>
            <p className="book-description">
              {plainTextDescription || "No description available."}
            </p>
            <p>
              <b>Book Length :</b> {pageCount || "Not available"} pages
            </p>
            <h3>
              <b>Price :</b> &#8377;{price || "Price not available"}
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
