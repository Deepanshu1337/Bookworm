// src/components/HomePage/HomePage.js
import React from "react";
import TrendingBooks from "../../components/TrendingBooks/TrendingBooks";
import GenreContainer from "../../components/layouts/Genre/GenreContainer";
import Hero from "../../components/layouts/hero/Hero";
import "./HomePage.styles.css";
import Footer from "../../components/layouts/Footer/Footer";

const HomePage = () => (
  <div className="home-page">
    <Hero />
    {/* <GenreContainer /> */}
    <div className="container">
      <div className="home-page-books-container">
        <TrendingBooks />
    
      </div>
    </div>
    <Footer/>
  </div>
);

export default HomePage;
