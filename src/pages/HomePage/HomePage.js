// src/components/HomePage/HomePage.js
import React from "react";
import TrendingBooks from "../../components/TrendingBooks/TrendingBooks";
import Hero from "../../components/layouts/hero/Hero";
import "./HomePage.styles.css";


const HomePage = () => (
  <div className="home-page">
    <Hero />
   
    <div className="container">
      <div className="home-page-books-container">
        <h1 >Books that you may interest</h1>
        <TrendingBooks />
    
      </div>
    </div>

  </div>
);

export default HomePage;
