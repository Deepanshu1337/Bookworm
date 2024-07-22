import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CartPage from "./pages/CartPage/CartPage";
import BookPage from "./pages/BookPage/Bookpage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/books" element={<BookPage />} />{" "}
            {/* Handles search queries */}
          </Routes>
        </main>
      
      </div>
    </Router>
  );
}

export default App;
