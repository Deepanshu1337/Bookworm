import React, { useEffect, useState } from "react";
import "./OrdersPage.styles.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    if (userId) {
      const storedOrders =
        JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
      setOrders(storedOrders);
    }
  }, [userId]);

  return (
    <div className="orders-container">
      <h2>Order Summary</h2>
      {orders.length === 0 ? (
        <p>Your orders are empty</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order">
            <p>
              <strong>Date:</strong> {order.date}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Contact Number:</strong> {order.contactNumber}
            </p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  <p>
                    {item.title} - Quantity: {item.quantity}
                  </p>
                </li>
              ))}
            </ul>
            <h3>Total: &#8377;{order.total}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
