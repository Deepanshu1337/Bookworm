// src/components/HomePage/HomePage.js
import React, { useEffect } from "react";
import TrendingBooks from "../../components/TrendingBooks/TrendingBooks";
import Hero from "../../components/layouts/hero/Hero";
import "./HomePage.styles.css";

const HomePage = () => {
  useEffect(() => {
    const header = document.querySelector(".header");
    const root = document.documentElement;
    if (header && root) {
      root.style.setProperty("--header-height", `${header.offsetHeight}px`);
    }
  }, []);

  return (
    <div className="home-page">
      <Hero />
      {/* <div className="container">
        <div className="home-page-books-container">
          <h1>Books that you may interest</h1>
          <TrendingBooks />
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
