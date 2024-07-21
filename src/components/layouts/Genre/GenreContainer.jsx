import React from 'react';
import { Link } from 'react-router-dom';
import './GenreContainer.styles.css';

const GenreContainer = () => {
  return (
   <>
    <div className="genre-container">
      <div className="genre-dropdown">
        <button className="genre-dropbtn">Select Genre</button>
        <div className="genre-dropdown-content">
          <Link to="/">Fiction</Link>
          <Link to="/">Non-Fiction</Link>
          <Link to="/">Sci-Fi</Link>
          <Link to="/">Fantasy</Link>
        </div>
      </div>
      <Link to="/genre/romance" className="genre-link">Best Sellers</Link>
      <Link to="/genre/mystery" className="genre-link">New Arrivals</Link>
      <Link to="/genre/horror" className="genre-link">Trending</Link>
      <Link to="/genre/history" className="genre-link">Award Winner</Link>
    </div>
      <hr />
      </>
  );
};

export default GenreContainer;
