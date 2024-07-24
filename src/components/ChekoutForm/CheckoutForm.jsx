import React from "react";
import "./CheckoutForm.styles.css";

function CheckoutForm() {
  return (
    <div className="ch-form-body">
      <div className="ch-form-wrapper">
        <div className="ch-form-container">
          <form action="" className="ch-form">
            <h1>
              <i className="fas fa-shipping-fast"></i>
              Shipping Details
            </h1>

            <div className="ch-form-name">
              <div>
                <label for="f-name">First</label>
                <input type="text" name="f-name" />
              </div>
              <div>
                <label for="l-name">Last</label>
                <input type="text" name="l-name" />
              </div>
            </div>

            <div classNameName="street">
              <label for="name">Street</label>
              <input type="text" name="address" />
            </div>

            <div classNameName="address-info">
              <div className="city-state">
                <div>
                  <label for="city">City</label>
                  <input type="text" name="city" />
                </div>

                <div>
                  <label for="state">State</label>
                  <input type="text" name="state" />
                </div>
              </div>
              <div>
                <label for="zip">Zip</label>
                <input type="text" name="zip" />
              </div>
            </div>
            <h1>
              <i classNameName="far fa-credit-card"></i> Payment Information
            </h1>
            <div classNameName="cc-num">
              <label for="card-num">Credit Card No.</label>
              <input type="text" name="card-num" />
            </div>
            <div classNameName="cc-info">
              <div>
                <label for="card-num">Exp</label>
                <input type="text" name="expire" />
              </div>
              <div>
                <label for="card-num">CCV</label>
                <input type="text" name="security" />
              </div>
            </div>
            <div classNameName="ch-form-btns">
              <button className="ch-form-btn">Purchase</button>
              <button className="ch-form-btn">Back to cart</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
