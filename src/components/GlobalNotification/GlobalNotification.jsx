// src/components/GlobalCartNotification.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GlobalNotification.styles.css";

const GlobalCartNotification = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const showNotification = useSelector((state) => state.cart.showNotification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!showNotification || !isLoggedIn) return null;
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-notification">
      <div className="notification-content">
        <span>{cartItems.length} item(s) with {totalQuantity} quantity in your cart.</span>
        <button className="go-to-cart-btn" onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default GlobalCartNotification;
