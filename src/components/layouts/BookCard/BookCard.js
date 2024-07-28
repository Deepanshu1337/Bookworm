import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../Redux/CartSlice";
import "./BookCard.styles.css";
import CartIcon from "../../../assets/cart.png";

const BookCard = ({ title, authors, coverImage, price, bookId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);

  const handleDetailsClick = (bookId) => {
    navigate(`/book-details/${bookId}`);
    window.scrollTo(0, 0);
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
     localStorage.setItem(
       "redirectPath",
       JSON.stringify(location.pathname + location.search)
      );
      window.scrollTo(0, 0);
     navigate("/login");
    }
  };

  return (
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-details">
        <h3>{title}</h3>
        <p>
          by : <span className="book-card-author">{authors}</span>
        </p>
        <p>
          Price: <span className="book-card-price">&#8377; {price}</span>
        </p>
        <div className="card-buttons">
          <button
            className="details-btn btn"
            onClick={() => handleDetailsClick(bookId)}
          >
            Details
          </button>
          <button className="cart-btn btn" onClick={handleAddToCart}>
            Add To{" "}
            <img
              src={CartIcon}
              alt="cartIcon"
              className="card-cart-icon cart-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
