import React from "react";
import PropTypes from "prop-types";
import BookCard from "../../components/layouts/BookCard/BookCard";

const DataExtractor = ({ book }) => {
  const { saleInfo, volumeInfo } = book;
  
  
  const coverImage =
    volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194";
  
  
const price = saleInfo.retailPrice
  ? Math.floor(saleInfo.retailPrice.amount)
  : Math.floor(Math.random() * (500 - 300 + 1)) + 300;

  
  const title = getTitle(volumeInfo);
  
  const authors = getAuthors(volumeInfo);

  function getTitle(volumeInfo) {
    const titles = volumeInfo.subtitle || volumeInfo.title;
    const titlesArray = titles.split(/,|\(/);
    const titleStr = titlesArray[0].trim().slice(0, 15);
    return titleStr.split("/")[0].trim();
  }

  function getAuthors(volumeInfo) {
    const authors = volumeInfo.authors || []; 
    if (authors.length === 0) return "Unknown author"; 
    const authorsString = authors.join(", ");
    return authors.length > 1 ? `${authors[0]}, ...` : authorsString;
  }


  return (
    <BookCard
      coverImage={coverImage}
      title={title}
      authors={authors}
      price={price}
    />
  );
};

DataExtractor.propTypes = {
  book: PropTypes.object.isRequired,
};

export default DataExtractor;
