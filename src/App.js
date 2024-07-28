import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CartPage from "./pages/CartPage/CartPage";
import BookPage from "./pages/BookPage/Bookpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignUpPage/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import GlobalCartNotification from "./components/GlobalNotification/GlobalNotification";
import "./App.css"
function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Header />
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/books" element={<BookPage />} />
            <Route path="/book-details/:bookId" element={<BookDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
    
        <Footer />
        <GlobalCartNotification /> {/* Add the notification component */}
      </div>
    </Router>
  );
}

export default App;
