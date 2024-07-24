import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../Redux/CartSlice";
import "./BookCard.styles.css";
import CartIcon from "../../../assets/cart.png";

const BookCard = ({ title, authors, coverImage, price, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleDetailsClick = (id) => {
    navigate(`/book-details/${id}`);
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const book = { title, authors, coverImage, price, id };
      dispatch(addItem(book));
      navigate("/cart");
    } else {
      alert("Please login first");
    }
  };

  return (
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-cover" />
      <div className="book-details">
        <h3>{title}</h3>
        <p>
          by <span className="book-card-author"> {authors}</span>
        </p>
        <p>
          Price : <span className="book-card-price">&#8377; {price}</span>
        </p>
      </div>

      <div className="btn-grp">
        <button
          className="details-btn btn"
          onClick={() => handleDetailsClick(id)}
        >
          Details
        </button>
        <button className="cart-btn btn" onClick={handleAddToCart}>
          Add To <img src={CartIcon} alt="Add to Cart" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
