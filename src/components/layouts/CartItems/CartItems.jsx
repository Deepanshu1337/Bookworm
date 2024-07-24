// src/components/layouts/CartItems/CartItems.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, addItem, decreaseItem } from "../../Redux/CartSlice";
import "./CartItems.styles.css";

const CartItems = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); // Get userId from the Redux store
  console.log("userId", userId);
  const items = useSelector(
    (state) => state.cart.items.filter((item) => item.Id === userId) // Filter items for the logged-in user
  );
  console.log("hello world!");
  console.log(userId, items)

  const handleRemoveItem = (item) => {
    dispatch(removeItem({ id: item.id, userId })); // Include userId
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItem({ ...item, userId })); // Include userId
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItem({ ...item, userId })); // Include userId
    } else {
      handleRemoveItem(item);
    }
  };

  return (
    <ul className="cart-items">
      {items.map((item) => (
        <li className="cart-item" key={item.id}>
          <div className="item-left">
            <img src={item.coverImage} alt={item.name} className="item-image" />
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">&#8377;{item.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="item-right">
            <button
              className="quantity-btn"
              onClick={() => handleDecreaseQuantity(item)}
            >
              -
            </button>
            <span className="item-quantity">{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleIncreaseQuantity(item)}
            >
              +
            </button>
            <button
              className="remove-item-btn"
              onClick={() => handleRemoveItem(item)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
