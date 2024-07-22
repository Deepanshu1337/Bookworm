import React from "react";

/**
 * The BooksList component that displays a list of books.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.books - The list of books to display.
 * @returns {React.ReactElement} The rendered React component.
 */
function BooksList({ books }) {
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li> // Replace with the appropriate book properties
        ))}
      </ul>
    </div>
  );
}

export default BooksList;
