import React from "react";
import DataFetcher from "../../components/DataFetcher/DataFetcher";
import DataExtractor from "../../components/DataFetcher/DataExtractor";
import "./BookPage.styles.css";
import Footer from "../../components/layouts/Footer/Footer";


const BooksPage = () => {
  return (
    <div className="books-page">
      <h1>Result for your searched Book</h1>
      <DataFetcher query={"marvel"} maxResults={40}>
        {(books) => (
          <div className="book-list">
            {books.length > 0 ? (
              books.map((book) => <DataExtractor key={book.id} book={book} />)
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}
      </DataFetcher>
      <Footer/>
    </div>
  );
};

export default BooksPage;
