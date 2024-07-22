// src/components/HomePage/HomePage.js
import React from 'react';
import TrendingBooks from '../../components/TrendingBooks/TrendingBooks';
import BestSellers from '../../components/BestSeller/BestSeller';
import NewArrivals from '../../components/NewArrival/NewArrivals';
import GenreContainer from "../../components/layouts/Genre/GenreContainer"
import Hero from "../../components/layouts/hero/Hero"
import './HomePage.styles.css';

const HomePage = () => (
  <div className="home-page">
    <Hero/>
    <GenreContainer/>
    <div className="container">
      <div className='home-page-books-container'>
      <TrendingBooks />
      {/* <BestSellers /> */}
      {/* <NewArrivals /> */}
      </div>
    </div>
  </div>
);

export default HomePage;
