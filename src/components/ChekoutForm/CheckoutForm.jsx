import React, { useState } from "react";
import "./CheckoutForm.styles.css";
import "./CheckOutFomMediaQuries.css";

function CheckoutForm({ onBackToCart, onPurchase }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNum: "",
    expire: "",
    security: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPurchase();
  };

  return (
    <div className="ch-form-container">
      <form className="ch-form" onSubmit={handleSubmit}>
        <h1>
          <i className="fas fa-shipping-fast"></i>
          Shipping Details
        </h1>
        <div className="ch-form-details">
          <div className="shipping-details">
            <div className="ch-form-name">
              <div>
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="street">
              <label htmlFor="street" className="label">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="address-info">
              <div className="city-state">
                <div>
                  <label htmlFor="city" className="label">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="label">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="zip" className="label">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="phone">
              <label htmlFor="phone" className="label">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="payment-info">
            <h1>
              <i className="far fa-credit-card"></i> Payment Information
            </h1>
            <div className="cc-num">
              <label htmlFor="cardNum" className="label">
                Credit Card No.
              </label>
              <input
                type="text"
                name="cardNum"
                value={formData.cardNum}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cc-info">
              <div>
                <label htmlFor="expire" className="label">
                  Exp
                </label>
                <input
                  type="text"
                  name="expire"
                  value={formData.expire}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="security" className="label">
                  CCV
                </label>
                <input
                  type="text"
                  name="security"
                  value={formData.security}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ch-form-btns">
          <button type="submit" className="ch-form-btn">
            Purchase
          </button>
          <button type="button" className="ch-form-btn" onClick={onBackToCart}>
            Back to cart
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
