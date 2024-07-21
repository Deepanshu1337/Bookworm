import React from "react";
import BookCard from "../BookCard/BookCard";
import "./HomePageBooksContainer.styles.css";

function HomePageBooksContainer() {
  return (
    <div className="bookscontainer ">
      <div className="container">
        <h2>Best sellers</h2>
        <div className="genre-books ">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </div>
  );
}

export default HomePageBooksContainer;
