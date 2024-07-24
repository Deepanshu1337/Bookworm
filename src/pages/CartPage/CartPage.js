// src/components/CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../components/Redux/CartSlice";
import CartItems from "../../components/layouts/CartItems/CartItems";
import CheckoutForm from "../../components/ChekoutForm/CheckoutForm";
import "./CartPage.styles.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.userId);

  const handleClearCart = () => {
    dispatch(clearCart({ userId }));
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };


  return (
    <>
      <div className="cart-page">
        <h2>Your Cart</h2>
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <CartItems items={cartItems} />
        )}
        <h3 className="total">Total: &#8377;{calculateTotal()}</h3>
        {cartItems.length > 0 && (
          <div className="cart-actions bottom">
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
      <CheckoutForm/>
    </>
  );
};

export default CartPage;
