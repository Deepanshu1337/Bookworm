import React from "react";
import BookDataHandler from "../DataFetcher/BookDataHandler";

const TrendingBooks = () => {
  return <BookDataHandler query={"marvel,harry"} maxResults={5} />;
};

export default TrendingBooks;
