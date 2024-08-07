import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../components/Redux/CartSlice";
import CartItems from "../../components/layouts/CartItems/CartItems";
import CheckoutForm from "../../components/ChekoutForm/CheckoutForm";
import { useNavigate } from "react-router-dom";
import "./CartPage.styles.css";
import "./CartPage.mediaQuries.css";

const CartPage = () => {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const handleClearCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("handleClearCart called");
    dispatch(clearCart({ userId }));
  };


  const handleCheckout = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsCheckoutVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBackToCart = () => {
    console.log("handleBackToCart called");
    setIsCheckoutVisible(false);
  };

  const handlePurchase = () => {
    console.log("handlePurchase called");
    setIsCheckoutVisible(false);
    setIsOrderSuccess(true);
    dispatch(clearCart({ userId }));
    window.scrollTo({ top: 0, behavior: "smooth" });


    setTimeout(() => {
      setIsOrderSuccess(false);
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  }
   
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <div className="cart-page-container"></div>

      {isOrderSuccess ? (
        <div className="cart-page-data">
          <h2 className="order-success">
            Your order has been successfully placed!
          </h2>
        </div>
      ) : isCheckoutVisible ? (
        <div className="cart-page-data">
          <>
            <h2>Your Cart</h2>
            <div className="cart-actions top">
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
            <CartItems items={cartItems} />
            <h3 className="total">Total: &#8377;{calculateTotal()}</h3>
            <div className="cart-actions bottom">
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>

            <div className="checkout-form-container">
              <CheckoutForm
                className={`check-form-container ${
                  isCheckoutVisible ? "visible" : ""
                }`}
                onBackToCart={handleBackToCart}
                onPurchase={handlePurchase}
              />
            </div>
          </>
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <h2 className="empty-cart">No items in the cart..</h2>
          ) : (
            <div className="cart-page-data">
              <h2>Your Cart</h2>
              <div className="cart-actions top">
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
              <CartItems items={cartItems} />
              <h3 className="total">Total: &#8377;{calculateTotal()}</h3>
              <div className="cart-actions bottom">
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;