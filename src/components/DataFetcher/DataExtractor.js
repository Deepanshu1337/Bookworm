import React from "react";
import PropTypes from "prop-types";
import BookCard from "../../components/layouts/BookCard/BookCard";

const DataExtractor = ({ book }) => {
  const { saleInfo, volumeInfo } = book;
  
  
  const coverImage =
    volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194";
  
  
  const price = saleInfo.retailPrice
    ? Math.floor(saleInfo.retailPrice.amount)
    : "Not Available";
  
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
    const authorsArray = authors.join(", ").split(/,\s*|\;\s*/);
    return authorsArray.length > 2
      ? authorsArray.slice(0, 1) + ", ..."
      : authorsArray[0];
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
