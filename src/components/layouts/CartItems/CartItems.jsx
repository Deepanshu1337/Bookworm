import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, addItem, decreaseItem } from "../../Redux/CartSlice";
import "./CartItems.styles.css";
import  "./CartItems.mediaquries.css"

const CartItems = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); 
  const items = useSelector((state) => state.cart.items);

 
  const filteredItems = useMemo(
    () => items.filter((item) => item.userId === userId),
    [items, userId]
  );

  const handleRemoveItem = (item) => {
    dispatch(removeItem({ itemId: item.bookId, userId })); 
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItem({ ...item, userId })); 
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItem({ itemId: item.bookId, userId })); 
    } else {
      handleRemoveItem(item);
    }
  };

  return (
    <ul className="cart-items">
      {filteredItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        filteredItems.map((item) => (
          <li className="cart-item" key={item.bookId}> {/* Use bookId as the key */}
            <div className="item-left">
              <img
                src={item.coverImage}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">
                  &#8377;{item.price.toFixed(2)}
                </span>
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
        ))
      )}
    </ul>
  );
};

export default CartItems;
