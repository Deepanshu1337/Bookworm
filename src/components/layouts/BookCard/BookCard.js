import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../Redux/CartSlice";
import "./BookCard.styles.css";
import CartIcon from "../../../assets/cart.png";

const BookCard = ({
  title,
  authors,
  coverImage,
  price,
  bookId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);

  const handleDetailsClick = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };

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

  return (
    <div className="book-card">
      <div className="image-overlay">
        <img src={coverImage} alt={title} className="book-cover" />
        <div className="overlay-top">
          <button
            className="details-btn btn"
            onClick={() => handleDetailsClick(bookId)}
          >
            Details
          </button>
        </div>
      </div>
      <div className="book-details">
        <h3>{title}</h3>
        <p>
          by : <span className="book-card-author">{authors}</span>
        </p>
        <p>
          Price: <span className="book-card-price">&#8377; {price}</span>
        </p>
      </div>
      <div className="overlay-bottom">
        <button className="cart-btn btn" onClick={handleAddToCart}>
          Add To Cart{" "}
          <img src={CartIcon} alt="cartIcon" className="cart-icon" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
