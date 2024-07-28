import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../../assets/search_icon.svg";
import "./hero.styles.css";
import "./HeroMediaquries.styles.css";

function Hero() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/books?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <section className="hero">
        <h1>Welcome to the BookWorm</h1>
        <p>Discover your next favorite book!</p>

        <div className="search-bar">
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search by Title, Author and Genre..."
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={SearchIcon} className="search-button-icon" alt="Search" />
          </button>
        </div>
      </section>
    </>
  );
}

export default Hero;
